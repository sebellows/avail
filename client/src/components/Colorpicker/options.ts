import convert from 'color-convert'
import { Color, ColorParam, ColorModel } from '../../core/style/libs/color'
import { capitalize } from '../../core/utils'

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
}

export type ColorpickerPreviewPosition = 'left' | 'right'

export interface ColorpickerBackgroundMap<T> {
  image: T
  position: T
  size: T
  repeat: T
  origin: T
}

interface ColorOptions {
  context?: any
  channels?: {
    r: number // red [0-255]
    g: number // green [0-255]
    b: number // blue [0-255]
    h: number // hue [0-360]
    s: number // saturation [0-100]
    v: number // value (brightness) [0-100]
    a: number // alpha (opacity) [0.0 - 1.0]
  }
  crosshairRef?: HTMLElement
  previewRef?: HTMLElement
  preview?: {
    // (px) space between color preview and content of the previewRef
    padding?: number
    // 'left' | 'right' - position of the color preview in previewRef
    position?: ColorpickerPreviewPosition
    // (px) width of the color preview displayed in previewRef
    size?: number
    separator?: string[]
  }
  width?: number
  height?: number
  sliderSize?: number
  chessboard?: {
    squares?: string[]
  }
}

const DefaultColorOptions: ColorOptions = {
  channels: {
    r: 255, // red [0-255]
    g: 255, // green [0-255]
    b: 255, // blue [0-255]
    h: 0, // hue [0-360]
    s: 0, // saturation [0-100]
    v: 100, // value (brightness) [0-100]
    a: 1.0, // alpha (opacity) [0.0 - 1.0]
  },
  preview: {
    position: 'left',
    padding: 8,
    separator: ['rgba(255,255,255,.65)', 'rgba(128,128,128,.65)'],
    size: 32,
  },
  crosshairRef: null,
  previewRef: null,
  width: 340,
  height: 180,
  sliderSize: 16,
  chessboard: {
    squares: ['#666666', '#999999'],
  },
}

