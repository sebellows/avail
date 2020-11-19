import React, { useState, useEffect, forwardRef, ComponentPropsWithRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// import { spring } from "popmotion";
import { useClickOutside, useEnsuredRef, useLifecycles } from '../../hooks'
import { mixin } from '../../core/style'
import { classNames } from '../../core/utils'
import { Collapse } from '../Collapse'
import { ComponentProps } from '../../core/contracts'
import { useTheme } from '../../ThemeContext'

export const useFocused = (ref: any) => {
  const [active, setActive] = useState(false)

  const handleFocusIn = (e: any) => {
    if (ref?.current === document.activeElement) setActive(true)
    else setActive(false)
  }

  useLifecycles(
    () => {
      document.addEventListener('focusin', handleFocusIn)
    },
    () => {
      document.removeEventListener('focusin', handleFocusIn)
    },
  )

  return active
}

interface DropdownItemProps extends Pick<ComponentProps, 'theme'>, ComponentPropsWithRef<'button'> {
  isActive?: boolean
  width?: number | string
  onHoverStart?: (e?: any) => void
  onHoverEnd?: (e?: any) => void
}

interface DropdownProps<T = string>
  extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'>,
    Pick<ComponentProps, 'theme'> {
  // Update toggle label to selected item text (like a pseudo-select form control)
  asSelect?: boolean
  carat?: boolean
  items?: T[]
  width?: number | string
  onSelect?: (selection: any, e: any) => void
}

export const Styled = {
  Container: styled.div<DropdownProps>`
    width: 100%;
    position: relative;
    ${({ width }) => mixin.maxWidth(width)}
    ${mixin.flex({ direction: 'column' })}

    // Collapse
    .dropdown-menu {
      top: 100%;
      padding: 0;
      overflow: hidden;
      ${({ width }) => mixin.minWidth(width)}
      ${mixin.flex({ direction: 'column' })}
      ${mixin.borderRadius('lg')}
      ${mixin.boxShadow.elevation(1)}
      ${mixin.margin.bottom(3)}
      ${mixin.center.x()}
      ${mixin.zIndex('dropdown')}
    }
  `,
}
const StyledItem = styled(motion.button)`
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
  ({ children, className, onClick, onHoverStart, onHoverEnd, ...props }, ref) => {
    const { theme } = useTheme()

    return (
      <StyledItem
        ref={ref}
        className={className}
        theme={theme}
        animate={
          props?.isActive ? { backgroundColor: theme.hover.bg } : { backgroundColor: theme.bg }
        }
        whileTap={{ backgroundColor: theme.hover.bg }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onClick={onClick}
      >
        {children}
      </StyledItem>
    )
  },
)

type Toggle = React.ReactElement<
  any,
  | string
  | ((
      props: any,
    ) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)>)
  | (new (props: any) => React.Component<any>)
>

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ asSelect = false, items, width = 160, onSelect, ...props }, ref) => {
    const [open, toggle] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const containerRef = useEnsuredRef(ref)
    const dropdownFocused = useFocused(containerRef)

    const children = React.Children.toArray(props?.children)
    const firstChild = children.shift() as Toggle
    const toggleEl = React.cloneElement(firstChild, {
      ...(firstChild?.props || {}),
      className: classNames('dropdown-toggle', firstChild?.props?.className),
      onClick: (e: any) => {
        toggle(!open)
        props?.onClick?.(e)
      },
    })

    useClickOutside(containerRef, () => {
      toggle(false)
    })

    useLifecycles(
      () => {
        document.addEventListener('keypress', onKeypress)
        document.addEventListener('keydown', onKeydown)
      },
      () => {
        document.removeEventListener('keypress', onKeypress)
        document.removeEventListener('keydown', onKeydown)
      },
    )

    useEffect(() => {
      if (dropdownFocused) {
        console.log('dropdownFocused')
        toggle(!open)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownFocused])

    const handleSelect = (item: any, e?: any) => {
      console.log('handleSelect')
      toggle(!open)
      onSelect?.(item, e)
    }

    const onKeypress = (e: any) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        handleSelect(items[activeIndex], e)
      }
    }

    const onKeydown = (e: any) => {
      // Down arrowkey or tab is pressed
      if (e.keyCode === 40 || e.keyCode === 9) {
        e.preventDefault()
        if (activeIndex + 1 < items.length) setActiveIndex(activeIndex + 1)
        else setActiveIndex(0)
        // Up arrowkey is pressed
      } else if (e.keyCode === 38) {
        if (activeIndex - 1 > -1) setActiveIndex(activeIndex - 1)
        else setActiveIndex(items.length - 1)
      }
    }

    const handleHoverStart = (e: any, index: number) => {
      setActiveIndex(index)
    }

    const handleHoverEnd = (e: any, index: number) => {
      setActiveIndex(-1)
    }

    return (
      <Styled.Container
        ref={containerRef}
        {...props}
        width={width}
        className={classNames('dropdown', !!props?.className && props.className)}
      >
        {toggleEl}

        <Collapse className="dropdown-menu" open={open}>
          {items.map((item, i) => (
            <DropdownItem
              key={`dropdown-item-${i + 1}`}
              isActive={activeIndex === i}
              width={width}
              onClick={(e: any) => handleSelect(item, e)}
              onHoverStart={(e: any) => handleHoverStart(e, i)}
              onHoverEnd={(e: any) => handleHoverEnd(e, -1)}
            >
              {item}
            </DropdownItem>
          ))}
        </Collapse>
      </Styled.Container>
    )
  },
)

Dropdown.displayName = 'Dropdown'

export { Dropdown }
