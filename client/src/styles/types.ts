/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSObject, Primitive, valueof } from '../types'
import { Theme, ThemeProps, ThemeSizeKey } from '../theme'
import { PROP_ALIAS_MAP } from './constants'

type PropAliasKey = keyof typeof PROP_ALIAS_MAP
export type StyleType<T = any, TTheme extends Theme = Theme> = {
  [P in PropAliasKey]: PropValueType<T>
} &
  ThemeProps<TTheme>

export type GlobalPropValueKey = 'inherit' | 'initial' | 'unset'

export type PropValueType<T = any> = T | T[] | CSSObject<T>

/** START - Source: Treat */
export type ThemeRef = string
export type ClassRef = string

type CSSModuleValue = Primitive | CSSModuleObject | CSSModuleArray

interface CSSModuleObject {
  [index: string]: CSSModuleValue
  [index: number]: CSSModuleValue
}
interface CSSModuleArray extends Array<CSSModuleValue> {}

export type CSSModule = CSSModuleObject | CSSModuleArray
/** END - Source: Treat */

export type Direction = 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y'

// offsetX, offsetY, blurRadius, spreadRadius
export type BoxShadow = [number, number, number, number]

export type FontKey = 'code' | 'heading' | 'label' | 'text'
export type FontStyleKey = (GlobalPropValueKey & 'normal') | 'italic' | 'oblique' | 'oblique *deg'
export type FontWeightKey =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type TextAlignKey = 'left' | 'right' | 'center' | 'justify' | 'initial'
/** @link https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow */
export type TextOverflowKey = 'clip' | 'ellipsis' | string
export type WhiteSpaceKey =
  | (GlobalPropValueKey & 'normal')
  | 'nowrap'
  | 'pre'
  | 'pre-wrap'
  | 'pre-line'
  | 'break-spaces'

export interface FontSizeProps {
  size?: PropValueType<string>
}
export interface FontWeightProps {
  fontWeight?: PropValueType<number | FontWeightKey>
}
/** Shorthand for FontSizeProps & FontWeightProps */
export interface FontStyleProps extends FontSizeProps, FontWeightProps {
  fontStyle?: string
}

export interface TextAlignProps {
  textAlign?: PropValueType<TextAlignKey>
}
export interface TextTruncateProps {
  truncate?: PropValueType<boolean>
}

export interface FontSizeStyleProps {
  $size?: PropValueType<string>
}

export interface FontWeightStyleProps {
  $fontWeight?: PropValueType<number | FontWeightKey>
}
/** Shorthand for FontSizeStyleProps & FontWeightStyleProps */
export interface FontStyleStyleProps extends FontSizeStyleProps, FontWeightStyleProps {
  $fontStyle?: string
}

export interface TextAlignStyleProps {
  $textAlign?: PropValueType<TextAlignKey>
}
export interface TextTruncateStyleProps {
  $truncate?: PropValueType<boolean>
}

export interface SpaceProps {
  space?: PropValueType<number>
}
export interface SpaceStyleProps {
  $space?: PropValueType<number>
}

export interface BorderProps {
  border?: PropValueType<string>
  borderX?: PropValueType<string>
  borderY?: PropValueType<string>
  borderTop?: PropValueType<string>
  borderRight?: PropValueType<string>
  borderBottom?: PropValueType<string>
  borderLeft?: PropValueType<string>
}
export interface BorderStyleProps {
  $border?: PropValueType<string>
  $borderX?: PropValueType<string>
  $borderY?: PropValueType<string>
  $borderTop?: PropValueType<string>
  $borderRight?: PropValueType<string>
  $borderBottom?: PropValueType<string>
  $borderLeft?: PropValueType<string>
}

// type StyleProps<Props, ValueType> = Partial<Record<keyof Props, PropValueType<ValueType>>>
// type IntStyleProps<Props, ValueType, K extends keyof Props = keyof Props> = Partial<
//   Record<K, PropValueType<ValueType>>
// >

// const _MarginProps = pickPropsByKey('margin')
// export type MarginProps = StyleProps<typeof _MarginProps, number>
// export type MarginStyleProps = IntStyleProps<typeof _MarginProps, number>

// const _PaddingProps = pickPropsByKey('padding')
// export type PaddingProps = StyleProps<typeof _PaddingProps, number>
// export type PaddingStyleProps = IntStyleProps<typeof _PaddingProps, number>

export interface MarginProps {
  m?: PropValueType<number>
  mx?: PropValueType<number>
  my?: PropValueType<number>
  mt?: PropValueType<number>
  mr?: PropValueType<number>
  mb?: PropValueType<number>
  ml?: PropValueType<number>
  margin?: PropValueType<number>
  marginX?: PropValueType<number>
  marginY?: PropValueType<number>
  marginTop?: PropValueType<number>
  marginRight?: PropValueType<number>
  marginBottom?: PropValueType<number>
  marginLeft?: PropValueType<number>
}

export interface MarginStyleProps {
  $margin?: PropValueType<number>
  $marginX?: PropValueType<number>
  $marginY?: PropValueType<number>
  $marginTop?: PropValueType<number>
  $marginRight?: PropValueType<number>
  $marginBottom?: PropValueType<number>
  $marginLeft?: PropValueType<number>
}

