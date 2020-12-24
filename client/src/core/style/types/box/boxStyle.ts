import { Property } from 'csstype'
import { responsiveStyle } from '../../helpers'
import { BoxDisplay, BoxOverflow, ResponsiveBoxStyleProps } from './types'

const BOX_SIZING: { [key: string]: Property.BoxSizing } = {
  content: 'content-box',
  border: 'border-box',
}

const BOX_HEIGHT = {
  stretch: 'stretch',
  fill: '100%',
}

export function responsiveBoxStyle() {
  return [boxSizing, boxHeight, boxOverflow, boxDisplay]
}

const boxDisplay = responsiveStyle<ResponsiveBoxStyleProps>('display', (display: BoxDisplay) => ({
  '&:not([hidden])': { display },
}))

const boxSizing = responsiveStyle<ResponsiveBoxStyleProps>(
  'sizing',
  (sizing: keyof typeof BOX_SIZING) => ({
    boxSizing: BOX_SIZING[sizing],
  }),
)

const boxHeight = responsiveStyle<ResponsiveBoxStyleProps>(
  'height',
  (height: keyof typeof BOX_HEIGHT) => ({
    height: BOX_HEIGHT[height],
  }),
)

const boxOverflow = responsiveStyle<ResponsiveBoxStyleProps>(
  'overflow',
  (overflow: BoxOverflow) => ({
    overflow,
  }),
)

// function responsiveBoxDisplayStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.display), (display: BoxDisplay) => ({
//     '&:not([hidden])': {display},
//   }))
// }

// function responsiveBoxSizingStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.sizing), (sizing: keyof typeof BOX_SIZING) => ({
//     boxSizing: BOX_SIZING[sizing],
//   }))
// }

// function responsiveBoxHeightStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.height), (height: keyof typeof BOX_HEIGHT) => ({
//     height: BOX_HEIGHT[height],
//   }))
// }

// function responsiveBoxOverflowStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
//   const {theme} = props
//   const {media} = theme

//   return responsive(media, getResponsiveProp(props.overflow), (overflow: BoxOverflow) => ({
//     overflow,
//   }))
// }
