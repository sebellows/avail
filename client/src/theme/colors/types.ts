import { Color, ColorParam } from '../../utils'

export type BlendFn = <T extends ColorParam = ColorParam>(source: T, destination: T) => Color<T>

export interface ColorHueConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

export interface ColorValue {
  hex: string
  title: string
}

export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

export type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

export type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'teal'

export interface ColorPalette {
  black: ColorValue
  white: ColorValue

  gray: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
  teal: ColorTints
}

// 'scheme' or 'mode'
export type ThemeColorSchemeKey = 'dark' | 'light'

export type ThemeColorVariant =
  | 'default'
  | 'transparent'
  | 'accent'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export type ThemeColorVariantKey = ThemeColorVariant

export type ThemeColorSpotKey = ColorHueKey

export type ThemeColorButtonModeKey = 'default' | 'outline' | 'link'

export interface ThemeColorStyle {
  bg: string
  border: string
  fg: string
}

export type ThemeColorStateKey = 'active' | 'disabled' | 'hovered' | 'pressed' | 'selected'
// custom
export interface ThemeColorStates<S extends ThemeColorStyle = ThemeColorStyle> {
  active: S
  disabled: S
  hovered: S
  pressed: S
  selected: S
}
// custom
export interface ThemeColorVariants<T extends ThemeColorStates = ThemeColorStates> {
  default: T
  transparent?: T
  accent: T
  primary: T
  success: T
  warning: T
  danger: T
}

export interface ThemeColorCardStyle extends ThemeColorStyle {
  // bg: string
  // fg: string
  // border: string
  muted: {
    fg: string
  }
  accent: {
    fg: string
  }
  link: {
    fg: string
  }
  code: {
    bg: string
    fg: string
  }
}

export interface ThemeColorCardState
  extends Omit<ThemeColorStates<ThemeColorCardStyle>, 'accent'> {}

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
  link: Partial<ThemeColorStyle>
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
}

// was ThemeColorSolidTone
export interface ThemeColorSolidVariantState extends ThemeColorStates {}
// was ThemeColorSolid
export interface ThemeColorSolidVariants extends ThemeColorVariants<ThemeColorSolidVariantState> {}

// was ThemeColorMutedTone
export interface ThemeColorMutedVariantState extends ThemeColorStates {}
// was ThemeColorMuted
export interface ThemeColorMutedVariants extends ThemeColorVariants<ThemeColorMutedVariantState> {}

/******************************
 * Button Color
 ******************************/

// was ThemeColorButtonTone
export interface ThemeColorButtonStyle extends ThemeColorStyle {}
export interface ThemeColorButtonState extends ThemeColorStates<ThemeColorButtonStyle> {}
// was ThemeColorButtonTones
export interface ThemeColorButtonVariants
  extends Omit<ThemeColorVariants<ThemeColorButtonState>, 'accent'> {}

// was ThemeColorButton
export interface ThemeColorButton {
  default: ThemeColorButtonVariants
  outline: ThemeColorButtonVariants
  link: ThemeColorButtonVariants
}

/**
 * Input Color
 */

export interface ThemeColorInputStyle extends ThemeColorStyle {
  // bg: string
  // fg: string
  // border: string
  placeholder: string
}

export interface ThemeColorInputState
  extends Omit<ThemeColorStates<ThemeColorInputStyle>, 'pressed' | 'selected'> {
  active: ThemeColorInputStyle
  disabled: ThemeColorInputStyle
  hovered: ThemeColorInputStyle
}

export interface ThemeColorInput {
  default: ThemeColorInputState
  invalid: ThemeColorInputState
}

export interface ThemeColorSpot {
  gray: string
  blue: string
  purple: string
  magenta: string
  red: string
  orange: string
  yellow: string
  green: string
  cyan: string
}

export interface ThemeColor {
  dark: boolean
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCardState
  input: ThemeColorInput
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
  solid: ThemeColorSolidVariants
  muted: ThemeColorMutedVariants
}

export interface ThemeColorScheme {
  default: ThemeColor
  transparent?: ThemeColor
  accent: ThemeColor
  primary: ThemeColor
  success: ThemeColor
  warning: ThemeColor
  danger: ThemeColor
}

export interface ThemeColorSchemes {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}

export interface ThemeColorSyntax {
  atrule: string
  attrName: string
  attrValue: string
  attribute: string
  boolean: string
  builtin: string
  cdata: string
  char: string
  class: string
  className: string
  comment: string
  constant: string
  deleted: string
  doctype: string
  entity: string
  function: string
  hexcode: string
  id: string
  important: string
  inserted: string
  keyword: string
  number: string
  operator: string
  prolog: string
  property: string
  pseudoClass: string
  pseudoElement: string
  punctuation: string
  regex: string
  selector: string
  string: string
  symbol: string
  tag: string
  unit: string
  url: string
  variable: string
}

export interface ThemeColorBuilderOptions {
  base: (options: { dark: boolean; name: ThemeColorVariant }) => ThemeColorBase
  solid: (options: {
    base: ThemeColorBase
    dark: boolean
    variant: ThemeColorVariant
    name: ThemeColorVariant
    state: 'active' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorStyle
  muted: (options: {
    base: ThemeColorBase
    dark: boolean
    variant: ThemeColorVariant
    name: ThemeColorVariant
    state: 'active' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorStyle
  card: (options: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeColorMutedVariantState
    name: ThemeColorVariant
    solid: ThemeColorSolidVariantState
    state: 'active' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorCardStyle
  button: (options: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    base: ThemeColorBase
    solid: ThemeColorSolidVariantState
    muted: ThemeColorMutedVariantState
  }) => ThemeColorButtonState
  input: (options: {
    base: ThemeColorBase
    solid: ThemeColorSolidVariantState
    muted: ThemeColorMutedVariantState
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'active' | 'disabled' | 'hovered'
  }) => ThemeColorInputStyle
  syntax: (options: { base: ThemeColorBase; dark: boolean }) => ThemeColorSyntax
  spot: (options: { base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey }) => string
}
