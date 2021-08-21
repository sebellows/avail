import { Color, ColorParam } from '../../utils'

/**
 * `rgbaArray` taken from react-native-svg
 * rgba values inside range 0 to 1 inclusive
 * rgbaArray = [r, g, b, a]
 */
export type rgbaArray = ReadonlyArray<number>

/**
 * `int32ARGBColor` taken from react-native-svg
 * argb values inside range 0x00 to 0xff inclusive
 * int32ARGBColor = 0xaarrggbb
 */
export type int32ARGBColor = number

export type SvgColorValue = int32ARGBColor | rgbaArray | string

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => Color<T>

export interface ThemeColorConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

export interface ThemeColorValue {
  hex: string
  title: string
}

export const THEME_COLOR_TINTS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const
export type ThemeColorTintKey = typeof THEME_COLOR_TINTS[number]
export type ThemeColorTints = Record<ThemeColorTintKey, ThemeColorValue>

/************************************************************
 * Base Colors / Shades - pure black, black(-ish), & white
 ************************************************************/

export const themeBaseColors = ['pureblack', 'black', 'white'] as const
export type ThemeBaseColorKey = typeof themeBaseColors[number]
export type ThemeBaseColors = Record<ThemeBaseColorKey, ThemeColorValue>

/************************************************************
 * Spot Colors (a.k.a., the "palette")
 ************************************************************/

export const THEME_COLOR_SPOTS = [
  'blue',
  'cyan',
  'gray',
  'green',
  'indigo',
  'magenta',
  'orange',
  'purple',
  'red',
  'teal',
  'yellow',
] as const
export type ThemeColorSpotKey = typeof THEME_COLOR_SPOTS[number]
export type ThemeColorSpot = Record<ThemeColorSpotKey, string>
export type ThemeColorPalette = Record<ThemeColorSpotKey, ThemeColorTints>

/************************************************************
 * Theme Variants - level-biased color palette
 ************************************************************/

