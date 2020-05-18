import { css } from 'styled-components';
import Color from 'color';
import { CSS_VALUE_PRESETS } from './presets';
import {
  BODY_BG,
  BODY_COLOR,
  COLORS,
  GRAYS,
  VARIANTS,
  WHITE,
  LINK_COLOR,
  FONT_FAMILY_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  FONT_SIZE_ROOT,
  H1_FONT_SIZE,
  H2_FONT_SIZE,
  H4_FONT_SIZE,
  H5_FONT_SIZE,
  H6_FONT_SIZE,
  H3_FONT_SIZE,
  SPACERS,
  LINK_DECORATION,
  LINK_HOVER_COLOR,
  LINK_HOVER_DECORATION,
  BLACK_06,
  BLACK_12,
  BLACK_20,
  BLACK_40,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_LG,
} from './constants';
import { isNumber } from './utils';
// set in px units
export const BASE_FONT_SIZE = 16;
export const BASE_LINE_HEIGHT = 1.5;
export const CONTROL_PADDING_X = 12;
export const CONTROL_PADDING_Y = 5;
export const CONTROL_BORDER_WIDTH = 1.5;

export interface ControlSettings {
  fontSize: number;
  lineHeight: number;
  paddingX: number;
  paddingY: number;
  borderWidth: number;
}

export type CSSUnit = 'px' | 'em' | 'rem';

export const CONTROL_SETTINGS: ControlSettings = {
  fontSize: FONT_SIZE_ROOT,
  lineHeight: BASE_LINE_HEIGHT,
  paddingX: CONTROL_PADDING_X,
  paddingY: CONTROL_PADDING_Y,
  borderWidth: CONTROL_BORDER_WIDTH,
};

