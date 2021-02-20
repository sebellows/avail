import { Box, Card, Flex, Icon, Label, Stack } from '../../elements'
import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from './NavLink'
import { NavMenu as NavMenuType, NavMenuItem } from '../lib/nav/types'

const Root = styled(Box).attrs({ forwardedAs: 'nav' })`
  height: 100vh;
  top: 0;
  position: sticky;
`

export function PageHeader({ menu }: { menu: NavMenuType }) {
  return (
    <Root overflow="auto">
      {menu.items.map((item, itemIndex) => {
        if (item.type === 'menu') {
          return <NavMenu key={itemIndex} menu={item} />
        }

        return (
          <div key={itemIndex}>
            {item.title} ({item.type})
          </div>
        )
      })}
    </Root>
  )
}

const AnimatedChevronDownIcon = styled(Icon)`
  transition: transform 100ms;
  & path {
    stroke-width: 2 !important;
  }
`

function LabeledNavMenu({ menu }: { menu: NavMenuType }) {
  const [collapsed, setCollapsed] = useState<boolean>(menu.collapsed || false)

  return (
    <div>
      <Card
        borderTop
        onClick={() => setCollapsed((v) => !v)}
        padding={[3, 4, 5]}
        paddingBottom={collapsed ? [3, 4, 5] : [2, 3, 4]}
      >
        <Flex justify="space-between">
          <Label size={['xs', 'sm', 'sm']} fontWeight="medium">
            {menu.title}
          </Label>
          <Label muted size={['xs', 'sm', 'sm']}>
            <AnimatedChevronDownIcon
              name="chevron-down"
              style={{
                transform: `rotate(${collapsed ? '90deg' : '0'})`,
              }}
            />
          </Label>
        </Flex>
      </Card>

      <Box hidden={collapsed} padding={[3, 4, 5]} paddingTop={[0, 0, 0]}>
        <NavMenuItems items={menu.items} />
      </Box>
    </div>
  )
}

function NavMenu({ menu }: { menu: NavMenuType }) {
  if (menu.title) {
    return <LabeledNavMenu menu={menu} />
  }

  return (
    <Box padding={[3, 4, 5]}>
      <NavMenuItems items={menu.items} />
    </Box>
  )
}

function NavMenuItems({ items }: { items: NavMenuItem[] }) {
  return (
    <Stack gap={[3, 3, 4]}>
      {items.map((item, itemIndex) => {
        if (item.type === 'menuLink') {
          return (
            <Box key={itemIndex}>
              <NavLink
                href={item.path}
                size={[1, 2, 2]}
                style={item.hidden ? { opacity: 0.25 } : undefined}
                weight="medium"
              >
                {item.title}
              </NavLink>
            </Box>
          )
        }

        return null
      })}
    </Stack>
  )
}
