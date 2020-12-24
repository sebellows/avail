import { responsiveStyle } from '../../helpers'
import {
  GridItemRow,
  GridItemRowStart,
  GridItemRowEnd,
  GridItemColumn,
  GridItemColumnStart,
  GridItemColumnEnd,
  ResponsiveGridItemStyleProps,
} from './types'

export function responsiveGridItemStyle() {
  return [
    gridItemRow,
    gridItemRowStart,
    gridItemRowEnd,
    gridItemColumn,
    gridItemColumnStart,
    gridItemColumnEnd,
  ]
}

const GRID_ITEM_ROW = {
  auto: 'auto',
  full: '1 / -1',
}

const GRID_ITEM_COLUMN = {
  auto: 'auto',
  full: '1 / -1',
}

const gridItemRow = responsiveStyle<ResponsiveGridItemStyleProps>(
  'row',
  (row: GridItemRow | keyof typeof GRID_ITEM_ROW) => {
    return typeof row === 'number'
      ? { gridRow: `span ${row} / span ${row}` }
      : { gridRow: GRID_ITEM_ROW[row] }
  },
)

const gridItemRowStart = responsiveStyle<ResponsiveGridItemStyleProps>(
  'rowStart',
  (rowStart: GridItemRowStart) => ({
    gridRowStart: rowStart,
  }),
)

const gridItemRowEnd = responsiveStyle<ResponsiveGridItemStyleProps>(
  'rowEnd',
  (rowEnd: GridItemRowEnd) => ({
    gridRowEnd: rowEnd,
  }),
)

const gridItemColumn = responsiveStyle<ResponsiveGridItemStyleProps>(
  'column',
  (column: GridItemColumn | keyof typeof GRID_ITEM_COLUMN) => {
    return typeof column === 'number'
      ? { gridColumn: `span ${column} / span ${column}` }
      : { gridColumn: GRID_ITEM_COLUMN[column] }
  },
)

const gridItemColumnStart = responsiveStyle<ResponsiveGridItemStyleProps>(
  'columnStart',
  (columnStart: GridItemColumnStart) => ({
    gridColumnStart: columnStart,
  }),
)

const gridItemColumnEnd = responsiveStyle<ResponsiveGridItemStyleProps>(
  'columnEnd',
  (columnEnd: GridItemColumnEnd) => ({
    gridColumnEnd: columnEnd,
  }),
)

// function responsiveGridItemRowStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.row), (row) => {
//     if (typeof row === 'number') {
//       return { gridRow: `span ${row} / span ${row}` }
//     }

//     return { gridRow: GRID_ITEM_ROW[row] }
//   })
// }

// function responsiveGridItemRowStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.rowStart), (rowStart) => ({
//     gridRowStart: rowStart,
//   }))
// }

// function responsiveGridItemRowEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.rowEnd), (rowEnd) => ({ gridRowEnd: rowEnd }))
// }

// function responsiveGridItemColumnStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.column), (column) => {
//     if (typeof column === 'number') {
//       return { gridColumn: `span ${column} / span ${column}` }
//     }

//     return { gridColumn: GRID_ITEM_COLUMN[column] }
//   })
// }

// function responsiveGridItemColumnStartStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.columnStart), (columnStart) => ({
//     gridColumnStart: columnStart,
//   }))
// }

// function responsiveGridItemColumnEndStyle(props: ResponsiveGridItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.columnEnd), (columnEnd) => ({
//     gridColumnEnd: columnEnd,
//   }))
// }
