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

export const radiusMixin = (...keys: any[]) => {
  if (!keys.length) {
    keys = ['base']
  }
  return css`
    border-radius: ${keys
      .reduce((acc, key) => {
        if (typeof key === 'number') {
          acc.push(key > 0 ? toREM(parseInt('' + key, 10)) : 0)
        } else if (typeof key === 'string' && key in radius) {
          acc.push(radius[key])
        } else {
          acc.push(key)
        }
        return acc
      }, [])
      .join(' ')};
  `
}
