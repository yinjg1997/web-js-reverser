import base64
import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

import ddddocr
from fontTools.ttLib import TTFont

BASE_DIR = Path(__file__).parent
FONT_PATH = BASE_DIR / 'font.woff2'
CMAP_PATH = BASE_DIR / 'cmap.json'
HOST = '127.0.0.1'
PORT = 8765

HTML = """<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>番茄小说字体 OCR 校对</title>
  <style>
    @font-face {
      font-family: 'FanqieLocal';
      src: url('/font.woff2') format('woff2');
    }
    :root {
      color-scheme: light;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    body {
      margin: 0;
      background: #f5f5f5;
      color: #222;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid #ddd;
      backdrop-filter: blur(8px);
    }
    .toolbar button, .toolbar input {
      font: inherit;
    }
    .toolbar button {
      border: 1px solid #bbb;
      background: white;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }
    .toolbar input[type='text'] {
      min-width: 220px;
      padding: 8px 10px;
      border: 1px solid #bbb;
      border-radius: 8px;
      background: white;
    }
    .toolbar label {
      display: inline-flex;
      gap: 6px;
      align-items: center;
    }
    .status {
      color: #555;
      font-size: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 12px;
      padding: 16px;
    }
    .card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .card.changed {
      border-color: #1677ff;
      box-shadow: 0 0 0 1px rgba(22,119,255,0.15);
    }
    .meta {
      font-size: 12px;
      color: #666;
      display: grid;
      gap: 2px;
      word-break: break-all;
    }
    .glyph-row {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 12px;
      align-items: center;
    }
    .glyph-box {
      width: 160px;
      height: 160px;
      border: 1px solid #ddd;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      overflow: hidden;
    }
    .glyph-canvas {
      width: 160px;
      height: 160px;
      display: block;
      background: #fff;
    }
    .editor {
      display: grid;
      gap: 8px;
    }
    .editor input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: 1px solid #bbb;
      border-radius: 8px;
      font: inherit;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .actions button {
      border: 1px solid #bbb;
      background: #fafafa;
      border-radius: 8px;
      padding: 6px 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button id="ocr-all">全部 OCR</button>
    <button id="save">保存 cmap.json</button>
    <button id="export">导出 JSON</button>
    <label><input id="show-empty" type="checkbox"> 只看空白项</label>
    <input id="search" type="text" placeholder="搜索 codepoint / glyph / OCR 文本">
    <span class="status" id="status">准备就绪</span>
  </div>
  <div class="grid" id="grid"></div>

  <script>
    const state = {
      entries: [],
      changed: new Set(),
      onlyEmpty: false,
      search: '',
      fontReady: null,
    };

    const grid = document.getElementById('grid');
    const statusEl = document.getElementById('status');
    const canvasSize = 160;
    const exportCanvasSize = 256;
    const fontSize = 112;

    function setStatus(text) {
      statusEl.textContent = text;
    }

    function escapeHtml(value) {
      return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function filteredEntries() {
      const keyword = state.search.trim().toLowerCase();
      return state.entries.filter((entry) => {
        if (state.onlyEmpty && entry.ocr_text) {
          return false;
        }
        if (!keyword) {
          return true;
        }
        return [entry.codepoint, entry.unicode, entry.glyph_name, entry.ocr_text, entry.char]
          .some((value) => String(value || '').toLowerCase().includes(keyword));
      });
    }

    function drawGlyph(canvas, char, size = canvasSize, renderFontSize = fontSize) {
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#111';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${renderFontSize}px FanqieLocal`;
      ctx.fillText(char, size / 2, size / 2 + renderFontSize * 0.05);
    }

    function renderVisibleCanvases() {
      document.querySelectorAll('canvas[data-char]').forEach((canvas) => {
        drawGlyph(canvas, canvas.dataset.char);
      });
    }

    async function ensureFontReady() {
      if (!state.fontReady) {
        state.fontReady = document.fonts.load(`${fontSize}px FanqieLocal`).then(() => document.fonts.ready);
      }
      await state.fontReady;
    }

    function render() {
      const entries = filteredEntries();
      grid.innerHTML = entries.map((entry) => {
        const changed = state.changed.has(entry.codepoint) ? 'changed' : '';
        return `
          <div class="card ${changed}" data-codepoint="${entry.codepoint}">
            <div class="meta">
              <div>codepoint: ${entry.codepoint}</div>
              <div>unicode: ${entry.unicode}</div>
              <div>glyph: ${escapeHtml(entry.glyph_name)}</div>
            </div>
            <div class="glyph-row">
              <div class="glyph-box">
                <canvas class="glyph-canvas" data-char="${escapeHtml(entry.char)}"></canvas>
              </div>
              <div class="editor">
                <label>OCR / 修正结果</label>
                <input data-role="ocr" data-codepoint="${entry.codepoint}" value="${escapeHtml(entry.ocr_text || '')}" maxlength="8">
                <div class="actions">
                  <button data-role="ocr-one" data-codepoint="${entry.codepoint}">OCR 当前字形</button>
                  <button data-role="clear" data-codepoint="${entry.codepoint}">清空</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
      renderVisibleCanvases();
      setStatus(`共 ${state.entries.length} 项，当前显示 ${entries.length} 项，已修改 ${state.changed.size} 项`);
    }

    async function loadEntries() {
      const response = await fetch('/api/entries');
      state.entries = await response.json();
      render();
    }

    function updateEntry(codepoint, value) {
      const entry = state.entries.find((item) => item.codepoint === codepoint);
      if (!entry) {
        return;
      }
      entry.ocr_text = value;
      state.changed.add(codepoint);
      const card = document.querySelector(`[data-codepoint="${codepoint}"]`);
      if (card) {
        card.classList.add('changed');
      }
      setStatus(`共 ${state.entries.length} 项，当前显示 ${filteredEntries().length} 项，已修改 ${state.changed.size} 项`);
    }

    async function glyphImageData(char) {
      await ensureFontReady();
      const canvas = document.createElement('canvas');
      drawGlyph(canvas, char, exportCanvasSize, 180);
      return canvas.toDataURL('image/png');
    }

    async function postOcr(char, codepoint) {
      const image = await glyphImageData(char);
      const response = await fetch('/api/ocr-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codepoint, image }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'OCR 失败');
      }
      return result;
    }

    async function ocrOne(codepoint) {
      const entry = state.entries.find((item) => item.codepoint === codepoint);
      if (!entry) {
        throw new Error(`未找到 ${codepoint}`);
      }
      setStatus(`正在 OCR ${codepoint} ...`);
      const result = await postOcr(entry.char, codepoint);
      updateEntry(codepoint, result.ocr_text || '');
      const input = document.querySelector(`input[data-role="ocr"][data-codepoint="${codepoint}"]`);
      if (input) {
        input.value = result.ocr_text || '';
      }
      setStatus(`OCR 完成 ${codepoint}`);
    }

    async function ocrAll() {
      await ensureFontReady();
      setStatus('正在批量 OCR，请稍候...');
      for (let index = 0; index < state.entries.length; index += 1) {
        const entry = state.entries[index];
        const result = await postOcr(entry.char, entry.codepoint);
        entry.ocr_text = result.ocr_text || '';
        state.changed.add(entry.codepoint);
        if ((index + 1) % 20 === 0 || index + 1 === state.entries.length) {
          setStatus(`批量 OCR 进行中 ${index + 1}/${state.entries.length}`);
        }
      }
      render();
      setStatus(`批量 OCR 完成，共更新 ${state.entries.length} 项`);
    }

    async function saveEntries() {
      setStatus('正在保存 cmap.json ...');
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: state.entries }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || '保存失败');
      }
      state.changed.clear();
      document.querySelectorAll('.card.changed').forEach((card) => card.classList.remove('changed'));
      setStatus(`已保存到 ${result.path}`);
    }

    function exportJson() {
      const data = Object.fromEntries(state.entries.map((entry) => [entry.codepoint, {
        char: entry.char,
        unicode: entry.unicode,
        glyph_name: entry.glyph_name,
        ocr_text: entry.ocr_text,
      }]));
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cmap-preview.json';
      a.click();
      URL.revokeObjectURL(url);
    }

    document.getElementById('ocr-all').addEventListener('click', async () => {
      try {
        await ocrAll();
      } catch (error) {
        setStatus(error.message);
      }
    });

    document.getElementById('save').addEventListener('click', async () => {
      try {
        await saveEntries();
      } catch (error) {
        setStatus(error.message);
      }
    });

    document.getElementById('export').addEventListener('click', exportJson);

    document.getElementById('show-empty').addEventListener('change', (event) => {
      state.onlyEmpty = event.target.checked;
      render();
    });

    document.getElementById('search').addEventListener('input', (event) => {
      state.search = event.target.value;
      render();
    });

    grid.addEventListener('input', (event) => {
      if (event.target.dataset.role !== 'ocr') {
        return;
      }
      updateEntry(event.target.dataset.codepoint, event.target.value);
    });

    grid.addEventListener('click', async (event) => {
      const role = event.target.dataset.role;
      const codepoint = event.target.dataset.codepoint;
      if (!role || !codepoint) {
        return;
      }
      if (role === 'clear') {
        updateEntry(codepoint, '');
        const input = document.querySelector(`input[data-role="ocr"][data-codepoint="${codepoint}"]`);
        if (input) {
          input.value = '';
        }
        return;
      }
      if (role === 'ocr-one') {
        try {
          await ocrOne(codepoint);
        } catch (error) {
          setStatus(error.message);
        }
      }
    });

    ensureFontReady()
      .then(loadEntries)
      .catch((error) => {
        setStatus(error.message);
      });
  </script>
</body>
</html>
"""
def load_font_entries():
    font = TTFont(str(FONT_PATH))
    cmap = font.getBestCmap()
    saved = {}
    if CMAP_PATH.exists():
        saved = json.loads(CMAP_PATH.read_text(encoding='utf-8'))

    entries = []
    for codepoint, glyph_name in sorted(cmap.items()):
        if not 0xE000 <= codepoint <= 0xF8FF:
            continue
        saved_entry = saved.get(str(codepoint), {})
        entries.append({
            'codepoint': str(codepoint),
            'char': chr(codepoint),
            'unicode': f'U+{codepoint:04X}',
            'glyph_name': glyph_name,
            'ocr_text': saved_entry.get('ocr_text', ''),
        })
    return entries


