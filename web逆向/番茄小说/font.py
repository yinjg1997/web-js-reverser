import io
import json
from pathlib import Path

import ddddocr
import requests
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw

FONT_URL = "https://lf6-awef.bytetos.com/obj/awesome-font/c/e26e946d8b2ccb7.woff2"
FONT_FILE_NAME = "font.woff2"
CMAP_FILE_NAME = "cmap.json"
GLYPH_DIR_NAME = "glyphs"
PADDING = 40
LINE_WIDTH = 3
TARGET_CODEPOINT_START = 0xE000
TARGET_CODEPOINT_END = 0xF8FF


def load_font_from_url(url):
    """下载远程字体并加载为 TTFont 对象。"""
    response = requests.get(url)
    response.raise_for_status()
    return response.content, TTFont(io.BytesIO(response.content))


def save_font_file(font_bytes, output_path):
    """持久化保存下载到的字体文件。"""
    output_path.write_bytes(font_bytes)


def get_target_cmap(font):
    """筛出私有区字符对应的 cmap 项，作为待解码目标。"""
    cmap = font.getBestCmap()
    return {
        codepoint: glyph_name
        for codepoint, glyph_name in cmap.items()
        if TARGET_CODEPOINT_START <= codepoint <= TARGET_CODEPOINT_END
    }


def get_glyph_bounds(glyph_set, glyph):
    """计算 glyph 的边界框，用于确定渲染范围。"""
    bounds_pen = BoundsPen(glyph_set)
    glyph.draw(bounds_pen)
    return bounds_pen.bounds


def get_glyph_commands(glyph):
    """记录 glyph 的绘制命令，供后续转成图片。"""
    recording_pen = RecordingPen()
    glyph.draw(recording_pen)
    return recording_pen.value


def render_glyph_image(commands, bounds, output_path, padding=PADDING, line_width=LINE_WIDTH):
    """根据绘制命令把 glyph 轮廓渲染成预览图片。"""
    x_min, y_min, x_max, y_max = bounds
    width = int(x_max - x_min) + padding * 2
    height = int(y_max - y_min) + padding * 2
    baseline = padding + y_max

    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)

    current_path = []
    for command, points in commands:
        converted = [(padding + (x - x_min), baseline - y) for x, y in points]
        if command == "moveTo":
            current_path = [converted[0]]
        elif command in {"lineTo", "qCurveTo", "curveTo"}:
            # 这里先用折线近似轮廓，便于快速做 OCR 和肉眼确认。
            current_path.extend(converted)
        elif command == "closePath":
            if len(current_path) > 1:
                draw.line(current_path + [current_path[0]], fill="black", width=line_width)
            current_path = []

    image.save(output_path)


def ocr_image(ocr, image_path):
    """识别单个 glyph 图片中的字符。"""
    image_bytes = image_path.read_bytes()
    result = ocr.classification(image_bytes)
    return result.strip()


def build_decode_map(font, glyph_dir):
    """批量渲染并识别 cmap 中的私有区字符，生成解码映射。"""
    glyph_dir.mkdir(exist_ok=True)
    glyph_set = font.getGlyphSet()
    target_cmap = get_target_cmap(font)
    ocr = ddddocr.DdddOcr(show_ad=False)
    decode_map = {}

    for codepoint, glyph_name in target_cmap.items():
        glyph = glyph_set[glyph_name]
        bounds = get_glyph_bounds(glyph_set, glyph)
        if not bounds:
            continue

        commands = get_glyph_commands(glyph)
        char = chr(codepoint)
        # {codepoint:04X} 按十六进制大写输出, 最少宽度 4 位, 不够 4 位时左侧补 0
        image_name = f"codepoint_{codepoint}_U+{codepoint:04X}_{glyph_name}.png"
        image_path = glyph_dir / image_name
        render_glyph_image(commands, bounds, image_path)

        text = ocr_image(ocr, image_path)
        decode_map[str(codepoint)] = {
            "char": char,
            "glyph_name": glyph_name,
            "ocr_text": text if len(text) == 1 else "",
            "image": image_name,
        }

    return decode_map


def save_cmap(decode_map, output_path):
    """持久化保存 OCR 解码结果，供后续文本替换使用。"""
    output_path.write_text(json.dumps(decode_map, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    """下载字体、OCR 识别私有区字符，并持久化保存解码映射。"""
    base_dir = Path(__file__).parent
    # print('base_dir :: ', base_dir)
    font_path = base_dir / FONT_FILE_NAME
    cmap_path = base_dir / CMAP_FILE_NAME
    glyph_dir = base_dir / GLYPH_DIR_NAME

    font_bytes, font = load_font_from_url(FONT_URL)
    save_font_file(font_bytes, font_path)

    decode_map = build_decode_map(font, glyph_dir)
    save_cmap(decode_map, cmap_path)

    print(font_path)
    print(cmap_path)
    print(f"decoded={sum(1 for value in decode_map.values() if value['ocr_text'])} total={len(decode_map)}")


if __name__ == "__main__":
    main()
