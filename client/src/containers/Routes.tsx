import { Dashboard } from './Dashboard'
import { loadable } from './loadable'
import { NavMenuItem } from './types'

export const APP_NAV: Record<string, NavMenuItem | NavMenuItem[]> = {
  home: {
    id: 'home',
    type: 'menuLink',
    exact: true,
    path: '/',
    title: 'Home',
  },
  header: [
    {
      id: 'account',
      type: 'menu',
      collapsed: true,
      title: 'User Account',
      items: [
        {
          id: 'profile',
          type: 'menuLink',
          path: '/profile',
          exact: true,
          title: 'Profile',
        },
        {
          id: 'settings',
          type: 'menuLink',
          path: '/settings',
          exact: true,
          title: 'Settings',
        },
      ],
    },
  ],
  sidebar: [
    {
      id: 'elements',
      type: 'menu',
      collapsed: false,
      title: 'Elements',
      items: [
        {
          id: 'box',
          type: 'menuLink',
          path: '/docs/box',
          exact: true,
          title: 'Box',
        },
        {
          id: 'button',
          type: 'menuLink',
          path: '/docs/button',
          exact: true,
          title: 'Button',
        },
      ],
    },
  ],
}

export const APP_ROUTES = {
  home: {
    ...APP_NAV.home,
    component: loadable(() => import('./Home')),
  },
  docs: {
    path: '/docs',
    title: 'Documentation',
    component: Dashboard,
    items: APP_NAV.sidebar[0].items.map((item) => ({
      ...item,
      component: loadable(() => import('./Article')),
    })),
  },
}
