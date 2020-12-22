import { CSSObject } from 'styled-components'

import { ThemeInput } from './input'
import { ThemeShadow } from './shadow'
import { ThemeColor, ThemeColorSchemes } from './color'
import { ThemeFonts, ThemeFontWeightKey } from './fonts'

export interface BaseTheme<Styles extends {} = {}> {
  button: {
    textWeight: ThemeFontWeightKey
  }
  color: ThemeColorSchemes
  container: number[]
  focusRing: {
    offset: number
    width: number
  }
  fonts: ThemeFonts
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput
  styles?: Styles
}

export type RootTheme = BaseTheme<Styles>

export interface Styles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

export interface Theme {
  default: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}
