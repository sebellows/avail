import React from 'react'
import { action } from '@storybook/addon-actions'
import { withCentered } from '../../../storybook/decorators'
import { ComponentWithStaticMethod } from '../../../storybook/types'
import { modeArgs, paddingArgs, radiusArgs, sizeArgs, variantArgs } from '../../stories/options'
import { Stack } from '../Stack'
import { Badge, BadgeProps } from './Badge'
import { LABEL_FONT_SIZES } from '../../theme'

type BasicArgs = Pick<
  BadgeProps & React.HTMLProps<HTMLDivElement>,
  'mode' | 'px' | 'py' | 'radius' | 'size' | 'variant'
>

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/Badge',
  decorators: [withCentered],
  argTypes: {
    ...modeArgs({}, ['Link']),
    ...paddingArgs('px', { defaultValue: 4 }),
    ...paddingArgs('py', { defaultValue: 4 }),
    ...radiusArgs(),
    ...sizeArgs({ defaultValue: 'sm' }, LABEL_FONT_SIZES),
    ...variantArgs({ defaultValue: 'default' }),
  },
}

export const BasicBadge: ComponentWithStaticMethod<BasicArgs> = (args: BasicArgs) => {
  const { mode, px, py, radius, size, variant } = args

  return (
    <Stack gap={4}>
      <Badge
        mode={mode}
        onClick={action('onClick')}
        px={px}
        py={py}
        radius={radius}
        size={size}
        variant={variant}
      >
        Badge
      </Badge>
    </Stack>
  )
}
