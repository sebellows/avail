function ColorUtilFactory() {
  function normalizeHex(color: string) {
    const hex = color.startsWith('#') ? color.substr(1) : color;
    if (hex.length / 3 === 1) {
      let [r, g, b] = hex;
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return color;
  }

  /**
   * Converts hex value to RGBA string
   * @param color {string}
   * @returns {string}
   */
  function _getRgb(color: string): { r: number; g: number; b: number } {
    let r, g, b;

    if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      const [r2, g2, b2] = color
        .match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
        .slice(1);
      r = r2;
      g = g2;
      b = b2;
    } else {
      const hex = color.startsWith('#') ? color.substr(1) : color;
      const dig = hex.length / 3;
      r = hex.substr(0, dig);
      g = hex.substr(dig, dig);
      b = hex.substr(dig * 2);
      if (dig === 1) {
        r += r;
        g += g;
        b += b;
      }
    }
    return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
  }

  /**
   * Converts hex value to RGBA string
   * @param color {string}
   * @returns {string}
   */
  function hexToRgb(color: string): string {
    return `rgb(${Object.values(_getRgb(color)).join(', ')})`;
  }

  /**
   * Converts hex value to RGBA string
   * @param color {string}
   * @returns {string}
   */
  function hexToRgba(color: string): string {
    return `rgba(${Object.values(_getRgb(color)).join(', ')}, 0.1)`;
  }

  /**
   * Converts rgba value to hex string
   * @param {string} color
   * @returns {string}
   */
  function rgbaToHex(color: string): string {
    const _colors = color
      .match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
      .slice(1);
    return (
      _colors?.reduce(
        (hex, hue) => (hex += parseInt(hue, 10).toString(16).slice(-2).padStart(2, '0')),
        '#',
      ) ?? ''
    );
  }

  /**
   * Converts an RGB color to RGBA
   * @param {string} color
   * @returns {string}
   */
  function rgbToRgba(color: string): string {
    return color.replace(')', ', 0.1)').replace('(', 'a(');
  }

  /**
   * Converts an RGBA color to RGB
   * @param {string} color
   * @returns {string}
   */
  function rgbaToRgb(color: string): string {
    return color?.replace('rgba', 'rgb').replace(/,[^),]+\)/, ')') ?? 'rgb(0,0,0)';
  }

  function _getHSB(color: string) {
    const { r, g, b } = _getRgb(color);
    return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  }

  function isLight(color: string, limit = 127.5): boolean {
    return _getHSB(color) > limit;
  }

  function isDark(color: string, limit = 127.5): boolean {
    return _getHSB(color) <= limit;
  }

  return {
    normalizeHex,
    hexToRgb,
    rgbaToHex,
    hexToRgba,
    rgbToRgba,
    rgbaToRgb,
    isLight,
    isDark,
  };
}

export const ColorUtil = ColorUtilFactory();
