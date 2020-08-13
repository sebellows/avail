import React, { Ref } from 'react';
import styled from 'styled-components';

import { classNames } from '../core/utils/classNames';

export interface IconProps {
  fill?: string;
  filled?: boolean;
  focusable?: boolean;
  name: string;
  size?: number | string;
  [key: string]: any;
}

const StyledIcon = styled.svg`
  label & {
    position: relative;
    top: -1px;
  }
`;

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name = '',
      fill = 'currentColor',
      filled = false,
      focusable = false,
      size = 24,
      children,
      ...props
    },
    ref: Ref<SVGSVGElement>,
  ) => {
    let iconClassName = `icon-${name}`;

    if (ICON_MAP[name]) {
      iconClassName = ICON_MAP[name].className;
      children = ICON_MAP[name].children;
    }

    return (
      <StyledIcon
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? fill : 'none'}
        stroke={filled ? 'none' : fill}
        strokeWidth={filled ? '0' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classNames('icon', iconClassName, filled && 'is-filled')}
        focusable={focusable}
        {...props}
      >
        <title>{name}</title>
        {children}
      </StyledIcon>
    );
  },
);

const ICON_MAP = {
  crosshair: {
    className: 'icon-crosshair',
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
      </>
    ),
  },
  check: {
    className: 'icon-check',
    children: <path className="check-icon-path" d="M4.1,12.7 9,17.6 20.3,6.3" />,
  },
  chevronLeft: {
    className: 'icon-chevron-left',
    children: <polyline points="15 18 9 12 15 6" />,
  },
  chevronRight: {
    className: 'icon-chevron-right',
    children: <polyline points="9 18 15 12 9 6" />,
  },
  clipboard: {
    className: 'icon-clipboard',
    children: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </>
    ),
  },
  close: {
    className: 'icon-close',
    children: (
      <>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </>
    ),
  },
  download: {
    className: 'icon-download',
    children: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  },
  droplet: {
    className: 'icon-droplet',
    children: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  },
  github: {
    className: 'icon-github',
    children: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  info: {
    className: 'icon-info',
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
  },
  minus: {
    className: 'icon-minus',
    children: <line x1="5" y1="12" x2="19" y2="12" />,
  },
  more: {
    className: 'icon-more',
    children: (
      <>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </>
    ),
  },
  move: {
    className: 'icon-move',
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
  plus: {
    className: 'icon-plus',
    children: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
  },
  refresh: {
    className: 'icon-refresh',
    children: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </>
    ),
  },
  save: {
    className: 'icon-save',
    children: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </>
    ),
  },
  settings: {
    className: 'icon-settings',
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
  slash: {
    className: 'icon-slash',
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </>
    ),
  },
};

export const CheckIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="check" {...props}>
    {/* <polyline points="20 6 9 17 4 12" /> */}
    <path className="check-icon-path" d="M4.1,12.7 9,17.6 20.3,6.3" />
  </Icon>
);

export const ChevronLeftIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="plus" {...props}>
    <polyline points="15 18 9 12 15 6" />
  </Icon>
);

export const ChevronRightIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="plus" {...props}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);

export const ClipboardIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="copy" {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </Icon>
);

export const CloseIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="close" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
);

export const DownloadIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="download" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const DropletIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="droplet" {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Icon>
);

export const GitHubIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="github" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Icon>
);

export const InfoIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="info" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </Icon>
);

export const MinusIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="remove" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const MoreIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="more" {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

export const MoveIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="move" {...props}>
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </Icon>
);

export const PlusIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="add" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const RefreshIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="refresh" {...props}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Icon>
);

export const SaveIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="save" {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </Icon>
);

export const SettingsIcon: React.FC<Partial<IconProps>> = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="settings" {...props}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </Icon>
);

export const SlashIcon = ({ ref = null, ...props }) => (
  <Icon ref={ref} name="disabled" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </Icon>
);
