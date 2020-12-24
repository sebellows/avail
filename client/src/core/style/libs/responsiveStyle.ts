import { getResponsiveProp, responsive } from '../helpers'
import { ThemeProps } from '../types'

export function responseStyle<T>(
  propName: string,
  propValue: any = 'inherit',
  defaultValue: any = 'inherit',
) {
  return (props: T & ThemeProps) => {
    const { theme } = props
    const { media } = theme

    return responsive(media, getResponsiveProp(props[propName]), (value) =>
      value ? { '&&': { [propName]: propValue } } : { '&&': { [propName]: defaultValue } },
    )
  }
}
