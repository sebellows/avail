/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BLACK,
  BLACK_50,
  BODY_BG,
  BODY_COLOR,
  BORDER_COLOR,
  BORDER_WIDTH,
  BORDER_RADIUS,
  BORDER_RADIUS_SM,
  BORDER_RADIUS_LG,
  BORDER_STYLES,
  BOX_SHADOW,
  BOX_SHADOW_SM,
  BOX_SHADOW_LG,
  COLORS,
  DIRECTIONS,
  FONT_FAMILY_MONOSPACE,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_BOLDER,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_LIGHTER,
  FONT_WEIGHT_NORMAL,
  GRAYS,
  GRID_BREAKPOINTS,
  INDENT_AMOUNT,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_LG,
  NEGATIVE_SPACERS,
  ROUNDED_PILL,
  SPACERS,
  TEXT_MUTED,
  THEME_COLORS,
  WHITE,
  WHITE_50,
} from './constants';
import { toOptions } from './models/Option';
import { CSS_VALUE_PRESETS } from './presets';
import { AvailUtilities } from './contracts';

// const arrayToOptions = (collection: string[]): OptionProps[] => {
//   return collection.map((item) => {
//     if (CONST[item]) {
//       return { name: hyphenate(item), value: CONST[item] };
//     }
//     return { name: hyphenate(item), value: hyphenate(item) };
//   });
// };

// const objectToOptions = (collection: Record<string, any>): OptionProps[] => {
//   return Object.entries(collection).reduce((arr: OptionProps[], [name, value]) => {
//     arr.push({ name: hyphenate(name), value: hyphenate(value) });
//     return arr;
//   }, []);
// };

export const Settings = (settings: Record<string, any> = {}) => {
  const prefix = { type: 'text', value: '', required: true, placeholder: 'i.e., app-' };
  const reboot = {
    type: 'checkbox',
    value: 'reboot',
    label: "Include Bootstrap's Reboot?",
    checked: true,
  };
  const breakpoints = {
    type: 'text',
    options: [
      { name: 'xs', value: '0', readonly: true },
      { name: 'sm', value: '580px' },
      { name: 'md', value: '768px' },
      { name: 'lg', value: '990px' },
      { name: 'xl', value: '1200px' },
    ],
  };
  const colors = {
    type: 'color',
    options: toOptions(COLORS),
  };
  const grays = {
    type: 'color',
    options: toOptions(GRAYS),
  };
  // enabled: true,
  // responsive: false,
  // property: 'overflow',
  // class: 'overflow',
  // presets: ['visible', 'hidden', 'clip', 'auto', 'scroll', ...GLOBAL_CSS_VALUES],
  // options: [
  const variants = {
    type: 'select',
    presets: { ...COLORS, ...GRAYS },
    options: [
      { name: 'primary', value: COLORS.blue },
      { name: 'secondary', value: GRAYS['gray-600'] },
      { name: 'success', value: COLORS.green },
      { name: 'info', value: COLORS.cyan },
      { name: 'warning', value: COLORS.yellow },
      { name: 'danger', value: COLORS.red },
      { name: 'light', value: GRAYS['gray-100'] },
      { name: 'dark', value: GRAYS['gray-800'] },
    ],
  };
  const body = {
    type: 'select',
    presets: { ...THEME_COLORS, ...COLORS, ...GRAYS },
    options: [
      { name: 'body-bg', value: WHITE },
      { name: 'body-color', value: THEME_COLORS.dark },
    ],
  };
  const spacing = {
    type: 'text',
    options: [
      { name: '0', value: '0' },
      { name: '1', value: '0.25rem' },
      { name: '2', value: '0.5rem' },
      { name: '3', value: '1rem' },
      { name: '4', value: '1.5rem' },
      { name: '5', value: '3rem' },
    ],
    description: `Units used for generating <em>spacing</em> classes (e.g., margins and padding).`,
  };
  const borderWidth = {
    type: 'text',
    value: '1px',
    label: 'Border Width:',
  };
  const borderStyle = {
    type: 'select',
    value: 'solid',
    label: 'Border Style:',
    options: [
      {
        name: 'solid',
        value: 'solid',
      },
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'dashed',
        value: 'dashed',
      },
      {
        name: 'dotted',
        value: 'dotted',
      },
    ],
  };
  const borderColor = {
    type: 'select',
    value: GRAYS,
    label: 'Border Color:',
    options: toOptions({ ...COLORS, ...GRAYS }),
  };
  const directions = {
    type: 'text',
    options: [
      { name: 't', value: 'top', readonly: true },
      { name: 'r', value: 'right', readonly: true },
      { name: 'b', value: 'bottom', readonly: true },
      { name: 'l', value: 'left', readonly: true },
      { name: 'y', value: 'top bottom', readonly: true },
      { name: 'x', value: 'left right', readonly: true },
    ],
    description: `Name directions/sides for appending as suffixes to utily classes that effect them (i.e., margins and padding).`,
  };
  // const negativeMarginPrefix = { type: 'text', value: 'n', placeholder: 'i.e., ml-n3' };

  return {
    prefix,
    reboot,
    breakpoints,
    directions,
    colors,
    grays,
    variants,
    borderColor,
    borderStyle,
    borderWidth,
    body,
    spacing,
  };
};