export const isUnit = (value: number | string): boolean =>
  /[-+]{0,1}\d(.?)+(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/g.test(String(value));

export const getUnit = (value: number | string): string | null => {
  if (!isUnit(value)) return null;

  const numStr = String(value);
  const unitStartIndex = numStr.split('').findIndex((str) => /[a-z]/g.test(str));

  return numStr.slice(unitStartIndex);
};

export const stripUnit = (value: number | string): number =>
  (isUnit(value) ? parseFloat(String(value)) : value) as number;

export const normalizeUnit = (value: string | number): number => {
  const unit = getUnit(value);
  const baseUnitSize = !unit || unit === 'px' ? 1 : FONT_SIZE_ROOT;
  return stripUnit(value) * baseUnitSize;
};

export const normalizeUnits = (...values: (string | number)[]): number => {
  return values.reduce((acc: number, size: string | number) => acc + normalizeUnit(size), 0);
};

export const toRatio = (value: number | string, baseUnitSize): number => {
  const denominator = baseUnitSize ? normalizeUnit(baseUnitSize) : FONT_SIZE_ROOT;
  return normalizeUnit(value) / denominator;
};

export const toPX = (value: string | number) => `${Math.floor(normalizeUnit(value))}px`;

const toRelativeUnit = (value: string | number) => normalizeUnit(value) / FONT_SIZE_ROOT;

export const toEM = (value: number) => `${toRelativeUnit(value)}em`;
export const toREM = (value: number, flag?: string) => {
  if (flag) {
    console.log(`${flag}->toREM`, value, toRelativeUnit(value));
  }
  return `${toRelativeUnit(value)}rem`;
};

export const color = {
  ...COLORS,
  ...VARIANTS,

  text: {
    body: BODY_COLOR,
    dark: VARIANTS.dark,
    medium: GRAYS['gray-600'],
    light: WHITE,
    muted: GRAYS['gray-500'],
    link: LINK_COLOR,
  },

  bg: {
    body: BODY_BG,
    dark: VARIANTS.dark,
    medium: VARIANTS.secondary,
    light: VARIANTS.light,
    hovered: VARIANTS.light,
    focused: Color(VARIANTS.light).darken(0.2).string(),
    muted: GRAYS['gray-500'],
    active: VARIANTS.primary,
    activeLight: Color(VARIANTS.primary).lighten(0.2).string(),
    activeDark: Color(VARIANTS.primary).darken(0.2).string(),
  },

  border: {
    base: BLACK_12,
    light: BLACK_06,
  },

  component: {
    active: {
      color: WHITE,
      bg: VARIANTS.primary,
      borderColor: VARIANTS.primary,
      focusBg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
      focusBorder: Color(COLORS.magenta).hsl().string(),
    },
  },
};

export const font = {
  family: {
    base: FONT_FAMILY_BASE,
  },
  lineHeight: {
    base: LINE_HEIGHT_BASE,
    sm: LINE_HEIGHT_SM,
    lg: LINE_HEIGHT_LG,
  },
  weight: (value: string | number) => {
    if (CSS_VALUE_PRESETS.fontWeight.includes(`${value}`)) {
      return `font-weight: ${CSS_VALUE_PRESETS.fontWeight[`${value}`]};`;
    }
    return `font-weight: normal;`;
  },
  sizes: {
    base: FONT_SIZE_BASE,
    sm: FONT_SIZE_SM,
    lg: FONT_SIZE_LG,
    h1: H1_FONT_SIZE,
    h2: H2_FONT_SIZE,
    h3: H3_FONT_SIZE,
    h4: H4_FONT_SIZE,
    h5: H5_FONT_SIZE,
    h6: H6_FONT_SIZE,
  },
  size: (size: number) => `font-size: ${size}px;`,
};

const calcControlHeight = (config: Partial<ControlSettings> = {}) => {
  const { paddingY, borderWidth, fontSize, lineHeight } = { ...CONTROL_SETTINGS, ...config };
  const py = paddingY * 2;
  const bw = borderWidth * 2;
  const innerHeight = fontSize * lineHeight;

  return innerHeight + py + bw;
};

export const spacers = {
  ...SPACERS,
  auto: 'auto',
};

export const radius = {
  none: '0',
  base: '0.25rem',
  sm: '0.2rem',
  lg: '0.325rem',
  pill: '50rem',
  circle: '50%',
};

export const shadow = {
  0: `0 1px 2px 0px ${BLACK_12}`,
  1: `0 2px 4px -1px ${BLACK_20}`,
  2: `0 4px 5px 0 ${BLACK_40}`,
  3: `0 1px 10px 0 ${BLACK_12}`,
};

export const focusShadow = {
  0: '0 0px 2px hsla(216, 98%, 52%, 0.3)',
  1: '0 0px 4px hsla(216, 98%, 52%, 0.5)',
  2: '0 0px 5px hsla(216, 98%, 52%, 0.3)',
  3: '0 0px 10px hsla(216, 98%, 52%, 0.5)',
};

export const link = {
  color: LINK_COLOR,
  decoration: LINK_DECORATION,
  hover: {
    color: LINK_HOVER_COLOR,
    decoration: LINK_HOVER_DECORATION,
  },
};

const buttonVariant = (value: string) => {
  const bg = Color(value);
  const borderColor = Color(value);
  const textColor = Color(value).isDark() ? Color(color.white) : Color(color.dark);

  return css`
    background-color: ${bg.string()};
    border-color: ${borderColor.string()};
    color: ${textColor.string()};
    text-decoration: none;
    &:hover,
    &:focus {
      background-color: ${bg.darken(0.2).string()};
      border-color: ${borderColor.darken(0.2).string()};
      color: ${textColor.string()};
      text-decoration: none;
    }
    &:disabled {
      background-color: ${bg.alpha(0.8).desaturate(0.3).string()};
      border-color: ${borderColor.alpha(0.8).desaturate(0.3).string()};
      color: ${textColor.alpha(0.8).string()};
      outline: none;
      pointer-events: none;
    }
  `;
};

export const sizes = {
  minViewportWidth: 1000,
};

export const zIndexes = {
  modal: 1000,
  dropdown: 101,
};

export const transition = {
  duration: {
    easeIn: '300ms',
    easeOut: '400ms',
    easeInOut: '500ms',
  },
  timing: {
    easeIn: 'cubic-bezier(0.55, 0, 0.55, 0.2)',
    easeOut: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    easeInOut: 'cubic-bezier(0.35, 0, 0.25, 1)',
    fastOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fastOutLinearIn: 'cubic-bezier(0.4, 0, 1, 1)',
    linearOutSlowIn: 'cubic-bezier(0, 0, 0.2, 0.1)',
  },
};

export const control = {
  color: VARIANTS.dark,
  bg: VARIANTS.light,
  borderColor: BLACK_06, // 'hsla(200, 7%, 8%, 0.05)'
  borderWidth: toREM(CONTROL_SETTINGS.borderWidth),
  borderRadius: radius.base,
  fontFamily: font.family.base,
  fontSize: toEM(CONTROL_SETTINGS.fontSize),
  lineHeight: CONTROL_SETTINGS.lineHeight,
  height: toREM(calcControlHeight()),
  paddingX: toREM(CONTROL_SETTINGS.paddingX),
  paddingY: toREM(CONTROL_SETTINGS.paddingY),
  active: {
    bg: WHITE,
    borderColor: Color(BLACK_06).darken(0.05).string(), // 'hsla(200, 7%, 8%, 0.1)' [light gray]
    boxShadowColor: 'hsla(330, 67%, 52%, 0.1)', // --magenta
    boxShadow: '0 0 0 0.25rem hsla(330, 67%, 52%, 0.1)',
    color: VARIANTS.dark,
  },
  checked: {
    bg: VARIANTS.primary,
    borderColor: VARIANTS.primary,
    invalid: VARIANTS.danger,
  },
  disabled: {
    bg: Color(VARIANTS.light).lighten(0.3).alpha(0.8).string(),
    color: Color(VARIANTS.dark).lighten(0.3).alpha(0.8).string(),
    borderColor: Color(BLACK_06).lighten(0.05).alpha(0.8).string(),
  },
  focus: {
    borderColor: Color(COLORS.magenta).alpha(0.4).hsl().string(), // --magenta
  },
  invalid: {
    bg: Color(VARIANTS.danger).alpha(0.2).string(),
    borderColor: VARIANTS.danger,
    color: VARIANTS.danger,
  },
};

const directions = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  x: 'left right',
  y: 'top bottom',
};

