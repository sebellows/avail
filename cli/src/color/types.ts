import { NumberProp } from '@avail/core/src'
import ColorLib from 'color'
import convert from 'color-convert'

/**
 * `OpaqueColorValue` & `ColorValue` taken from react-native type definitions.
 */
declare const OpaqueColorValue: unique symbol
type OpaqueColorValue = typeof OpaqueColorValue

/** @todo Make this more flexible to allow for other definitions, like those coming from react-native-svg */
export type ColorValue = string | symbol | OpaqueColorValue

export type ColorParam = ColorLib | string | ArrayLike<number> | number | { [key: string]: any }
export type ColorModel = keyof typeof convert
export type ColorObj = { alpha?: number } & Record<ColorValue, number> // { [key: string]: number };

/**
 * @deprecated
 */
export interface PaletteColorConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title?: string
}

export interface PaletteColor {
  title: string
  value: ColorValue
}

/**
 * @constant baseColorKeys
 * @description
 * "Base" hues are used for mixing colors and applied as default colors to
 * background and foreground elements.
 */
export const baseColorKeys = ['black', 'white', 'darkest', 'lightest'] as const
export type BaseColorKey = typeof baseColorKeys[number]

/*******************************************************************************
 * "Input" Types
 * Types for definitions coming from `config.json` are indicated by
 * an applied `Input` suffix.
 ******************************************************************************/

/**
 * @typedef BaseColorsInput
 * @description
 * Black, white, darkest, & lightest base colors (used in defaults)
 */
export type BaseColorsInput = Record<BaseColorKey, string>

/**
 * @typedef PaletteColorsInput
 * @description
 * A palette color in `config.json` has a name key and an array composed of
 * a hex color string and a midtone level (number).
 */
export type PaletteColorsInput = Record<string, { hex: string; midPoint: number }>

/**
 * @typedef VariantColorsInput
 * @description
 * An object of variant name keys matched with either the name of a color
 * defined in the `palette` property object or a color string (hex, rgba, etc.)
 */
// export type VariantColorsInput = Record<string, keyof PaletteColorsInput>

/**
 * @typedef ColorConfigInput
 * @description - The type for the `config.json` API as a whole.
 */
export interface ColorConfigInput {
  base: Record<BaseColorKey, string>
  palette: PaletteColorsInput
  variants: Record<string, keyof PaletteColorsInput>
  states: string[]
  tints: number[]
}

/*******************************************************************************
 * "Output" Types
 * Types for data transformed from "Input" types coming from `config.json` API
 ******************************************************************************/

export type PaletteColorKey = keyof PaletteColorsInput

/**
 * @typedef BaseColors
 * @description - Object map of base color name keys and color definitions.
 * @example
 * {
 *   black: { title: 'Black', value: '#000000' },
 *   white: { title: 'White', value: '#FFFFFF' },
 *   darkest: { title: 'Dark Base', value: '#000000' },
 *   lightest: { title: 'Off-White', value: '#1C1E20' },
 * }
 */
export type BaseColors = Record<BaseColorKey, PaletteColor>

/**
 * @typedef ColorTints
 * @description - Object map of tint levels and assigned color definition.
 * @example
 * {
 *   '100': { title: 'Orange 100', value: '#FEE2CE' },
 *   '200': { title: 'Orange 200', value: '#FDC59E' },
 *   \// [...]
 * }
 */
export type ColorTints = Record<NumberProp, PaletteColor>

/**
 * @typedef PaletteColors
 * @description - Object map of palette/spot color names and assigned tints.
 * @example
 * const orange = {
 *   '100': { title: 'Orange 100', value: '#FEE2CE' },
 *   '200': { title: 'Orange 200', value: '#FDC59E' },
 *   \// [...]
 * }
 */
export type PaletteColors = Record<PaletteColorKey, ColorTints>

export type VariantColorKey = string // keyof VariantColorsInput

/**
 * @typedef VariantColors
 * @description - Object map of variant color names and assigned tints.
 * @example
 * {
 *   primary: orange,
 *   accent: teal,
 *   \// [...]
 * }
 */
export type VariantColors = Record<keyof ColorConfigInput['variants'], ColorTints>

/**
 * @typedef ColorConfig
 * @description - The type for the `config.json` API as a whole.
 */
export interface ColorConfig {
  base: BaseColors
  palette: PaletteColors
  variants?: Record<string, keyof PaletteColors>
  states: string[]
  tints: number[]
}
