/* eslint-disable @typescript-eslint/no-unused-vars */

import { Color, range } from './utils'

/**
 * CSS Output Settings
 */
export const INDENT_LEVEL = 0
export const INDENT_AMOUNT = 2
export const INDENT = range(2).reduce((str: string, curr: number) => (str += ' '), '')

export const BASE_FONT_SIZE = 16
export const BASE_LINE_HEIGHT = 1.5

export const BORDER_STYLES = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  none: 'none',
}

export const DIRECTIONS = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  y: 'top bottom',
  x: 'left right',
}

export const CORNERS = {
  top: 'top-left top-right',
  bottom: 'bottom-left bottom-right',
  left: 'top-left bottom-left',
  right: 'top-right bottom-right',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
}

const BLACK_100 = '#000000'
/**
 * Default Style Values
 */
export const WHITE = '#ffffff'
export const GRAY_100 = '#f8f9fa' // #f8f9fa | hsl(210deg 17% 98%)
export const GRAY_200 = '#e9ecef' // #e9ecef | hsl(210deg 16% 93%)
export const GRAY_300 = '#dee2e6' // #dce0e5 | hsl(210deg 15% 88%)
export const GRAY_400 = '#ced4da' // #ced4da | hsl(210deg 14% 83%)
export const GRAY_500 = '#adb5bd' // #adb5bd | hsl(210deg 11% 71%)
export const GRAY_600 = '#6c757d' // #6c757d | hsl(208deg 7% 46%)
export const GRAY_700 = '#495057' // #495057 | hsl(210deg 9% 31%)
export const GRAY_800 = '#343a40' // #343a40 | hsl(210deg 10% 23%)
export const GRAY_900 = '#212529' // #212529 | hsl(210deg 11% 15%)
export const BLACK = '#000000'
export const BLACK_06 = Color(BLACK).alpha(0.06).string()
export const BLACK_12 = Color(BLACK).alpha(0.12).string()
export const BLACK_20 = Color(BLACK).alpha(0.2).string()
export const BLACK_40 = Color(BLACK).alpha(0.4).string()
export const BLACK_50 = Color(BLACK).alpha(0.5).string()
export const WHITE_12 = Color(WHITE).alpha(0.12).string()
export const WHITE_50 = Color(WHITE).alpha(0.5).string()

export const GRAYS = {
  'gray-100': GRAY_100,
  'gray-200': GRAY_200,
  'gray-300': GRAY_300,
  'gray-400': GRAY_400,
  'gray-500': GRAY_500,
  'gray-600': GRAY_600,
  'gray-700': GRAY_700,
  'gray-800': GRAY_800,
  'gray-900': GRAY_900,
}

export const BLUE = '#0d6efd'
export const INDIGO = '#6610f2'
export const MAGENTA = '#d63384'
export const PURPLE = '#6f42c1'
export const PINK = '#f92672'
export const RED = '#dc3545'
export const ORANGE = '#fd7e14'
export const YELLOW = '#ffc107'
export const GREEN = '#28a745'
export const TEAL = '#20c997'
export const CYAN = '#17a2b8'

export const COLORS = {
  blue: BLUE,
  indigo: INDIGO,
  magenta: MAGENTA,
  purple: PURPLE,
  pink: PINK,
  red: RED,
  orange: ORANGE,
  yellow: YELLOW,
  green: GREEN,
  teal: TEAL,
  cyan: CYAN,
}

export const PRIMARY = BLUE
export const SECONDARY = GRAY_600
export const SUCCESS = GREEN
export const INFO = CYAN
export const WARNING = YELLOW
export const DANGER = RED
export const LIGHT = GRAY_100
export const DARK = GRAY_900

export const VARIANTS = {
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  info: INFO,
  warning: WARNING,
  danger: DANGER,
  light: LIGHT,
  dark: DARK,
  black: BLACK,
  white: WHITE,
}

export const THEME_COLORS = VARIANTS

export const SPACER = 16

export const SPACERS = {
  0: 0,
  1: 4,
  2: 8,
  3: SPACER,
  4: 24,
  5: 40,
}

/**
 * Body
 *
 * Settings for the `<body>` element.
 */
export const BODY_BG = WHITE
export const BODY_COLOR = GRAY_900
export const BODY_TEXT_ALIGN = null

/**
 * Links
 *
 * Style anchor elements.
 */
export const LINK_COLOR = PRIMARY
export const LINK_DECORATION = 'underline'
export const LINK_HOVER_COLOR = Color(LINK_COLOR).darken(0.15).string()
export const LINK_HOVER_DECORATION = null
// Darken percentage for links with `.text-*` class (e.g. `.text-success`)
export const EMPHASIZED_LINK_HOVER_DARKEN_PERCENTAGE = 0.15

/**
 * Grid breakpoints
 *
 * Define the minimum dimensions at which your layout will change,
 * adapting to different screen sizes, for use in media queries.
 */
export const GRID_BREAKPOINTS = {
  xs: { value: 0, readOnly: true },
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

/**
 * Grid containers
 *
 * Define the maximum width of `.container` for different screen sizes.
 */
export const CONTAINER_MAX_WIDTHS = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
}

/**
 * Grid columns
 *
 * Set the number of columns and specify the width of the gutters.
 */
