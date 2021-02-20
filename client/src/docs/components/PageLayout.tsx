import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Box, Button, Card, Flex } from '../../elements'
import { NavMenu } from '../lib/nav/types'
import { NavDrawer } from './NavDrawer'
import { PageHeader } from './PageHeader'
import { toREM } from '../../utils'
import { useClickOutside } from '../../hooks'

interface PageLayoutProps {
  children: React.ReactNode
  menu: NavMenu | null
}

const Root = styled(Flex)`
  position: relative;
`

const ContentContainer = styled(Box)`
  ${({ theme }) => css`
    @media (min-width: ${toREM(theme.media[1])}) {
      min-width: 30rem;
    }
  `}
`

const ContentCard = styled(Card).attrs({ forwardedAs: 'main' })`
  min-height: 100%;
`

const NarrowDeviceMenu = styled(Box)`
  ${({ theme }) => css`
    @media (min-width: ${toREM(theme.media[1])}) {
      &&:not([hidden]) {
        display: none;
      }
    }
  `}
`

export function PageLayout({ children, menu }: PageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navDrawerElement, setNavDrawerElement] = useState<HTMLDivElement | null>(null)

  const handleMenuOpenClick = () => setMenuOpen(true)

  useClickOutside(navDrawerElement, () => setMenuOpen(false))

  return (
    <Root>
      {menu && (
        <Box
          display={['none', 'none', 'block']}
          flex={1}
          style={{ minWidth: '12em', maxWidth: '16em' }}
        >
          <NavDrawer open={menuOpen} ref={setNavDrawerElement}>
            <PageHeader menu={menu} />
          </NavDrawer>
        </Box>
      )}

      <ContentContainer flex={4}>
        <NarrowDeviceMenu padding={[2, 4]}>
          <Button
            aria-label="Menu"
            size={[2, 3, 4]}
            icon="menu"
            mode="link"
            onClick={handleMenuOpenClick}
          />
        </NarrowDeviceMenu>

        <ContentCard id="content">{children}</ContentCard>
      </ContentContainer>
    </Root>
  )
}
