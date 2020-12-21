import { BORDER_RADIUS, BORDER_RADIUS_SM, BORDER_RADIUS_LG } from '../constants'
import { isNil, isObject } from '../utils'
import { toEM, toREM } from './units'

interface StyleProps {
  breakpoints?: string[]
  [key: string]: any
}

type ParserProps = {
  config?: Record<string, any>
  [key: string]: any
}

type Parser = (props?: ParserProps) => StyleProps

interface ParserObj {
  (props: ParserProps): StyleProps
  config: Record<string, any>
  propNames?: string[]
  cache?: StyleProps
}

export const DEFAULT_STYLES: StyleProps = {
  breakpoints: [540, 720, 992, 1200].map((size) => toEM(size)),
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  radii: {
    none: '0',
    base: toREM(BORDER_RADIUS),
    sm: toREM(BORDER_RADIUS_SM),
    lg: toREM(BORDER_RADIUS_LG),
    pill: '50rem',
    circle: '50%',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}

export const getSetting = (obj: Record<string, any>, key: string, defaultValue: any = null) => {
  const keys = key && key.split ? key.split('.') : [key]
  for (let index = 0; index < keys.length; index++) {
    obj = obj ? obj[keys[index]] : undefined
  }
  return isNil(obj) ? defaultValue : obj
}

export const getStyle = (path: string, fallback: any = null) => (props: ParserProps) =>
  getSetting(props.theme, path, fallback)

export const merge = <T extends object = {}, U extends object = T>(a: T, b: U, init = {}): T & U =>
  Object.keys(a).reduce((acc, key) => {
    if (!isNil(a[key]) && isObject(b[key])) {
      acc[key] = Object.assign(a[key], b[key])
    }
    return acc
  }, init as T & U)

// Sort object-value responsive styles
export const sort = (
  obj: Record<string, any>,
  init: Record<string, any> = {},
): Record<string, any> => {
  return Object.keys(obj)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    )
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, init)
}

export const createMediaQuery = (n) => `@media screen and (min-width: ${n})`

const getValue = (n: string, scale: any, p?: Record<string, any>) => getSetting(scale, n, n)

export const parserFactory = <T extends Record<string, any> = {}>(config: T): Parser => {
  const cache: StyleProps = {}
  const parse = (props: ParserProps) => {
    let shouldSort = false
    const isCacheDisabled = props.config && props.theme.disableStyledSystemCache

    const styles = Object.keys(props).reduce((acc, key) => {
      if (config[key]) {
        const sx = config[key]
        const raw = props[key]
        const scale = getSetting(props.config, sx.scale, sx.DEFAULT_STYLES)
        let respStyles: StyleProps = {}

        if (typeof raw === 'object') {
          cache.breakpoints =
            (!isCacheDisabled && cache.breakpoints) ||
            getSetting(props.theme, 'breakpoints', DEFAULT_STYLES.breakpoints)
          if (Array.isArray(raw)) {
            cache.media = (!isCacheDisabled && cache.media) || [
              null,
              ...cache.breakpoints.map(createMediaQuery),
            ]
            respStyles = parseResponsiveStyle(cache.media, sx, scale, raw, props)
          }
          if (raw !== null) {
            respStyles = parseResponsiveObject(cache.breakpoints, sx, scale, raw, props)
            shouldSort = true
          }

          return Object.assign(acc, respStyles)
        }
      }
      return acc
    }, {})

    // sort object-based responsive styles
    return shouldSort ? sort(styles) : styles
  }

  parse.config = config
  parse.propNames = Object.keys(config)
  parse.cache = cache

  const keys = Object.keys(config).filter((key) => key !== 'config')
  if (keys.length > 1) {
    keys.forEach((key) => {
      parse[key] = parserFactory({ [key]: config[key] })
    })
  }

  return parse
}

const parseResponsiveStyle = (mediaQueries: string[], sx, scale, raw, _props) => {
  return raw.slice(0, mediaQueries.length).reduce((styles, value, i) => {
    const mq = mediaQueries[i]
    const style = sx(value, scale, _props)
    if (!mq) {
      return { ...styles, ...style }
    }
    styles[mq] = { ...styles[mq], ...style }
    return styles
  }, {})
}

const parseResponsiveObject = (
  breakpoints: Record<string, any>,
  sx: (...args) => any,
  scale: string,
  raw: Record<string, any>,
  _props?: Record<string, any>,
) => {
  return Object.keys(raw).reduce((styles, key) => {
    const bp = breakpoints[key]
    const value = raw[key]
    const style = sx(value, scale, _props)
    if (!bp) {
      return { ...styles, ...style }
    }
    const mq = createMediaQuery(bp)
    styles[mq] = { ...styles[mq], ...style }
    return styles
  }, {})
}

type StyleFactoryProps = {
  properties?: any
  property?: string
  scale?: string
  transform?: any
  defaultScale?: any
}

const defaultStyleFactoryParams = {
  scale: null,
  transform: getValue,
  defaultScale: DEFAULT_STYLES,
}

export const createStyle = (params: StyleFactoryProps = {}) => {
  let { properties, property, scale, transform, defaultScale } = {
    ...defaultStyleFactoryParams,
    ...params,
  }
  properties = properties || [property]
  const sx = (value: any, scale: any, _props?: any) => {
    const n = transform(value, scale, _props)
    if (n === null) return

    return properties.reduce((acc, prop) => {
      acc[prop] = n
      return acc
    }, {})
  }
  sx.scale = scale
  sx.defaults = defaultScale
  return sx
}

/**
 * Return a parser based on the configuration
 */
export const createParser = (settings: Record<string, any> = {}) => {
  return parserFactory(
    Object.entries(settings).reduce((config, [key, setting]) => {
      if (setting === true) {
        config[key] = createStyle({
          property: key,
          scale: key,
        })
      } else if (typeof setting === 'function') {
        config[key] = setting
      } else {
        config[key] = createStyle(setting)
      }
      return config
    }, {}),
  )
}

export const compose = (...parsers: ParserObj[]): Parser => {
  const config = parsers.reduce((config, parser) => {
    if (parser && parser.config) {
      return { ...config, ...parser.config }
    }
    return config
  }, {})
  return parserFactory(config)
}
