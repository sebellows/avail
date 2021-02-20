import React, { forwardRef } from 'react'
import { NavLink as ReactNavLink, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { Text } from '../../elements'
import { ThemeFontWeightKey } from '../../theme'

const Root = styled(Text)`
  & > a {
    color: var(--card-muted-fg-color);
    @media (hover: hover) {
      &:hover {
        color: var(--card-fg-color);
        text-decoration: none;
      }
    }
  }
  &[aria-selected='true'] > a {
    color: var(--card-link-color);
  }
`

interface NavLinkProps {
  children: React.ReactNode
  href: string
  size?: number | number[]
  style?: React.CSSProperties
  weight?: ThemeFontWeightKey
}
const NavLink = forwardRef<HTMLDivElement, NavLinkProps>(
  ({ children, href, ...restProps }, ref) => {
    const router = useRouteMatch()

    return (
      <Root ref={ref} {...restProps} aria-selected={href === router.path}>
        <ReactNavLink to={href}>{children}</ReactNavLink>
      </Root>
    )
  },
)

export { NavLink }
