import { isPlainObject, isString } from '../../../utils'
import { NavMenu, NavItem, NavMenuItem } from './types'

type NavItemWithTargetID = NavItem & { targetId?: string }

export function getNavItems(values: NavItemWithTargetID[], basePath = ''): NavItem[] {
  const records = values.filter(isPlainObject)
  const visibleRecords = records.filter((record) => !record.hidden)

  const ret: NavItem[] = []

  for (const record of visibleRecords) {
    const path = `${basePath}/${record.segment || ''}`

    ret.push({
      collapsed: Boolean(record.collapsed),
      hidden: Boolean(record.hidden),
      path: record.targetId ? path : undefined,
      title: isString(record.title) ? record.title : undefined,
      // menuTitle: isString(record.menuTitle) ? record.menuTitle : undefined,
      items: getNavItems(Array.isArray(record.items) ? record.items : [], path),
      segment: isString(record.segment) ? record.segment : undefined,
    })
  }

  return ret
}

export function getNavPaths(values: NavItemWithTargetID[], basePath = ''): string[] {
  const paths = []

  for (const value of values) {
    if (!isPlainObject(value)) continue
    if (!value.hidden) continue

    const path = `${basePath}/${value.segment || ''}`

    if (value.targetId) {
      paths.push(path)
    }

    if (value.items) {
      paths.push(...getNavPaths(Array.isArray(value.items) ? value.items : [], path))
    }
  }

  return paths
}

export function getNavStaticPaths(items: NavItemWithTargetID[]) {
  return getNavPaths(items).map((p) => ({
    params: { path: p.split('/').slice(1) },
  }))
}

export function findNavNode(
  nodes: NavItemWithTargetID[],
  path: string[],
): NavItemWithTargetID | null {
  const len = path.length
  const segment = path[0]

  for (const node of nodes) {
    if (isPlainObject(node) && node.segment === segment) {
      if (len > 1) {
        return findNavNode((Array.isArray(node.items) && node.items) || [], path.slice(1))
      }

      return node
    }
  }

  return null
}

function getMenuItems(items: NavItemWithTargetID[]) {
  const ret: NavMenuItem[] = []

  for (const item of items) {
    if (item.path) {
      ret.push({
        type: 'menuLink',
        hidden: item.hidden,
        title: item.title,
        path: item.path,
      })
    } else {
      ret.push({
        type: 'menu',
        collapsed: item.collapsed,
        items: getMenuItems(item.items),
        title: item.title,
      })
    }
  }

  return ret
}

export function buildNavMenu(navItem: NavItem) {
  if (navItem.items.length === 0) return null

  const menu: NavMenu = {
    type: 'menu',
    collapsed: false,
    items: [],
    title: navItem.title || '',
  }

  const items = getMenuItems(navItem.items)

  const initialGroup: NavMenu = {
    type: 'menu',
    collapsed: false,
    items: [
      {
        type: 'menuLink',
        hidden: false,
        title: navItem.title || '',
        path: `/${navItem.segment || ''}`,
      },
    ],
  }

  while (items.length) {
    const item = items[0]

    if (!item) break

    if (item.type === 'menu') {
      break
    } else {
      items.shift()
      initialGroup.items.push(item)
    }
  }

  menu.items.push(initialGroup)
  menu.items.push(...items)

  return menu
}
