import React, { useState, useEffect, forwardRef, useMemo } from 'react'
import { useClickOutside, useEnsuredRef, useFocused, useLifecycles } from '../../hooks'
import styled, { css } from 'styled-components'
import { classNames, isPlainObject } from '../../core/utils'
import { Collapse } from '../Collapse'
import { DropdownProps } from './props'
import { DropdownItem } from './DropdownItem'

import { mixin } from '../../core/style'

export const StyledDropdown = styled.div<DropdownProps>`
  position: relative;
  ${mixin.flex({ direction: 'column', inline: true })}

  // Collapse
  .dropdown-menu {
    top: 100%;
    padding: 0;
    overflow: hidden;
    ${(props) => mixin.minWidth(props?.width ?? 160)}
    ${mixin.flex({ direction: 'column' })}
    ${mixin.borderRadius('lg')}
    ${mixin.boxShadow.elevation(1)}
    ${mixin.margin.bottom(3)}
    ${({ alignMenu }) => {
      switch (alignMenu) {
        case 'left':
          return mixin.center.x(0)
        case 'right':
          return css`
            position: absolute;
            left: auto;
            right: 0;
          `
        default:
          return mixin.center.x()
      }
    }}
    ${mixin.zIndex('dropdown')}
  }
`

type Toggle = React.ReactElement<
  any,
  | string
  | ((
      props: any,
    ) => React.ReactElement<any, string | (new (props: any) => React.Component<any, any, any>)>)
  | (new (props: any) => React.Component<any>)
>

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    { asSelect = false, items, itemAs = 'button', itemProps = {}, onSelect, selected, ...props },
    ref,
  ) => {
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
        e.preventDefault()
        toggle(!open)
        console.log('toggle', open)
        props?.onClick?.(e)
      },
    })

    const computedItems = useMemo(() => {
      if (isPlainObject(items)) {
        return Object.entries(items).reduce((acc, [k, v]) => {
          acc.push([k, v])
          return acc
        }, [])
      }
      return (items as string[]).reduce((acc, item) => {
        acc.push([item, item])
        return acc
      }, [])
    }, [items])

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
      if (selected && activeIndex === -1) {
        // console.log('Dropdown->selected', selected, items)
        setActiveIndex(computedItems.findIndex((item) => item[0] === selected))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [computedItems])

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
        else setActiveIndex(computedItems.length - 1)
      }
    }

    const handleHoverStart = (e: any, index: number) => {
      setActiveIndex(index)
    }

    const handleHoverEnd = (e: any, index: number) => {
      setActiveIndex(-1)
    }

    return (
      <StyledDropdown
        ref={containerRef}
        {...props}
        className={classNames('dropdown', !!props?.className && props.className)}
      >
        {toggleEl}

        <Collapse className="dropdown-menu" open={open}>
          {computedItems.map((item, i) => (
            <DropdownItem
              key={`dropdown-item-${i + 1}`}
              {...itemProps}
              as={itemAs}
              isActive={activeIndex === i}
              value={computedItems[i][0]}
              onChange={(e: any) => handleSelect(item, e)}
              onHoverStart={(e: any) => handleHoverStart(e, i)}
              onHoverEnd={(e: any) => handleHoverEnd(e, -1)}
            >
              {computedItems[i][1]}
            </DropdownItem>
          ))}
        </Collapse>
      </StyledDropdown>
    )
  },
)

Dropdown.displayName = 'Dropdown'

export { Dropdown }
