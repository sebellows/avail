import React from 'react'
import { PageLayout } from './components/PageLayout'

/**
 * Route/link configuration
 * Follows patterns found in other routing libraries, but is most similar to Vue-Router.
 */
export interface NavItem {
  collapsed?: boolean
  exact?: boolean
  hidden?: boolean
  path: string
  id?: string
  name?: string
  title?: string
  // menuTitle?: string
  component?: any
  items?: NavItem[]
  redirect?: string
  segment?: string
}

export interface NavMenuLink {
  type: 'menuLink'
  hidden?: boolean
  exact?: boolean
  path: string
  id?: string
  name?: string
  title?: string
}

export interface NavMenu {
  type: 'menu'
  collapsed: boolean
  items: NavMenuItem[]
  id?: string
  name?: string
  title?: string
}

export type NavMenuItem = NavMenu | NavMenuLink

/** Keyvalue pairs coincide with names of API calls and page names. */
export const API_ENUM = Object.freeze({
  Badge: 'badge',
  Box: 'box',
  Button: 'button',
  Card: 'card',
  Checkbox: 'checkbox',
  // Code: 'code',
  // Container: 'container',
  // Flex: 'flex',
  // Grid: 'grid',
  // Heading: 'heading',
  // Icon: 'icon',
  // Inline: 'inline',
  // Label: 'label',
  // Popover: 'popover',
  Radio: 'radio',
  Select: 'select',
  // Spinner: 'spinner',
  // Stack: 'stack',
  Switch: 'switch',
  // Text: 'text',
  // TextArea: 'textarea',
  // TextInput: 'text-input',
  // Tooltip: 'tooltip',
})

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = React.lazy(importFunc)

  return (props: Record<string, any>) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}

// export interface AppRoute {
//   exact?: boolean
//   id?: string
//   path?: string
//   name?: string
//   title?: string
//   component?: any
//   redirect?: string
//   items?: AppRoute[]
// }

export type AppRouteSection = Record<string, NavItem | NavItem[]>

export const APP_NAV = {
  home: {
    id: 'home',
    path: '/',
    exact: true,
    title: 'Avail',
  },
  header: [
    {
      id: 'profile',
      path: '/profile',
      exact: true,
      title: 'Profile',
    },
    {
      id: 'settings',
      path: '/settings',
      exact: true,
      title: 'Settings',
    },
  ],
  drawer: Object.entries(API_ENUM).map(([key, value], i) => ({
    id: key,
    name: value,
    path: `/${value}`,
    exact: true,
    title: key,
  })),
}
// ['clients', 'clientData', 'requests', 'carrierFiles', 'carriersExchange']
const APP_ROUTES: AppRouteSection = {
  root: {
    id: 'home',
    path: '/',
    exact: true,
    title: 'Avail',
    redirect: '/',
  },
  // config: {
  //   id: 'config',
  //   path: '/config/:id/:activetab',
  //   exact: true,
  //   title: 'Config',
  //   component: loadable(() => import('./containers/Config')),
  // },
  docs: {
    path: '',
    title: 'Documents',
    component: PageLayout,
    items: Object.entries(API_ENUM).map((c, i) => ({
      ...APP_NAV.drawer[i],
      component: loadable(() => import(`./examples/${c}`)),
    })),
  },
}

export { APP_ROUTES }
