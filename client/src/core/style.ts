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
  H1_FONT_SIZE,
  H2_FONT_SIZE,
  H4_FONT_SIZE,
  H5_FONT_SIZE,
  H6_FONT_SIZE,
  H3_FONT_SIZE,
  SPACERS,
} from './constants';
import { isNumber } from './utils';

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
    hovered: VARIANTS.light,
    focused: Color(VARIANTS.light).darken(0.2).string(),
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

export const control = {
  color: GRAYS['gray-700'],
  bg: VARIANTS.light,
  borderColor: 'hsla(200, 7%, 8%, 0.05)',
  borderWidth: '0.09375rem',
  fontFamily: font.family.base,
  fontSize: '1em',
  height: 'calc(1.5em + 0.75rem + 0.1875rem)',
  paddingX: '1rem',
  paddingY: '0.625rem',
  active: {
    bg: WHITE,
    borderColor: 'hsla(200, 7%, 8%, 0.1)',
    boxShadow: 'hsla(330, 67%, 52%, 0.1)',
    color: VARIANTS.dark,
  },
  checked: {
    bg: VARIANTS.primary,
    borderColor: VARIANTS.primary,
    invalid: VARIANTS.danger,
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

export const spacers = {
  ...SPACERS,
  auto: 'auto',
};
const spacingDirections = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  x: 'left right',
  y: 'top bottom',
};

function generateSpacer(prop: string) {
  return (size: number | string | number[], ...dirs: string[]) => {
    let spacing = '0';
    if (Array.isArray(size)) {
      spacing = size.map((sz) => (isNumber(sz) ? spacers[sz] : sz)).join(' ');
    } else {
      spacing = isNumber(size) && spacers[size] ? spacers[size] : size;
    }
    if (!dirs?.length) {
      const rule = `${prop}: ${spacing};`;
      return css`
        ${rule}
      `;
    }
    const value = dirs.reduce((acc, dir) => {
      if (dir === 'x' || dir === 'y') {
        const [start, end] = spacingDirections[dir].split(' ');
        acc += `${prop}-${start}: ${spacing}; ${prop}-${end}: ${spacing}`;
      }
      acc += `${prop}-${spacingDirections[dir[0]]}: ${spacing};`;
      return acc;
    }, '');

    return css`
      ${value}
    `;
  };
}

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

export const shadow = {
  0: '0 1px 2px 0px rgba(0, 0, 0, 0.12)',
  1: '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  2: '0 4px 5px 0 rgba(0, 0, 0, 0.14)',
  3: '0 1px 10px 0 rgba(0, 0, 0, 0.12)',
};

export const focusShadow = {
  0: '0 0px 2px hsla(216, 98%, 52%, 0.3)',
  1: '0 0px 4px hsla(216, 98%, 52%, 0.5)',
  2: '0 0px 5px hsla(216, 98%, 52%, 0.3)',
  3: '0 0px 10px hsla(216, 98%, 52%, 0.5)',
};

export const mixin = {
  darken: (colorValue: string, amount: number) => Color(colorValue).darken(amount).string(),
  lighten: (colorValue: string, amount: number) => Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: string, opacity: number) => Color(colorValue).alpha(opacity).string(),
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
