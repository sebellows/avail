import React from 'react'
import { withCentered } from '../../../storybook/decorators'
import { ComponentWithStaticMethod } from '../../../storybook/types'
import { displayArgs, paddingArgs, flexArgs } from '../../stories/options'
import { Flex } from '../Flex'
// import { Stack } from '../Stack'
import { Box as BoxComponent, BoxProps } from './Box'

type BasicArgs = Pick<
  BoxProps & React.HTMLProps<HTMLDivElement>,
  'display' | 'flex' | 'p' | 'px' | 'py' | 'sizing'
>

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Atoms/Box',
  decorators: [withCentered],
  argTypes: {
    ...displayArgs(),
    ...flexArgs({}, 7),
    ...paddingArgs('p'),
    ...paddingArgs('px', { defaultValue: null }),
    ...paddingArgs('py', { defaultValue: null }),
    sizing: {
      defaultValue: 'border',
      description: '',
      table: {
        type: {
          type: { summary: 'enum' },
          defaultValue: { summary: '"border"' },
        },
        defaultValue: `"border"`,
      },
      control: { type: 'select', options: { border: 'border', content: 'content' } },
    },
  },
}

export const Box: ComponentWithStaticMethod<BasicArgs> = (args: BasicArgs) => {
  const { display, flex, p, px, py, sizing } = args

  return (
    <Flex flex={1}>
      <BoxComponent
        id="responsive-box"
        display={display}
        flex={flex}
        p={p}
        px={px}
        py={py}
        sizing={sizing}
        style={{ outline: '1px dashed gray' }}
      >
        I'm in a Box!
      </BoxComponent>
    </Flex>
  )
}