export function generateSettings(settings: Record<string, any> = {}) {
  const config = Settings(settings);

  return Object.entries(config).reduce((form, [key, value]) => {
    form[key] = { id: key, ...value };
    return form;
  }, {});
}

const Config = (utils: AvailUtilities = {}): AvailUtilities => ({
  align: {
    enabled: true,
    responsive: false,
    property: 'vertical-align',
    class: 'align',
    presets: CSS_VALUE_PRESETS.align,
    options: [
      {
        name: 'baseline',
        value: 'baseline',
      },
      {
        name: 'top',
        value: 'top',
      },
      {
        name: 'middle',
        value: 'middle',
      },
      {
        name: 'bottom',
        value: 'bottom',
      },
      {
        name: 'text-bottom',
        value: 'text-bottom',
      },
      {
        name: 'text-top',
        value: 'text-top',
      },
    ],
  },
  float: {
    enabled: true,
    responsive: true,
    property: 'float',
    class: 'float',
    presets: CSS_VALUE_PRESETS.float,
    options: [
      {
        name: 'left',
        value: 'left',
      },
      {
        name: 'right',
        value: 'right',
      },
      {
        name: 'none',
        value: 'none',
      },
    ],
  },
  overflow: {
    enabled: true,
    responsive: false,
    property: 'overflow',
    class: 'overflow',
    presets: CSS_VALUE_PRESETS.overflow,
    options: [
      {
        name: 'auto',
        value: 'auto',
      },
      {
        name: 'hidden',
        value: 'hidden',
      },
    ],
  },
  display: {
    enabled: true,
    responsive: true,
    property: 'display',
    class: 'd',
    presets: CSS_VALUE_PRESETS.display,
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'inline',
        value: 'inline',
      },
      {
        name: 'inline-block',
        value: 'inline-block',
      },
      {
        name: 'block',
        value: 'block',
      },
      {
        name: 'table',
        value: 'table',
      },
      {
        name: 'table-row',
        value: 'table-row',
      },
      {
        name: 'table-cell',
        value: 'table-cell',
      },
      {
        name: 'flex',
        value: 'flex',
      },
      {
        name: 'inline-flex',
        value: 'inline-flex',
      },
    ],
  },
  shadow: {
    enabled: true,
    responsive: false,
    property: 'box-shadow',
    class: 'shadow',
    options: [
      {
        name: null,
        value: BOX_SHADOW,
      },
      {
        name: 'sm',
        value: BOX_SHADOW_SM,
      },
      {
        name: 'lg',
        value: BOX_SHADOW_LG,
      },
      {
        name: 'none',
        value: 'none',
      },
    ],
  },
  position: {
    enabled: true,
    responsive: false,
    property: 'position',
    class: 'position',
    presets: CSS_VALUE_PRESETS.position,
    options: [
      {
        name: 'static',
        value: 'static',
      },
      {
        name: 'relative',
        value: 'relative',
      },
      {
        name: 'absolute',
        value: 'absolute',
      },
      {
        name: 'fixed',
        value: 'fixed',
      },
      {
        name: 'sticky',
        value: 'sticky',
      },
    ],
  },
  border: {
    enabled: true,
    responsive: false,
    property: 'border',
    class: 'border',
    options: [
      {
        name: null,
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  borderTop: {
    enabled: true,
    responsive: false,
    property: 'border-top',
    class: 'border-top',
    options: [
      {
        name: null,
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  borderRight: {
    enabled: true,
    responsive: false,
    property: 'border-right',
    class: 'border-right',
    options: [
      {
        name: null,
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  borderBottom: {
    enabled: true,
    responsive: false,
    property: 'border-bottom',
    class: 'border-bottom',
    options: [
      {
        name: null,
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  borderLeft: {
    enabled: true,
    responsive: false,
    property: 'border-left',
    class: 'border-left',
    options: [
      {
        name: null,
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  borderColor: {
    enabled: true,
    responsive: false,
    property: 'border-color',
    class: 'border',
    options: [...toOptions(THEME_COLORS, { WHITE })],
  },
  // Sizing utilities
  width: {
    enabled: true,
    responsive: false,
    property: 'width',
    class: 'w',
    options: [
      {
        name: '25',
        value: '25%',
      },
      {
        name: '50',
        value: '50%',
      },
      {
        name: '75',
        value: '75%',
      },
      {
        name: '100',
        value: '100%',
      },
      {
        name: 'auto',
        value: 'auto',
      },
    ],
  },
  maxWidth: {
    enabled: true,
    responsive: false,
    property: 'max-width',
    class: 'mw',
    options: [{ name: 100, value: '100%' }],
  },
  viewportWidth: {
    enabled: true,
    responsive: false,
    property: 'width',
    class: 'vw',
    options: [{ name: 100, value: '100vw' }],
  },
  minViewportWidth: {
    enabled: true,
    responsive: false,
    property: 'min-width',
    class: 'min-vw',
    options: [{ name: 100, value: '100vw' }],
  },
  height: {
    enabled: true,
    responsive: false,
    property: 'height',
    class: 'h',
    options: [
      {
        name: '25',
        value: '25%',
      },
      {
        name: '50',
        value: '50%',
      },
      {
        name: '75',
        value: '75%',
      },
      {
        name: '100',
        value: '100%',
      },
      {
        name: 'auto',
        value: 'auto',
      },
    ],
  },
  maxHeight: {
    enabled: true,
    responsive: false,
    property: 'max-height',
    class: 'mh',
    options: [{ name: 100, value: '100%' }],
  },
  viewportHeight: {
    enabled: true,
    responsive: false,
    property: 'height',
    class: 'vh',
    options: [{ name: 100, value: '100vh' }],
  },
  minViewportHeight: {
    enabled: true,
    responsive: false,
    property: 'min-height',
    class: 'min-vh',
    options: [{ name: 100, value: '100vh' }],
  },
  // Flex utilities
  flex: {
    enabled: true,
    responsive: true,
    property: 'flex',
    class: 'flex',
    options: [{ name: 'fill', value: '1 1 auto' }],
  },
  flexDirection: {
    enabled: true,
    responsive: true,
    property: 'flex-direction',
    class: 'flex',
    presets: CSS_VALUE_PRESETS.flexDirection,
    options: [
      {
        name: 'row',
        value: 'row',
      },
      {
        name: 'column',
        value: 'column',
      },
      {
        name: 'row-reverse',
        value: 'row-reverse',
      },
      {
        name: 'column-reverse',
        value: 'column-reverse',
      },
    ],
  },
  flexGrow: {
    enabled: true,
    responsive: true,
    property: 'flex-grow',
    class: 'flex',
    options: [
      {
        name: 'grow-0',
        value: 0,
      },
      {
        name: 'grow-1',
        value: 1,
      },
    ],
  },
  flexShrink: {
    enabled: true,
    responsive: true,
    property: 'flex-shrink',
    class: 'flex',
    options: [
      {
        name: 'shrink-0',
        value: 0,
      },
      {
        name: 'shrink-1',
        value: 1,
      },
    ],
  },
  flexWrap: {
    enabled: true,
    responsive: true,
    property: 'flex-wrap',
    class: 'flex',
    presets: CSS_VALUE_PRESETS.flexWrap,
    options: [
      {
        name: 'wrap',
        value: 'wrap',
      },
      {
        name: 'nowrap',
        value: 'nowrap',
      },
      {
        name: 'wrap-reverse',
        value: 'wrap-reverse',
      },
    ],
  },
  justifyContent: {
    enabled: true,
    responsive: true,
    property: 'justify-content',
    class: 'justify-content',
    presets: CSS_VALUE_PRESETS.justifyContent,
    options: [
      {
        name: 'start',
        value: 'flex-start',
      },
      {
        name: 'end',
        value: 'flex-end',
      },
      {
        name: 'center',
        value: 'center',
      },
      {
        name: 'between',
        value: 'space-between',
      },
      {
        name: 'around',
        value: 'space-around',
      },
    ],
  },
  alignItems: {
    enabled: true,
    responsive: true,
    property: 'align-items',
    class: 'align-items',
    presets: CSS_VALUE_PRESETS.alignItems,
    options: [
      {
        name: 'start',
        value: 'flex-start',
      },
      {
        name: 'end',
        value: 'flex-end',
      },
      {
        name: 'center',
        value: 'center',
      },
      {
        name: 'baseline',
        value: 'baseline',
      },
      {
        name: 'stretch',
        value: 'stretch',
      },
    ],
  },
  alignContent: {
    enabled: true,
    responsive: true,
    property: 'align-content',
    class: 'align-content',
    presets: CSS_VALUE_PRESETS.alignContent,
    options: [
      {
        name: 'start',
        value: 'flex-start',
      },
      {
        name: 'end',
        value: 'flex-end',
      },
      {
        name: 'center',
        value: 'center',
      },
      {
        name: 'between',
        value: 'space-between',
      },
      {
        name: 'around',
        value: 'space-around',
      },
      {
        name: 'stretch',
        value: 'stretch',
      },
    ],
  },
  alignSelf: {
    enabled: true,
    responsive: true,
    property: 'align-self',
    class: 'align-self',
    presets: CSS_VALUE_PRESETS.alignSelf,
    options: [
      {
        name: 'auto',
        value: 'auto',
      },
      {
        name: 'start',
        value: 'flex-start',
      },
      {
        name: 'end',
        value: 'flex-end',
      },
      {
        name: 'center',
        value: 'center',
      },
      {
        name: 'baseline',
        value: 'baseline',
      },
      {
        name: 'stretch',
        value: 'stretch',
      },
    ],
  },
  order: {
    enabled: true,
    responsive: true,
    property: 'order',
    class: 'order',
    options: [
      {
        name: 'first',
        value: -1,
      },
      {
        name: 0,
        value: 0,
      },
      {
        name: 1,
        value: 1,
      },
      {
        name: 2,
        value: 2,
      },
      {
        name: 3,
        value: 3,
      },
      {
        name: 4,
        value: 4,
      },
      {
        name: 5,
        value: 5,
      },
      {
        name: 'last',
        value: 6,
      },
    ],
  },
  // Margin utilities
  margin: {
    enabled: true,
    responsive: true,
    property: 'margin',
    class: 'm',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginX: {
    enabled: true,
    responsive: true,
    property: 'margin-right margin-left',
    class: 'mx',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginY: {
    enabled: true,
    responsive: true,
    property: 'margin-top margin-bottom',
    class: 'my',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginTop: {
    enabled: true,
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginRight: {
    enabled: true,
    responsive: true,
    property: 'margin-right',
    class: 'mr',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginBottom: {
    enabled: true,
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    options: [...toOptions(SPACERS, 'auto')],
  },
  marginLeft: {
    enabled: true,
    responsive: true,
    property: 'margin-left',
    class: 'ml',
    options: [...toOptions(SPACERS, 'auto')],
  },
  // Negative margin utilities
  negativeMargin: {
    enabled: true,
    responsive: true,
    property: 'margin',
    class: 'm',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginX: {
    enabled: true,
    responsive: true,
    property: 'margin-right margin-left',
    class: 'mx',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginY: {
    enabled: true,
    responsive: true,
    property: 'margin-top margin-bottom',
    class: 'my',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginTop: {
    enabled: true,
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginRight: {
    enabled: true,
    responsive: true,
    property: 'margin-right',
    class: 'mr',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginBottom: {
    enabled: true,
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginLeft: {
    enabled: true,
    responsive: true,
    property: 'margin-left',
    class: 'ml',
    options: [...toOptions(NEGATIVE_SPACERS)],
  },
  // Padding utilities
  padding: {
    enabled: true,
    responsive: true,
    property: 'padding',
    class: 'p',
    options: [...toOptions(SPACERS)],
  },
  paddingX: {
    enabled: true,
    responsive: true,
    property: 'padding-right padding-left',
    class: 'px',
    options: [...toOptions(SPACERS)],
  },
  paddingY: {
    enabled: true,
    responsive: true,
    property: 'padding-top padding-bottom',
    class: 'py',
    options: [...toOptions(SPACERS)],
  },
  paddingTop: {
    enabled: true,
    responsive: true,
    property: 'padding-top',
    class: 'pt',
    options: [...toOptions(SPACERS)],
  },
  paddingRight: {
    enabled: true,
    responsive: true,
    property: 'padding-right',
    class: 'pr',
    options: [...toOptions(SPACERS)],
  },
  paddingBottom: {
    enabled: true,
    responsive: true,
    property: 'padding-bottom',
    class: 'pb',
    options: [...toOptions(SPACERS)],
  },
  paddingLeft: {
    enabled: true,
    responsive: true,
    property: 'padding-left',
    class: 'pl',
    options: [...toOptions(SPACERS)],
  },
  // Text
  fontStyle: {
    enabled: true,
    responsive: false,
    property: 'font-style',
    class: 'font',
    presets: CSS_VALUE_PRESETS.fontStyle,
    options: [
      {
        name: 'italic',
        value: 'italic',
      },
      {
        name: 'normal',
        value: 'normal',
      },
    ],
  },
  fontWeight: {
    enabled: true,
    responsive: false,
    property: 'font-weight',
    class: 'font-weight',
    presets: CSS_VALUE_PRESETS.fontWeight,
    options: [
      {
        name: 'light',
        value: FONT_WEIGHT_LIGHT,
      },
      {
        name: 'lighter',
        value: FONT_WEIGHT_LIGHTER,
      },
      {
        name: 'normal',
        value: FONT_WEIGHT_NORMAL,
      },
      {
        name: 'bold',
        value: FONT_WEIGHT_BOLD,
      },
      {
        name: 'bolder',
        value: FONT_WEIGHT_BOLDER,
      },
    ],
  },
  textTransform: {
    enabled: true,
    responsive: false,
    property: 'text-transform',
    class: 'text',
    presets: CSS_VALUE_PRESETS.textTransform,
    options: [
      {
        name: 'lowercase',
        value: 'lowercase',
      },
      {
        name: 'uppercase',
        value: 'uppercase',
      },
      {
        name: 'capitalize',
        value: 'capitalize',
      },
    ],
  },
  textAlign: {
    enabled: true,
    responsive: true,
    property: 'text-align',
    class: 'text',
    presets: CSS_VALUE_PRESETS.textAlign,
    options: [
      {
        name: 'left',
        value: 'left',
      },
      {
        name: 'right',
        value: 'right',
      },
      {
        name: 'center',
        value: 'center',
      },
    ],
  },
  color: {
    enabled: true,
    responsive: false,
    property: 'color',
    class: 'text',
    options: [
      ...toOptions(THEME_COLORS, {
        WHITE,
        body: BODY_COLOR,
        muted: TEXT_MUTED,
        BLACK_50,
        WHITE_50,
      }),
      {
        name: 'reset',
        value: 'inherit',
      },
    ],
  },
  lineHeight: {
    enabled: true,
    responsive: false,
    property: 'line-height',
    class: 'lh',
    options: [
      {
        name: 1,
        value: 1,
      },
      {
        name: 'sm',
        value: LINE_HEIGHT_SM,
      },
      {
        name: 'base',
        value: LINE_HEIGHT_BASE,
      },
      {
        name: 'lg',
        value: LINE_HEIGHT_LG,
      },
    ],
  },
  backgroundColor: {
    enabled: true,
    responsive: false,
    property: 'background-color',
    class: 'bg',
    options: [
      ...toOptions(THEME_COLORS, {
        WHITE,
        body: BODY_COLOR,
        muted: TEXT_MUTED,
        BLACK_50,
        WHITE_50,
      }),
      {
        name: 'transparent',
        value: 'transparent',
      },
    ],
  },
  whiteSpace: {
    enabled: true,
    responsive: false,
    property: 'white-space',
    class: 'text',
    presets: CSS_VALUE_PRESETS.whiteSpace,
    options: [
      {
        name: 'wrap',
        value: 'normal',
      },
      {
        name: 'nowrap',
        value: 'nowrap',
      },
    ],
  },
  textDecoration: {
    enabled: true,
    responsive: false,
    property: 'text-decoration',
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'underline',
        value: 'underline',
      },
      {
        name: 'line-through',
        value: 'line-through',
      },
    ],
  },
  wordWrap: {
    enabled: true,
    responsive: false,
    property: 'word-wrap',
    class: 'text',
    options: [{ name: 'break', value: 'break-word' }],
  },
  fontFamily: {
    enabled: true,
    responsive: false,
    property: 'font-family',
    class: 'font',
    options: [{ name: 'monospace', value: FONT_FAMILY_MONOSPACE }],
  },
  userSelect: {
    enabled: true,
    responsive: false,
    property: 'user-select',
    class: 'user-select',
    presets: CSS_VALUE_PRESETS.userSelect,
    options: [
      {
        name: 'all',
        value: 'all',
      },
      {
        name: 'auto',
        value: 'auto',
      },
      {
        name: 'none',
        value: 'none',
      },
    ],
  },
  pointerEvents: {
    enabled: true,
    responsive: false,
    property: 'pointer-events',
    class: 'pe',
    presets: CSS_VALUE_PRESETS.pointerEvents,
    options: [
      {
        name: 'none',
        value: 'none',
      },
      {
        name: 'auto',
        value: 'auto',
      },
    ],
  },
  rounded: {
    enabled: true,
    responsive: false,
    property: 'border-radius',
    class: 'rounded',
    options: [
      {
        name: null,
        value: BORDER_RADIUS,
      },
      {
        name: 'sm',
        value: BORDER_RADIUS_SM,
      },
      {
        name: 'lg',
        value: BORDER_RADIUS_LG,
      },
      {
        name: 'circle',
        value: '50%',
      },
      {
        name: 'pill',
        value: ROUNDED_PILL,
      },
      {
        name: 0,
        value: 0,
      },
    ],
  },
  roundedTop: {
    enabled: true,
    responsive: false,
    property: 'border-top-left-radius border-top-right-radius',
    class: 'rounded-top',
    options: [{ name: null, value: BORDER_RADIUS }],
  },
  roundedRight: {
    enabled: true,
    responsive: false,
    property: 'border-top-right-radius border-bottom-right-radius',
    class: 'rounded-right',
    options: [{ name: null, value: BORDER_RADIUS }],
  },
  roundedBottom: {
    enabled: true,
    responsive: false,
    property: 'border-bottom-right-radius border-bottom-left-radius',
    class: 'rounded-bottom',
    options: [{ name: null, value: BORDER_RADIUS }],
  },
  roundedLeft: {
    enabled: true,
    responsive: false,
    property: 'border-bottom-left-radius border-top-left-radius',
    class: 'rounded-left',
    options: [{ name: null, value: BORDER_RADIUS }],
  },
  visibility: {
    enabled: true,
    responsive: false,
    property: 'visibility',
    class: '',
    presets: CSS_VALUE_PRESETS.visibility,
    options: [
      {
        name: 'visible',
        value: 'visible',
      },
      {
        name: 'invisible',
        value: 'hidden',
      },
    ],
  },
  ...utils,
});

export function generateConfig(utils: AvailUtilities = {}) {
  const config = Config(utils);

  return Object.entries(config).reduce((form, [key, value]) => {
    form[key] = { id: key, ...value };
    return form;
  }, {});
}
