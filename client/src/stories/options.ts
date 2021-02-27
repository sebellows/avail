import { ArgType as SbArgType } from '@storybook/api'
import { IconSymbol, ICON_MAP } from '../elements'
import { PROP_ALIAS_MAP } from '../styles'
import { deepMerge } from '../utils'

export const iconOptions: IconSymbol[] = Object.keys(ICON_MAP)

export const justifyOptions = {
  Start: 'flex-start',
  End: 'flex-end',
  Center: 'center',
  Between: 'space-between',
  Around: 'space-around',
  Evenly: 'space-evenly',
}

export const fontSizeOptions = {
  fine: 'fine',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

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

/**
 * Extend Storybook's `ArgType` interface which only defines
 * `name`, `defaultValue`, & `description`.
 * @see {@link https://github.com/storybookjs/storybook/blob/master/lib/api/src/index.tsx#L111}
 */
interface ArgType extends SbArgType {
  table?: {
    type?: {
      summary?: string
      detail?: string
    }
    defaultValue?: string
  }
  control?: {
    type?: string
    [key: string]: any
  }
}

const spacingArg = (args: ArgType = {}) => {
  const { defaultValue = 0 } = args

  return deepMerge(
    {
      defaultValue,
      description: '',
      table: {
        type: {
          summary: 'number of pixels',
          detail: 'A unitless number of pixels set in the theme config (<code>theme.space</code>)',
        },
        defaultValue: String(defaultValue),
      },
      control: { type: 'range', min: 0, max: 24, step: 4 },
    },
    args,
  )
}

export const labelArgs = (args: ArgType = {}) => {
  return deepMerge(
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
  )
}

export const disabledArgs = (args: ArgType = {}) => {
  const { defaultValue = false } = args

  return deepMerge(
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
  )
}

export const iconArgs = (args: ArgType = {}) => {
  return deepMerge(
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
  )
}

export const alignArgs = (args: ArgType = {}) => {
  const { defaultValue = 'start' } = args

  return deepMerge(
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
  )
}

export const justifiedArgs = (args: ArgType = {}) => {
  const { defaultValue = 'center' } = args

  return deepMerge(
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
  )
}

export const loadingArgs = (args: ArgType = {}) => {
  const { defaultValue = false } = args

  return deepMerge(
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
  )
}

export const modeArgs = (args: ArgType = {}) => {
  const { defaultValue = 'default' } = args

  return deepMerge(
    {
      name: 'mode',
      defaultValue,
      description: '',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: `"${defaultValue}"` },
      },
      control: { type: 'select', options: modeOptions },
    },
    args,
  )
}

export const marginArgs = (marginKey = 'm', args: ArgType = {}) => {
  let name = `${marginKey}: <small>${PROP_ALIAS_MAP.get(marginKey).join(', ')}</small>`

  return spacingArg({
    name,
    defaultValue: 0,
    ...args,
  })
}

export const paddingArgs = (paddingKey = 'p', args: ArgType = {}) => {
  let name = `${paddingKey} (${PROP_ALIAS_MAP.get(paddingKey).join(', ')})`

  return spacingArg({
    name,
    defaultValue: 8,
    ...args,
  })
}

export const radiusArgs = (args: ArgType = {}) => {
  const { defaultValue = 'sm' } = args

  return deepMerge(
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
  )
}

export const selectedArgs = (args: ArgType = {}) => {
  const { defaultValue = false } = args

  return deepMerge(
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
  )
}

export const sizeArgs = (args: ArgType = {}) => {
  const { defaultValue = 'md' } = args

  return deepMerge(
    {
      name: 'size',
      defaultValue,
      description:
        'Sets the <code>font-size</code>, <code>line-height</code>/leading, and <code>letter-spacing</code> (optional) based on the theme configuration.',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: `"${defaultValue}"` },
      },
      control: { type: 'select', options: fontSizeOptions },
    },
    args,
  )
}

export const spaceArgs = (args: ArgType = {}) => {
  return spacingArg({
    name: 'space',
    defaultValue: 4,
    ...args,
  })
}

export const variantArgs = (args: ArgType = {}) => {
  const { defaultValue = 'primary' } = args

  return deepMerge(
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
  )
}