export const colour = <T extends ColorParam>(
  _color: string | Color<T>,
  options: ColorOptions = {},
) => {
  let {
    channels,
    preview: {
      padding: previewPadding,
      position: previewPosition,
      separator: previewSeparator,
      size: previewSize,
    },
    previewRef,
    crosshairRef,
    width,
    height,
    sliderSize,
    chessboard,
  } = { ...DefaultColorOptions, ...options }

  let color = typeof _color == 'string' ? Color(_color) : _color

  // Canvas scaling for retina displays
  //
  // adapted from https://www.html5rocks.com/en/tutorials/canvas/hidpi/
  //
  function scaleCanvasForHighDPR(canvas: HTMLCanvasElement) {
    let dpr = window.devicePixelRatio || 1
    canvas.width *= dpr
    canvas.height *= dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
  }

  function genColorPreviewCanvas(
    color?: string,
    separatorPos: ColorpickerPreviewPosition = 'left',
    specWidth = 64,
    scaleForHighDPR = false,
  ): { canvas: HTMLCanvasElement; width: number; height: number } {
    let sepW = Math.round(previewSeparator.length)
    let sqSize = 8
    let sqColor1 = chessboard.squares[0]
    let sqColor2 = chessboard.squares[1]

    let cWidth = specWidth ? specWidth : sqSize * 2
    let cHeight = sqSize * 2

    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    canvas.width = cWidth
    canvas.height = cHeight
    if (scaleForHighDPR) {
      scaleCanvasForHighDPR(canvas)
    }

    // transparency chessboard - background
    ctx.fillStyle = sqColor1
    ctx.fillRect(0, 0, cWidth, cHeight)

    // transparency chessboard - squares
    ctx.fillStyle = sqColor2
    for (let x = 0; x < cWidth; x += sqSize * 2) {
      ctx.fillRect(x, 0, sqSize, sqSize)
      ctx.fillRect(x + sqSize, sqSize, sqSize, sqSize)
    }

    if (color) {
      // actual color in foreground
      ctx.fillStyle = color
      ctx.fillRect(0, 0, cWidth, cHeight)
    }

    let start = null
    switch (separatorPos) {
      case 'left':
        start = 0
        ctx.clearRect(0, 0, sepW / 2, cHeight)
        break
      case 'right':
        start = cWidth - sepW
        ctx.clearRect(cWidth - sepW / 2, 0, sepW / 2, cHeight)
        break
    }
    if (start !== null) {
      ctx.lineWidth = 1
      for (let i = 0; i < previewSeparator.length; i += 1) {
        ctx.beginPath()
        ctx.strokeStyle = previewSeparator[i]
        ctx.moveTo(0.5 + start + i, 0)
        ctx.lineTo(0.5 + start + i, cHeight)
        ctx.stroke()
      }
    }

    return {
      canvas,
      width: cWidth,
      height: cHeight,
    }
  }

  // if position or width is not set => fill the entire element (0%-100%)
  function genColorPreviewGradient(
    color?: string,
    position?: ColorpickerPreviewPosition,
    width?: number,
  ) {
    color = color || 'rgba(0,0,0,0)'

    let params = []

    if (position && width) {
      params = [
        `to ${{ left: 'right', right: 'left' }[position]}`,
        `${color} 0%`,
        `${color} ${width}px`,
        `rgba(0,0,0,0) ${width + 1}px`,
        `rgba(0,0,0,0) 100%`,
      ]
    } else {
      params = ['to right', `${color} 0%`, `${color} 100%`]
    }

    return ['', '-webkit-'].reduce(
      (acc, prefix) => (acc += `${prefix}linear-gradient(${params.join(', ')});`),
    )
  }

  function createSliderGradient(canvasRef: HTMLCanvasElement) {
    const sliderObj = {
      elm: null,
      draw: null,
    }

    const ctx = canvasRef.getContext('2d')

    const drawFn = function (width: number, height: number, color1: string, color2: string) {
      canvasRef.width = width
      canvasRef.height = height

      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)

      var grad = ctx.createLinearGradient(0, 0, 0, canvasRef.height)
      grad.addColorStop(0, color1)
      grad.addColorStop(1, color2)

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvasRef.width, canvasRef.height)
    }

    sliderObj.elm = canvasRef
    sliderObj.draw = drawFn

    return sliderObj
  }

  function createASliderGradient(canvasRef: HTMLCanvasElement) {
    const sliderObj = {
      elm: null,
      draw: null,
    }

    const ctx = canvasRef.getContext('2d')

    const drawFn = function (width: number, height: number, acolor: string) {
      canvasRef.width = width
      canvasRef.height = height

      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)

      let sqSize = canvasRef.width / 2

      // dark gray background
      ctx.fillStyle = chessboard.squares[0]
      ctx.fillRect(0, 0, canvasRef.width, canvasRef.height)

      for (let y = 0; y < canvasRef.height; y += sqSize * 2) {
        // light gray squares
        ctx.fillStyle = chessboard.squares[1]
        ctx.fillRect(0, y, sqSize, sqSize)
        ctx.fillRect(sqSize, y + sqSize, sqSize, sqSize)
      }

      const grad = ctx.createLinearGradient(0, 0, 0, canvasRef.height)
      grad.addColorStop(0, acolor)
      grad.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvasRef.width, canvasRef.height)
    }

    sliderObj.elm = canvasRef
    sliderObj.draw = drawFn

    return sliderObj
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
        throw new Error('Invalid value for channel name: ' + name)
      }

      if (value === undefined) {
        // getting channel value
        if (!channels.hasOwnProperty(name.toLowerCase())) {
          console.warn('Getting unknown channel: ' + name)
          return false
        }
        return channels[name.toLowerCase()]
      } else {
        // setting channel value
        let res = ''
        switch (name.toLowerCase()) {
          case 'r':
            res = color.red(value).toString()
            break
          case 'g':
            res = color.green(value).toString()
            break
          case 'b':
            res = color.blue(value).toString()
            break
          case 'h':
            res = color.hue(value).toString()
            break
          case 's':
            res = color.saturationv(value).toString()
            break
          case 'v':
            res = color.value(value).toString()
            break
          case 'a':
            res = color.alpha(value).toString()
            break
          default:
            console.warn(`Setting unknown channel: ${name}`)
            return false
        }
        if (res) {
          // redraw(); // immediately redraws the picker, if it's displayed
          return true
        }
      }

      return false
    },

    /**
     * `getFormat()`
     * Returns the color format currently in effect.
     */
    getFormat: function (): ColorModel {
      return color.model
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
      return color
    },

    // Returns a data URL of a gray chessboard image that indicates transparency
    background: function (color: string) {
      let backgrounds = []

      // CSS gradient for background color preview
      backgrounds.push(genColorPreviewGradient(color))

      // data URL of generated PNG image with a gray transparency chessboard
      let preview = genColorPreviewCanvas()
      backgrounds.push([`url('${preview.canvas.toDataURL()}')`, 'left top', 'repeat'].join(' '))

      return backgrounds.join(', ')
    },

    chessboard: function (color?: string) {
      let preview = genColorPreviewCanvas(color)
      return preview.canvas.toDataURL()
    },

    setPreviewElementBg: function (bgcolor?: string) {
      if (!previewRef) {
        return
      }

      let backgrounds: ColorpickerBackgroundMap<string>[] = []

      if (!bgcolor) {
        // there is no color preview to display -> let's remove any previous background image
        backgrounds.push({
          image: 'none',
          position: 'left top',
          size: 'auto',
          repeat: 'no-repeat',
          origin: 'padding-box',
        })
      } else {
        // CSS gradient for background color preview
        backgrounds.push({
          image: genColorPreviewGradient(
            bgcolor,
            previewPosition,
            previewSize ? previewSize - previewSeparator.length : null,
          ),
          position: 'left top',
          size: 'auto',
          repeat: previewPosition ? 'repeat-y' : 'repeat',
          origin: 'padding-box',
        })

        const position = previewPosition
          ? { left: 'right', right: 'left' }[previewPosition]
          : 'left'
        // data URL of generated PNG image with a gray transparency chessboard
        const { canvas, width, height } = genColorPreviewCanvas(
          'rgba(0,0,0,0)',
          position as ColorpickerPreviewPosition,
          64,
          true,
        )
        backgrounds.push({
          image: `url(${canvas.toDataURL()})`,
          position: `${position} top`,
          size: `${width}px ${height}px`,
          repeat: position ? 'repeat-y' : 'repeat',
          origin: 'padding-box',
        })
      }

      const bgMap: ColorpickerBackgroundMap<string[]> = {
        image: [],
        position: [],
        size: [],
        repeat: [],
        origin: [],
      }
      const bg = backgrounds.reduce(
        (acc: ColorpickerBackgroundMap<string[]>, curr: ColorpickerBackgroundMap<string>) => {
          Object.entries(curr).forEach(([k, v]) => {
            acc[k].push(v)
          })
          return acc
        },
        bgMap,
      ) as ColorpickerBackgroundMap<string[]>

      // set previewRef's background-images
      Object.entries(bg).forEach(([prop, value]) => {
        previewRef.style[`background${capitalize(prop)}`] = value.join(', ')
      })

      // set/restore previewRef's padding
      if (previewPosition) {
        previewRef.style[`padding${capitalize(previewPosition)}`] = `${
          previewSize + previewPadding
        }px`
      }
    },

    redrawPad: function (yChannel = 's', canvasRef: HTMLCanvasElement) {
      // redraw the pad pointer
      let x = Math.round((channels.h / 360) * (width - 1))
      let y = Math.round((1 - channels[yChannel] / 100) * (height - 1))
      // var crossOuterSize = (2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize);
      let ofs = -8
      const _crosshairRef = crosshairRef || document.querySelector('colorpicker-control-crosshair')
      _crosshairRef.style.left = `${x + ofs}px`
      _crosshairRef.style.top = `${y + ofs}px`
      const draw = createSliderGradient(canvasRef).draw

      let color1 = convert.hsv.rgb([channels.h, 100, channels.v]).toString()
      let color2 = convert.hsv.rgb([channels.h, 0, channels.v]).toString()

      // redraw the slider
      switch (yChannel) {
        case 's':
          draw(sliderSize, height, color1, color2)
          break
        case 'v':
          color1 = convert.hsv.rgb([channels.h, channels.s, 100]).toString()
          color2 = 'rgb(0, 0, 0)'
          draw(sliderSize, height, color1, color2)
          break
      }

      // redraw the alpha slider
      createASliderGradient(canvasRef).draw(sliderSize, height, Color(color).hex())
    },

    // redrawSld: function (sldChannel) {
    //   if (sldChannel) {
    //     // redraw the slider pointer
    //     var y = Math.round((1 - channels[sldChannel] / 100) * (height - 1));
    //     jsc.picker.sldPtrOB.style.top =
    //       y -
    //       (2 * THIS.pointerBorderWidth + THIS.pointerThickness) -
    //       Math.floor(jsc.pub.sliderInnerSpace / 2) +
    //       'px';
    //   }

    //   // redraw the alpha slider
    //   jsc.picker.asldGrad.draw(THIS.sliderSize, THIS.height, THIS.toHEXString());
    // }

    // function redrawASld() {
    //   var y = Math.round((1 - THIS.channels.a) * (THIS.height - 1));
    //   jsc.picker.asldPtrOB.style.top =
    //     y -
    //     (2 * THIS.pointerBorderWidth + THIS.pointerThickness) -
    //     Math.floor(jsc.pub.sliderInnerSpace / 2) +
    //     'px';
    // }
  }
}
