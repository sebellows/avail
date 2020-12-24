import { CSSObject } from 'styled-components'

import { ThemeControl } from './input'
import { BoxShadow, DropShadow, ShadowProps } from '../../core/style/types/shadow'
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
  dropShadows: (DropShadow | null)[]
  shadows: (ShadowProps<BoxShadow> | null)[]
  space: number[]
  control: ThemeControl
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

export interface Theme extends Omit<RootTheme, 'color'> {
  color: ThemeColor
}
