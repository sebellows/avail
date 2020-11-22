import { useContext } from 'react'

import { TabContext } from './TabContext'

export const makeEventKey = (eventKey: string, href = null) => {
  if (eventKey != null) return String(eventKey)
  return href || null
}

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