export function generateSpacer(prop: string) {
  function makeRule(dir: string, ...sizes: any[]) {
    let spacing = '0';
    let rule = '';

    spacing = sizes
      .map((sz) => (isNumber(sz) && spacers[sz] ? toREM(spacers[sz]) : isUnit(sz) ? sz : toREM(sz)))
      .join(' ');

    if (!dir) {
      rule = `${prop}: ${spacing};`;
    } else {
      if (dir === 'x' || dir === 'y') {
        const [start, end] = directions[dir].split(' ');
        rule = `${prop}-${start}: ${spacing}; ${prop}-${end}: ${spacing}`;
      } else {
        rule = `${prop}-${directions[dir]}: ${spacing};`;
      }
    }

    return css`
      ${rule}
    `;
  }

  return {
    all: (...sizes: any[]) => makeRule(null, ...sizes),
    top: (...sizes: any[]) => makeRule('top', ...sizes),
    right: (...sizes: any[]) => makeRule('right', ...sizes),
    bottom: (...sizes: any[]) => makeRule('bottom', ...sizes),
    left: (...sizes: any[]) => makeRule('left', ...sizes),
    x: (...sizes: any[]) => makeRule('x', ...sizes),
    y: (...sizes: any[]) => makeRule('y', ...sizes),
  };
}

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
  buttonVariant,
  shadow: (...levels: number[]) => css`
    box-shadow: ${levels
      .reduce((acc, level) => {
        const normalizeLevel = level < 0 ? 0 : level > 4 ? 4 : level;
        acc.push(shadow[normalizeLevel]);
        return acc;
      }, [])
      .join(', ')};
  `,
  dropShadow: (...levels: number[]) => css`
    filter: drop-shadow(
      ${levels
        .reduce((acc, level) => {
          const normalizeLevel = level < 0 ? 0 : level > 4 ? 4 : level;
          acc.push(shadow[normalizeLevel]);
          return acc;
        }, [])
        .join(', ')}
    );
  `,
  margin: generateSpacer('margin'),
  padding: generateSpacer('padding'),
  truncateText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
  hardwareAccelerate: css`
    transform: translateZ(0);
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  inlineFlexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  square: (size: string) => css`
    width: ${size};
    height: ${size};
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  customScrollbar: ({ width = 8, background = color.bg.medium } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: ${background};
    }
  `,
  link: (colorValue = color.text.link) => css`
    cursor: pointer;
    color: ${colorValue};
    ${font.weight(500)}
    text-decoration: underline;
    &:hover,
    &:visited,
    &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: none;
    }
  `,
};
