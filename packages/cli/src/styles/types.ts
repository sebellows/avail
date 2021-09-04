import { Color, CSSObject } from '@avail/core/src'

import {
  ColorConfig,
  ColorParam,
  PaletteColor,
  PaletteColorKey,
  VariantColorKey,
  VariantColors,
} from '../color/types'

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => Color<T>

/************************************************************
 *
 * State-Based Color Hues
 *
 ************************************************************/

// export const THEME_COLOR_STATE_KEYS = [
//   'active',
//   'disabled',
//   'focused',
//   'hovered',
//   'pressed',
//   'selected',
// ] as const
export type ThemeColorStateKey = ColorConfig['states'][number]
export type ThemeColorStates<T> = Partial<Record<ThemeColorStateKey, T>>

/************************************************************
 * Theme Modes ("dark" or "light" mode)
 ************************************************************/

export const THEME_MODES = ['dark', 'light'] as const
export type ThemeModeKey = typeof THEME_MODES[number]
export type ThemeModes<V extends string | PaletteColor> = Record<ThemeModeKey, ThemeColorScheme<V>>

/************************************************************
 *
 * Component Style Color Properties
 *
 ************************************************************/

export interface ThemeColorStylesBase<V extends string | PaletteColor> {
  bg?: V
  border?: V
  fg?: V
}

export interface ThemeColorStylesGeneric<V extends string | PaletteColor>
  extends ThemeColorStylesBase<V> {
  muted: ThemeColorStylesBase<V>
  accent: ThemeColorStylesBase<V>
  link: ThemeColorStylesBase<V>
  code: ThemeColorStylesBase<V>
  // background color for a `pre` element or `output` container
  outlet?: ThemeColorStylesBase<V>
  skeleton?: {
    from: string
    to: string
  }
}

export type ThemeSpotColors<V extends string | PaletteColor> = Record<PaletteColorKey, V>

export type ThemeVariantColors<
  S extends string | PaletteColor,
  T extends ThemeColorStylesBase<S> = ThemeColorStylesBase<S>,
> = Record<VariantColorKey, ThemeColorStates<T>>

/**************************************************
 *
 * Solid Color Tones
 *
 **************************************************/

/**
 * Solid (i.e., "opaque") state-based color definitions.
 * @example
 * {
 *   active: '#007BFF',
 *   disabled: '#8D8D8D',
 * }
 */
export type ThemeSolidColorStateStyles<
  V extends string | PaletteColor,
  K extends ThemeColorStateKey = ThemeColorStateKey,
> = Record<K, ThemeColorStylesGeneric<V>>

/**
 * Variant color profiles defined by state-based style property definitions.
 * @example
 * {
 *   primary: {
 *     active: '#007BFF',
 *     disabled: '#8D8D8D',
 *   },
 *   accent: {}
 * }
 */
export type ThemeSolidColors<V extends string | PaletteColor> = Record<
  VariantColorKey,
  ThemeSolidColorStateStyles<V>
>

/**************************************************
 *
 * Muted Color Tones
 *
 **************************************************/

/**
 * Muted state-based color definitions for de-emphasized content.
 * @example
 * {
 *   active: '#007BFF',
 *   disabled: '#8D8D8D',
 * }
 */
export type ThemeMutedColorStateStyles<
  V extends string | PaletteColor,
  K extends ThemeColorStateKey = ThemeColorStateKey,
> = Record<K, ThemeColorStylesGeneric<V>>

/**
 * Muted variant color profiles defined by state-based style property definitions.
 * @example
 * {
 *   primary: {
 *     active: '#007BFF',
 *     disabled: '#8D8D8D',
 *   },
 *   accent: {}
 * }
 */
export type ThemeMutedColors<V extends string | PaletteColor> = Record<
  VariantColorKey,
  ThemeMutedColorStateStyles<V>
>

/*******************************************************************************
 *
 * Button Colors
 *
 ******************************************************************************/

export const THEME_BUTTON_MODES = ['default', 'outline', 'link'] as const
export type ThemeButtonModeKey = typeof THEME_BUTTON_MODES[number]

export type ThemeButtonColorStates<V extends string | PaletteColor> = Record<
  ThemeColorStateKey,
  ThemeColorStylesGeneric<V>
