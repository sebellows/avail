import { GlobalValueKey, LayoutDefaultKey } from './global'

/* Box Model */
export type BoxSizing = GlobalValueKey | 'content' | 'border'
export type BoxDisplay =
  | GlobalValueKey
  | 'none'
  | 'inline'
  | 'inline-block'
  | 'block'
  | 'table'
  | 'table-row'
  | 'table-cell'
  | 'flex'
  | 'inline-flex'
export type BoxHeightKey = LayoutDefaultKey | 'max' | 'min' | 'fit'
export type BoxWidthKey = LayoutDefaultKey | 'max' | 'min' | 'fit'
export type BoxOverflow = GlobalValueKey | 'visible' | 'hidden' | 'clip' | 'auto' | 'scroll'
export type BoxFloatKey = GlobalValueKey | 'left' | 'right' | 'none'
export type BoxAlignKey =
  | GlobalValueKey
  | 'baseline'
  | 'top'
  | 'middle'
  | 'bottom'
  | 'text-bottom'
  | 'text-top'
