import { GlobalValueKey } from './global'

/** Font Styles */
export type FontStyleKey = GlobalValueKey | 'italic' | 'normal'
export type FontWeightKey =
  | GlobalValueKey
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900

/** Text Styles */
export type TextTransformKey = GlobalValueKey | 'lowercase' | 'uppercase' | 'capitalize' | 'none'
export type TextAlignKey = GlobalValueKey | 'left' | 'right' | 'center' | 'justify'
export type WhiteSpaceKey =
  | GlobalValueKey
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-line'
  | 'pre-wrap'
  | 'break-spaces'
export type TextDecorationLineKey =
  | GlobalValueKey
  | 'line-through'
  | 'none'
  | 'overline'
  | 'underline'
  | 'underline overline'
export type TextDecorationStyleKey =
  | GlobalValueKey
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'none'
  | 'solid'
  | 'wavy'

export interface FontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
}

export interface FontWeight {
  regular: number
  medium: number
  semibold: number
  bold: number
}

export interface Font {
  family: string
  weights: FontWeight
  sizes: FontSize[]
}

export interface Fonts {
  code: Font
  heading: Font
  label: Font
  text: Font
}
