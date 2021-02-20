/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProps } from '../theme'
import { get, isUnit, toREM } from '../utils'
import { generateStyles } from './utils'
import { MaxWidthStyleProps, MinWidthStyleProps, SizePropKey, WidthStyleProps } from './types'

export function isValidPropValue(value: string) {
  return (
    ['inherit', 'initial', 'unset', 'min-content', 'max-content', 'auto'].includes(value) ||
    isUnit(value)
  )
}

export const widthSizeStyle = () => [widthStyle, maxWidthStyle, minWidthStyle]

export const widthStyle = generateStyles<WidthStyleProps & ThemeProps>(
  'width',
  (value: SizePropKey, i, props) => {
    const size = get(props.theme, `container.${value}`) ?? value
    return typeof size === 'number' ? toREM(size) : 'auto'
  },
)

export const maxWidthStyle = generateStyles<MaxWidthStyleProps & ThemeProps>(
  'maxWidth',
  (value: SizePropKey, i, props) => {
    const size = get(props.theme, `container.${value}`) ?? value
    return typeof size === 'number' ? toREM(size) : 'none'
  },
)

export const minWidthStyle = generateStyles<MinWidthStyleProps & ThemeProps>(
  'minWidth',
  (value: SizePropKey, i, props) => {
    const size = get(props.theme, `container.${value}`) ?? value
    return typeof size === 'number' ? toREM(size) : 'initial'
  },
)
