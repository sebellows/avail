import { Theme, ThemeProps } from '../theme'
import { CSSObject, Primitive } from '../types'
import { toEM, isNil, isPlainObject, variadic } from '../utils'
import { PROPS_MAP, PROP_DIRECTIONS, PROP_DIRECTIONS_WITH_XY, PROP_ALIAS_MAP } from './constants'
import { DirectionKey } from './typings/styles'

export function toPropsObject<T = unknown>(propKeys: string[], value: T): CSSObject<T> {
  return propKeys.reduce((obj, propKey) => {
    if (!(propKey in obj)) {
      obj[propKey] = value
    }
    return obj
  }, {})
}

/** Get the camelCased CSS property names from `PROP_ALIAS_MAP` via a camelCased key from PROP_KEYS`/`PROPS_MAP` */
export function getPropertyKeys(propName: string): string[] | undefined {
  if (PROP_ALIAS_MAP.has(propName)) {
    return PROP_ALIAS_MAP.get(propName)
  }
  if (window.CSS.supports(propName)) {
    return variadic(propName)
  }
  // throw new Error(`The property ${propName} is not registered in the \`PROP_ALIAS_MAP\` constant.`)
  return undefined
}

function Obj<T = Primitive>(
  theme: Theme,
  values: CSSObject<T>,
  callback: (value: T, index?: number, context?: Theme) => CSSObject<T>,
): CSSObject<T>[] {
  return Object.entries(values).map(([mediaKey, value], i) => {
    const mq = theme.media[mediaKey]
    const statement = callback((value as unknown) as T, i, theme)

    return !mq ? statement : { [`@media screen and (min-width: ${toEM(mq - 1)})`]: statement }
  }) as CSSObject<T>[]
}

function Arr<T = Primitive>(
  theme: Theme,
  values: T[],
  callback: (value: T, index?: number) => CSSObject<T>,
): CSSObject<T>[] {
  const statements = values.map(callback)

  return statements.map((statement, i) => {
    const mq = i > 0 && Number(Object.values(theme.media)[i])

    return !mq ? statement : { [`@media screen and (min-width: ${toEM(mq - 1)})`]: statement }
  }) as CSSObject<T>[]
}

export function generateResponsiveStyles<T = Primitive>(
  theme: Theme,
  values: CSSObject<T> | T[],
  callback: (value: T, index?: number, context?: Theme) => CSSObject<T>,
): CSSObject<T>[] {
  return isPlainObject(values)
    ? Obj(theme, values as CSSObject<T>, callback)
    : Arr(theme, values as T[], callback)
}

type StyleCallback<P = {}> = (value: any, index?: number, props?: P & ThemeProps) => CSSObject

const noop = (x: any) => x

export function generateStyles<P = {}>(
  propName: string,
  callback: StyleCallback = noop,
  themeKey: string = propName,
) {
  return (props: P & ThemeProps) => {
    const { theme } = props
    const $propName = PROPS_MAP.get(themeKey)

    if (isNil(props?.[$propName])) {
      return null
    }

    const propertyKeys = getPropertyKeys(propName)

    return generateResponsiveStyles(theme, variadic(props?.[$propName]), (value, i) => {
      const propValue = callback(value, i, props)
      return isPlainObject(propValue) ? propValue : toPropsObject(propertyKeys, propValue)
    })
  }
}

export function generateDirectionalStyles<P = {}>(
  propName: string,
  callback: StyleCallback,
  withXY = false,
) {
  const dirs = withXY ? PROP_DIRECTIONS_WITH_XY : PROP_DIRECTIONS

  return (props: P & ThemeProps) => {
    const { theme } = props

    return dirs
      .map((dir: null | DirectionKey) => {
        const propKey = dir ? `${propName}${dir}` : propName
        const $propName = PROPS_MAP.get(propKey)
        const propertyKeys = getPropertyKeys(propKey)

        // Values that are not a plain object need to be an array
        const values = isPlainObject(props?.[$propName])
          ? props?.[$propName]
          : variadic(props?.[$propName])

        if (isNil(props?.[$propName]) || values.length === 0) {
          return null
        }

        return generateResponsiveStyles(theme, values, (value, i) => {
          return toPropsObject(propertyKeys, callback(value, i, props))
        })
      })
      .filter(Boolean)
  }
}
