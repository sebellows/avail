import { blend, BlendFn } from './blend'

const screenChannel = (a: number, b: number): number => a + b - a * b

/**
 * Apply the `screen` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 */
export const screen = blend(screenChannel) as BlendFn
