import { responsiveStyle } from '../../helpers'
import { FlexAlign, FlexDirection, FlexJustify, FlexWrap, ResponsiveFlexStyleProps } from './types'

export function responsiveFlexStyle() {
  return [flexBaseStyle, flexAlign, flexWrap, flexJustify, flexDirection]
}

function flexBaseStyle() {
  return { '&:not([hidden])': { display: 'flex' } }
}

const flexAlign = responsiveStyle<ResponsiveFlexStyleProps>('align', (align: FlexAlign) => ({
  alignItems: align,
}))
const flexWrap = responsiveStyle<ResponsiveFlexStyleProps>('wrap', (wrap: FlexWrap) => ({
  flexWrap: wrap,
}))
const flexJustify = responsiveStyle<ResponsiveFlexStyleProps>(
  'justify',
  (justify: FlexJustify) => ({ flexJustify: justify }),
)
const flexDirection = responsiveStyle<ResponsiveFlexStyleProps>(
  'direction',
  (direction: FlexDirection) => ({ flexDirection: direction }),
)

// export function responsiveFlexAlignStyle(
//   props: ResponsiveFlexStyleProps & ThemeProps
// ): CSSObject[] {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.align), (align) => {
//     return {alignItems: align}
//   })
// }

// export function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject[] {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.wrap), (wrap) => {
//     return {flexWrap: wrap}
//   })
// }

// export function responsiveFlexJustifyStyle(
//   props: ResponsiveFlexStyleProps & ThemeProps
// ): CSSObject[] {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.justify), (justify) => {
//     return {justifyContent: justify}
//   })
// }

// export function responsiveFlexDirectionStyle(
//   props: ResponsiveFlexStyleProps & ThemeProps
// ): CSSObject[] {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.direction), (direction) => {
//     return {flexDirection: direction}
//   })
// }
