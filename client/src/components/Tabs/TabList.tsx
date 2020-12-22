/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { mixin, toPercent } from '../../core/style'
import { classNames } from '../../core/utils'
import { useTheme } from '../../ThemeContext'
import { useMeasure } from './useMeasure'

const List = styled.nav`
  ${mixin.flex({ align: 'center', justify: 'space-between' })}
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

const InkBar = styled(motion.div)`
  position: absolute;
  bottom: -0.125rem;
  height: 0.25rem;
  ${({ theme }) => mixin.bgColor(theme.primary)}
`

export interface TabsNavProps extends Avail.ComponentProps {
  activeTab?: any
  onSelect?: (eventKey: string, event: unknown) => void
  onKeyDown?: React.KeyboardEventHandler<this>
}

export const TabsList: Avail.RefForwardingComponent<'nav', TabsNavProps> = React.forwardRef(
  ({ as: Component = 'nav', activeTab, children, ...props }: TabsNavProps, ref) => {
    const { theme } = useTheme()
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const [inkBarPosition, setInkBarPosition] = useState(0)
    const tabCount = React.Children.count(children)
    const [listRef, rect] = useMeasure(ref)

    const paddingOffset = useRef<number>(null)

    const handleTabFocus = React.useCallback((tabIdx: number) => {
      setFocusedIndex(tabIdx)
    }, [])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          setFocusedIndex((prevIndex) => (prevIndex + tabCount - 1) % tabCount)
        }

        if (event.key === 'ArrowRight') {
          setFocusedIndex((prevIndex) => (prevIndex + 1) % tabCount)
        }
      },
      [tabCount],
    )

    const tabs = React.Children.map(children, (child: any, i: number) => {
      return React.cloneElement(child, {
        focused: focusedIndex === i,
        key: i,
        onFocus: () => handleTabFocus(i),
      })
    })

    React.useEffect(() => {
      if (listRef?.current?.nodeName) {
        const target = listRef?.current?.querySelector(`#${activeTab}`)

        if (target) {
          if (!paddingOffset.current) {
            const targetStyles = window.getComputedStyle(target)
            paddingOffset.current = parseInt(targetStyles.getPropertyValue('padding-left'), 10)
          }
          const { x: targetX } = target.getBoundingClientRect()
          const parentX = rect.x === 0 ? listRef?.current.getBoundingClientRect().x : rect.x
          const x = parentX ? targetX - parentX : targetX

          setInkBarPosition(x)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, rect])

    return (
      <List
        {...props}
        as={Component}
        ref={listRef}
        className={classNames('tabs-nav', !!props?.className && props.className)}
        onKeyDown={handleKeyDown}
        role="tablist"
      >
        {tabs}

        <InkBar
          theme={theme}
          initial={false}
          animate={{
            x: inkBarPosition,
          }}
          transition={{
            duration: 0.5,
            ease: [0.35, 0, 0.25, 1],
          }}
          style={{ width: toPercent(1, tabCount) }}
        />
      </List>
    )
  },
)
