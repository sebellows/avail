/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BLACK_50,
  BODY_COLOR,
  BORDER_COLOR,
  BORDER_WIDTH,
  BORDER_RADIUS,
  BORDER_RADIUS_SM,
  BORDER_RADIUS_LG,
  BOX_SHADOW,
  BOX_SHADOW_SM,
  BOX_SHADOW_LG,
  FONT_FAMILY_MONOSPACE,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_BOLDER,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_LIGHTER,
  FONT_WEIGHT_NORMAL,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_LG,
  ROUNDED_PILL,
  SPACERS,
  TEXT_MUTED,
  THEME_COLORS,
  WHITE,
  WHITE_50,
} from './constants';
import { toOptions } from './models/Option';
import { toREM, toPX } from './style';
import { AvailUtilities, AvailUtility } from './contracts';
import { CSS_VALUE_PRESETS } from './presets';

const createSpacers = (prefix = '') =>
  Object.entries(SPACERS).reduce((acc, [k, v]) => {
    acc[`${prefix}${k}`] = toREM(v);
    return acc;
  }, {});

const REM_SPACERS = createSpacers();
const NEGATIVE_SPACERS = createSpacers('n');

const Config = (
  settings: Record<string, any> = {},
  utils: AvailUtilities = {},
): AvailUtilities => ({
  backgroundColor: {
    enabled: true,
    responsive: false,
    property: 'background-color',
    class: 'bg',
    inputType: 'colorpicker',
    items: [
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
  color: {
    enabled: true,
    responsive: false,
    property: 'color',
    class: 'text',
    inputType: 'colorpicker',
    items: [
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
  display: {
    enabled: true,
    responsive: true,
    property: 'display',
    class: 'd',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.display,
    items: [
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
  float: {
    enabled: true,
    responsive: true,
    property: 'float',
    class: 'float',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.float,
    items: [
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
  fontFamily: {
    enabled: true,
    responsive: false,
    property: 'font-family',
    class: 'font',
    inputType: 'text',
    items: [{ name: 'monospace', value: FONT_FAMILY_MONOSPACE }],
  },
  lineHeight: {
    enabled: true,
    responsive: false,
    property: 'line-height',
    class: 'lh',
    inputType: 'number',
    items: [
      {
        name: '1',
        value: '1',
      },
      {
        name: 'sm',
        value: `${LINE_HEIGHT_SM}`,
      },
      {
        name: 'base',
        value: `${LINE_HEIGHT_BASE}`,
      },
      {
        name: 'lg',
        value: `${LINE_HEIGHT_LG}`,
      },
    ],
  },
  border: {
    enabled: true,
    responsive: false,
    property: 'border',
    class: 'border',
    inputType: 'text',
    items: [
      {
        name: '',
        value: `${toPX(BORDER_WIDTH)} solid ${BORDER_COLOR}`,
      },
      {
        name: '0',
        value: '0',
      },
    ],
  },
  borderTop: {
    enabled: true,
    responsive: false,
    property: 'border-top',
    class: 'border-top',
    inputType: 'text',
    items: [
      {
        name: '',
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: '0',
        value: '0',
      },
    ],
  },
  borderRight: {
    enabled: true,
    responsive: false,
    property: 'border-right',
    class: 'border-right',
    inputType: 'text',
    items: [
      {
        name: '',
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: '0',
        value: '0',
      },
    ],
  },
  borderBottom: {
    enabled: true,
    responsive: false,
    property: 'border-bottom',
    class: 'border-bottom',
    inputType: 'text',
    items: [
      {
        name: '',
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: '0',
        value: '0',
      },
    ],
  },
  borderLeft: {
    enabled: true,
    responsive: false,
    property: 'border-left',
    class: 'border-left',
    inputType: 'text',
    items: [
      {
        name: '',
        value: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
      },
      {
        name: '0',
        value: '0',
      },
    ],
  },
  borderColor: {
    enabled: true,
    responsive: false,
    property: 'border-color',
    class: 'border',
    inputType: 'text',
    items: [...toOptions(THEME_COLORS, { WHITE })],
  },
  // Sizing utilities
  width: {
    enabled: true,
    responsive: false,
    property: 'width',
    class: 'w',
    inputType: 'text',
    items: [
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
    inputType: 'text',
    items: [{ name: '100', value: '100%' }],
  },
  // viewportWidth: {
  //   enabled: true,
  //   responsive: false,
  //   property: 'width',
  //   class: 'vw',
  //   inputType: 'text',
  //   items: [{ name: '100', value: '100vw' }],
  // },
  minViewportWidth: {
    enabled: true,
    responsive: false,
    property: 'min-width',
    class: 'min-vw',
    inputType: 'text',
    items: [{ name: '100', value: '100vw' }],
  },
  height: {
    enabled: true,
    responsive: false,
    property: 'height',
    class: 'h',
    inputType: 'text',
    items: [
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
    inputType: 'text',
    items: [{ name: '100', value: '100%' }],
  },
  // viewportHeight: {
  //   enabled: true,
  //   responsive: false,
  //   property: 'height',
  //   class: 'vh',
  //   inputType: 'text',
  //   items: [{ name: '100', value: '100vh' }],
  // },
  minViewportHeight: {
    enabled: true,
    responsive: false,
    property: 'min-height',
    class: 'min-vh',
    inputType: 'text',
    items: [{ name: '100', value: '100vh' }],
  },
  // Flex utilities
  flex: {
    enabled: true,
    responsive: true,
    property: 'flex',
    class: 'flex',
    inputType: 'text',
    items: [{ name: 'fill', value: '1 1 auto' }],
  },
  flexDirection: {
    enabled: true,
    responsive: true,
    property: 'flex-direction',
    class: 'flex',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.flexDirection,
    items: [
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
    inputType: 'number',
    items: [
      {
        name: 'grow-0',
        value: '0',
      },
      {
        name: 'grow-1',
        value: '1',
      },
    ],
  },
  flexShrink: {
    enabled: true,
    responsive: true,
    property: 'flex-shrink',
    class: 'flex',
    inputType: 'number',
    items: [
      {
        name: 'shrink-0',
        value: '0',
      },
      {
        name: 'shrink-1',
        value: '1',
      },
    ],
  },
  flexWrap: {
    enabled: true,
    responsive: true,
    property: 'flex-wrap',
    class: 'flex',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.flexWrap,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.justifyContent,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.alignItems,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.alignContent,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.alignSelf,
    items: [
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
    inputType: 'number',
    items: [
      {
        name: 'first',
        value: '-1',
      },
      {
        name: '0',
        value: '0',
      },
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: 'last',
        value: '6',
      },
    ],
  },
  // Margin utilities
  margin: {
    enabled: true,
    responsive: true,
    property: 'margin',
    class: 'm',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginX: {
    enabled: true,
    responsive: true,
    property: 'margin-right margin-left',
    class: 'mx',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginY: {
    enabled: true,
    responsive: true,
    property: 'margin-top margin-bottom',
    class: 'my',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginTop: {
    enabled: true,
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginRight: {
    enabled: true,
    responsive: true,
    property: 'margin-right',
    class: 'mr',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginBottom: {
    enabled: true,
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  marginLeft: {
    enabled: true,
    responsive: true,
    property: 'margin-left',
    class: 'ml',
    inputType: 'text',
    items: [...toOptions(REM_SPACERS, 'auto')],
  },
  // Negative margin utilities
  negativeMargin: {
    enabled: true,
    responsive: true,
    property: 'margin',
    class: 'm',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginX: {
    enabled: true,
    responsive: true,
    property: 'margin-right margin-left',
    class: 'mx',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginY: {
    enabled: true,
    responsive: true,
    property: 'margin-top margin-bottom',
    class: 'my',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginTop: {
    enabled: true,
    responsive: true,
    property: 'margin-top',
    class: 'mt',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginRight: {
    enabled: true,
    responsive: true,
    property: 'margin-right',
    class: 'mr',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginBottom: {
    enabled: true,
    responsive: true,
    property: 'margin-bottom',
    class: 'mb',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  negativeMarginLeft: {
    enabled: true,
    responsive: true,
    property: 'margin-left',
    class: 'ml',
    inputType: 'text',
    items: [...toOptions(NEGATIVE_SPACERS)],
  },
  // Padding utilities
  padding: {
    enabled: true,
    responsive: true,
    property: 'padding',
    class: 'p',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingX: {
    enabled: true,
    responsive: true,
    property: 'padding-right padding-left',
    class: 'px',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingY: {
    enabled: true,
    responsive: true,
    property: 'padding-top padding-bottom',
    class: 'py',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingTop: {
    enabled: true,
    responsive: true,
    property: 'padding-top',
    class: 'pt',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingRight: {
    enabled: true,
    responsive: true,
    property: 'padding-right',
    class: 'pr',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingBottom: {
    enabled: true,
    responsive: true,
    property: 'padding-bottom',
    class: 'pb',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  paddingLeft: {
    enabled: true,
    responsive: true,
    property: 'padding-left',
    class: 'pl',
    inputType: 'text',
    items: [...toOptions(SPACERS)],
  },
  // Text
  fontStyle: {
    enabled: true,
    responsive: false,
    property: 'font-style',
    class: 'font',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.fontStyle,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.fontWeight,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.textTransform,
    items: [
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
    inputType: 'select',
    options: CSS_VALUE_PRESETS.textAlign,
    items: [
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
  textDecoration: {
    enabled: true,
    responsive: false,
    property: 'text-decoration',
    inputType: 'text',
    items: [
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
  whiteSpace: {
    enabled: true,
    responsive: false,
    property: 'white-space',
    class: 'text',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.whiteSpace,
    items: [
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
  overflow: {
    enabled: true,
    responsive: false,
    property: 'overflow',
    class: 'overflow',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.overflow,
    items: [
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
  position: {
    enabled: true,
    responsive: false,
    property: 'position',
    class: 'position',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.position,
    items: [
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
  shadow: {
    enabled: true,
    responsive: false,
    property: 'box-shadow',
    class: 'shadow',
    inputType: 'text',
    items: [
      {
        name: '',
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
  pointerEvents: {
    enabled: true,
    responsive: false,
    property: 'pointer-events',
    class: 'pe',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.pointerEvents,
    items: [
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
    inputType: 'text',
    items: [
      {
        name: '',
        value: toREM(BORDER_RADIUS),
      },
      {
        name: 'sm',
        value: toREM(BORDER_RADIUS_SM),
      },
      {
        name: 'lg',
        value: toREM(BORDER_RADIUS_LG),
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
        name: '0',
        value: '0',
      },
    ],
  },
  roundedTop: {
    enabled: true,
    responsive: false,
    property: 'border-top-left-radius border-top-right-radius',
    class: 'rounded-top',
    inputType: 'text',
    items: [{ name: '', value: toREM(BORDER_RADIUS) }],
  },
  roundedRight: {
    enabled: true,
    responsive: false,
    property: 'border-top-right-radius border-bottom-right-radius',
    class: 'rounded-right',
    inputType: 'text',
    items: [{ name: '', value: toREM(BORDER_RADIUS) }],
  },
  roundedBottom: {
    enabled: true,
    responsive: false,
    property: 'border-bottom-right-radius border-bottom-left-radius',
    class: 'rounded-bottom',
    inputType: 'text',
    items: [{ name: '', value: toREM(BORDER_RADIUS) }],
  },
  roundedLeft: {
    enabled: true,
    responsive: false,
    property: 'border-bottom-left-radius border-top-left-radius',
    class: 'rounded-left',
    inputType: 'text',
    items: [{ name: '', value: toREM(BORDER_RADIUS) }],
  },
  userSelect: {
    enabled: true,
    responsive: false,
    property: 'user-select',
    class: 'user-select',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.userSelect,
    items: [
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
  verticalAlign: {
    enabled: true,
    responsive: false,
    property: 'vertical-align',
    class: 'align',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.align,
    items: [
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
  visibility: {
    enabled: true,
    responsive: false,
    property: 'visibility',
    class: '',
    inputType: 'select',
    options: CSS_VALUE_PRESETS.visibility,
    items: [
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
  wordWrap: {
    enabled: true,
    responsive: false,
    property: 'word-wrap',
    class: 'text',
    inputType: 'text',
    items: [{ name: 'break', value: 'break-word' }],
  },
  ...utils,
});

export function generateConfig(utils: AvailUtilities = {}): AvailUtilities {
  const config = Config(utils);

  // return Object.keys(config).map((key) => {
  //   config[key].id = key;
  //   return config[key];
  // });

  return Object.entries(config).reduce((form, [key, value]) => {
    form[key] = { id: key, ...value };
    return form;
  }, {});
}
