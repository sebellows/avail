import React from 'react'
import styled from 'styled-components/macro'
import { classNames } from '../../utils'
import { toEM } from '../../utils/units'

import { ICON_MAP } from './IconMap'

const StyledIcon = styled.svg`
  pointerevents: 'none';

  label &,
  [data-ui='Text'] & {
    position: relative;
    top: -${toEM(1.5)};
    line-height: 1;
    vertical-align: middle;
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

const resolveIcon = (name: keyof typeof ICON_MAP) => {
  let icon = ICON_MAP[name]

  if (!icon) {
    for (let ico in ICON_MAP) {
      if (ICON_MAP[ico].aliases && ICON_MAP[ico].aliases.includes(name)) {
        icon = ICON_MAP[ico]
        break
      }
    }
  }

  return icon
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
    const { title, children } = resolveIcon(name)
    const iconClassName = classNames('icon', `icon-${name}`, !!className && className, {
      'is-filled': !!filled,
    })

    return (
      <StyledIcon
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        data-ui="Icon"
        data-icon={name}
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
        style={props?.style}
      >
        <title>{title}</title>
        {children}
      </StyledIcon>
    )
  },
)

Icon.displayName = 'Icon'

export { Icon }
