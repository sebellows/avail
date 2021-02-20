import { ThemeProps } from '../theme'
import { CSSObject, Primitive, Theme } from '../types'
import { isPlainObject } from '../utils'
import { toEM } from '../utils/units'

function getThemeValue<T extends {} = {}>(
  name: string,
  props: T & ThemeProps,
  values: any[],
): CSSObject {
  const value = props.theme && props.theme[name]

  const themeValue = typeof value === 'function' ? value(values) : values[value]

  return typeof themeValue === 'function' ? themeValue(props) : themeValue
}

/**
 * Expanded from `styled-components/styled-theme`.
 * See {@link https:github.com/styled-components/styled-theme}
 *
 * @example
 * const white = "#fff";
 * const black = "#000";
 *
 * const boxStyles = theme('mode', {
 *   light: css`
 *     background: ${white};
 *     color: ${black};
 *   `,
 *   dark: css`
 *     background: ${black};
 *     color: ${white};
 *   `,
 * });
 *
 * const Box = styled.div`
 *   ${boxStyles}
 * `;
 *
 * @param name
 * @param values
 * @returns {(props: {}) => CSSObject}
 */
function theme<T extends {} = {}>(
  name: string,
  values: any[],
): (props: T & ThemeProps) => CSSObject {
  return (props: T & ThemeProps) => getThemeValue(name, props, values)
}

/**
 * Create variants of a component.
 *
 * @example
 * const backgroundColor = theme.variants('scheme', 'variant', {
 *   default: { light: 'gray', dark: 'darkgray' },
 *   primary: { light: 'blue', dark: 'darkblue' },
 *   success: { light: 'green', dark: 'darkgreen' },
 *   warning: { light: 'orange', dark: 'darkorange' },
 * })
 * const Button = styled.button`
 *   background-color: ${backgroundColor};
 * `
 * <Button variant="primary" />
 */
theme.variants = function <T extends {} = {}>(name: keyof Theme, prop: string, values: any[]) {
  return function (props: T & ThemeProps) {
    const variant = props[prop] && values[props[prop]]
    return variant && getThemeValue(name, props, variant)
  }
}

export { theme }

export function toStyleProps<T = any>(propKeys: string[], value: T): CSSObject<T> {
  return propKeys.reduce((obj, propKey) => {
    obj[propKey] = value
    return obj
  }, {})
}

function Obj<T = Primitive>(
  media: number[],
  values: CSSObject<T>,
  callback: (value: T, index?: number) => CSSObject<T>,
): CSSObject<T>[] {
  return Object.entries(values).map(([mediaKey, value], i) => {
    const mq = media[mediaKey]
    const statement = callback((value as unknown) as T, i)

    return !mq ? statement : { [`@media screen and (min-width: ${toEM(mq - 1)})`]: statement }
  }) as CSSObject<T>[]
}

function Arr<T = Primitive>(
  media: number[],
  values: T[],
  callback: (value: T, index?: number) => CSSObject<T>,
): CSSObject<T>[] {
  const statements = values.map(callback)

  return statements.map((statement, i) => {
    const mq = media[i]

    return !mq ? statement : { [`@media screen and (min-width: ${toEM(mq - 1)})`]: statement }
  }) as CSSObject<T>[]
}

export function generateStyles<T = Primitive>(
  media: number[],
  values: CSSObject<T> | T[],
  callback: (value: T, index?: number, array?: T[]) => CSSObject<T>,
): CSSObject<T>[] {
  // console.log('generateStyles', isPlainObject(values))
  return isPlainObject(values)
    ? Obj(media, values as CSSObject<T>, callback)
    : Arr(media, values as T[], callback)
}
