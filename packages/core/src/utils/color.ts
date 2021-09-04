import { default as ColorLib } from 'color'
import convert from 'color-convert'

export type ColorParam = ColorLib | string | ArrayLike<number> | number | Record<string, any>

export type ColorModel = keyof typeof convert

/** @deprecated */
export interface ColorColor<T extends ColorParam> extends ColorLib<T> {
  model?: ColorModel
  isColor?: (value: string) => boolean
  isHexadecimal?: (strOrCode: string | number) => boolean
  isHexColor?: (str: string) => boolean
}

type Color<T extends ColorParam> = ColorLib<T> & {
  model?: ColorModel
  isColor?: (value: string) => boolean
  isHexadecimal?: (strOrCode: string | number) => boolean
  isHexColor?: (str: string) => boolean
}

/**
 * Duplicates `ColorConstructor` in `Color` library.
 */
/* eslint-disable @typescript-eslint/no-redeclare */
function Color<T extends ColorParam = ColorParam>(obj: T, model?: ColorModel): Color<T> {
  const _Color = ColorLib(obj, model) as Color<T>

  return _Color as Color<T>
}

/** Static method for checking the validity of a color value. */
Color.isColor = (value: string): boolean => {
  try {
    const s = new Option().style

    s.color = String(value)

    return s.color !== ''
  } catch (err) {
    console.error(`ColorError: ${err}`)

    return false
  }
}

/**
 * Check if the given character code, or the character code at the first
 * character, is hexadecimal.
 * @param character
 */
Color.isHexadecimal = (strOrCode: string | number): boolean => {
  const code = typeof strOrCode === 'string' ? strOrCode.charCodeAt(0) : strOrCode

  return (
    (code >= 97 /* a */ && code <= 102) /* z */ ||
    (code >= 65 /* A */ && code <= 70) /* Z */ ||
    (code >= 48 /* A */ && code <= 57) /* Z */
  )
}

Color.isHexColor = (value: string): boolean => {
  console.log('isHexColor', value)
  const hexValue = value.slice(1)

  return value.startsWith('#') && hexValue.length === 6 && Color.isHexadecimal(hexValue)
}

export { Color }

function clamp(num: number) {
  return Math.max(Math.min(num, 255), 0)
}

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => Color<T>

/**
 * Create a blend mode function
 */
export function blend(channelFn: (a: number, b: number) => number): BlendFn {
  return function <T extends ColorParam = ColorParam>(source: T, destination: T): Color<T> {
    const s = Color(source).object()
    const d = Color(destination).object()
    const rgb = Object.entries(s).reduce((acc, [k, v]) => {
      acc[k] = clamp(channelFn(v, d[k]))

      return acc
    }, {}) as T

    return Color(rgb)
  }
}

const multiplyChannel = (a: number, b: number): number => a * b

/**
 * Apply a `multiply` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingmultiply
 */
export const multiply = blend(multiplyChannel) as BlendFn

const screenChannel = (a: number, b: number): number => a + b - a * b

/**
 * Apply the `screen` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 */
export const screen = blend(screenChannel) as BlendFn
