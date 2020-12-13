import { css } from 'styled-components'

import { Color } from '../utils'
import { color } from './colors'

const UMBRA_DEPTHS = [
  '0px 0px 0px 0px',
  '0px 2px 1px -1px', // depth1
  '0px 3px 1px -2px', // depth2
  '0px 3px 3px -2px', // depth3
  '0px 2px 4px -1px', // depth4
  '0px 3px 5px -1px', // depth5
  '0px 7px 8px -4px', // depth6
]

const PENUMBRA_DEPTHS = [
  '0px 0px 0px 0px',
  '0px 1px 1px 0px', // depth1
  '0px 2px 2px 0px', // depth2
  '0px 3px 4px 0px', // depth3
  '0px 4px 5px 0px', // depth4
  '0px 5px 8px 0px', // depth5
  '0px 6px 10px 0px', // depth6
]

const AMBIENCE_DEPTHS = [
  '0px 0px 0px 0px',
  '0px 1px 3px 0px', // depth1
  '0px 1px 5px 0px', // depth2
  '0px 1px 8px 0px', // depth3
  '0px 1px 10px 0px', // depth4
  '0px 1px 14px 0px', // depth5
  '0px 1px 18px 0px', // depth6
]

export type ShadowFactoryParams = {
  hue?: string
  ambience?: number
  umbra?: number
  penumbra?: number
}

const DEFAULT_SHADOW_SETTINGS = { hue: color.black, umbra: 0.2, penumbra: 0.14, ambience: 0.12 }
const DROP_SHADOW_SETTINGS = { hue: color.black, umbra: 0.5, penumbra: 0.3, ambience: 0.18 }
const FOCUS_SHADOW_SETTINGS = { hue: color.magenta, umbra: 0.5, penumbra: 0.3, ambience: 0.18 }

const shadowColor = (hue: string, opacity: number) =>
  Color.isColor(hue) ? Color(hue).alpha(opacity).string() : hue

const _getElevation = (depth = 0, params: ShadowFactoryParams = {}) => {
  const { hue, umbra, penumbra, ambience } = { ...DEFAULT_SHADOW_SETTINGS, ...params }

  return [
    `${UMBRA_DEPTHS[depth]} ${shadowColor(hue, umbra)}`,
    `${PENUMBRA_DEPTHS[depth]} ${shadowColor(hue, penumbra)}`,
    `${AMBIENCE_DEPTHS[depth]} ${shadowColor(hue, ambience)}`,
  ].join(', ')
}

// const umbraFactory = (d: number) => `0 ${d}px`
const shadowFactory = (params: ShadowFactoryParams = {}) => {
  params = { ...DEFAULT_SHADOW_SETTINGS, ...params }

  return {
    0: `${AMBIENCE_DEPTHS[1]} ${shadowColor(params.hue, params.ambience)}`,
    1: `${UMBRA_DEPTHS[1]} ${shadowColor(params.hue, params.umbra)}`,
    2: `${PENUMBRA_DEPTHS[4]} ${shadowColor(params.hue, params.penumbra)}`,
    3: `${AMBIENCE_DEPTHS[5]} ${shadowColor(params.hue, params.ambience)}`,
    depth0: _getElevation(0, params),
    depth1: _getElevation(1, params),
    depth2: _getElevation(2, params),
    depth3: _getElevation(3, params),
    depth4: _getElevation(4, params),
    depth5: _getElevation(5, params),
    depth6: _getElevation(6, params),
  }
}

const shadowLevels = shadowFactory()
export const focusShadow = shadowFactory(FOCUS_SHADOW_SETTINGS)

export const shadow = {
  levels: shadowLevels,
  get: (...depths: any[]) =>
    depths
      .reduce((acc, depth) => {
        if (shadowLevels[depth]) {
          acc.push(shadowLevels[depth])
        } else {
          acc.push(depth)
        }
        return acc
      }, [])
      .join(', '),
  bevel: (depth = 1, params: { highlight?: number; shadow?: number } = {}) => {
    const { highlight, shadow } = { ...{ highlight: 0.3, shadow: 0.2 }, ...params }
    return (
      `inset ${depth}px ${depth}px ${depth + 1}px 0 ${color
        .compute(color.white)
        .alpha(highlight)
        .string()}, ` +
      `inset -${depth}px -${depth}px ${depth + 1}px 0 ${color
        .compute(color.black)
        .alpha(shadow)
        .string()}`
    )
  },
  elevation: _getElevation,
  focusElevation: shadowFactory(FOCUS_SHADOW_SETTINGS),
}

export const focusDropShadow = {
  0: `0px 0px 2px ${shadowColor(FOCUS_SHADOW_SETTINGS.hue, FOCUS_SHADOW_SETTINGS.penumbra)}`,
  1: `0px 0px 4px ${shadowColor(FOCUS_SHADOW_SETTINGS.hue, FOCUS_SHADOW_SETTINGS.umbra)}`,
  2: `0px 0px 5px ${shadowColor(FOCUS_SHADOW_SETTINGS.hue, FOCUS_SHADOW_SETTINGS.penumbra)}`,
  3: `0px 0px 10px ${shadowColor(FOCUS_SHADOW_SETTINGS.hue, FOCUS_SHADOW_SETTINGS.umbra)}`,
}

export const dropShadow = {
  0: `0px 0px 2px ${shadowColor(DROP_SHADOW_SETTINGS.hue, DROP_SHADOW_SETTINGS.penumbra)}`,
  1: `0px 0px 4px ${shadowColor(DROP_SHADOW_SETTINGS.hue, DROP_SHADOW_SETTINGS.umbra)}`,
  2: `0px 0px 5px ${shadowColor(DROP_SHADOW_SETTINGS.hue, DROP_SHADOW_SETTINGS.penumbra)}`,
  3: `0px 0px 10px ${shadowColor(DROP_SHADOW_SETTINGS.hue, DROP_SHADOW_SETTINGS.umbra)}`,
}

export const shadowMixin = (...levels: (number | string)[]) => css`
  box-shadow: ${levels
    .reduce((acc, depth) => {
      if (shadowLevels[depth]) {
        acc.push(shadowLevels[depth])
      } else {
        acc.push(depth)
      }
      return acc
    }, [])
    .join(', ')};
`

export const dropShadowMixin = (...levels: number[]) => css`
  filter: ${levels
    .reduce((acc, depth) => {
      if (dropShadow[depth]) {
        acc.push(`drop-shadow(${dropShadow[depth]})`)
      } else {
        acc.push(`drop-shadow(${depth})`)
      }
      return acc
    }, [])
    .join(' ')};
`
