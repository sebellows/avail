import { css } from 'styled-components'

import { BORDER_RADIUS, BORDER_RADIUS_SM, BORDER_RADIUS_LG } from '../constants'
import { toREM } from './units'

export const radius = {
  none: '0',
  base: toREM(BORDER_RADIUS),
  sm: toREM(BORDER_RADIUS_SM),
  lg: toREM(BORDER_RADIUS_LG),
  pill: '50rem',
  circle: '50%',
}

export const radiusMixin = (...keys: string[]) => css`
  border-radius: ${keys
    .reduce((acc, key) => {
      acc.push(radius[key])
      return acc
    }, [])
    .join(' ')};
`
