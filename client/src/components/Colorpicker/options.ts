import { Color, ColorColor, ColorParam, ColorModel } from '../../core/utils/color';
import { capitalize } from '../../core/utils';

export const COLOR_OPTIONS = {
  /**
   * Formatting options:
   * 'auto' - automatically detect format from the initial color value and keep it in effect
   * 'any' - user can enter a color code in any supported format
   * 'hex' - HEX color in standard CSS notation #RRGGBB
   * 'rgb' - RGB color in standard CSS notation rgb(r,g,b)
   * 'rgba' - RGBA color in standard CSS notation rgba(r,g,b,a)
   */
  format: 'auto',
  /**
   * Layout of the color picker controls:
   * 'HSV' - hue and saturation in the palette area, value (brightness) in the slider
   * 'HVS' - hue and value (brightness) in the palette area, saturation in the slider
   * 'HS' - hue and saturation in the palette area, no slider (experimental setting)
   * 'HV' - hue and value (brightness) in the palette area, no slider (experimental setting)
   */
  mode: 'HSV',
};

export type ColorpickerPreviewPosition = 'left' | 'right';

export interface ColorpickerBackgroundMap<T> {
  image: T;
  position: T;
  size: T;
  repeat: T;
  origin: T;
}

export const colour = <T extends ColorParam>(_color: string | ColorColor<T>) => {
  let previewElement = null;
  let previewPosition: ColorpickerPreviewPosition = 'left'; // 'left' | 'right' - position of the color preview in previewElement
  let previewSize = 32; // (px) width of the color preview displayed in previewElement
  let previewPadding = 8; // (px) space between color preview and content of the previewElement
  let previewSeparator = ['rgba(255,255,255,.65)', 'rgba(128,128,128,.65)'];

  let color = typeof _color == 'string' ? Color(_color) : _color;

  const channels = {
    r: 255, // red [0-255]
    g: 255, // green [0-255]
    b: 255, // blue [0-255]
    h: 0, // hue [0-360]
    s: 0, // saturation [0-100]
    v: 100, // value (brightness) [0-100]
    a: 1.0, // alpha (opacity) [0.0 - 1.0]
  };

  // Canvas scaling for retina displays
  //
  // adapted from https://www.html5rocks.com/en/tutorials/canvas/hidpi/
  //
  function scaleCanvasForHighDPR(canvas: HTMLCanvasElement) {
    let dpr = window.devicePixelRatio || 1;
    canvas.width *= dpr;
    canvas.height *= dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }

  function genColorPreviewCanvas(
    color?: string,
    separatorPos: ColorpickerPreviewPosition = 'left',
    specWidth = 64,
    scaleForHighDPR = false,
  ): { canvas: HTMLCanvasElement; width: number; height: number } {
    let sepW = Math.round(previewSeparator.length);
    let sqSize = 8;
    let sqColor1 = '#666666';
    let sqColor2 = '#999999';

    let cWidth = specWidth ? specWidth : sqSize * 2;
    let cHeight = sqSize * 2;

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = cWidth;
    canvas.height = cHeight;
    if (scaleForHighDPR) {
      scaleCanvasForHighDPR(canvas);
    }

    // transparency chessboard - background
    ctx.fillStyle = sqColor1;
    ctx.fillRect(0, 0, cWidth, cHeight);

    // transparency chessboard - squares
    ctx.fillStyle = sqColor2;
    for (let x = 0; x < cWidth; x += sqSize * 2) {
      ctx.fillRect(x, 0, sqSize, sqSize);
      ctx.fillRect(x + sqSize, sqSize, sqSize, sqSize);
    }

    if (color) {
      // actual color in foreground
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, cWidth, cHeight);
    }

    let start = null;
    switch (separatorPos) {
      case 'left':
        start = 0;
        ctx.clearRect(0, 0, sepW / 2, cHeight);
        break;
      case 'right':
        start = cWidth - sepW;
        ctx.clearRect(cWidth - sepW / 2, 0, sepW / 2, cHeight);
        break;
    }
    if (start !== null) {
      ctx.lineWidth = 1;
      for (let i = 0; i < previewSeparator.length; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = previewSeparator[i];
        ctx.moveTo(0.5 + start + i, 0);
        ctx.lineTo(0.5 + start + i, cHeight);
        ctx.stroke();
      }
    }

    return {
      canvas,
      width: cWidth,
      height: cHeight,
    };
  }

  // if position or width is not set => fill the entire element (0%-100%)
  function genColorPreviewGradient(
    color?: string,
    position?: ColorpickerPreviewPosition,
    width?: number,
  ) {
    color = color || 'rgba(0,0,0,0)';

    let params = [];

    if (position && width) {
      params = [
        `to ${{ left: 'right', right: 'left' }[position]}`,
        `${color} 0%`,
        `${color} ${width}px`,
        `rgba(0,0,0,0) ${width + 1}px`,
        `rgba(0,0,0,0) 100%`,
      ];
    } else {
      params = ['to right', `${color} 0%`, `${color} 100%`];
    }

    return ['', '-webkit-'].reduce(
      (acc, prefix) => (acc += `${prefix}linear-gradient(${params.join(', ')});`),
    );
  }

  return {
    /**
     * Sets or gets value of a color channel.
     *
     * `channel(name)` - returns value of the specified color channel
     * `channel(name, value)` - sets value of the specified color channel, returns true if successful
     *
     * Available color channels and their value ranges:
     *
     * R - red (0–255)
     * G - green (0–255)
     * B - blue (0–255)
     * H - hue (0–360)
     * S - saturation (0–100)
     * V - value (brightness) (0–100)
     * A - alpha (opacity) (0.0–1.0)
     */
    channel: function (name: string, value?: number): number | boolean {
      if (typeof name !== 'string') {
        throw new Error('Invalid value for channel name: ' + name);
      }

      if (value === undefined) {
        // getting channel value
        if (!channels.hasOwnProperty(name.toLowerCase())) {
          console.warn('Getting unknown channel: ' + name);
          return false;
        }
        return channels[name.toLowerCase()];
      } else {
        // setting channel value
        let res = '';
        switch (name.toLowerCase()) {
          case 'r':
            res = color.red(value).toString();
            break;
          case 'g':
            res = color.green(value).toString();
            break;
          case 'b':
            res = color.blue(value).toString();
            break;
          case 'h':
            res = color.hue(value).toString();
            break;
          case 's':
            res = color.saturationv(value).toString();
            break;
          case 'v':
            res = color.value(value).toString();
            break;
          case 'a':
            res = color.alpha(value).toString();
            break;
          default:
            console.warn(`Setting unknown channel: ${name}`);
            return false;
        }
        if (res) {
          this.redraw(); // immediately redraws the picker, if it's displayed
          return true;
        }
      }

      return false;
    },

    /**
     * `getFormat()`
     * Returns the color format currently in effect.
     */
    getFormat: function (): ColorModel {
      return color.model;
    },

    /**
     * `toBackground()`
     * Returns a value for CSS background property containing current color rendered over
     * a gray chessboard pattern (to indicate a level of transparency).
     *
     * To preview the currently picked color as a background, you can use:
     *
     * element.style.background = picker.toBackground();
     */
    toBackground: function (color?: string): string {
      return color;
    },

    // Returns a data URL of a gray chessboard image that indicates transparency
    background: function (color: string) {
      let backgrounds = [];

      // CSS gradient for background color preview
      backgrounds.push(genColorPreviewGradient(color));

      // data URL of generated PNG image with a gray transparency chessboard
      let preview = genColorPreviewCanvas();
      backgrounds.push(
        ["url('" + preview.canvas.toDataURL() + "')", 'left top', 'repeat'].join(' '),
      );

      return backgrounds.join(', ');
    },

    chessboard: function (color?: string) {
      let preview = genColorPreviewCanvas(color);
      return preview.canvas.toDataURL();
    },

    setPreviewElementBg: function (color) {
      if (!previewElement) {
        return;
      }

      let backgrounds: ColorpickerBackgroundMap<string>[] = [];

      if (!color) {
        // there is no color preview to display -> let's remove any previous background image
        backgrounds.push({
          image: 'none',
          position: 'left top',
          size: 'auto',
          repeat: 'no-repeat',
          origin: 'padding-box',
        });
      } else {
        // CSS gradient for background color preview
        backgrounds.push({
          image: genColorPreviewGradient(
            color,
            previewPosition,
            previewSize ? previewSize - previewSeparator.length : null,
          ),
          position: 'left top',
          size: 'auto',
          repeat: previewPosition ? 'repeat-y' : 'repeat',
          origin: 'padding-box',
        });

        const position = previewPosition
          ? { left: 'right', right: 'left' }[previewPosition]
          : 'left';
        // data URL of generated PNG image with a gray transparency chessboard
        const { canvas, width, height } = genColorPreviewCanvas(
          'rgba(0,0,0,0)',
          position as ColorpickerPreviewPosition,
          64,
          true,
        );
        backgrounds.push({
          image: `url(${canvas.toDataURL()})`,
          position: `${position} top`,
          size: `${width}px ${height}px`,
          repeat: position ? 'repeat-y' : 'repeat',
          origin: 'padding-box',
        });
      }

      const bgMap: ColorpickerBackgroundMap<string[]> = {
        image: [],
        position: [],
        size: [],
        repeat: [],
        origin: [],
      };
      const bg = backgrounds.reduce(
        (acc: ColorpickerBackgroundMap<string[]>, curr: ColorpickerBackgroundMap<string>) => {
          Object.entries(curr).forEach(([k, v]) => {
            acc[k].push(v);
          });
          return acc;
        },
        bgMap,
      ) as ColorpickerBackgroundMap<string[]>;

      // set previewElement's background-images
      Object.entries(bg).forEach(([prop, value]) => {
        previewElement.style[`background${capitalize(prop)}`] = value.join(', ');
      });

      // set/restore previewElement's padding
      if (previewPosition) {
        previewElement.style[`padding${capitalize(previewPosition)}`] = `${
          previewSize + previewPadding
        }px`;
      }
    },
  };
};
