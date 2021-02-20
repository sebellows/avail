import { FontWeightKey } from '../styles'
import { CSSObject } from '../types'
import { ThemeColor, ThemeColorScheme, ThemeColorSchemes } from './colors/types'

/** Used for applying sizes to containers and media breakpoints */
export type ThemeSizeKey = 'sm' | 'md' | 'lg' | 'xl'

export interface ThemeInput {
  checkbox: {
    size: number
  }
  radio: {
    size: number
    markSize: number
  }
  switch: {
    width: number
    height: number
    padding: number
    transitionDurationMs: number
    transitionTimingFunction: string
  }
  border: {
    width: number
  }
}

export type ThemeFontKey = 'code' | 'heading' | 'label' | 'text'
export type ThemeFontWeightKey = FontWeightKey

export interface ThemeFontSize {
  fontSize: number
  lineHeight: number
  ascenderHeight?: number
  descenderHeight?: number
  iconSize?: number
  letterSpacing?: number
}

export interface ThemeFontWeight {
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

export interface ThemeFont {
  family: string
  weights: ThemeFontWeight
  sizes: Record<string, ThemeFontSize>
}

export interface ThemeFonts {
  code: ThemeFont
  heading: ThemeFont
  label: ThemeFont
  text: ThemeFont
}

export interface ThemeShadow {
  outline?: string
  umbra: [number, number, number, number]
  penumbra: [number, number, number, number]
  ambient: [number, number, number, number]
}

export interface ThemeStyles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Theme<Styles extends ThemeStyles = ThemeStyles, TColor extends {} = {}> {
  border: CSSObject<string>
  button: {
    textWeight: ThemeFontWeightKey
  }
  color: TColor
  container: CSSObject<number>
  focusRing: {
    offset: number
    width: number
  }
  fonts: ThemeFonts
  input: ThemeInput
  media: CSSObject<number>
  radius: CSSObject<number>
  shadow: Array<ThemeShadow | null>
  space: number[]
  zOffsets: CSSObject<number>
  styles?: Styles
  scheme?: ThemeColorScheme
  schemes?: ThemeColorSchemes
  // [key: string]: any
}

export interface BaseTheme<Styles extends ThemeStyles = ThemeStyles, TColor = ThemeColor>
  extends Theme<Styles, TColor> {}

export interface RootTheme<Styles extends ThemeStyles = ThemeStyles, TColor = ThemeColorSchemes>
  extends Theme<Styles, TColor> {}

export type ThemeProps<T extends Theme = Theme> = {
  theme: T
}
