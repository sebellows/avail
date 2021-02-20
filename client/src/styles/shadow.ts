import { get, toREM } from '../utils'
import { ThemeProps, ThemeShadow } from '../theme'
import { BoxShadow, ShadowStyleProps } from './types'
import { generateStyles } from './utils'

function toBoxShadow(shadow: BoxShadow, color: string) {
  return `${shadow.map(toREM).join(' ')} ${color}`
}

function _shadowStyle(shadow: ThemeShadow | null): string {
  if (!shadow) return 'none'

  const outline = `0 0 0 ${toREM(1)} var(--card-shadow-outline-color)`
  const umbra = toBoxShadow(shadow.umbra, 'var(--card-shadow-umbra-color)')
  const penumbra = toBoxShadow(shadow.penumbra, 'var(--card-shadow-penumbra-color)')
  const ambient = toBoxShadow(shadow.ambient, 'var(--card-shadow-ambient-color)')

  return `${outline}, ${umbra}, ${penumbra}, ${ambient}`
}

export const shadowStyle = generateStyles<ShadowStyleProps & ThemeProps>(
  'shadow',
  (shadowIndex: number, i, props) => {
    const shadow = get(props.theme, `shadow.${shadowIndex}`)
    return _shadowStyle(shadow)
  },
)
