import React, { useMemo, useEffect } from 'react'
import { useUncontrolled } from '../../hooks/useUncontrolled'
import { SelectableContext, TabContext } from './TabContext'
import { to } from './router'

export interface TabContainerProps extends React.PropsWithChildren<unknown> {
  id?: string
  onSelect?: (eventKey: string | null, e: React.SyntheticEvent<unknown>) => void
  activeKey?: unknown
  defaultActiveKey?: unknown
}

export const TabContainer = (props: TabContainerProps) => {
  const { id, onSelect, activeKey, children } = useUncontrolled(props, { activeKey: 'onSelect' })

  useEffect(() => {
    if (window.location.pathname.slice(1) !== activeKey) {
      to(activeKey as string)
    }
  }, [activeKey])

  const generateChildId = useMemo(
    () => (eventKey: string, type: string) => (id ? `${id}-${type}-${eventKey}` : null),
    [id],
  )

  const tabContext = useMemo(
    () => ({
      onSelect,
      activeKey,
      getControlledId: (key: string) => generateChildId(key, 'tabpanel'),
      getControllerId: (key: string) => generateChildId(key, 'tab'),
    }),
    [onSelect, activeKey, generateChildId],
  )

  return (
    <TabContext.Provider value={tabContext}>
      <SelectableContext.Provider value={onSelect}>{children}</SelectableContext.Provider>
    </TabContext.Provider>
  )
}
