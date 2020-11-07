import { css } from 'styled-components'

import { SPACERS } from '../constants'
import { isNil, isString } from '../utils'
import { isUnitless, maybeApplyUnit, toREM } from './units'

export const spacers = {
  ...SPACERS,
  none: SPACERS[0],
  xs: SPACERS[1],
  sm: SPACERS[2],
  base: SPACERS[3],
  lg: SPACERS[4],
  xl: SPACERS[5],
  auto: 'auto',
}

const directions = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  x: 'left right',
  y: 'top bottom',
}

export function generateSpacer(prop: string) {
  function makeRule(dir: string, ...sizes: any[]) {
    let spacing = '0'
    let rule = ''

    spacing = sizes.map((sz) => (isUnitless(sz) ? toREM(spacers[sz]) ?? toREM(sz) : sz)).join(' ')

    if (!dir) {
      rule = `${prop}: ${spacing};`
    } else {
      if (dir === 'x' || dir === 'y') {
        const [start, end] = directions[dir].split(' ')
        rule = `${prop}-${start}: ${spacing}; ${prop}-${end}: ${spacing};`
      } else {
        rule = `${prop}-${directions[dir]}: ${spacing};`
      }
    }

    return css`
      ${rule}
    `
  }

  return {
    all: (...sizes: any[]) => makeRule(null, ...sizes),
    top: (...sizes: any[]) => makeRule('top', ...sizes),
    right: (...sizes: any[]) => makeRule('right', ...sizes),
    bottom: (...sizes: any[]) => makeRule('bottom', ...sizes),
    left: (...sizes: any[]) => makeRule('left', ...sizes),
    x: (...sizes: any[]) => makeRule('x', ...sizes),
    y: (...sizes: any[]) => makeRule('y', ...sizes),
  }
}

export const spacerMixin = (...keys: (number | string)[]) => {
  return keys
    .reduce((acc, key) => {
      acc.push(isString(key) && !isNil(spacers[key]) ? toREM(spacers[key]) : maybeApplyUnit(key))
      return acc
    }, [])
    .join(' ')
}
