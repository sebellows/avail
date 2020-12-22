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

export type ThemeColorSchemeKey = 'dark' | 'light'

export type ThemeColorName =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export type ThemeColorButtonModeKey = 'default' | 'ghost' | 'bleed'

export type ThemeColorToneKey =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export type ThemeColorSpotKey =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'

export interface ThemeColorButtonState {
  bg: string
  fg: string
  border: string
}

export interface ThemeColorButtonStates {
  enabled: ThemeColorButtonState
  hovered: ThemeColorButtonState
  pressed: ThemeColorButtonState
  selected: ThemeColorButtonState
  disabled: ThemeColorButtonState
}

export interface ThemeColorCardState {
  bg: string
  fg: string
  border: string
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

export interface ThemeColorCard {
  enabled: ThemeColorCardState
  hovered: ThemeColorCardState
  pressed: ThemeColorCardState
  selected: ThemeColorCardState
  disabled: ThemeColorCardState
}

export interface ThemeColorBase {
  bg: string
  fg: string
  border: string
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
}

export interface ThemeColorGenericState {
  bg: string
  border: string
  fg: string
}

export interface ThemeColorSolidTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

export interface ThemeColorSolid {
  default: ThemeColorSolidTone
  transparent: ThemeColorSolidTone
  primary: ThemeColorSolidTone
  success: ThemeColorSolidTone
  warning: ThemeColorSolidTone
  danger: ThemeColorSolidTone
}

export interface ThemeColorMutedTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

export interface ThemeColorMuted {
  default: ThemeColorMutedTone
  transparent: ThemeColorMutedTone
  primary: ThemeColorMutedTone
  success: ThemeColorMutedTone
  warning: ThemeColorMutedTone
  danger: ThemeColorMutedTone
}

export interface ThemeColorButtonTones {
  default: ThemeColorButtonStates
  primary: ThemeColorButtonStates
  success: ThemeColorButtonStates
  warning: ThemeColorButtonStates
  danger: ThemeColorButtonStates
}

export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}

export interface ThemeColorInputState {
  bg: string
  fg: string
  border: string
  placeholder: string
}

export interface ThemeColorInputStates {
  enabled: ThemeColorInputState
  disabled: ThemeColorInputState
  hovered: ThemeColorInputState
}

export interface ThemeColorInput {
  default: ThemeColorInputStates
  invalid: ThemeColorInputStates
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
  card: ThemeColorCard
  input: ThemeColorInput
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
  solid: ThemeColorSolid
  muted: ThemeColorMuted
}

export interface ThemeColorScheme {
  default: ThemeColor
  transparent: ThemeColor
  primary: ThemeColor
  success: ThemeColor
  warning: ThemeColor
  danger: ThemeColor
}

export interface ThemeColorSchemes {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}

export interface ThemeColorBuilderOpts {
  base: (opts: { dark: boolean; name: ThemeColorName }) => ThemeColorBase
  solid: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  muted: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  card: (opts: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeColorMutedTone
    name: ThemeColorName
    solid: ThemeColorSolidTone
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorCardState
  button: (opts: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
  }) => ThemeColorButtonStates
  input: (opts: {
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'enabled' | 'disabled' | 'hovered'
  }) => ThemeColorInputState
  syntax: (opts: { base: ThemeColorBase; dark: boolean }) => ThemeColorSyntax
  spot: (opts: { base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey }) => string
}
