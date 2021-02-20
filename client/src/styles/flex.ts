import { FlexSizeProps, FlexStyleProps } from './types'
import { ThemeProps } from '../theme'
import { generateStyles } from './utils'

export const flexStyle = () => [
  flexBaseStyle,
  flexAlignStyle,
  flexDirectionStyle,
  flexJustifyStyle,
  flexSizeStyle,
  flexWrapStyle,
]
export const flexBaseStyle = () => [{ '&:not([hidden])': { display: 'flex' } }]
export const flexSizeStyle = generateStyles<FlexSizeProps & ThemeProps>('flex')
export const flexAlignStyle = generateStyles<FlexStyleProps & ThemeProps>('align')
export const flexDirectionStyle = generateStyles<FlexStyleProps & ThemeProps>('direction')
export const flexJustifyStyle = generateStyles<FlexStyleProps & ThemeProps>('justify')
export const flexWrapStyle = generateStyles<FlexStyleProps & ThemeProps>('wrap')
export const flexItemStyle = () => [{ minWidth: 0, minHeight: 0 }, flexSizeStyle]
