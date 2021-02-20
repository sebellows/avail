import { ThemeProps } from '../theme'
import { generateStyles } from './utils'
import { GridItemStyleProps, GridStyleProps } from './types'

const GRID_CSS = {
  '&:not([hidden])': { display: 'grid' },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const GRID_AUTO_COLUMNS = {
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

export const gridStyle = () => [
  GRID_CSS,
  gridAutoFlowStyle,
  gridAutoRowsStyle,
  gridAutoColsStyle,
  gridColumnsStyle,
  gridRowsStyle,
  gridGapStyle,
  gridGapXStyle,
  gridGapYStyle,
]
export const gridAutoFlowStyle = generateStyles<GridStyleProps & ThemeProps>('gridAutoFlow')
export const gridAutoRowsStyle = generateStyles<GridStyleProps & ThemeProps>(
  'gridAutoRows',
  (autoRows) => autoRows && GRID_AUTO_ROWS[autoRows],
)
export const gridAutoColsStyle = generateStyles<GridStyleProps & ThemeProps>(
  'gridAutoColumns',
  (autoCols) => autoCols && GRID_AUTO_COLUMNS[autoCols],
)
export const gridColumnsStyle = generateStyles<GridStyleProps & ThemeProps>(
  'gridTemplateColumns',
  (columns) => columns && `repeat(${columns}, minmax(0,1fr));`,
)
export const gridRowsStyle = generateStyles<GridStyleProps & ThemeProps>(
  'gridTemplateRows',
  (rows) => {
    console.log('rows', rows)
    return rows && `repeat(${rows}, minmax(0,1fr));`
  },
)
export const gridGapStyle = generateStyles<GridStyleProps & ThemeProps>('gap')
export const gridGapXStyle = generateStyles<GridStyleProps & ThemeProps>('columnGap')
export const gridGapYStyle = generateStyles<GridStyleProps & ThemeProps>('rowGap')

export const gridItemStyle = () => [
  gridItemRowStyle,
  gridItemRowStartStyle,
  gridItemRowEndStyle,
  gridItemColumnStyle,
  gridItemColumnStartStyle,
  gridItemColumnEndStyle,
]
export const gridItemRowStyle = generateStyles<GridItemStyleProps & ThemeProps>('gridRow')
export const gridItemRowStartStyle = generateStyles<GridItemStyleProps & ThemeProps>('gridRowStart')
export const gridItemRowEndStyle = generateStyles<GridItemStyleProps & ThemeProps>('gridRowEnd')
export const gridItemColumnStyle = generateStyles<GridItemStyleProps & ThemeProps>('gridColumn')
export const gridItemColumnStartStyle = generateStyles<GridItemStyleProps & ThemeProps>(
  'gridColumnStart',
)
export const gridItemColumnEndStyle = generateStyles<GridItemStyleProps & ThemeProps>(
  'gridColumnEnd',
)
