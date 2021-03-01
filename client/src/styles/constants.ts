import { symbols } from './glossary'
import { DirectionKey } from './typings/styles'

/** Used to identify internal props applied inside a component function's JSX. */
export const PROPS_PREFIX = '$'

/** Global values almost all CSS properties can have applied. */
export const GLOBAL_PROP_VALUES = ['inherit', 'initial', 'unset']

/**
 * Directions used for generating alternate properties that apply to sides/directions
 * (i.e., `padding`, `margin`, `border-width`, `border-radius`, etc.).
 * `null` for the first is necessary during interation as it allows generating of
 * non-direction/default properties, such as `padding` instead of `padding-*`.
 */
export const PROP_DIRECTIONS: DirectionKey[] = [null, 'Top', 'Right', 'Bottom', 'Left']

/**
 * Adds support for generating shorthand utility properties for supplying horizontal &
 * vertical values such as `padding-left: 1rem; padding-right: 1rem;`.
 */
export const PROP_DIRECTIONS_WITH_XY: DirectionKey[] = PROP_DIRECTIONS.concat(['X', 'Y'])

/** A map of public property keys and their corresponding internal internal keys, containing `$` prefix. */
export const PROPS_MAP: Map<string, string> = new Map(Object.entries(symbols))

/** A map of internal `$` keys with corresponding public property keys. */
const reversedSymbols = Object.entries(symbols).reverse()
export const $PROPS_MAP: Map<string, string> = new Map(reversedSymbols)

/**
 * Map for accessing CSS properties by keys in our `symbols` glossary.
 */
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
    sizing: ['boxSizing'],
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

    // Spacing aliases
    m: ['margin'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mr: ['marginRight'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    p: ['padding'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pr: ['paddingRight'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
  }),
)
