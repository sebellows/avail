import { Color, ColorParam } from '../../utils'
import { BlendFn } from './types'

function clamp(num: number) {
  return Math.max(Math.min(num, 255), 0)
}

/**
 * Create a blend mode function
 */
function blend(channelFn: (a: number, b: number) => number): BlendFn {
  return function <T extends ColorParam = ColorParam>(source: T, destination: T): Color<T> {
    const s = Color(source).rgb().object()
    const d = Color(destination).rgb().object()
    const rgb = Object.entries(s).reduce((acc, [k, v]) => {
      // const val = channelFn(v / 255, d[k] / 255)
      acc[k] = Math.round(clamp(channelFn(v / 255, d[k] / 255)) * 255)
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
const multiply = blend(multiplyChannel) as BlendFn

const screenChannel = (a: number, b: number): number => a + b - a * b

/**
 * Apply the `screen` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 */
const screen = blend(screenChannel) as BlendFn

export { blend, multiply, screen }
