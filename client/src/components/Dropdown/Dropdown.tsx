import React, { forwardRef, useState } from 'react'
import { ComponentProps } from '../../core/contracts'
import { classNames } from '../../core/utils'

import { Collapse } from '../Collapse'

import { Styled } from './styles'

interface DropdownProps extends ComponentProps {
  open?: boolean
  onClick?: (e: any) => void
}

type Toggle = React.ReactElement<
  any,
  | string
  | ((
      props: any,
    ) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)>)
  | (new (props: any) => React.Component<any>)
>

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children: dropdownChildren, className, open: initialOpen = false, ...props }, ref) => {
    const [open, toggle] = useState(initialOpen)
    const children = React.Children.toArray(dropdownChildren)
    const firstChild = children.shift() as Toggle
    const toggleEl = React.cloneElement(firstChild, {
      ...(firstChild?.props || {}),
      className: classNames('dropdown-toggle', firstChild?.props?.className),
      onClick: (e: any) => {
        toggle(!open)
        props?.onClick?.(e)
      },
    })

    return (
      <Styled.Dropdown
        ref={ref}
        className={classNames('dropdown', !!className && className)}
        {...props}
      >
        {toggleEl}

        <Collapse className="dropdown-menu" open={open}>
          {children}
        </Collapse>
      </Styled.Dropdown>
    )
  },
)

Dropdown.displayName = 'Dropdown'

export { Dropdown }