export const THEME_COLOR_VARIANTS = [
  'default',
  'transparent',
  'inverted',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const
export type ThemeColorVariantKey = typeof THEME_COLOR_VARIANTS[number]
export type ThemeColorVariants<
  T extends ThemeColorStates<ThemeColorStyle> = ThemeColorStates<ThemeColorStyle>,
> = Record<ThemeColorVariantKey, T>

/**
 * Variant keys for components who can have their own `dark` or `light` mode
 * setting. They can opt to inherit the chosen color scheme from the root theme.
 */
export type RootThemeVariantKey = ThemeColorVariantKey | 'inherit'

/************************************************************
 * State-Based Color Hues
 ************************************************************/

export const THEME_COLOR_STATE_KEYS = [
  'active',
  'disabled',
  'focused',
  'hovered',
  'pressed',
  'selected',
] as const
export type ThemeColorStateKey = typeof THEME_COLOR_STATE_KEYS[number]
export type ThemeColorStates<T> = Record<ThemeColorStateKey, T>

/************************************************************
 * Theme Modes ("dark" or "light" mode)
 ************************************************************/

export const THEME_COLOR_MODES = ['dark', 'light'] as const
export type ThemeColorModeKey = typeof THEME_COLOR_MODES[number]
export type ThemeColorModes = Record<ThemeColorModeKey, ThemeColorScheme>

/************************************************************
 * Component Style Color Properties
 ************************************************************/

export interface ThemeColorMapping<V extends string | ThemeColorValue = ThemeColorValue> {
  bg: V
  border: V
  fg: V
}
export type ThemeColorStyle = ThemeColorMapping<string>

/** Button Colors */
export const THEME_BUTTON_MODES = ['default', 'outline', 'link'] as const
export type ThemeButtonModeKey = typeof THEME_BUTTON_MODES[number]
export type ThemeButtonColorVariants = Omit<
  ThemeColorVariants<ThemeColorStates<ThemeColorStyle>>,
  'accent'
>
export type ThemeButtonColorConfig = Record<ThemeButtonModeKey, ThemeButtonColorVariants>

/** Card Colors */
export type ThemeCardColorConfig = ThemeColorStyle & {
  // "accent" (a.k.a., highlighted or accented/emphasized) text color
  accent?: string
  // "link" text color
  link?: string
  // "muted" text color
  muted?: string
  // "code" text color
  code?: string
  // background color for a `pre` element or `output` container
  outlet?: string
}

/** Form Colors */
export interface ThemeFormColorMapping<V extends string | ThemeColorValue = ThemeColorValue>
  extends ThemeColorMapping<V> {
  placeholder?: V
}
export const THEME_FORM_MODES = ['default', 'invalid'] as const
export type ThemeFormModeKey = typeof THEME_FORM_MODES[number]
export type ThemeFormColorState = Omit<
  ThemeColorStates<ThemeFormColorMapping<string>>,
  'pressed' | 'selected'
>
export type ThemeFormColorConfig = Record<ThemeFormModeKey, ThemeFormColorState>

/** Link Colors */
export type ThemeLinkColorConfig = ThemeColorStyle

/**************************************************
 * Theme Color Configuration
 **************************************************/

export interface ThemeColor {
  base: ThemeColorBase
  dark: boolean
  muted: ThemeMutedVariantStyles
  solid: ThemeSolidVariantStyles
  spot: ThemeColorSpot
  syntax?: ThemeColorSyntax
  // Component & Element style color properties
  button: ThemeButtonColorConfig
  card: ThemeCardColorConfig
  form: ThemeFormColorConfig
  link?: ThemeLinkColorConfig
}
export type ThemeColorScheme = Record<ThemeColorVariantKey, ThemeColor>

export interface ThemeColorBase extends ThemeColorStyle {
  primary?: ThemeColorStyle
  accent?: ThemeColorStyle
  transparent?: ThemeColorStyle
  muted?: ThemeColorStyle
  danger?: ThemeColorStyle
  success?: ThemeColorStyle
  warning?: ThemeColorStyle
  // original
  code?: ThemeColorStyle
  focusRing: string
  // link: Partial<ThemeColorStyle>
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
}

/**************************************************
 * Solid Color Tones
 **************************************************/

export type ThemeSolidStateColorStyles = ThemeColorStates<ThemeColorStyle>
export type ThemeSolidVariantStyles = ThemeColorVariants<ThemeSolidStateColorStyles>

/**************************************************
 * Muted Color Tones
 **************************************************/

export interface ThemeMutedStateColorStyles extends ThemeColorStates<ThemeColorStyle> {}
export interface ThemeMutedVariantStyles extends ThemeColorVariants<ThemeMutedStateColorStyles> {}

/**************************************************
 * Code Formatting Colors
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
 * Theme Color Builder
 ****************************************/

export interface ThemeColorBuilderOptions {
  base: (options: { dark: boolean; name: ThemeColorVariantKey }) => ThemeColorBase
  solid: (options: {
    base: ThemeColorBase
    dark: boolean
    name: ThemeColorVariantKey
    state: ThemeColorStateKey
    variant: ThemeColorVariantKey
  }) => ThemeColorStyle
  muted: (options: {
    base: ThemeColorBase
    dark: boolean
    name: ThemeColorVariantKey
    state: ThemeColorStateKey
    variant: ThemeColorVariantKey
  }) => ThemeColorStyle
  card: (options: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeMutedStateColorStyles
    name: ThemeColorVariantKey
    solid: ThemeSolidStateColorStyles
    state: ThemeColorStateKey
  }) => ThemeCardColorConfig
  button: (options: {
    base: ThemeColorBase
    dark: boolean
    mode: ThemeButtonModeKey
    muted: ThemeMutedStateColorStyles
    solid: ThemeSolidStateColorStyles
  }) => ThemeColorStates<ThemeColorStyle>
  form: (options: {
    base: ThemeColorBase
    dark: boolean
    mode: ThemeFormModeKey
    muted: ThemeMutedStateColorStyles
    solid: ThemeSolidStateColorStyles
    state: keyof ThemeFormColorState
  }) => ThemeFormColorMapping<string>
  syntax?: (options: { base: ThemeColorBase; dark: boolean }) => ThemeColorSyntax
  spot: (options: { base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey }) => string
}
