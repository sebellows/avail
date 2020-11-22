import React, { useState } from 'react'
import { Styled } from './styles'
import { TabContainer } from './TabContainer'

import { classNames, isNil } from '../../core/utils'
import { TabItem } from './TabItem'
import { TabPanel } from './TabPanel'
import { useUncontrolled } from '../../hooks/useUncontrolled'
import { ComponentProps } from '../../core/contracts'

export interface TabProps extends React.ComponentPropsWithRef<typeof TabPanel> {
  eventKey?: string
  title: React.ReactNode
  disabled?: boolean
  tabClassName?: string
}

/**
 * `Tab` is a phony wrapper component that we use to extract
 * props from and pass to the rendered `TabItem`s and `TabPanel`s.
 */
const Tab = (props: TabProps) => {
  return null
}

export interface TabsProps extends ComponentProps {
  activeKey?: unknown
  defaultActiveKey?: unknown
  disabled?: boolean
  id?: string
  onSelect?: (key: string, event: unknown) => void
  title?: string
  tabClassName?: string
}

function getDefaultActiveKey(children) {
  let defaultActiveKey
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<TabProps>(child)) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey
      }
    }
  })

  return defaultActiveKey
}

export interface TabsNavProps extends ComponentProps {
  activeKey?: unknown
  defaultActiveKey?: unknown
  onSelect?: (eventKey: string, event: unknown) => void
  onKeyDown?: React.KeyboardEventHandler<this>
}

export const TabsNav = ({ children, ...props }: TabsNavProps) => {
  return (
    <Styled.Tabs
      {...props}
      className={classNames('tabs-nav', !!props?.className && props.className)}
      role="tablist"
    >
      {children}
    </Styled.Tabs>
  )
}

const Tabs = (props: TabsProps) => {
  const {
    id,
    onSelect,
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  })
  const [viewableTabs, setViewableTabs] = useState([props?.defaultActiveKey ?? activeKey])

  React.useEffect(() => {
    console.log('viewableTabs', viewableTabs)
  }, [viewableTabs])

  const handleSelect = (eventKey: string, event: any) => {
    if (!viewableTabs.includes(eventKey)) {
      setViewableTabs([...viewableTabs, eventKey])
    }
    onSelect?.(eventKey, event)
  }

  return (
    <TabContainer id={id} onSelect={handleSelect} activeKey={activeKey}>
      <TabsNav {...controlledProps}>
        {React.Children.map(children, (child: any) => {
          const { title, activeKey: eventKey, disabled, tabClassName, id } = child.props
          if (isNil(title)) return null
          return (
            <TabItem
              key={activeKey}
              id={id}
              activeKey={eventKey}
              disabled={disabled}
              className={tabClassName}
            >
              {title}
            </TabItem>
          )
        })}
      </TabsNav>

      <div className="tab-content">
        {React.Children.map(children, (child: any) => {
          const childProps = { ...child.props }
          ;['title', 'disabled', 'tabClassName'].forEach((prop) => {
            delete childProps[prop]
          })
          const { activeKey } = childProps

          return viewableTabs.includes(child.props.eventKey) ? (
            <TabPanel key={activeKey} {...childProps} />
          ) : (
            <></>
          )
        })}
      </div>
    </TabContainer>
  )
}

Tabs.displayName = 'Tabs'

export { Tab, Tabs }
