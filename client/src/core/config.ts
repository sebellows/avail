/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BODY_COLOR,
  BORDER_RADIUS,
  BORDER_RADIUS_SM,
  BORDER_RADIUS_LG,
  BOX_SHADOW,
  BOX_SHADOW_SM,
  BOX_SHADOW_LG,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_BOLDER,
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_LIGHTER,
  FONT_WEIGHT_NORMAL,
  LINE_HEIGHT_SM,
  LINE_HEIGHT_LG,
  ROUNDED_PILL,
  SPACERS,
  TEXT_MUTED,
} from './constants'
import { toOptions } from './models/Option'
import { toREM, toPX, toEM } from './style'
import { CSS_VALUE_PRESETS, GLOBAL_CSS_VALUES } from './presets'
import { get, hyphenate } from './utils'

const createSpacers = (prefix = '', unitFn = toREM) =>
  Object.entries(SPACERS).reduce((acc, [k, v]) => {
    acc[`${prefix}${k}`] = unitFn(v)
    return acc
  }, {})

function getSettingValues(
  settings: Avail.Config<Avail.Setting>,
  path: string,
): Record<string, any> {
  return Object.entries(get(settings, path, {})).reduce(
    (acc, [k, config]: [string, Record<string, any>]) => {
      acc[k] = config.value
      return acc
    },
    {},
  )
}

function generateItems(key: string) {
  return toOptions(CSS_VALUE_PRESETS[key].filter((preset) => !GLOBAL_CSS_VALUES.includes(preset)))
}

const defaultConfig = () => ({
  className: '',
  enabled: true,
  modifiers: {
    responsive: true,
  },
  items: [],
})

type ConfigProps = ReturnType<typeof defaultConfig>

function presetBuilder(prefix = '') {
  return (key: string, options: Partial<ConfigProps> = {}) => {
    const { className, enabled, modifiers, items } = { ...defaultConfig(), ...options }

    return {
      enabled,
      modifiers,
      property: hyphenate(key),
      class: `${prefix}${className}`,
      inputType: 'select',
      options: CSS_VALUE_PRESETS[key],
      items: [
        ...toOptions(
          CSS_VALUE_PRESETS[key].filter((preset) => !GLOBAL_CSS_VALUES.includes(preset)),
        ),
        ...items,
      ],
    }
  }
}

