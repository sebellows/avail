import React, { forwardRef, useEffect } from 'react'
import { ComponentProps } from '../../core/contracts'

import { classNames, fadeIn, getNode } from '../../core/utils'
import { SelectableContext, TabContext, useTabContext } from './TabContext'

import { Styled } from './styles'

export interface TabPanelProps extends ComponentProps {
  eventKey?: string
  active?: boolean
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props: TabPanelProps, ref) => {
  const { active, tabID, eventKey: _, ...rest } = useTabContext(props)

  if (!ref) {
    ref = React.createRef()
  }

  useEffect(() => {
    const el = getNode(ref)

    if (el) {
      ;(el as HTMLElement).style.opacity = '0'
      if (active) {
        fadeIn(el as HTMLElement)
      }
    }
  }, [active, ref])

  return (
    <TabContext.Provider value={null}>
      <SelectableContext.Provider value={null}>
        <Styled.Panel
          {...rest}
          ref={ref}
          role="tabpanel"
          aria-hidden={!active}
          aria-labelledby={tabID}
          className={classNames('tab-panel', active && 'active')}
        />
      </SelectableContext.Provider>
    </TabContext.Provider>
  )
})

TabPanel.displayName = 'TabPanel'

export { TabPanel }
