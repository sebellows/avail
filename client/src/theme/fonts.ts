/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeFonts } from './types'

const DEFAULT_FONT_FAMILY =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
const DEFAULT_FONT_FAMILY_CODE =
  "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"

const SIZE_KEYS = {
  fine: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  h6: 16,
  h5: 18,
  h4: 20,
  h3: 28,
  h2: 36,
  h1: 48,
}

export const GLOBAL_FONT_SETTINGS = {
  // Global font size and line-height for `:root`. Will be converted to `rem` units.
  rootFontSize: 16,
  baseLineHeight: 21, // if rootFontSize is 16px, line-height would be ~21px

  // Scales used to help generate vertical rhythm based on font
  ascenderScale: 0.1875, // 3/16
  descenderScale: 0.1875, // 3/16
  lineHeightScale: 1.3125, // 21/16
  iconScale: 1.25, // 20/16

  // Font Families
  family: {
    base: DEFAULT_FONT_FAMILY,
    code: DEFAULT_FONT_FAMILY_CODE,
    heading: DEFAULT_FONT_FAMILY,
  },

  // Font Sizes
  sizes: new Map(Object.entries(SIZE_KEYS)),

  // Font Weights
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
}

const WEIGHTS_MAP = new Map<string, any[]>(
  Object.entries({
    100: ['thin', 100],
    200: ['extralight', 200],
    300: ['light', 300],
    400: ['regular', 400],
    500: ['medium', 500],
    600: ['semibold', 600],
    700: ['bold', 700],
    800: ['extrabold', 800],
    900: ['black', 900],
  }),
)

function assignWeights(...weights: number[]) {
  return weights
    .filter((w) => WEIGHTS_MAP.has(`${w}`))
    .reduce((acc, w, i) => {
      const [key, value] = WEIGHTS_MAP.get(`${w}`)
      acc[key] = value
      return acc
    }, {})
}

function assignSizes(sizes: string[], lineHeight: number | number[]) {
  return sizes
    .filter((size) => GLOBAL_FONT_SETTINGS.sizes.has(size))
    .reduce((acc, size, i) => {
      const fontSize = GLOBAL_FONT_SETTINGS.sizes.get(size)

      acc[size] = {
        fontSize,
        lineHeight: Array.isArray(lineHeight)
          ? lineHeight[i] ?? lineHeight[lineHeight.length - 1]
          : lineHeight,
        ascenderHeight: Math.round(GLOBAL_FONT_SETTINGS.ascenderScale * fontSize),
        descenderHeight: Math.round(GLOBAL_FONT_SETTINGS.descenderScale * fontSize),
        iconSize: Math.round(GLOBAL_FONT_SETTINGS.iconScale * fontSize),
        letterSpacing: 0,
      }
      return acc
    }, {})
}

export const fonts = {
  code: {
    family: GLOBAL_FONT_SETTINGS.family.code,
    weights: assignWeights(500, 600, 700, 800),
    sizes: assignSizes(['xs', 'sm', 'md', 'lg'], GLOBAL_FONT_SETTINGS.lineHeightScale),
  },
  heading: {
    family: GLOBAL_FONT_SETTINGS.family.heading,
    weights: assignWeights(500, 600, 700, 800, 900),
    sizes: assignSizes(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], [1, 1.2]),
  },
  label: {
    family: GLOBAL_FONT_SETTINGS.family.base,
    weights: assignWeights(600, 700, 800, 900),
    sizes: assignSizes(['fine', 'xs', 'sm', 'md'], 1.1625),
  },
  text: {
    family: GLOBAL_FONT_SETTINGS.family.base,
    weights: GLOBAL_FONT_SETTINGS.weights,
    sizes: assignSizes(Object.keys(SIZE_KEYS), GLOBAL_FONT_SETTINGS.lineHeightScale),
  },
}

// const FONT_FAMILY_SANS =
//   "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
// const FONT_FAMILY_MONO =
//   "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"

