/* eslint-disable @typescript-eslint/no-unused-vars */

import { range } from './utils/range';

function calcUnitSize(num: number, baseUnit = FONT_SIZE_BASE, unit = 'rem') {
  return parseInt(baseUnit, 10) * num + unit;
}

function darken(hexColor: string, percent: number) {
  const [hash, ...values] = hexColor.split('');

  const colors = [
    values.slice(0, 2).join(''),
    values.slice(2, 4).join(''),
    values.slice(4).join(''),
  ];

  return colors
    .map((color) =>
      Math.max((parseInt(color, 16) * (100 + percent * 100)) / 100, 255),
    )
    .reduce((hex, color) => (hex += color.toString(16).padStart(2, '0')), '#');
}

/**
 * CSS Output Settings
 */
export const INDENT_AMOUNT = 2;
export const INDENT = range(2).reduce(
  (str: string, curr: number) => (str += ' '),
  '',
);

export const BORDER_STYLES = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  none: 'none',
};
export const DIRECTIONS = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  y: 'top bottom',
  x: 'left right',
};

/**
 * Default Style Values
 */
export const WHITE = '#fff';
export const GRAY_100 = '#f8f9fa';
export const GRAY_200 = '#e9ecef';
export const GRAY_300 = '#dee2e6';
export const GRAY_400 = '#ced4da';
export const GRAY_500 = '#adb5bd';
export const GRAY_600 = '#6c757d';
export const GRAY_700 = '#495057';
export const GRAY_800 = '#343a40';
export const GRAY_900 = '#212529';
export const BLACK = '#000';
export const BLACK_50 = `rgba(${BLACK}, .5)`;
export const WHITE_50 = `rgba(${WHITE}, .5)`;

export const GRAYS = {
  100: GRAY_100,
  200: GRAY_200,
  300: GRAY_300,
  400: GRAY_400,
  500: GRAY_500,
  600: GRAY_600,
  700: GRAY_700,
  800: GRAY_800,
  900: GRAY_900,
};

export const BLUE = '#0d6efd';
export const INDIGO = '#6610f2';
export const PURPLE = '#6f42c1';
export const PINK = '#d63384';
export const RED = '#dc3545';
export const ORANGE = '#fd7e14';
export const YELLOW = '#ffc107';
export const GREEN = '#28a745';
export const TEAL = '#20c997';
export const CYAN = '#17a2b8';

export const COLORS = {
  blue: BLUE,
  indigo: INDIGO,
  purple: PURPLE,
  pink: PINK,
  red: RED,
  orange: ORANGE,
  yellow: YELLOW,
  green: GREEN,
  teal: TEAL,
  cyan: CYAN,
  white: WHITE,
  gray: GRAY_600,
  grayark: GRAY_800,
};

export const PRIMARY = BLUE;
export const SECONDARY = GRAY_600;
export const SUCCESS = GREEN;
export const INFO = CYAN;
export const WARNING = YELLOW;
export const DANGER = RED;
export const LIGHT = GRAY_100;
export const DARK = GRAY_800;

export const THEME_COLORS = {
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  info: INFO,
  warning: WARNING,
  danger: DANGER,
  light: LIGHT,
  dark: DARK,
};

export const SPACER = '1rem';

export const SPACERS = {
  0: 0,
  1: calcUnitSize(0.25, SPACER),
  2: calcUnitSize(0.5, SPACER),
  3: SPACER,
  4: calcUnitSize(1.5, SPACER),
  5: calcUnitSize(3, SPACER),
};

export const NEGATIVE_SPACERS = Object.entries(SPACERS).reduce((o, [k, v]) => {
  o[`n${k}`] = v;
  return o;
}, {});

// Body
//
// Settings for the `<body>` element.

export const BODY_BG = WHITE;
export const BODY_COLOR = GRAY_900;
export const BODY_TEXT_ALIGN = null;

// Links
//
// Style anchor elements.

export const LINK_COLOR = PRIMARY;
export const LINK_DECORATION = 'underline';
export const LINK_HOVER_COLOR = darken(LINK_COLOR, 0.15);
export const LINK_HOVER_DECORATION = null;
// Darken percentage for links with `.text-*` class (e.g. `.text-success`)
export const EMPHASIZED_LINK_HOVER_DARKEN_PERCENTAGE = 0.15;

// Grid breakpoints
//
// Define the minimum dimensions at which your layout will change,
// adapting to different screen sizes, for use in media queries.

export const GRID_BREAKPOINTS = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

// Grid containers
//
// Define the maximum width of `.container` for different screen sizes.

export const CONTAINER_MAX_WIDTHS = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
};

// Grid columns
//
// Set the number of columns and specify the width of the gutters.

export const GRID_COLUMNS = 12;
export const GRID_GUTTER_WIDTH = '1.5rem';
export const GRID_ROW_COLUMNS = 6;

export const GUTTERS = SPACERS;

// Container padding

export const CONTAINER_PADDING_X = '1rem';

// Components
//
// Define common padding and border radius sizes and more.

export const BORDER_WIDTH = '1px';
export const BORDER_COLOR = GRAY_300;

export const BORDER_RADIUS = '.25rem';
export const BORDER_RADIUS_SM = '.2rem';
export const BORDER_RADIUS_LG = '.3rem';

