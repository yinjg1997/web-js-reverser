import io
from pathlib import Path

import requests
from fontTools.ttLib import TTFont

FONT_URL = "https://lf6-awef.bytetos.com/obj/awesome-font/c/e26e946d8b2ccb7.woff2"
FONT_FILE_NAME = "font.woff2"

def load_font_from_url(url):
    """下载远程字体并加载为 TTFont 对象。"""
    response = requests.get(url)
    response.raise_for_status()
    return response.content, TTFont(io.BytesIO(response.content))

def save_font_file(font_bytes, output_path):
    """持久化保存下载到的字体文件。"""
    output_path.write_bytes(font_bytes)


def main():
    """下载字体、OCR 识别私有区字符，并持久化保存解码映射。"""
    base_dir = Path(__file__).parent
    # print('base_dir :: ', base_dir)
    font_path = base_dir / FONT_FILE_NAME
    font_bytes, font = load_font_from_url(FONT_URL)
    save_font_file(font_bytes, font_path)


if __name__ == "__main__":
    main()
