export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'

export interface ResponsiveGridStyleProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  gap?: number | number[]
  gapX?: number | number[]
  gapY?: number | number[]
  rows?: number | number[]
}

export type GridItemColumn = 'auto' | 'full' | number
export type GridItemColumnStart = 'auto' | number
export type GridItemColumnEnd = 'auto' | number

export type GridItemRow = 'auto' | 'full' | number
export type GridItemRowStart = 'auto' | number
export type GridItemRowEnd = 'auto' | number

export interface ResponsiveGridItemStyleProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]

  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}
