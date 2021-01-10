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
