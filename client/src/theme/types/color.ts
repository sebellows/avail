export type ColorHueKey =
  | 'blue'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'magenta'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'yellow'

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

export type ColorTints = { [Key in ColorTintKey]: string }
export type ColorTintMap = { [Key in ColorHueKey]: ColorTints }

export interface Variantable<T> {
  neutral: T
  primary: T
  accent: T
  success: T
  warning: T
  danger: T
}

export type VariantTints = Variantable<ColorTints>

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

export type ThemeColorKey = ColorHueKey

export type ThemeColorName = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger'

export type ThemeColorStateKey = 'active' | 'hovered' | 'pressed' | 'selected' | 'disabled'

export interface ThemeColorTone<T extends ThemeColorBaseSettings = ThemeColorBaseSettings> {
  active: T
  hovered: T
  pressed: T
  selected: T
  disabled: T
}

export type ThemeColorButtonModeKey = 'default' | 'ghost' | 'bleed'

export type ThemeColorToneKey = ThemeColorName

export interface ThemeColorBaseSettings {
  bg: string
  fg: string
  borderColor: string
}

export interface ThemeColorElementBase extends ThemeColorBaseSettings {
  focusRing: string
  shadow?: {
    hue: string
    umbra: string
    penumbra: string
    ambience: string
  }
}

export interface ThemeColorBase<T extends ThemeColorTone = ThemeColorTone> extends Variantable<T> {}

export interface ThemeColorButtonState extends ThemeColorBaseSettings {}
export interface ThemeColorButtonStates extends ThemeColorTone<ThemeColorButtonState> {}

export interface ThemeColorCardState extends ThemeColorBaseSettings {
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
export interface ThemeColorCard extends ThemeColorTone<ThemeColorCardState> {}

export interface ThemeColorSolidTone extends ThemeColorTone<ThemeColorBaseSettings> {}
export interface ThemeColorSolid extends ThemeColorBase<ThemeColorSolidTone> {}

export interface ThemeColorMutedTone extends ThemeColorTone<ThemeColorBaseSettings> {}
export interface ThemeColorMuted extends ThemeColorBase<ThemeColorMutedTone> {}

export interface ThemeColorButtonTones extends ThemeColorBase<ThemeColorButtonStates> {}
export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}

export interface ThemeColorInputState extends ThemeColorBaseSettings {
  placeholder: string
}
export interface ThemeColorInputStates
  extends Omit<ThemeColorTone<ThemeColorInputState>, 'pressed' | 'selected'> {}

export interface ThemeColorControl {
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
  base: ThemeColorElementBase
  button: ThemeColorButton
  card: ThemeColorCard
  control: ThemeColorControl
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
  solid: ThemeColorSolid
  muted: ThemeColorMuted
}

export interface ThemeColorScheme extends Variantable<ThemeColor> {}

export interface ThemeColorSchemes {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}

export interface ThemeColorBuilderOptions {
  base: (opts: { dark: boolean; name: ThemeColorName }) => ThemeColorElementBase
  solid: (opts: {
    base: ThemeColorElementBase
    dark: boolean
    name: ThemeColorName
    state: ThemeColorStateKey
    tone: ThemeColorToneKey
  }) => ThemeColorBaseSettings
  muted: (opts: {
    base: ThemeColorElementBase
    dark: boolean
    name: ThemeColorName
    state: ThemeColorStateKey
    tone: ThemeColorToneKey
  }) => ThemeColorBaseSettings
  card: (opts: {
    base: ThemeColorElementBase
    dark: boolean
    muted: ThemeColorMutedTone
    name: ThemeColorName
    solid: ThemeColorSolidTone
    state: ThemeColorStateKey
  }) => ThemeColorCardState
  button: (opts: {
    base: ThemeColorElementBase
    dark: boolean
    mode: ThemeColorButtonModeKey
    muted: ThemeColorMutedTone
    solid: ThemeColorSolidTone
  }) => ThemeColorButtonStates
  control: (opts: {
    base: ThemeColorElementBase
    dark: boolean
    mode: 'default' | 'invalid'
    muted: ThemeColorMutedTone
    solid: ThemeColorSolidTone
    state: ThemeColorStateKey //'active' | 'disabled' | 'hovered'
  }) => ThemeColorInputState
  syntax: (opts: { base: ThemeColorElementBase; dark: boolean }) => ThemeColorSyntax
  spot: (opts: { base: ThemeColorElementBase; dark: boolean; key: ThemeColorKey }) => string
}