export interface PaddingProps {
  p?: PropValueType<number>
  px?: PropValueType<number>
  py?: PropValueType<number>
  pt?: PropValueType<number>
  pr?: PropValueType<number>
  pb?: PropValueType<number>
  pl?: PropValueType<number>
  padding?: PropValueType<number>
  paddingX?: PropValueType<number>
  paddingY?: PropValueType<number>
  paddingTop?: PropValueType<number>
  paddingRight?: PropValueType<number>
  paddingBottom?: PropValueType<number>
  paddingLeft?: PropValueType<number>
}

export interface PaddingStyleProps {
  $padding?: PropValueType<number>
  $paddingX?: PropValueType<number>
  $paddingY?: PropValueType<number>
  $paddingTop?: PropValueType<number>
  $paddingRight?: PropValueType<number>
  $paddingBottom?: PropValueType<number>
  $paddingLeft?: PropValueType<number>
}

export interface BorderRadiusProps {
  radius?: PropValueType<number>
  radiusTop?: PropValueType<number>
  radiusRight?: PropValueType<number>
  radiusBottom?: PropValueType<number>
  radiusLeft?: PropValueType<number>
}

export interface RadiusStyleProps {
  $radius?: PropValueType<string | number>
  $radiusTop?: PropValueType<string | number>
  $radiusRight?: PropValueType<string | number>
  $radiusBottom?: PropValueType<string | number>
  $radiusLeft?: PropValueType<string | number>
}

export interface ShadowProps {
  shadow?: number | number[]
}
export interface ShadowStyleProps {
  $shadow?: number | number[]
}

export type BoxSizing = 'content' | 'border'
export type BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'
export type BoxHeight = 'stretch' | 'fill'
export type BoxOverflow = 'visible' | 'hidden' | 'auto'
export interface BoxProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: BoxHeight | BoxHeight[]
  overflow?: BoxOverflow | BoxOverflow[]
  sizing?: BoxSizing | BoxSizing[]
}
export interface BoxStyleProps {
  $display?: BoxDisplay | BoxDisplay[]
  $height?: BoxHeight | BoxHeight[]
  $overflow?: BoxOverflow | BoxOverflow[]
  $sizing?: BoxSizing | BoxSizing[]
}

// Flex
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'
export interface FlexProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}
export interface FlexStyleProps {
  $align?: FlexAlign | FlexAlign[]
  $direction?: FlexDirection | FlexDirection[]
  $justify?: FlexJustify | FlexJustify[]
  $wrap?: FlexWrap | FlexWrap[]
}

// FlexItem
export interface FlexSizeProps {
  flex?: PropValueType<number>
}
export interface FlexSizeStyleProps {
  $flex?: PropValueType<number>
}

// Grid
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoCols = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense'
export interface GridProps {
  autoRows?: GridAutoRows | GridAutoRows[]
  autoCols?: GridAutoCols | GridAutoCols[]
  autoFlow?: GridAutoFlow | GridAutoFlow[]
  columns?: number | number[]
  gap?: number | number[] | string | string[]
  gapX?: number | number[] | string | string[]
  gapY?: number | number[] | string | string[]
  rows?: number | number[]
}
export interface GridStyleProps {
  $autoRows?: GridAutoRows | GridAutoRows[]
  $autoCols?: GridAutoCols | GridAutoCols[]
  $autoFlow?: GridAutoFlow | GridAutoFlow[]
  $columns?: number | number[]
  $gap?: number | number[] | string | string[]
  $gapX?: number | number[] | string | string[]
  $gapY?: number | number[] | string | string[]
  $rows?: number | number[]
}

// GridItem
type GridItemColumn = 'auto' | 'full' | number
type GridItemColumnStart = 'auto' | number
type GridItemColumnEnd = 'auto' | number
type GridItemRow = 'auto' | 'full' | number
type GridItemRowStart = 'auto' | number
type GridItemRowEnd = 'auto' | number

export interface GridItemProps {
  column?: GridItemColumn | GridItemColumn[]
  columnStart?: GridItemColumnStart | GridItemColumnStart[]
  columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  row?: GridItemRow | GridItemRow[]
  rowStart?: GridItemRowStart | GridItemRowStart[]
  rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}
export interface GridItemStyleProps {
  $column?: GridItemColumn | GridItemColumn[]
  $columnStart?: GridItemColumnStart | GridItemColumnStart[]
  $columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  $row?: GridItemRow | GridItemRow[]
  $rowStart?: GridItemRowStart | GridItemRowStart[]
  $rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}

export type SizePropKey =
  | GlobalPropValueKey
  | number
  | number[]
  | 'min-content'
  | 'max-content'
  | ThemeSizeKey

// Width
export interface WidthProps {
  width?: SizePropKey
}
export interface MaxWidthProps {
  maxWidth?: SizePropKey
}
export interface MinWidthProps {
  minWidth?: SizePropKey
}
export interface WidthStyleProps {
  $width?: SizePropKey
}
export interface MaxWidthStyleProps {
  $maxWidth?: SizePropKey
}
export interface MinWidthStyleProps {
  $minWidth?: SizePropKey
}
