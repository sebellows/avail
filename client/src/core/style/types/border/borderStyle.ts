import { responsiveStyle } from '../../helpers'
import { ResponsiveBorderStyleProps } from './types'

const BORDER_VALUE = '1px solid var(--card-border-color)'

export function responsiveBorderStyle() {
  return [border, borderTop, borderRight, borderBottom, borderLeft]
}

const border = responsiveStyle<ResponsiveBorderStyleProps>('border', BORDER_VALUE, 0)
const borderTop = responsiveStyle<ResponsiveBorderStyleProps>('borderTop', BORDER_VALUE, 0)
const borderRight = responsiveStyle<ResponsiveBorderStyleProps>('borderRight', BORDER_VALUE, 0)
const borderBottom = responsiveStyle<ResponsiveBorderStyleProps>('borderBottom', BORDER_VALUE, 0)
const borderLeft = responsiveStyle<ResponsiveBorderStyleProps>('borderLeft', BORDER_VALUE, 0)
