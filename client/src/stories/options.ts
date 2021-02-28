import { ArgType } from '../../storybook/types'
import { IconSymbol, ICON_MAP } from '../elements'
import { PROP_ALIAS_MAP } from '../styles'
import { FONT_SIZES } from '../theme'
import { deepMerge, omit, pick, range, toObject } from '../utils'

export const iconOptions: IconSymbol[] = Object.keys(ICON_MAP)

export const displayOptions = {
  none: 'none',
  block: 'block',
  flex: 'flex',
  inline: 'inline-block',
}

export const justifyOptions = {
  Start: 'flex-start',
  End: 'flex-end',
  Center: 'center',
  Between: 'space-between',
  Around: 'space-around',
  Evenly: 'space-evenly',
}

export const fontSizeOptions = toObject(FONT_SIZES)

export const modeOptions = {
  Default: 'default',
  Outline: 'outline',
  Link: 'link',
}

export const variantOptions = {
  Default: 'default',
  Primary: 'primary',
  Accent: 'accent',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
}

export const radiusOptions = {
  fine: 'fine',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  pill: 'pill',
  circle: 'circle',
}

export const displayArgs = (args: ArgType = {}) => {
  return {
    display: deepMerge(
      {
        name: 'display',
        defaultValue: 'block',
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: '"block"' },
        },
        control: { type: 'select', options: displayOptions },
      },
      args,
    ),
  }
}

export const flexArgs = (args: ArgType = {}, maxSize = 6) => {
  const controlOptions = toObject(range(maxSize))
  const { defaultValue = 1 } = args
  return {
    flex: deepMerge(
      {
        name: 'flex',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `"${defaultValue}` },
        },
        control: { type: 'select', options: controlOptions },
      },
      args,
    ),
  }
}

const spacingArg = (args: ArgType = {}) => {
  const { defaultValue = 0 } = args

  return deepMerge(
    {
      // Storybook seems to cast "0" to `undefined` so ranges get set as `undefined/24` instead of `0/24`
      defaultValue: !defaultValue ? '0' : Number(defaultValue),
      description: '',
      table: {
        type: {
          summary: 'number of pixels',
          detail: 'A unitless number of pixels set in the theme config (<code>theme.space</code>)',
        },
        defaultValue: `"${defaultValue}"`,
      },
      control: { type: 'range', min: 0, max: 24, step: 4 },
    },
    args,
  )
}

export const textArgs = (args: ArgType = {}, propKey = 'label') => {
  return {
    [propKey]: deepMerge(
      {
        name: 'label',
        defaultValue: 'Click Me!',
        description: '',
        table: {
          type: { summary: 'string' },
        },
        control: { type: 'text' },
      },
      args,
    ),
  }
}

export const labelArgs = (args: ArgType = {}) => {
  return {
    label: deepMerge(
      {
        name: 'label',
        defaultValue: 'Click Me!',
        description: '',
        table: {
          type: { summary: 'string' },
        },
        control: { type: 'text' },
      },
      args,
    ),
  }
}

export const disabledArgs = (args: ArgType = {}) => {
  const { defaultValue = false } = args

  return {
    disabled: deepMerge(
      {
        name: 'disabled',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: defaultValue },
        },
        control: { type: 'boolean' },
      },
      args,
    ),
  }
}

export const iconArgs = (args: ArgType = {}, propKey = 'icon') => {
  return {
    [propKey]: deepMerge(
      {
        name: 'icon',
        defaultValue: '',
        description: 'A list of available icons are listed in the `IconMap.tsx` file',
        table: {
          type: { summary: 'enum' },
        },
        control: { type: 'select', options: iconOptions },
      },
      args,
    ),
  }
}

export const alignArgs = (args: ArgType = {}) => {
  const { defaultValue = 'start' } = args

  return {
    align: deepMerge(
      {
        name: 'align',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `${defaultValue}` },
        },
        control: { type: 'select', options: justifyOptions },
      },
      args,
    ),
  }
}

export const justifiedArgs = (args: ArgType = {}) => {
  const { defaultValue = 'center' } = args

  return {
    justify: deepMerge(
      {
        name: 'justify',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `${defaultValue}` },
        },
        control: { type: 'select', options: justifyOptions },
      },
      args,
    ),
  }
}

export const loadingArgs = (args: ArgType = {}) => {
  const { defaultValue = false } = args

  return {
    loading: deepMerge(
      {
        name: 'loading',
        defaultValue,
        description: 'Add a loading spinner to the button until content becomes actionable.',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: defaultValue },
        },
        control: { type: 'boolean' },
      },
      args,
    ),
  }
}

export const marginArgs = (marginKey = 'm', args: ArgType = {}) => {
  let name = `${marginKey}: <small>${PROP_ALIAS_MAP.get(marginKey).join(', ')}</small>`

  return {
    [marginKey]: spacingArg({
      name,
      defaultValue: 0,
      ...args,
    }),
  }
}

export const modeArgs = (args: ArgType = {}, omitKeys: (keyof typeof modeOptions)[] = []) => {
  const { defaultValue = 'default' } = args
  const controlOptions = omit(modeOptions, ...omitKeys)

  return {
    mode: deepMerge(
      {
        name: 'mode',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `"${defaultValue}"` },
        },
        control: { type: 'select', options: controlOptions },
      },
      args,
    ),
  }
}

export const paddingArgs = (paddingKey = 'p', args: ArgType = {}) => {
  let name = `${paddingKey} (${PROP_ALIAS_MAP.get(paddingKey).join(', ')})`

  return {
    [paddingKey]: spacingArg({
      name,
      ...args,
    }),
  }
}

export const radiusArgs = (args: ArgType = {}) => {
  const { defaultValue = 'sm' } = args

  return {
    radius: deepMerge(
      {
        name: 'radius',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `"${defaultValue}"` },
        },
        control: { type: 'select', options: radiusOptions },
      },
      args,
    ),
  }
}

export const selectedArgs = (args: ArgType = {}, propKey = 'selected') => {
  const { defaultValue = false } = args

  return {
    [propKey]: deepMerge(
      {
        name: 'selected',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: defaultValue },
        },
        control: { type: 'boolean' },
      },
      args,
    ),
  }
}

export const sizeArgs = (args: ArgType = {}, keys = FONT_SIZES) => {
  const { defaultValue = 'md' } = args
  const controlOptions = pick(fontSizeOptions, ...keys)

  return {
    size: deepMerge(
      {
        name: 'size',
        defaultValue,
        description:
          'Font settings. Sets the `font-size`, `line-height`/leading, and `letter-spacing` (optional) based on assigned key from theme configuration.',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `"${defaultValue}"` },
        },
        control: { type: 'select', options: controlOptions },
      },
      args,
    ),
  }
}

export const spaceArgs = (args: ArgType = {}) => {
  return {
    space: spacingArg({
      name: 'space',
      defaultValue: 4,
      description: `Applies a unit of space between component instances.`,
      ...args,
    }),
  }
}

export const variantArgs = (args: ArgType = {}) => {
  const { defaultValue = 'primary' } = args

  return {
    variant: deepMerge(
      {
        name: 'variant',
        defaultValue,
        description: '',
        table: {
          type: { summary: 'enum' },
          defaultValue: { summary: `"${defaultValue}"` },
        },
        control: { type: 'select', options: variantOptions },
      },
      args,
    ),
  }
}
