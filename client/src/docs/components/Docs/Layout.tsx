import { Card, Flex, Icon, Text } from '../../../elements'
import { NavLink as Link } from 'react-router-dom'
import React from 'react'
// import { AppFooter } from './footer'
import { useApp } from './Provider'
import { AppNavbar } from './partials/Navbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" height="fill">
      <AppBanner />
      <AppNavbar />
      <Card flex={1} style={{ minHeight: 'auto' }}>
        {children}
      </Card>
      {/* <AppFooter /> */}
    </Flex>
  )
}

function AppBanner() {
  const { settings } = useApp()
  const banner = settings && (settings as any).banner

  if (!banner || banner.hidden) return null

  return (
    <Card padding={3} variant="primary" style={{ minHeight: 'auto' }}>
      <Text textAlign="center" size={1}>
        {(banner.icon || banner.title) && (
          <strong>
            {banner.icon && (
              <>
                <Icon name={banner.icon} />
                &nbsp;&nbsp;{' '}
              </>
            )}
            {banner.title}
          </strong>
        )}

        {banner.link?.title && banner.link?.href && (
          <>
            {' '}
            <Link to={banner.link?.href}>
              {banner.link.title} <Icon name="arrow-right" />
            </Link>
          </>
        )}
      </Text>
    </Card>
  )
}
