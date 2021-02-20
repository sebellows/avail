/**
 * Sidebar Navigation
 */

export interface NavItem {
  collapsed: boolean
  hidden: boolean
  path?: string
  name?: string
  title?: string
  // menuTitle?: string
  component?: any
  items: NavItem[]
  redirect?: string
  segment?: string
}

export interface NavMenuLink {
  type: 'menuLink'
  hidden: boolean
  path: string
  title?: string
}

export interface NavMenu {
  type: 'menu'
  collapsed: boolean
  items: NavMenuItem[]
  title?: string
}

export type NavMenuItem = NavMenu | NavMenuLink
