import { GlobalValueKey } from './global'

/** Layout */
export type PositionKey = GlobalValueKey | 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

/* Flex */
export type FlexDirectionKey = GlobalValueKey | 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexAlignItemsKey =
  | GlobalValueKey
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
export type FlexAlignContentKey =
  | GlobalValueKey
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch'
export type FlexAlignSelfKey =
  | GlobalValueKey
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
export type FlexJustifyContentKey =
  | GlobalValueKey
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
export type FlexWrapKey = GlobalValueKey | 'wrap' | 'wrap-reverse' | 'nowrap'
