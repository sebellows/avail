import { BoxStyleProps } from './types'
import { ThemeProps } from '../theme'
import { generateStyles } from './utils'

export const boxStyle = () => [boxDisplayStyle, boxSizingStyle, boHeightStyle, boxOverflowStyle]
export const boxDisplayStyle = generateStyles<BoxStyleProps & ThemeProps>('display')
export const boxSizingStyle = generateStyles<BoxStyleProps & ThemeProps>('sizing', (sizing) =>
  sizing === 'content' ? 'content-box' : 'border-box',
)
export const boHeightStyle = generateStyles<BoxStyleProps & ThemeProps>('height')
export const boxOverflowStyle = generateStyles<BoxStyleProps & ThemeProps>('overflow')