>
export type ThemeButtonVariantStates<V extends string | PaletteColor> = Record<
  VariantColorKey,
  ThemeButtonColorStates<V>
>
export type ThemeButtonColors<V extends string | PaletteColor> = Record<
  ThemeButtonModeKey,
  ThemeButtonVariantStates<V>
>

/*******************************************************************************
 *
 * Card Colors
 *
 ******************************************************************************/

export type ThemeCardColors<V extends string | PaletteColor> = Record<
  VariantColorKey,
  ThemeColorStylesGeneric<V>
>

/*******************************************************************************
 *
 * Form Colors
 *
 ******************************************************************************/

export interface ThemeFormColorStyles<V extends string | PaletteColor>
  extends ThemeColorStylesBase<V> {
  placeholder?: V
}

export const THEME_FORM_MODES = ['default', 'invalid'] as const
export type ThemeFormModeKey = typeof THEME_FORM_MODES[number]

export type ThemeFormStateKey = ThemeColorStateKey | 'readOnly'
// | keyof Omit<ThemeColorStates<V>, 'pressed' | 'selected'>
// | 'readOnly'

export type ThemeFormColorStates<V extends string | PaletteColor> = Record<
  ThemeFormStateKey,
  ThemeFormColorStyles<V>
>
export type ThemeFormColors<V extends string | PaletteColor> = Record<
  ThemeFormModeKey,
  ThemeFormColorStates<V>
>

/*******************************************************************************
 *
 * Link Colors
 *
 ******************************************************************************/

export type ThemeLinkColors<V extends string | PaletteColor> = ThemeColorStylesBase<V>

/*******************************************************************************
 *
 * Theme Color Schemes
 *
 ******************************************************************************/

export interface ThemeColor<V extends string | PaletteColor> {
  base: ThemeStyleColorBase<V>
  dark: boolean
  muted: ThemeMutedColors<V>
  solid: ThemeSolidColors<V>
  spot: ThemeSpotColors<V>
  syntax?: ThemeColorSyntax

  // Component & Element style color properties
  button: ThemeButtonColors<V>
  card: ThemeCardColors<V>
  form: ThemeFormColors<V>
  // TODO: possibly unnecessary
  link?: ThemeLinkColors<V>
}

export type ThemeColorScheme<V extends string | PaletteColor> = Record<
  keyof VariantColors,
  ThemeColor<V>
>

interface ThemeStyleColorPropsExtended<V extends string | PaletteColor> {
  code?: ThemeColorStylesBase<V>
  focusRing: V
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
}

export type ThemeStyleColorBase<V extends string | PaletteColor> = ThemeColorStylesBase<V> &
  ThemeStyleColorPropsExtended<V> &
  Record<keyof VariantColors, ThemeColorStylesBase<V>>

/**************************************************
 *
 * Code Formatting Colors
 *
 **************************************************/

export interface ThemeColorSyntax {
  atrule?: string
  attrName?: string
  attrValue?: string
  attribute?: string
  boolean?: string
  builtin?: string
  cdata?: string
  char?: string
  class?: string
  className?: string
  comment?: string
  constant?: string
  deleted?: string
  doctype?: string
  entity?: string
  function?: string
  hexcode?: string
  id?: string
  important?: string
  inserted?: string
  keyword?: string
  number?: string
  operator?: string
  prolog?: string
  property?: string
  pseudoClass?: string
  pseudoElement?: string
  punctuation?: string
  regex?: string
  selector?: string
  string?: string
  symbol?: string
  tag?: string
  unit?: string
  url?: string
  variable?: string
}

/**************************************************
 *
 * Theme Color Builder
 *
 *************************************************/

