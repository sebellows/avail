import { Color } from '../../libs'
import { toREM } from '../../units'
import { ThemeProps } from '../types'
import { BLACK } from '../../../constants'
import { responsiveStyle } from '../../helpers'

import {
  BoxShadow,
  DropShadow,
  ResponsiveDropShadowStyleProps,
  ResponsiveShadowStyleProps,
  ShadowProps,
} from './types'

// const UMBRA_DEPTHS: BoxShadow[] = [
//   [0, 0, 0, 0],
//   [0, 2, 1, -1], // depth1
//   [0, 3, 1, -2], // depth2
//   [0, 3, 3, -2], // depth3
//   [0, 2, 4, -1], // depth4
//   [0, 3, 5, -1], // depth5
//   [0, 7, 8, -4], // depth6
// ]

// const PENUMBRA_DEPTHS: BoxShadow[] = [
//   [0, 0, 0, 0],
//   [0, 1, 1, 0], // depth1
//   [0, 2, 2, 0], // depth2
//   [0, 3, 4, 0], // depth3
//   [0, 4, 5, 0], // depth4
//   [0, 5, 8, 0], // depth5
//   [0, 6, 10, 0], // depth6
// ]

// const AMBIENCE_DEPTHS: BoxShadow[] = [
//   [0, 0, 0, 0],
//   [0, 1, 3, 0], // depth1
//   [0, 1, 5, 0], // depth2
//   [0, 1, 8, 0], // depth3
//   [0, 1, 10, 0], // depth4
//   [0, 1, 14, 0], // depth5
//   [0, 1, 18, 0], // depth6
// ]

const DEFAULT_SHADOW_SETTINGS = { hue: BLACK, umbra: 0.2, penumbra: 0.14, ambience: 0.12 }

function toBoxShadow(shadow: number[], color: string) {
  return `${shadow.map(toREM).join(' ')} ${color}`
}

function shadowColor(hue: string, opacity: number): string {
  return Color.isColor(hue) ? Color(hue).alpha(opacity).string() : hue
}

function shadowStyle(shadow: ShadowProps<BoxShadow>) {
  const { hue, umbra, penumbra, ambience } = DEFAULT_SHADOW_SETTINGS

  return {
    boxShadow: [
      toBoxShadow(shadow.umbra, shadowColor(hue, umbra)),
      toBoxShadow(shadow.penumbra, shadowColor(hue, penumbra)),
      toBoxShadow(shadow.ambience, shadowColor(hue, ambience)),
    ].join(', '),
  }
}

function dropShadowStyle(shadow: DropShadow) {
  return {
    filter: `drop-shadow(${toBoxShadow(shadow, shadowColor(BLACK, 0.18))})`,
  }
}

// export function shadowMixin(props: ResponsiveShadowStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media, shadows } = theme

//   return responsive(media, getResponsiveProp(props.shadow), (shadow: number) =>
//     shadowStyle(shadows[shadow]),
//   )
// }

export const shadow = responsiveStyle(
  'dropShadow',
  (shadow: number, theme: ResponsiveShadowStyleProps & ThemeProps) =>
    shadowStyle(theme.shadows[shadow]),
)

export const dropShadow = responsiveStyle(
  'dropShadow',
  (shadow: number, theme: ResponsiveDropShadowStyleProps & ThemeProps) =>
    dropShadowStyle(theme.dropShadows[shadow]),
)

// export function dropShadowMixin(props: ResponsiveDropShadowStyleProps & ThemeProps) {
//   const { theme } = props
//   const { media, dropShadows } = theme

//   return responsive(media, getResponsiveProp(props.dropShadow), (shadow: number) =>
//     dropShadowStyle(dropShadows[shadow]),
//   )
// }
