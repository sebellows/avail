/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import { useMeasure } from './useMeasure'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { mixin } from '../../core/style'
import { TabsPager } from './TabsPager'
import { classNames, isNil } from '../../core/utils'
import { useTheme } from '../../ThemeContext'
import { useEnsuredRef } from '../../hooks'
import { BaseTabProps } from './shared'
import { TabsList } from './TabList'
import { TabItem } from './TabItem'

export interface TabProps extends BaseTabProps {
  tabClassName?: string
}

export const Tab = (props: TabProps) => null

export interface TabItemProps extends BaseTabProps {
  active?: boolean
  onSelect?: (id: string, index: number, event: any) => void
}

const TabsContainer = styled.div`
  overflow-y: hidden;
  box-shadow: none;
`

interface TabsProps extends Avail.ComponentProps {
  defaultActiveTab?: string
  id?: string
  onSelect?: (tabID: string, event?: any) => void
}

const Tabs: Avail.RefForwardingComponent<'div', TabsProps> = React.forwardRef(
  ({ children, defaultActiveTab, onSelect, ...props }: TabsProps, ref) => {
    const { theme } = useTheme()
    const [activeTab, setActiveTab] = useState(defaultActiveTab)
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const tabListRef = useRef(null)
    const childRefs = useRef(new Map())

    const tabItems = []
    React.Children.forEach(children, (child: any, i: number) => {
      const { title, id, disabled, tabClassName } = child.props
      tabItems[i] = { title, id, disabled, tabClassName }
    })

    const handleClick = (tabID: string, index: number, event: any) => {
      setActiveTab(tabID)
      setActiveTabIndex(index)
      onSelect?.(tabID, event)
    }

    return (
      <TabsContainer {...props} ref={ref}>
        <TabsList ref={tabListRef} activeTab={activeTab}>
          {!!tabItems?.length &&
            tabItems.map((itemProps, i) => (
              <TabItem
                key={itemProps.id}
                {...itemProps}
                className={classNames({ active: itemProps.id === activeTab })}
                theme={theme}
                active={itemProps.id === activeTab}
                transition={{ duration: 0.1 }}
                ref={(el) => childRefs.current.set(itemProps.id, el)}
                onClick={(e: any) => handleClick(itemProps.id, i, e)}
              >
                {itemProps.title}
              </TabItem>
            ))}
        </TabsList>
        <TabsPager activeTab={activeTab} activeTabIndex={activeTabIndex}>
          {children}
        </TabsPager>
      </TabsContainer>
    )
  },
)

Tabs.displayName = 'Tabs'

export { Tabs }
