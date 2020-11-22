/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { mixin } from '../../core/style'
import { useTheme } from '../../ThemeContext'
import { DropdownItemProps } from './props'
import { classNames } from '../../core/utils'

export const StyledItem = styled(motion.label)<DropdownItemProps>`
  height: auto;
  width: 100%;
  ${({ theme }) => mixin.bgColor(theme.bg)}
  ${mixin.padding.all(2)}
  ${mixin.border()}
  ${mixin.userSelect}
  overflow-wrap: break-word;
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
`

const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      as,
      checked,
      children,
      className,
      disabled,
      name,
      type = 'radio',
      value,
      onChange,
      onHoverStart,
      onHoverEnd,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const [focused, setFocused] = useState(false)

    React.useEffect(() => {
      console.log('DropdownItem', name, props)
    }, [name, props])

    const handleFocus = useCallback((e) => {
      if (e.target.tagName === 'INPUT') setFocused(true)
    }, [])

    const handleBlur = useCallback((e) => {
      if (e.target.tagName === 'INPUT') setFocused(false)
    }, [])

    return (
      <StyledItem
        ref={ref}
        {...props}
        as={as}
        type="radio"
        checked={!!props?.isActive}
        className={classNames(className, focused && 'focus', disabled && 'disabled')}
        theme={theme}
        animate={
          props?.isActive ? { backgroundColor: theme.hover.bg } : { backgroundColor: theme.bg }
        }
        whileTap={{ backgroundColor: theme.hover.bg }}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </StyledItem>
    )
  },
)

DropdownItem.displayName = 'DropdownItem'

export { DropdownItem }
