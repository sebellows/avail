import React from 'react'

export type IconConfig = { title: string; aliases?: string[]; children: React.ReactNode }

/**
 * NOTE: Icons adapted from Feather Icons
 * @see {@link https://feathericons.com/}
 * @author Cole Bemis <https://github.com/colebemis>
 * @license MIT {@link https://github.com/colebemis/feather/blob/master/LICENSE}
 */

export const ICON_MAP: Record<string, IconConfig> = {
  add: {
    title: 'Add',
    aliases: ['plus'],
    children: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
  },
  'arrow-down': {
    title: 'Arrow Down',
    children: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </>
    ),
  },
  'arrow-left': {
    title: 'Arrow Left',
    children: (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ),
  },
  'arrow-right': {
    title: 'Arrow Right',
    children: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
  },
  'arrow-up': {
    title: 'Arrow Up',
    children: (
      <>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </>
    ),
  },
  bucket: {
    title: 'bucket',
    aliases: ['fill', 'theme'],
    children: (
      <path d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" />
    ),
  },
  calendar: {
    title: 'Calendar',
    children: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  },
  check: {
    title: 'Check',
    children: <path className="check-icon-path" d="M4.1,12.7 9,17.6 20.3,6.3" />,
  },
  'chevron-down': {
    title: 'Chevron Down',
    aliases: ['angle-down'],
    children: <polyline points="6 9 12 15 18 9" />,
  },
  'chevron-left': {
    title: 'Chevron Left',
    aliases: ['angle-left', 'arrow-back'],
    children: <polyline points="15 18 9 12 15 6" />,
  },
  'chevron-right': {
    title: 'Chevron Right',
    aliases: ['angle-right', 'arrow-forward'],
    children: <polyline points="9 18 15 12 9 6" />,
  },
  'chevron-up': {
    title: 'Chevron Up',
    aliases: ['angle-up'],
    children: <polyline points="18 15 12 9 6 15" />,
  },
  'chevrons-left': {
    title: 'Chevrons Left',
    children: (
      <>
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
      </>
    ),
  },
  'chevrons-right': {
    title: 'Chevrons Right',
    children: (
      <>
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
      </>
    ),
  },
  circle: {
    title: 'Circle',
    aliases: ['status'],
    children: <circle cx="12" cy="12" r="10" />,
  },
  close: {
    title: 'Close',
    aliases: ['x'],
    children: (
      <>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </>
    ),
  },
  copy: {
    title: 'Copy',
    aliases: ['clipboard'],
    children: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </>
    ),
  },
  crosshair: {
    title: 'crosshair',
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
      </>
    ),
  },
  delete: {
    title: 'Delete',
    aliases: ['trashcan'],
    children: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </>
    ),
  },
  disabled: {
    title: 'Disabled',
    aliases: ['ban', 'slash'],
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </>
    ),
  },
  download: {
    title: 'Download',
    children: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  },
  droplet: {
    title: 'droplet',
    aliases: ['color'],
    children: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  },
  file: {
    title: 'File',
    aliases: ['document'],
    children: (
      <>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </>
    ),
  },
  filter: {
    title: 'Filter',
    children: (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="6" y1="11" x2="18" y2="11" />
        <line x1="9" y1="16" x2="15" y2="16" />
      </>
    ),
  },
  github: {
    title: 'github',
    children: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  info: {
    title: 'Info',
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
  },
  link: {
    title: 'Link',
    children: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
  },
  menu: {
    title: 'Menu',
    children: (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
  },
  minus: {
    title: 'Minus',
    aliases: ['remove'],
    children: <line x1="5" y1="12" x2="19" y2="12" />,
  },
  more: {
    title: 'More',
    children: (
      <>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </>
    ),
  },
  'more-vertical': {
    title: 'More',
    children: (
      <>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </>
    ),
  },
  move: {
    title: 'Move',
    children: (
      <>
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </>
    ),
  },
  refresh: {
    title: 'Refresh',
    children: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    ),
  },
  save: {
    title: 'Save',
    children: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </>
    ),
  },
  search: {
    title: 'Search',
    aliases: ['spyglass'],
    children: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
  },
  settings: {
    title: 'Settings',
    aliases: ['gear'],
    children: (
      <>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </>
    ),
  },
}