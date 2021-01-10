import { GlobalValueKey } from './global'

/** Border */
export type BorderProp = 'border' | 'borderTop' | 'borderRight' | 'borderBottom' | 'borderLeft'

export type BorderStyleKey =
  | GlobalValueKey
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'

/** Border Radius */
export type BorderRadiusProp =
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomLeftRadius'