export const GRID_COLUMNS = 12
export const GRID_GUTTER_WIDTH = 24
export const GRID_ROW_COLUMNS = 6

export const GUTTERS = SPACERS

/** Container padding */
export const CONTAINER_PADDING_X = SPACER

/**
 * Components
 *
 * Define common padding and border radius sizes and more.
 */
export const BORDER_WIDTH = 1
export const BORDER_COLOR = GRAY_300

export const BORDER_RADIUS = 4
export const BORDER_RADIUS_SM = 3
export const BORDER_RADIUS_LG = 5

export const ROUNDED_PILL = '50rem'

export const BOX_SHADOW = `0 .5rem 1rem rgba(${BLACK}, .15)`
export const BOX_SHADOW_SM = `0 .125rem .25rem rgba(${BLACK}, .075)`
export const BOX_SHADOW_LG = `0 1rem 3rem rgba(${BLACK}, .175)`
export const BOX_SHADOW_INSET = `inset 0 1px 2px rgba(BLACK, .075)`

export const COMPONENT_ACTIVE_COLOR = WHITE
export const COMPONENT_ACTIVE_BG = PRIMARY

export const CARET_WIDTH = 5

export const TRANSITION_BASE = 'all .2s ease-in-out'
export const TRANSITION_FADE = 'opacity .15s linear'
export const TRANSITION_COLLAPSE = 'height .35s ease'

export const EMBED_RESPONSIVE_ASPECT_RATIOS = {
  '21by9': {
    x: 21,
    y: 9,
  },
  '16by9': {
    x: 16,
    y: 9,
  },
  '4by3': {
    x: 4,
    y: 3,
  },
  '1by1': {
    x: 1,
    y: 1,
  },
}

/**
 * Typography
 *
 * Font, line-height, and color for body text, headings, and more.
 */
export const FONT_FAMILY_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
export const FONT_FAMILY_MONOSPACE =
  'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
export const FONT_FAMILY_BASE = FONT_FAMILY_SANS_SERIF

/**
 * FONT_SIZE_ROOT effects the value of `rem`, which is used for as well font sizes, paddings and margins
 * FONT_SIZE_BASE effects the font size of the body text
 */
export const FONT_SIZE_ROOT = 16
export const FONT_SIZE_BASE = 16 // Assumes the browser default, typically `16px`
export const FONT_SIZE_SM = 14
export const FONT_SIZE_LG = 20

export const FONT_WEIGHT_LIGHTER = 'lighter'
export const FONT_WEIGHT_LIGHT = 300
export const FONT_WEIGHT_NORMAL = 400
export const FONT_WEIGHT_BOLD = 700
export const FONT_WEIGHT_BOLDER = 'bolder'

export const FONT_WEIGHT_BASE = FONT_WEIGHT_NORMAL

export const LINE_HEIGHT_BASE = 1.5
export const LINE_HEIGHT_SM = 1.25
export const LINE_HEIGHT_LG = 2

export const H1_FONT_SIZE = 40
export const H2_FONT_SIZE = 32
export const H3_FONT_SIZE = 28
export const H4_FONT_SIZE = 24
export const H5_FONT_SIZE = 20
export const H6_FONT_SIZE = FONT_SIZE_BASE

export const HEADINGS_MARGIN_BOTTOM = 8
export const HEADINGS_FONT_FAMILY = null
export const HEADINGS_FONT_STYLE = null
export const HEADINGS_FONT_WEIGHT = 500
export const HEADINGS_LINE_HEIGHT = 1.2
export const HEADINGS_COLOR = null

export const DISPLAY1_SIZE = 96
export const DISPLAY2_SIZE = 80
export const DISPLAY3_SIZE = 64
export const DISPLAY4_SIZE = 48

export const DISPLAY1_WEIGHT = 300
export const DISPLAY2_WEIGHT = 300
export const DISPLAY3_WEIGHT = 300
export const DISPLAY4_WEIGHT = 300
export const DISPLAY_LINE_HEIGHT = HEADINGS_LINE_HEIGHT

export const SMALL_FONT_SIZE = '80%'

export const SUB_SUP_FONT_SIZE = 0.75

export const TEXT_MUTED = GRAY_600

export const INITIALISM_FONT_SIZE = SMALL_FONT_SIZE

export const BLOCKQUOTE_SMALL_COLOR = GRAY_600
export const BLOCKQUOTE_SMALL_FONT_SIZE = SMALL_FONT_SIZE
export const BLOCKQUOTE_FONT_SIZE = 20

export const HR_MARGIN_Y = SPACER
export const HR_COLOR = 'inherit'
export const HR_HEIGHT = BORDER_WIDTH
export const HR_OPACITY = 0.25

export const LEGEND_MARGIN_BOTTOM = 8
export const LEGEND_FONT_SIZE = 24
export const LEGEND_FONT_WEIGHT = null

export const MARK_PADDING = 3

export const DT_FONT_WEIGHT = FONT_WEIGHT_BOLD

export const NESTED_KBD_FONT_WEIGHT = FONT_WEIGHT_BOLD

export const LIST_INLINE_PADDING = 8

export const MARK_BG = '#fcf8e3'

/**
 * Paragraphs
 *
 * Style p element.
 */
export const PARAGRAPH_MARGIN_BOTTOM = FONT_SIZE_BASE
