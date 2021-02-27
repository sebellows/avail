import { symbols } from './glossary'
import { DirectionKey } from './typings/styles'

/** Used to identify internal props applied inside a component function's JSX. */
export const PROPS_PREFIX = '$'

/** Global values almost all CSS properties can have applied. */
export const GLOBAL_PROP_VALUES = ['inherit', 'initial', 'unset']

export const PROP_DIRECTIONS: DirectionKey[] = ['Top', 'Right', 'Bottom', 'Left']
export const PROP_DIRECTIONS_WITH_XY: DirectionKey[] = PROP_DIRECTIONS.concat(['X', 'Y'])

// export type PropSymbol<P extends Partial<typeof symbols> = Partial<typeof symbols>> = keyof P
// export type IntPropSymbol<P extends Partial<typeof symbols> = Partial<typeof symbols>> = valueof<P>
// export type PropSymbols<P> = ConditionalPick<P, typeof symbols>

// /**
//  * Used for grabbing a selection of our defined symbol properties by a common string in their value.
//  * @example
//  * const marginProps = pickPropsByKey('margin')
//  * \//=> { m: '$margin', mx: '$marginX', ... }
//  */
// export const pickPropsByKey = (key: string): Pick<typeof symbols, keyof typeof symbols> => {
//   return pickBy(symbols, (v) => v.includes(key))
//   // return picked as Record<keyof typeof picked, valueof<typeof picked>>
//   // return picked
// }
// export const pickPropKeys = (key: string) => {
//   const picked = pickPropsByKey(key)
//   return Object.keys(picked) as PropSymbol<typeof picked>[]
// }
// export const pickIntPropKeys = (key: string) => {
//   const picked = pickPropsByKey(key)
//   return Object.values(picked) as IntPropSymbol<typeof picked>[]
// }

export const PROPS_MAP: Map<string, string> = new Map(Object.entries(symbols))

const reversedSymbols = Object.entries(symbols).reverse()
export const $PROPS_MAP: Map<string, string> = new Map(reversedSymbols)

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
