import { AutoOrNumberKey, GlobalValueKey } from './global'

/* Grid */
export type GridAutoRowsKey = GlobalValueKey | 'auto' | 'min' | 'max' | 'fr'
export type GridAutoColsKey = GlobalValueKey | 'auto' | 'min' | 'max' | 'fr'
export type GridAutoFlowKey = GlobalValueKey | 'row' | 'column' | 'row dense' | 'column dense'

export type GridItemColumnKey = AutoOrNumberKey | 'full'
export type GridItemColumnStartKey = AutoOrNumberKey
export type GridItemColumnEndKey = AutoOrNumberKey

export type GridItemRowKey = AutoOrNumberKey | 'full'
export type GridItemRowStartKey = AutoOrNumberKey
export type GridItemRowEndKey = AutoOrNumberKey
