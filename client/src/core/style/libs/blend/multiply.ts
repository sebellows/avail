import { blend, BlendFn } from './blend'

const multiplyChannel = (a: number, b: number): number => a * b

/**
 * Apply a `multiply` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingmultiply
 */
export const multiply = blend(multiplyChannel) as BlendFn
