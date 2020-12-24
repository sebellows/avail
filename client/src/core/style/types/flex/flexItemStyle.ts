import { responsiveStyle } from '../../helpers'
import { ResponsiveFlexItemStyleProps } from './types'

export function flexItemStyle() {
  return [{ minWidth: 0, minHeight: 0 }, flexItem]
}

export const flexItem = responsiveStyle<ResponsiveFlexItemStyleProps>(
  'flex',
  (flex: number | string) => ({ flex }),
)

// export function responsiveFlexItemStyle(props: ResponsiveFlexItemStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media } = theme

//   return responsive(media, getResponsiveProp(props.flex), (flex) => ({ flex }))
// }
