import { memoize } from './memoize'

/** Camelize a hyphen-delimited string. */
export const camelize = memoize(function (str: string) {
  return str.replace(/-(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
})

/** Capitalize a string. */
export const capitalize = memoize((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/** Hyphenate a camelCase string. */
export const hyphenate = memoize((str: string): string => {
  return String(str)
    .replace(/\B([A-Z])/g, '-$1')
    .replace(/\s/g, '-')
    .toLowerCase()
})

/** Snakecase a string. */
export const snakeize = memoize((str: string): string => {
  return String(str)
    .replace(/\B([A-Z])/g, '_$1')
    .replace(/\s/g, '_')
    .toUpperCase()
})

export const pascalize = memoize(
  (str: string) => str.charAt(0).toUpperCase() + camelize(str).slice(1),
)

// const quoteExp = /[\'\"]/;
export const unquote = (str: string): string => {
  if (!str) return ''
  let unquoted = str

  if (str.startsWith('"') || str.startsWith("'")) {
    unquoted = str.slice(1)
  }

  if (str.endsWith('"') || str.endsWith("'")) {
    unquoted = unquoted.slice(0, unquoted.length - 2)
  }

  return unquoted
}
