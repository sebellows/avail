import { createContext, useContext } from 'react'

export const makeEventKey = (eventKey: string, href = null) => {
  if (eventKey != null) return String(eventKey)
  return href || null
}

export interface TabContextType {
  onSelect: any
  activeKey: any
  getControlledId: (key: string) => any
  getControllerId: (key: string) => any
}

export const TabContext = createContext<TabContextType | null>(null)

export function useTabContext(props: any) {
  const context = useContext(TabContext)

  if (!context) return props

  const { activeKey, getControlledId, getControllerId, onSelect, ...rest } = context

  const key = makeEventKey(props.eventKey)

  return {
    ...rest,
    active: props.active == null && key != null ? makeEventKey(activeKey) === key : props.active,
    onSelect,
    panelID: getControlledId(activeKey),
    tabID: getControllerId(activeKey),
  }
}

type SelectableContextType = (key: string | null, event: any) => void

export const SelectableContext = createContext<SelectableContextType | null>(null)

export const useSelectableContext = () => useContext(TabContext)
