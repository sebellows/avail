import symbols from './glossary'
import { DirectionKey } from './typings/styles'

/** Used to identify internal props applied inside a component function's JSX. */
export const PROPS_PREFIX = '$'

/** Global values almost all CSS properties can have applied. */
export const GLOBAL_PROP_VALUES = ['inherit', 'initial', 'unset']

export const PROP_DIRECTIONS: DirectionKey[] = ['Top', 'Right', 'Bottom', 'Left']
export const PROP_DIRECTIONS_WITH_XY: DirectionKey[] = PROP_DIRECTIONS.concat(['X', 'Y'])

// i.e., `[['paddingTop' => '$paddingTop']]`
const intLookup = Object.values(symbols).reduce((acc, prop) => {
  acc.push([prop, `${PROPS_PREFIX}${prop}`])
  return acc
}, [])
export const PROPS_MAP: Map<string, string> = new Map(intLookup)

const intReverseLookup = Object.values(symbols).reduce((acc, prop) => {
  acc.push([`${PROPS_PREFIX}${prop}`, prop])
  return acc
}, [])
export const $PROPS_MAP: Map<string, string> = new Map(intReverseLookup)

export const PROP_ALIAS_MAP: Map<string, string[]> = new Map(
  Object.entries({
    // Style/Appearance
    background: ['background'],
    color: ['color'],

    border: ['border'],
    borderX: ['borderLeft', 'borderRight'],
    borderY: ['borderTop', 'borderBottom'],
    borderTop: ['borderTop'],
    borderRight: ['borderRight'],
    borderBottom: ['borderBottom'],
    borderLeft: ['borderLeft'],

    radius: ['borderRadius'],
    radiusTop: ['borderRadiusTopLeft', 'borderRadiusTopRight'],
    radiusRight: ['borderRadiusTopRight', 'borderRadiusBottomRight'],
    radiusBottom: ['borderRadiusBottomLeft', 'borderRadiusBottomRight'],
    radiusLeft: ['borderRadiusTopLeft', 'borderRadiusBottomRight'],

    shadow: ['boxShadow'],

    // Grid
    columns: ['gridTemplateColumns'],
    rows: ['gridTemplateRows'],
    autoFlow: ['gridAutoFlow'],
    autoRows: ['gridAutoRows'],
    autoCols: ['gridAutoColumns'],
    gap: ['gap'],
    gapX: ['columnGap'],
    gapY: ['rowGap'],
    row: ['gridRow'],
    rowStart: ['gridRowStart'],
    rowEnd: ['gridRowEnd'],
    column: ['gridColumn'],
    columnStart: ['gridColumnStart'],
    columnEnd: ['gridColumnEnd'],

    // Flex
    flex: ['flex'],
    direction: ['flexDirection'],
    wrap: ['flexWrap'],
    align: ['alignItems'],
    justify: ['justifyContent'],

    // Fonts & Text
    fontFamily: ['fontFamily'],
    fontSize: ['fontSize'],
    fontStyle: ['fontStyle'],
    fontWeight: ['fontWeight'],
    textAlign: ['textAlign'],
    textOverflow: ['textOverflow'],
    whiteSpace: ['whiteSpace'],

    // Box
    vAlign: ['verticalAlign'],
    boxSizing: ['boxSizing'],
    display: ['display'],
    overflow: ['overflow'],
    height: ['height'],
    maxHeight: ['maxHeight'],
    width: ['width'],
    maxWidth: ['maxWidth'],
    zIndex: ['zIndex'],

    // Spacing
    margin: ['margin'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    marginTop: ['marginTop'],
    marginRight: ['marginRight'],
    marginBottom: ['marginBottom'],
    marginLeft: ['marginLeft'],
    padding: ['padding'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    paddingTop: ['paddingTop'],
    paddingRight: ['paddingRight'],
    paddingBottom: ['paddingBottom'],
    paddingLeft: ['paddingLeft'],
  }),
)
