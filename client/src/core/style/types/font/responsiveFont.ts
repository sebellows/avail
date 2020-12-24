import { CSSObject } from 'styled-components'
import { ThemeFontSize, ThemeFontKey } from '../../../../theme'
import { getResponsiveProp, responsive } from '../../helpers'
import { toREM } from '../../units'
import { ThemeProps } from '../types'
import { ResponsiveFontProps } from './types'

/**
 * A utility function getting responsive font styles.
 * @beta Should not be used in production, as this might change.
 */
export function responsiveFont(
  fontKey: ThemeFontKey,
  props: ResponsiveFontProps & ThemeProps,
): CSSObject[] {
  const { size, theme, weight } = props
  const { fonts, media } = theme
  const { family, sizes, weights } = fonts[fontKey]
  const fontWeight = (weight && weights[weight]) || weights.regular

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const base = {
    position: 'relative',
    fontFamily: family,
    fontWeight,
    padding: '1px 0',
    margin: 0,

    // '&:before': {
    //   content: '',
    //   display: 'block',
    //   height: 0,
    // },

    // '&:after': {
    //   content: '',
    //   display: 'block',
    //   height: 0,
    // },

    '&&:not([hidden])': {
      display: 'block',
    },
  } as CSSObject

  const resp = responsive(media, getResponsiveProp(size), (sizeIndex: number) =>
    fontSize(sizes[sizeIndex] || defaultSize),
  )

  return [base, ...resp]
}

export function fontSize(size: ThemeFontSize): CSSObject {
  const negHeight = size.ascenderHeight + size.descenderHeight
  const capHeight = size.lineHeight - negHeight

  return {
    fontSize: toREM(size.fontSize),
    lineHeight: toREM(size.lineHeight),
    letterSpacing: toREM(size.letterSpacing),
    transform: `translateY(${toREM(size.descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${toREM(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& [data-avail-icon]': {
      fontSize: toREM(size.iconSize),
      margin: toREM((capHeight - size.iconSize) / 2),
    },
  }
}