const Config = (
  settings: Avail.Config<Avail.Setting> = {},
  utils: Avail.Config<Avail.Utility> = {},
): Avail.Config<Avail.Utility> => {
  const prefix = get(settings, 'export.fields.prefix.value', '')
  const unit = get(settings, 'export.fields.sizingUnit.value', '')
  const variants = get(settings, 'colorSchemes.fields.variants.items', [])
  const globals = getSettingValues(settings, 'global.fields')
  const borderSettings = getSettingValues(settings, 'border.fields')

  const generatePresetConfig = presetBuilder(prefix)
  // const breakpoints = get(settings, 'mediaQuery.fields.breakpoints.items', {});
  // const directions = get(settings, 'nameGeneration.fields.directions.items', []);

  const unitFn = unit === 'px' ? toPX : unit === 'em' ? toEM : toREM
  const spacerUnits = toOptions(createSpacers('', unitFn), 'auto', { none: 0 })
  const negativeSpacerUnits = toOptions(createSpacers('n', unitFn))

  return {
    backgroundColor: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'background-color',
      class: `${prefix}bg`,
      inputType: 'colorpicker',
      items: [
        ...variants,
        {
          label: 'body',
          value: BODY_COLOR,
        },
        {
          label: 'transparent',
          value: 'transparent',
        },
      ],
    },
    color: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'color',
      class: `${prefix}text`,
      inputType: 'colorpicker',
      items: [
        ...variants,
        {
          name: 'muted',
          value: TEXT_MUTED,
        },
      ],
    },
    display: generatePresetConfig('display', { className: 'd' }),
    float: {
      enabled: true,
      modifiers: {
        responsive: true,
      },
      property: 'float',
      class: `${prefix}float`,
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
      modifiers: {
        responsive: false,
      },
      property: 'font-family',
      class: `${prefix}font-family`,
      inputType: 'text',
      items: [
        {
          name: 'base',
          value: globals.fontFamily ?? 'sans-serif',
        },
        {
          name: 'heading',
          value: globals.headingsFontFamily ?? 'sans-serif',
        },
        {
          name: 'monospace',
          value: globals.monospaceFontFamily ?? 'monospace',
        },
      ],
    },
    lineHeight: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'line-height',
      class: `${prefix}lh`,
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
          value: globals.lineHeight ?? '1.5',
        },
        {
          name: 'lg',
          value: `${LINE_HEIGHT_LG}`,
        },
      ],
    },
    border: {
      enabled: true,
      // responsive: false,
      property: 'border',
      class: `${prefix}border`,
      inputType: 'text',
      modifiers: {
        responsive: false,
        directions: true,
        abbreviate: false,
        variants: true,
      },
      items: [
        {
          name: '',
          value: `${unitFn(borderSettings.width)} solid ${borderSettings.color}`,
        },
        {
          name: '0',
          value: '0',
        },
      ],
    },
    // Sizing utilities
    width: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'width',
      class: `${prefix}w`,
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
      modifiers: {
        responsive: false,
      },
      property: 'max-width',
      class: `${prefix}mw`,
      inputType: 'text',
      items: [{ name: '100', value: '100%' }],
    },
    height: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'height',
      class: `${prefix}h`,
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
      modifiers: {
        responsive: false,
      },
      property: 'max-height',
      class: `${prefix}mh`,
      inputType: 'text',
      items: [{ name: '100', value: '100%' }],
    },
    // Flex utilities
    flex: {
      enabled: true,
      modifiers: {
        responsive: true,
      },
      property: 'flex',
      class: `${prefix}flex`,
      inputType: 'text',
      items: [{ name: 'fill', value: '1 1 auto' }],
    },
    flexDirection: {
      enabled: true,
      modifiers: {
        responsive: true,
      },
      property: 'flex-direction',
      class: `${prefix}flex`,
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
      modifiers: {
        responsive: true,
      },
      property: 'flex-grow',
      class: `${prefix}flex`,
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
      modifiers: {
        responsive: true,
      },
      property: 'flex-shrink',
      class: `${prefix}flex`,
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
      modifiers: {
        responsive: true,
      },
      property: 'flex-wrap',
      class: `${prefix}flex`,
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
      modifiers: {
        responsive: true,
      },
      property: 'justify-content',
      class: `${prefix}justify-content`,
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
      modifiers: {
        responsive: true,
      },
      property: 'align-items',
      class: `${prefix}align-items`,
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
      modifiers: {
        responsive: true,
      },
      property: 'align-content',
      class: `${prefix}align-content`,
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
      modifiers: {
        responsive: true,
      },
      property: 'align-self',
      class: `${prefix}align-self`,
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
      modifiers: {
        responsive: true,
      },
      property: 'order',
      class: `${prefix}order`,
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
      // responsive: true,
      property: 'margin',
      class: `${prefix}m`,
      inputType: 'text',
      modifiers: {
        responsive: true,
        directions: true,
        abbreviate: true,
        negativeUnits: true,
      },
      items: [...spacerUnits],
    },
    // Negative margin utilities
    // negativeMargin: {
    //   enabled: true,
    //   responsive: true,
    //   property: 'margin',
    //   class: `${prefix}m`,
    //   inputType: 'text',
    //   subproperties: {
    //     directions: true,
    //   },
    //   items: [...negativeSpacerUnits],
    // },
    // Padding utilities
    padding: {
      enabled: true,
      // responsive: true,
      property: 'padding',
      class: `${prefix}p`,
      inputType: 'text',
      modifiers: {
        responsive: true,
        directions: true,
        abbreviate: true,
      },
      items: [...spacerUnits],
    },
    // Text
    fontStyle: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'font-style',
      class: `${prefix}font-style`,
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
      modifiers: {
        responsive: false,
      },
      property: 'font-weight',
      class: `${prefix}font-weight`,
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
      modifiers: {
        responsive: false,
      },
      property: 'text-transform',
      class: `${prefix}text`,
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
      modifiers: {
        responsive: true,
      },
      property: 'text-align',
      class: `${prefix}text`,
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
      modifiers: {
        responsive: false,
      },
      property: 'text-decoration',
      class: `${prefix}text-decoration`,
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
      modifiers: {
        responsive: false,
      },
      property: 'white-space',
      class: `${prefix}text`,
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
      modifiers: {
        responsive: false,
      },
      property: 'overflow',
      class: `${prefix}overflow`,
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
      modifiers: {
        responsive: false,
      },
      property: 'position',
      class: `${prefix}position`,
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
      modifiers: {
        responsive: false,
      },
      property: 'box-shadow',
      class: `${prefix}shadow`,
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
      modifiers: {
        responsive: false,
      },
      property: 'pointer-events',
      class: `${prefix}pointer-events`,
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
    borderRadius: {
      enabled: true,
      // responsive: false,
      property: 'border-radius',
      class: `${prefix}rounded`,
      inputType: 'text',
      modifiers: {
        responsive: false,
        directions: true,
        abbreviate: false,
      },
      items: [
        {
          name: '',
          value: unitFn(BORDER_RADIUS),
        },
        {
          name: 'sm',
          value: unitFn(BORDER_RADIUS_SM),
        },
        {
          name: 'lg',
          value: unitFn(BORDER_RADIUS_LG),
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
    userSelect: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'user-select',
      class: `${prefix}user-select`,
      inputType: 'select',
      options: CSS_VALUE_PRESETS.userSelect,
      items: generateItems('userSelect'),
    },
    verticalAlign: {
      enabled: true,
      modifiers: {
        responsive: false,
      },
      property: 'vertical-align',
      class: `${prefix}align`,
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
      modifiers: {
        responsive: false,
      },
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
      modifiers: {
        responsive: false,
      },
      property: 'word-wrap',
      class: `${prefix}text`,
      inputType: 'text',
      items: [{ name: 'break', value: 'break-word' }],
    },
    ...utils,
  }
}

export function generateConfig(
  settings: Avail.Config<Avail.Setting>,
  utils: Avail.Config<Avail.Utility> = {},
): Avail.Config<Avail.Utility> {
  const config = Config(settings, utils)

  return Object.entries(config).reduce((form, [key, value]) => {
    form[key] = { id: key, ...value }
    return form
  }, {})
}
