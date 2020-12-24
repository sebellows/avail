import { toREM } from '../../units'
import { responsiveStyle } from '../../helpers'
import { GridAutoCols, GridAutoFlow, GridAutoRows, ResponsiveGridStyleProps } from './types'

const GRID_CSS = {
  '&:not([hidden])': { display: 'grid' },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const GRID_AUTO_COLUMS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

const GRID_AUTO_ROWS = {
  auto: 'auto',
  min: 'min-content',
  max: 'max-content',
  fr: 'minmax(0, 1fr)',
}

export function responsiveGridStyle() {
  return [
    GRID_CSS,
    gridAutoFlow,
    gridAutoRpws,
    gridAutoColumns,
    gridColumns,
    gridRows,
    gridGap,
    gridGapX,
    gridGapY,
  ]
}

const gridAutoFlow = responsiveStyle<ResponsiveGridStyleProps>(
  'autoFlow',
  (autoFlow: GridAutoFlow) => ({
    gridAutoFlow: autoFlow,
  }),
)

const gridAutoRpws = responsiveStyle<ResponsiveGridStyleProps>(
  'autoRows',
  (autoRows: GridAutoRows | keyof typeof GRID_AUTO_ROWS) => ({
    gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
  }),
)

const gridAutoColumns = responsiveStyle<ResponsiveGridStyleProps>(
  'autoCols',
  (autoCols: GridAutoCols | keyof typeof GRID_AUTO_COLUMS) => ({
    gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
  }),
)

const gridColumns = responsiveStyle<ResponsiveGridStyleProps>(
  'columns',
  (columns: number | number[]) => ({
    gridTemplateColumns: columns && `repeat(${columns}, minmax(0, 1fr));`,
  }),
)

const gridRows = responsiveStyle<ResponsiveGridStyleProps>('rows', (rows: number | number[]) => ({
  gridTemplateRows: rows && `repeat(${rows}, minmax(0, 1fr));`,
}))

const gridGap = responsiveStyle<ResponsiveGridStyleProps>('gap', (gap: number, { space }) => ({
  gridGap: gap ? toREM(space[gap]) : undefined,
}))

const gridGapX = responsiveStyle<ResponsiveGridStyleProps>('gapX', (gap: number, { space }) => ({
  columnGap: gap ? toREM(space[gap]) : undefined,
}))

const gridGapY = responsiveStyle<ResponsiveGridStyleProps>('gapY', (gap: number, { space }) => ({
  rowGap: gap ? toREM(space[gap]) : undefined,
}))

// function responsiveGridAutoFlowStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.autoFlow), (autoFlow) => ({
//     gridAutoFlow: autoFlow,
//   }))
// }

// function responsiveGridAutoRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.autoRows), (autoRows) => ({
//     gridAutoRows: autoRows && GRID_AUTO_ROWS[autoRows],
//   }))
// }

// function responsiveGridAutoColsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.autoCols), (autoCols) => ({
//     gridAutoColumns: autoCols && GRID_AUTO_COLUMS[autoCols],
//   }))
// }

// function responsiveGridColumnsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.columns), (columns) => ({
//     gridTemplateColumns: columns && `repeat(${columns},minmax(0,1fr));`,
//   }))
// }

// function responsiveGridRowsStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.rows), (rows) => ({
//     gridTemplateRows: rows && `repeat(${rows},minmax(0,1fr));`,
//   }))
// }

// function responsiveGridGapStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media, space } = theme

//   return responsive(media, getResponsiveProp(props.gap), (gap) => ({
//     gridGap: gap ? toREM(space[gap]) : undefined,
//   }))
// }

// function responsiveGridGapXStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media, space } = theme

//   return responsive(media, getResponsiveProp(props.gapX), (gapX: number) => ({
//     columnGap: gapX ? toREM(space[gapX]) : undefined,
//   }))
// }

// function responsiveGridGapYStyle(props: ResponsiveGridStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media, space } = theme

//   return responsive(media, getResponsiveProp(props.gapY), (gapY: number) => ({
//     rowGap: gapY ? toREM(space[gapY]) : undefined,
//   }))
// }
