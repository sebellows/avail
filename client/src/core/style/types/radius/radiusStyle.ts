import { getResponsiveProp, responsive } from '../../helpers'
import { toREM } from '../../units'
import { ThemeProps } from '../types'
import { ResponsiveRadiusProps } from './types'

export const radius = {
  none: 0,
  base: 4,
  sm: 3,
  lg: 5,
  pill: 800,
  circle: '50%',
}

export function radiusMixin(...keys: any[]) {
  if (!keys.length) {
    keys = ['base']
  }
  return {
    borderRadius: keys
      .reduce((acc, key) => {
        if (typeof key === 'number') {
          acc.push(key > 0 ? toREM(key) : 0)
        } else if (typeof key === 'string' && key in radius) {
          acc.push(radius[key])
        } else {
          acc.push(key)
        }
        return acc
      }, [])
      .join(' '),
  }
}

export function responsiveRadiusStyle(props: ResponsiveRadiusProps & ThemeProps) {
  const { theme } = props
  const { media, radius } = theme

  return responsive(media, getResponsiveProp(props.radius), (radiusKey: number) => ({
    borderRadius: toREM(radius[radiusKey]),
  }))
}
