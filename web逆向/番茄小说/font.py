import io
from pathlib import Path

import requests
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw

FONT_URL = "https://lf6-awef.bytetos.com/obj/awesome-font/c/e26e946d8b2ccb7.woff2"
SAMPLE_CHAR = ""
OUTPUT_NAME = "glyph_preview.png"
PADDING = 40
LINE_WIDTH = 3


def load_font_from_url(url):
    """下载远程字体并加载为 TTFont 对象。"""
    response = requests.get(url)
    return TTFont(io.BytesIO(response.content))


def get_glyph(font, char):
    """根据字符从 cmap 中取出对应的 glyph 对象。"""
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    glyph_name = cmap[ord(char)]
    return glyph_set, glyph_name, glyph_set[glyph_name]


def get_glyph_bounds(glyph_set, glyph):
    """计算 glyph 的边界框，用于确定渲染范围。"""
    bounds_pen = BoundsPen(glyph_set)
    glyph.draw(bounds_pen)
    return bounds_pen.bounds


def get_glyph_svg_path(glyph_set, glyph):
    """导出 glyph 的 SVG 路径命令，便于查看原始轮廓数据。"""
    svg_pen = SVGPathPen(glyph_set)
    glyph.draw(svg_pen)
    return svg_pen.getCommands()


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
            # 这里先用折线近似轮廓，便于快速肉眼确认字形。
            current_path.extend(converted)
        elif command == "closePath":
            if len(current_path) > 1:
                draw.line(current_path + [current_path[0]], fill="black", width=line_width)
            current_path = []

    image.save(output_path)


def main():
    """加载示例字体字符并输出其轮廓预览。"""
    font = load_font_from_url(FONT_URL)
    glyph_set, glyph_name, glyph = get_glyph(font, SAMPLE_CHAR)
    bounds = get_glyph_bounds(glyph_set, glyph)
    svg_path = get_glyph_svg_path(glyph_set, glyph)
    commands = get_glyph_commands(glyph)
    output_path = Path(__file__).with_name(OUTPUT_NAME)

    print(f"char={SAMPLE_CHAR} codepoint={ord(SAMPLE_CHAR)} glyph={glyph_name} bounds={bounds}")
    print(svg_path[:500])
    render_glyph_image(commands, bounds, output_path)
    print(output_path)


if __name__ == "__main__":
    main()
