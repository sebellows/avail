import { action } from '@storybook/addon-actions'
import React from 'react'
import styled from 'styled-components'
import { withCentered } from '../../../storybook/decorators'
import { ComponentWithStaticMethod } from '../../../storybook/types'
import { ICON_MAP, IconSymbol } from '../Icon/IconMap'
import { Container } from '../Container'
import { Card } from '../Card'
import { Button, ButtonProps } from './Button'

type BasicButtonProps = ButtonProps & Partial<Omit<HTMLButtonElement, 'size'>>
type BasicArgs = Pick<
  BasicButtonProps,
  | 'children'
  | 'disabled'
  | 'icon'
  | 'iconRight'
  | 'justify'
  | 'label'
  | 'loading'
  | 'mode'
  | 'px'
  | 'py'
  | 'selected'
  | 'size'
  | 'space'
  | 'variant'
>

const iconOptions: IconSymbol[] = Object.keys(ICON_MAP)
const justifyOptions = {
  Start: 'flex-start',
  End: 'flex-end',
  Center: 'center',
  Between: 'space-between',
  Around: 'space-around',
  Evenly: 'space-evenly',
}
const fontSizeOptions = {
  fine: 'fine',
  xs: 'xs',
  sm: 'sm',
  'md (default)': 'md',
  lg: 'lg',
  xl: 'xl',
}
const modeOptions = {
  Default: 'default',
  Outline: 'outline',
  Link: 'link',
}
const variantOptions = {
  Default: 'default',
  Primary: 'primary',
  Accent: 'accent',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/Button',
  decorators: [withCentered],
  argTypes: {
    label: {
      name: 'label',
      defaultValue: 'Click Me!',
      description: '',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    disabled: {
      name: 'disabled',
      defaultValue: false,
      description: '',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    icon: {
      name: 'icon',
      defaultValue: '',
      description: 'A list of available icons are listed in the `IconMap.tsx` file',
      table: {
        type: { summary: 'enum' },
      },
      control: { type: 'select', options: iconOptions },
    },
    iconRight: {
      name: 'icon.right',
      defaultValue: '',
      description: 'Sets an icon on the right-side/end of the button.',
      table: {
        type: { summary: 'enum' },
      },
      control: { type: 'select', options: iconOptions },
    },
    justify: {
      name: 'justify',
      defaultValue: 'center',
      description: '',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '"center"' },
      },
      control: { type: 'select', options: justifyOptions },
    },
    loading: {
      name: 'loading',
      defaultValue: false,
      description: 'Add a loading spinner to the button until content becomes actionable.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    mode: {
      name: 'mode',
      defaultValue: 'default',
      description: '',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '"default"' },
      },
      control: { type: 'select', options: modeOptions },
    },
    px: {
      name: 'paddingX',
      defaultValue: 8,
      description: '',
      table: {
        type: {
          summary: 'number of pixels',
          detail: 'A unitless number of pixels set in the theme config (<code>theme.space</code>)',
        },
        defaultValue: '8',
      },
      control: { type: 'range', min: 0, max: 24, step: 4 },
    },
    py: {
      name: 'paddingY',
      defaultValue: 8,
      description: '',
      table: {
        type: {
          summary: 'number of pixels',
          detail: 'A unitless number of pixels set in the theme config (<code>theme.space</code>)',
        },
        defaultValue: '8',
      },
      control: { type: 'range', min: 0, max: 24, step: 4 },
    },
    size: {
      name: 'size',
      defaultValue: 'md',
      description:
        'Sets the <code>font-size</code>, <code>line-height</code>/leading, and <code>letter-spacing</code> (optional) based on the theme configuration.',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '"md"' },
      },
      control: { type: 'select', options: fontSizeOptions },
    },
    selected: {
      name: 'selected',
      defaultValue: false,
      description: 'To be used when the Button component is applied as a checkbox/radio input.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    space: {
      name: 'space',
      defaultValue: 4,
      description: '',
      table: {
        type: {
          summary: 'number of pixels',
          detail: 'A unitless number of pixels set in the theme config (<code>theme.space</code>)',
        },
        defaultValue: '4',
      },
      control: { type: 'range', min: 0, max: 24, step: 4 },
    },
    variant: {
      name: 'variant',
      defaultValue: 'primary',
      description: '',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: '"primary"' },
      },
      control: { type: 'select', options: variantOptions },
    },
  },
}

export const BasicButton: ComponentWithStaticMethod<BasicArgs> = (args: BasicArgs) => {
  const {
    disabled,
    icon,
    iconRight,
    justify,
    label,
    loading,
    mode,
    px,
    py,
    selected,
    size,
    space,
    variant,
    ...rest
  } = args

  return (
    <Container maxWidth="md" style={{ textAlign: 'center' }}>
      <Card padding={4}>
        <Button
          {...rest}
          disabled={disabled}
          size={size}
          icon={icon}
          iconRight={iconRight}
          justify={justify}
          loading={loading}
          mode={mode}
          onClick={action('onClick')}
          px={px}
          py={py}
          selected={selected}
          space={space}
          label={label as string}
          variant={variant}
        />
      </Card>
    </Container>
  )
}

const StyledButton1 = styled(BasicButton)`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export const styledButton1 = () => {
  return <StyledButton1 mode="outline" icon="add" label="Create" />
}

const StyledButton2 = styled(Button)`
  &:hover {
    background-color: rebeccapurple;
    box-shadow: none;
  }
`

export const styledButton2 = () => {
  // NOTE: This approach does not work with TypeScript
  return (
    <StyledButton2
      forwardedAs="a"
      href="#"
      variant="primary"
      iconRight="download"
      label="Download"
    />
  )
}