export const ROUNDED_PILL = '50rem';

export const BOX_SHADOW = `0 .5rem 1rem rgba(${BLACK}, .15)`;
export const BOX_SHADOW_SM = `0 .125rem .25rem rgba(${BLACK}, .075)`;
export const BOX_SHADOW_LG = `0 1rem 3rem rgba(${BLACK}, .175)`;
export const BOX_SHADOW_INSET = `inset 0 1px 2px rgba(BLACK, .075)`;

export const COMPONENT_ACTIVE_COLOR = WHITE;
export const COMPONENT_ACTIVE_BG = PRIMARY;

export const CARET_WIDTH = '.3em';
export const CARET_VERTICAL_ALIGN = calcUnitSize(0.85, CARET_WIDTH, 'em');
export const CARET_SPACING = calcUnitSize(0.85, CARET_WIDTH, 'em');

export const TRANSITION_BASE = 'all .2s ease-in-out';
export const TRANSITION_FADE = 'opacity .15s linear';
export const TRANSITION_COLLAPSE = 'height .35s ease';

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
};

// Typography
//
// Font, line-height, and color for body text, headings, and more.

// stylelint-disable value-keyword-case
export const FONT_FAMILY_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
export const FONT_FAMILY_MONOSPACE =
  'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
export const FONT_FAMILY_BASE = FONT_FAMILY_SANS_SERIF;
// stylelint-enable value-keyword-case

// FONT_SIZE_ROOT effects the value of `rem`, which is used for as well font sizes, paddings and margins
// FONT_SIZE_BASE effects the font size of the body text
export const FONT_SIZE_ROOT = null;
export const FONT_SIZE_BASE = '1rem'; // Assumes the browser default, typically `16px`
export const FONT_SIZE_SM = calcUnitSize(0.875);
export const FONT_SIZE_LG = calcUnitSize(1.25);

export const FONT_WEIGHT_LIGHTER = 'lighter';
export const FONT_WEIGHT_LIGHT = 300;
export const FONT_WEIGHT_NORMAL = 400;
export const FONT_WEIGHT_BOLD = 700;
export const FONT_WEIGHT_BOLDER = 'bolder';

export const FONT_WEIGHT_BASE = FONT_WEIGHT_NORMAL;

export const LINE_HEIGHT_BASE = '1.5';
export const LINE_HEIGHT_SM = '1.25';
export const LINE_HEIGHT_LG = '2';

export const H1_FONT_SIZE = calcUnitSize(2.5);
export const H2_FONT_SIZE = calcUnitSize(2);
export const H3_FONT_SIZE = calcUnitSize(1.75);
export const H4_FONT_SIZE = calcUnitSize(1.5);
export const H5_FONT_SIZE = calcUnitSize(1.25);
export const H6_FONT_SIZE = FONT_SIZE_BASE;

export const HEADINGS_MARGIN_BOTTOM = `${parseInt(SPACER, 10) / 2}rem`;
export const HEADINGS_FONT_FAMILY = null;
export const HEADINGS_FONT_STYLE = null;
export const HEADINGS_FONT_WEIGHT = 500;
export const HEADINGS_LINE_HEIGHT = '1.2';
export const HEADINGS_COLOR = null;

export const DISPLAY1_SIZE = '6rem';
export const DISPLAY2_SIZE = '5.5rem';
export const DISPLAY3_SIZE = '4.5rem';
export const DISPLAY4_SIZE = '3.5rem';

export const DISPLAY1_WEIGHT = 300;
export const DISPLAY2_WEIGHT = 300;
export const DISPLAY3_WEIGHT = 300;
export const DISPLAY4_WEIGHT = 300;
export const DISPLAY_LINE_HEIGHT = HEADINGS_LINE_HEIGHT;

export const LEAD_FONT_SIZE = calcUnitSize(1.25);
export const LEAD_FONT_WEIGHT = 300;

export const SMALL_FONT_SIZE = '.875em';

export const SUB_SUP_FONT_SIZE = '.75em';

export const TEXT_MUTED = GRAY_600;

export const INITIALISM_FONT_SIZE = SMALL_FONT_SIZE;

export const BLOCKQUOTE_SMALL_COLOR = GRAY_600;
export const BLOCKQUOTE_SMALL_FONT_SIZE = SMALL_FONT_SIZE;
export const BLOCKQUOTE_FONT_SIZE = calcUnitSize(1.25);

export const HR_MARGIN_Y = SPACER;
export const HR_COLOR = 'inherit';
export const HR_HEIGHT = BORDER_WIDTH;
export const HR_OPACITY = '.25';

export const LEGEND_MARGIN_BOTTOM = '.5rem';
export const LEGEND_FONT_SIZE = '1.5rem';
export const LEGEND_FONT_WEIGHT = null;

export const MARK_PADDING = '.2em';

export const DT_FONT_WEIGHT = FONT_WEIGHT_BOLD;

export const NESTED_KBD_FONT_WEIGHT = FONT_WEIGHT_BOLD;

export const LIST_INLINE_PADDING = '.5rem';

export const MARK_BG = '#fcf8e3';

// Paragraphs
//
// Style p element.

export const PARAGRAPH_MARGIN_BOTTOM = FONT_SIZE_BASE;