// export const fonts: ThemeFonts = {
//   code: {
//     family: FONT_FAMILY_MONO,
//     weights: {
//       regular: 500,
//       medium: 600,
//       semibold: 700,
//       bold: 800,
//     },
//     sizes: [
//       {
//         ascenderHeight: 0, // 3
//         descenderHeight: 0, // 3
//         fontSize: 10,
//         iconSize: 17,
//         lineHeight: 13,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 4
//         descenderHeight: 0, // 4
//         fontSize: 13,
//         iconSize: 21,
//         lineHeight: 17,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 5
//         descenderHeight: 0, // 5
//         fontSize: 16,
//         iconSize: 25,
//         lineHeight: 21,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 6
//         descenderHeight: 0, // 6
//         fontSize: 19,
//         iconSize: 29,
//         lineHeight: 25,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 7
//         descenderHeight: 0, // 7
//         fontSize: 22,
//         iconSize: 33,
//         lineHeight: 29,
//         letterSpacing: 0,
//       },
//     ],
//   },
//   heading: {
//     family: FONT_FAMILY_SANS,
//     weights: {
//       regular: 700,
//       medium: 800,
//       semibold: 900,
//       bold: 900,
//     },
//     sizes: [
//       {
//         ascenderHeight: 0, // 3
//         descenderHeight: 0, // 3
//         fontSize: 16,
//         iconSize: 17,
//         lineHeight: 25,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 5
//         descenderHeight: 0, // 5
//         fontSize: 24,
//         iconSize: 33,
//         lineHeight: 33,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 6
//         descenderHeight: 0, // 6
//         fontSize: 33,
//         iconSize: 41,
//         lineHeight: 41,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 7
//         descenderHeight: 0, // 7
//         fontSize: 42,
//         iconSize: 49,
//         lineHeight: 49,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 11
//         descenderHeight: 0, // 11
//         fontSize: 49,
//         iconSize: 57,
//         lineHeight: 57,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 15
//         descenderHeight: 0, // 15
//         fontSize: 59,
//         iconSize: 65,
//         lineHeight: 57,
//         letterSpacing: 0,
//       },
//     ],
//   },
//   label: {
//     family: FONT_FAMILY_SANS,
//     weights: {
//       regular: 600,
//       medium: 700,
//       semibold: 800,
//       bold: 900,
//     },
//     sizes: [
//       {
//         ascenderHeight: 0, // 2
//         descenderHeight: 0, // 2
//         fontSize: 10,
//         iconSize: 17,
//         lineHeight: 11,
//         letterSpacing: 0.5,
//       },
//       {
//         ascenderHeight: 0, // 2
//         descenderHeight: 0, // 2
//         fontSize: 11,
//         iconSize: 19,
//         lineHeight: 12,
//         letterSpacing: 0.5,
//       },
//       {
//         ascenderHeight: 0, // 3
//         descenderHeight: 0, // 3
//         fontSize: 13,
//         iconSize: 21,
//         lineHeight: 15,
//         letterSpacing: 0.5,
//       },
//       {
//         ascenderHeight: 0, // 4
//         descenderHeight: 0, // 3
//         fontSize: 14,
//         iconSize: 23,
//         lineHeight: 17,
//         letterSpacing: 0.5,
//       },
//       {
//         ascenderHeight: 0, // 2
//         descenderHeight: 0, // 2
//         fontSize: 8.5,
//         iconSize: 15,
//         lineHeight: 10,
//         letterSpacing: 0.5,
//       },
//     ],
//   },
//   text: {
//     family: FONT_FAMILY_SANS,
//     weights: {
//       regular: 500,
//       medium: 600,
//       semibold: 700,
//       bold: 800,
//     },
//     sizes: [
//       {
//         ascenderHeight: 0, // 3
//         descenderHeight: 0, // 3
//         fontSize: 10,
//         iconSize: 17,
//         lineHeight: 13,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 4
//         descenderHeight: 0, // 4
//         fontSize: 13,
//         iconSize: 21,
//         lineHeight: 17,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 5
//         descenderHeight: 0, // 5
//         fontSize: 16,
//         iconSize: 25,
//         lineHeight: 21,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 6
//         descenderHeight: 0, // 6
//         fontSize: 19,
//         iconSize: 29,
//         lineHeight: 25,
//         letterSpacing: 0,
//       },
//       {
//         ascenderHeight: 0, // 7
//         descenderHeight: 0, // 7
//         fontSize: 22,
//         iconSize: 33,
//         lineHeight: 29,
//         letterSpacing: 0,
//       },
//     ],
//   },
// }
