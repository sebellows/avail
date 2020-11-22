import React, { useRef, useState } from 'react'
import { useMeasure } from './useMeasure'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { mixin } from '../../core/style'
import { ComponentProps } from '../../core/contracts'
import { TabsPager } from './TabsPager'
import { isNil } from '../../core/utils'
import { useTheme } from '../../ThemeContext'

export interface TabProps extends ComponentProps {
  id?: string
  title: React.ReactNode
  disabled?: boolean
  tabClassName?: string
}

export const Tab = (props: TabProps) => null

export interface TabItemProps extends ComponentProps {
  id?: string
  active?: boolean
  disabled?: boolean
  onSelect?: (id: string, index: number, event: any) => void
}

const Styled = {
  Container: styled.div`
    overflow-y: hidden;
    box-shadow: none;
  `,
  List: styled.div`
    display: block;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  `,
  Item: styled(motion.button)<TabItemProps>`
    border: 0;
    display: block;
    flex: 1;
    text-align: center;
    text-decoration: none;
    text-size-adjust: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    -webkit-appearance: none;
    ${({ theme }) => mixin.color(theme.fg)}
    ${({ theme }) => mixin.bgColor(theme.bg)}
    ${mixin.padding.all(2, 3)}
    ${mixin.transition({ property: 'background-color', duration: 'easeIn', timing: 'easeIn' })}

    &:hover,
    &[aria-selected='true'] {
      text-decoration: none;
      ${({ theme }) => mixin.color(theme.hover.fg)}
      ${({ theme }) => mixin.bgColor(theme.hover.bg)}
    }
  `,
  InkBar: styled(motion.div)`
    height: 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    margin-left: 2px;
    margin-right: 2px;
    bottom: 0;
    position: absolute;
    ${({ theme }) => mixin.bgColor(theme.primary)}
  `,
}

interface TabsProps extends ComponentProps {
  defaultActiveTab?: string
  sliderOffset?: number
  onSelect?: (tabID: string, event: any) => void
}

const Tabs = ({ children, defaultActiveTab, onSelect, sliderOffset = 8 }: TabsProps) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [slider, setSlider] = useState({ hasActive: false, left: 0, right: 0 })
  const { bounds, ref } = useMeasure()
  const tabListRef = useRef(null)
  const childRefs = useRef(new Map())

  React.useEffect(() => {
    const target = childRefs.current.get(activeTabIndex)
    const container = tabListRef.current
    if (target) {
      const {
        left: containerLeft,
        right: containerRight,
        width,
      } = container.getBoundingClientRect()

      if (width === 0) return

      const { left: targetLeft, right: targetRight } = target.getBoundingClientRect()
      const left = targetLeft - containerLeft
      const right = containerRight - targetRight

      setSlider({
        hasActive: true,
        left: left + sliderOffset,
        right: right + sliderOffset,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex, bounds])

  const handleClick = (tabID: string, index: number, event: any) => {
    setActiveTab(tabID)
    setActiveTabIndex(index)
    onSelect?.(tabID, event)
  }

  return (
    <div>
      <Styled.Container ref={ref}>
        <Styled.List ref={tabListRef}>
          {React.Children.map(children, (child: any, i: number) => {
            const { title, id: childID, disabled, tabClassName } = child.props
            if (isNil(title)) return null
            return (
              <Styled.Item
                key={childID}
                id={`${childID}-tab`}
                theme={theme}
                active={childID === activeTab}
                disabled={disabled}
                className={tabClassName}
                transition={{ duration: 0.1 }}
                ref={(el) => childRefs.current.set(childID, el)}
                onClick={(e: any) => handleClick(childID, i, e)}
              >
                {title}
              </Styled.Item>
            )
          })}
          {slider.hasActive && (
            <Styled.InkBar
              theme={theme}
              initial={false}
              style={{
                left: slider.left,
                right: slider.right,
              }}
            />
          )}
        </Styled.List>
        <TabsPager activeTab={activeTab} activeTabIndex={activeTabIndex}>
          {children}
        </TabsPager>
      </Styled.Container>
    </div>
  )
}

Tabs.displayName = 'Tabs'

export { Tabs }
