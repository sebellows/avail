import React from 'react'
import styled from 'styled-components'

import { classNames } from '../../core/utils/classNames'
import { ICON_MAP } from './IconMap'

const StyledIcon = styled.svg`
  label & {
    position: relative;
    top: -1px;
  }
`
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string
  filled?: boolean
  focusable?: boolean
  name: string
  size?: number | string
  strokeWidth?: number
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      className,
      name = '',
      fill = 'currentColor',
      filled = false,
      focusable = false,
      size = 24,
      strokeWidth = 2,
      ...props
    },
    ref,
  ) => {
    let icon = ICON_MAP[name]

    if (!icon) {
      for (let ico in ICON_MAP) {
        if (ICON_MAP[ico].aliases && ICON_MAP[ico].aliases.includes(name)) {
          icon = ICON_MAP[ico]
          break
        }
      }
    }

    const { title, children } = icon
    const iconClassName = classNames('icon', `icon-${name}`, !!className && className, {
      'is-filled': !!filled,
    })

    return (
      <StyledIcon
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? fill : 'none'}
        stroke={filled ? 'none' : fill}
        strokeWidth={filled ? '0' : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClassName}
        focusable={focusable}
        {...props}
        style={{ pointerEvents: 'none', ...props?.style }}
      >
        <title>{title}</title>
        {children}
      </StyledIcon>
    )
  },
)

Icon.displayName = 'Icon'

export { Icon }
