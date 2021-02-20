import { CSSObject } from 'styled-components'
import { get, toREM } from '../utils'
import { ThemeProps } from '../theme'
import { generateStyles, generateDirectionalStyles } from './utils'
import { BorderStyleProps, MarginStyleProps, PaddingStyleProps, RadiusStyleProps } from './types'

export function getSpaceValue<P = {}>(
  value: number,
  props: P & ThemeProps,
  defaultValue = 0,
): string {
  const spaces = get(props, 'theme.space')
  const spaceValue = spaces.indexOf(value) !== -1 ? spaces[spaces.indexOf(value)] : defaultValue
  return toREM(spaceValue)
}

export const marginStyle = generateDirectionalStyles<MarginStyleProps & ThemeProps>(
  'margin',
  (value, i, props) => getSpaceValue(value, props),
  true,
)

export const paddingStyle = generateDirectionalStyles<PaddingStyleProps & ThemeProps>(
  'padding',
  (value, i, props) => getSpaceValue(value, props),
  true,
)

export const getBorderStyle = (
  value: boolean | string,
  i: number,
  props: BorderStyleProps & ThemeProps,
) => (value === true ? get(props, `theme.border.base`) : get(props, `theme.border.${value}`))

export const borderStyle = generateDirectionalStyles<BorderStyleProps & ThemeProps>(
  'border',
  getBorderStyle,
)

export const radiusStyle = generateDirectionalStyles<RadiusStyleProps & ThemeProps>(
  'radius',
  (value, i, props) => {
    const _value = get(props, `theme.radius.${value}`)
    return isNaN(Number(_value)) ? _value : toREM(_value)
  },
)

export const displayStyle = generateStyles('display')

export const truncateTextStyle = (props: { truncate?: boolean } & ThemeProps) => {
  return {
    display: props?.truncate ? 'block' : undefined,
    whiteSpace: props?.truncate ? 'nowrap' : undefined,
    textOverflow: props?.truncate ? 'ellipsis' : undefined,
    overflow: props?.truncate ? 'hidden' : undefined,
  } as CSSObject
}

/**
 * CSS to hide content visually but remain accessible to screen readers.
 * from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/9a176f57af1cfe8ec70300da4621fb9b07e5fa31/src/css/main.css#L121)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...hideVisually(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hideVisually()};
 * `
 */
export function hideVisually(): CSSObject {
  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  }
}

export function cover(offset = 0): CSSObject {
  return {
    position: 'absolute',
    top: offset,
    right: offset,
    bottom: offset,
    left: offset,
  }
}

export function clickable(): CSSObject {
  return {
    cursor: 'pointer',
    userSelect: 'none',
  }
}
