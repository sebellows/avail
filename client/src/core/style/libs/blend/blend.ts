import { Color, ColorParam } from '../color'

function clamp(num: number) {
  return Math.max(Math.min(num, 255), 0)
}

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => Color<T>

/**
 * Create a blend mode function
 */
export function blend(channelFn: (a: number, b: number) => number): BlendFn {
  return function <T extends ColorParam = ColorParam>(source: T, destination: T): Color<T> {
    const s = Color(source).unitObject()
    const d = Color(destination).unitObject()
    const rgb = Object.entries(s).reduce((acc, [k, v]) => {
      acc[k] = clamp(channelFn(v, d[k]))
      return acc
    }, {}) as T
    return Color(rgb)
  }
}
