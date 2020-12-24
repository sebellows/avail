import { TextAlign } from './types'
import { getResponsiveProp, responsive } from '../../helpers'
import { ThemeProps } from '../types'

/**
 * Get responsive text align styles.
 * @beta Should not be used in production, as this might change.
 */
export function responsiveTextAlignStyle(props: { align?: TextAlign | TextAlign[] } & ThemeProps) {
  const { theme } = props

  return responsive(theme.media, getResponsiveProp(props.align), (textAlign: TextAlign) => {
    return { textAlign }
  })
}