export interface ThemeColorBuilderOptions<V extends string | PaletteColor> {
  base: (options: { dark: boolean; name: VariantColorKey }) => ThemeStyleColorBase<V>
  solid: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    name: VariantColorKey
    state: ThemeColorStateKey
    variant: VariantColorKey
  }) => ThemeColorStylesBase<V>
  muted: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    name: VariantColorKey
    state: ThemeColorStateKey
    variant: VariantColorKey
  }) => ThemeColorStylesBase<V>
  card: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    muted: ThemeMutedColors<V>
    name: VariantColorKey
    solid: ThemeSolidColors<V>
    state: ThemeColorStateKey
  }) => ThemeCardColors<V>
  button: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    mode: ThemeButtonModeKey
    muted: ThemeMutedColorStateStyles<V>
    solid: ThemeSolidColorStateStyles<V>
  }) => ThemeButtonColors<V>
  form: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    mode: ThemeFormModeKey
    muted: ThemeMutedColorStateStyles<V>
    solid: ThemeSolidColorStateStyles<V>
  }) => ThemeFormColors<V>
  spot: (options: {
    base: ThemeStyleColorBase<V>
    dark: boolean
    key: PaletteColorKey
  }) => ThemeSpotColors<V>
  syntax?: (options: { base: ThemeStyleColorBase<V>; dark: boolean }) => ThemeColorSyntax
}

/**************************************************
 *
 * Theme Configuration
 *
 *************************************************/

/**
 * Make some themeable properties extendable.
 * TODO: via `mergeThemeProps()`, possibly?
 */
interface Configurable<V> {
  [_: string]: V
}

export interface ThemeConfig {
  border: Border
  breakpoints: Breakpoints
  containers: Breakpoints
  focusRing: FocusRing
  fonts: Fonts
  fontSizes: FontSizes
  form: Form
  radii: Radii
  shadows: (Shadow | null)[]
  spacing: Spacing
  zIndices: ZIndices
}

interface Border {
  color: string
  style: string
  width: number
}

interface Breakpoints extends Configurable<number> {
  sm: number
  md: number
  lg: number
  xl: number
}

interface FocusRing {
  offset: number
  width: number
}

interface Fonts {
  code: FontFamily
  heading: FontFamily
  label: FontFamily
  normal: FontFamily
}

interface FontFamily {
  family: string
  defaults: FontFamilyDefaults
  ascenderScale: number
  descenderScale: number
  iconScale: number
  letterSpacing: number
  lineHeightScale: number
}

interface FontFamilyDefaults {
  size: number | string
  weight: number | string
  lineHeight?: number | string | null
}

interface FontSizes extends Configurable<number> {
  fine: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  h6: number
  h5: number
  h4: number
  h3: number
  h2: number
  h1: number
}

interface Radii extends Configurable<number | string> {
  none: number
  sm: number
  md: number
  lg: number
  pill: number
  circle: string
}

interface Shadow {
  outline?: string
  umbra: number[]
  penumbra: number[]
  ambient: number[]
}

interface Spacing extends Configurable<number> {
  none: number
  '2xs': number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '-2xs': number
  '-xs': number
  '-sm': number
  '-md': number
  '-lg': number
  '-xl': number
  '-2xl': number
  '-3xl': number
}

interface ZIndices extends Configurable<number> {
  dropdown: number
  tooltip: number
  fixedActionButton: number
  navDrawer: number
  modal: number
  dialog: number
  toast: number
}

interface Form extends Configurable<Record<string, any>> {
  checkbox: Checkbox
  radio: Radio
  switch: Switch
}

interface Switch extends Configurable<unknown> {
  width: number
  height: number
  padding: number
  transitionDurationMs: number
  transitionTimingFunction: string
}

interface Radio extends Configurable<unknown> {
  size: number
  markSize: number
}

interface Checkbox extends Configurable<unknown> {
  size: number
}

/**
 * OUTPUT Theme Configuration
 */

export interface FontWeights {
  thin?: number
  extralight?: number
  light?: number
  regular?: number
  medium?: number
  semibold?: number
  bold?: number
  extrabold?: number
  black?: number
}

export interface Theme<TColor extends Record<string, unknown> = Record<string, unknown>> {
  border: CSSObject<string>
  breakpoints: Breakpoints
  color: TColor
  container: Breakpoints
  focusRing: {
    offset: number
    width: number
  }
  fonts: Fonts
  form: Form
  radii: Radii
  shadow: Shadow
  spacing: Spacing
  zIndices: ZIndices

  // Additional configurations
  styles?: Record<string, unknown>
  scheme?: ThemeColorScheme<string>
  schemes?: ThemeModes<string>
}
