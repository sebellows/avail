import { css } from 'styled-components';
import Color from 'color';
import { CSS_VALUE_PRESETS } from '../presets';
import {
  BODY_BG,
  BODY_COLOR,
  COLORS,
  GRAYS,
  VARIANTS,
  WHITE,
  LINK_COLOR,
  FONT_FAMILY_BASE,
} from '../constants';

export const color = {
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
    muted: GRAYS['gray-500'],
    active: VARIANTS.primary,
    activeLight: Color(VARIANTS.primary).lighten(0.2).string(),
    activeDark: Color(VARIANTS.primary).darken(0.2).string(),
  },

  border: {
    base: 'rgba(0, 0, 0, 0.12)',
    light: 'rgba(0, 0, 0, 0.05)',
  },

  component: {
    active: {
      color: WHITE,
      bg: VARIANTS.primary,
      focusBg: Color(COLORS.magenta).alpha(0.25).hsl().string(),
      focusBorder: Color(COLORS.magenta).hsl().string(),
    },
  },

  control: {
    text: GRAYS['gray-700'],
    bg: VARIANTS.light,
    border: 'hsla(200, 7%, 8%, 0.05)',
    invalid: {
      bg: Color(VARIANTS.danger).alpha(0.2).string(),
      border: VARIANTS.danger,
      text: VARIANTS.danger,
    },
    active: {
      bg: WHITE,
      border: 'hsla(200, 7%, 8%, 0.1)',
      boxShadow: 'hsla(330, 67%, 52%, 0.1)',
      text: VARIANTS.dark,
    },
    focus: {
      border: Color(COLORS.magenta).alpha(0.4).hsl().string(), // --magenta
    },
  },
};

const spacingSizes = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
};
const spacingDirections = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  x: 'left right',
  y: 'top bottom',
  auto: 'top',
};
function createSpacer(prop: string) {
  const spaces = {};
  Object.entries(spacingSizes).forEach(([num, size]) => {
    spaces[num] = `${prop}: ${size}`;

    Object.entries(spacingDirections).forEach(([suffix, dir]) => {
      if (!spaces[suffix]) spaces[suffix] = {};
      const rules = dir.split(' ').reduce((acc, d) => (acc += `${prop}-${d}: ${size}`), '');
      spaces[suffix][num] = css`
        ${rules}
      `;
    });
  });
  return spaces;
}

export const margin = { ...createSpacer('margin') };
export const padding = { ...createSpacer('padding') };

export const radius = {
  none: '0',
  base: '0.25rem',
  sm: '0.2rem',
  lg: '0.325rem',
  pill: '50rem',
  circle: '50%',
};

export const sizes = {
  minViewportWidth: 1000,
};

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
};

export const transition = {
  duration: {
    easeIn: '300ms',
    easeOut: '0.4s',
    easeInOut: '0.5s',
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

export const font = {
  family: {
    base: FONT_FAMILY_BASE,
  },
  weight: (value: string | number) => {
    if (CSS_VALUE_PRESETS.fontWeight.includes(`${value}`)) {
      return `font-weight: ${CSS_VALUE_PRESETS.fontWeight[`${value}`]};`;
    }
    return `font-weight: normal;`;
  },
  size: (size: number) => `font-size: ${size}px;`,
};

export const shadow = {
  0: '0 1px 2px 0px rgba(0, 0, 0, 0.12)',
  1: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  2: '0 4px 5px 0 rgba(0, 0, 0, 0.14)',
  3: '0 1px 10px 0 rgba(0, 0, 0, 0.12)',
};

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
  shadow: (...sizes: number[]) => {
    return sizes.reduce((acc, size, i) => {
      size = size < 0 ? 0 : size > 4 ? 4 : size;
      const sep = i > 0 ? ', ' : '';
      return (acc += `${sep}${shadow[size]})`);
    }, 'box-shadow: ');
  },
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
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
