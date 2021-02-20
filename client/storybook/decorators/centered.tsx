import React from 'react'
import styled from 'styled-components'
import { Card } from '../../src/elements'
import { useRootTheme } from '../../src/theme'

const Root = styled(Card)`
  align-items: center;
  justify-content: center;
  height: 100%;
  &&:not([hidden]) {
    display: flex;
  }
`

export const withCentered = (storyFn: () => React.ReactElement) => <Centered>{storyFn()}</Centered>

function Centered({ children }: { children: React.ReactNode }) {
  const { variant } = useRootTheme()

  return <Root variant={variant}>{children}</Root>
}
