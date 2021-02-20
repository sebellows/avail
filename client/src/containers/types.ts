interface NavItemBase {
  exact?: boolean
  id: string
  path: string
  title?: string
}

export interface NavItem extends NavItemBase {
  component?: any
  items?: NavItem[]
  redirect?: string
}

export interface NavMenuLink extends NavItemBase {
  type: 'menuLink'
  hidden?: boolean
}

export interface NavMenu extends Omit<NavItemBase, 'exact' | 'path'> {
  type: 'menu'
  collapsed: boolean
  items: NavMenuItem[]
}

export type NavMenuItem = NavMenu | NavMenuLink