def ocr_image_bytes(ocr, image_data_url):
    if ',' not in image_data_url:
        raise ValueError('invalid image data url')
    _, encoded = image_data_url.split(',', 1)
    image_bytes = base64.b64decode(encoded)
    result = ocr.classification(image_bytes)
    return result.strip()


def save_entries(entries):
    data = {
        entry['codepoint']: {
            'char': entry['char'],
            'unicode': entry['unicode'],
            'glyph_name': entry['glyph_name'],
            'ocr_text': entry['ocr_text'],
        }
        for entry in entries
    }
    CMAP_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


class Handler(BaseHTTPRequestHandler):
    ocr = ddddocr.DdddOcr(show_ad=False)

    def _send(self, body, status=HTTPStatus.OK, content_type='text/plain; charset=utf-8'):
        if isinstance(body, str):
            body = body.encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_json(self, payload, status=HTTPStatus.OK):
        self._send(json.dumps(payload, ensure_ascii=False).encode('utf-8'), status, 'application/json; charset=utf-8')

    def _read_json(self):
        length = int(self.headers.get('Content-Length', '0'))
        if length == 0:
            return {}
        return json.loads(self.rfile.read(length).decode('utf-8'))

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/':
            self._send(HTML, content_type='text/html; charset=utf-8')
            return
        if parsed.path == '/font.woff2':
            self._send(FONT_PATH.read_bytes(), content_type='font/woff2')
            return
        if parsed.path == '/api/entries':
            self._send_json(load_font_entries())
            return
        self._send('Not Found', status=HTTPStatus.NOT_FOUND)

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            if parsed.path == '/api/ocr-image':
                payload = self._read_json()
                codepoint = str(payload['codepoint'])
                text = ocr_image_bytes(self.ocr, payload['image'])
                if len(text) != 1:
                    text = ''
                self._send_json({'codepoint': codepoint, 'ocr_text': text})
                return
            if parsed.path == '/api/save':
                payload = self._read_json()
                entries = payload['entries']
                save_entries(entries)
                self._send_json({'ok': True, 'path': str(CMAP_PATH)})
                return
        except Exception as exc:
            self._send_json({'error': str(exc)}, status=HTTPStatus.BAD_REQUEST)
            return
        self._send('Not Found', status=HTTPStatus.NOT_FOUND)

    def log_message(self, format, *args):
        return


def main():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'Open http://{HOST}:{PORT}')
    server.serve_forever()


if __name__ == '__main__':
    main()