import { Box, Button, Card, Flex, Inline, Switch, Text } from '../../../../elements'
import { NavLink, useLocation } from 'react-router-dom'
import React, { useCallback } from 'react'
import { useApp } from '../Provider'
import { isPlainObject } from '../../../../utils'
import { Icon } from '../../../../elements'
import { NavItem } from '../../../lib/nav'

interface Route {
  hidden: boolean
  path: string
  title: string
}

export function AppNavbar() {
  const { colorScheme, nav, setColorScheme } = useApp()
  const location = useLocation()

  const navItems = isPlainObject(nav) && Array.isArray(nav.items) ? nav.items : []
  const navItemRecords: NavItem[] = navItems.filter(isPlainObject)
  const navbarRoutes: Route[] = navItemRecords.map((item) => ({
    hidden: Boolean(item.hidden),
    path: `/${item.segment || ''}`,
    title: String(item.title),
  }))

  const handleSchemeSwitchChange = useCallback(
    (event) => {
      const { checked } = event.currentTarget

      setColorScheme(checked ? 'dark' : 'light')
    },
    [setColorScheme],
  )

  return (
    <Card
      as="header"
      borderBottom
      paddingX={[3, 4, 5]}
      paddingY={[2, 3, 4]}
      style={{ minHeight: 'auto' }}
    >
      <Flex as="nav" align="center">
        <Box flex={1}>
          <Flex align="center">
            <Flex align="center" flex={1}>
              <NavLink to="/">
                <Inline as="a" space={2}>
                  <Icon name="home" />
                  <Text
                    size={[2, 2, 3]}
                    fontWeight="bold"
                    style={{ color: 'var(--card-fg-color)' }}
                  >
                    UI
                  </Text>
                </Inline>
              </NavLink>
            </Flex>

            <Inline space={2}>
              {navbarRoutes.map((route) => {
                const selected =
                  route.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(route.path)

                return (
                  <NavLink to={route.path} key={route.path}>
                    <Button
                      aria-current={selected ? 'page' : undefined}
                      as="a"
                      size={[2, 2, 3]}
                      mode="link"
                      padding={[1, 2, 3]}
                      selected={selected}
                      style={route.hidden ? { opacity: 0.25 } : undefined}
                      text={route.title}
                    />
                  </NavLink>
                )
              })}
            </Inline>
          </Flex>
        </Box>

        <Box paddingX={[2, 3, 4]}>
          <Switch
            checked={colorScheme === 'dark'}
            onChange={handleSchemeSwitchChange}
            style={{ verticalAlign: 'top' }}
          />
        </Box>

        <Box>
          <Button
            as="a"
            size={[2, 2, 3]}
            href="https://github.com/sebellows"
            icon="github"
            mode="link"
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>
      </Flex>
    </Card>
  )
}
