import { useContext } from 'react';

import { TabContext } from './context';

export const makeEventKey = (eventKey: string, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

export function useTabContext(props: any) {
  const context = useContext(TabContext);

  if (!context) return props;

  const { activeKey, getControlledId, getControllerId, onSelect, ...rest } = context;
  const { active, target } = props;
  const key = makeEventKey(target);

  return {
    ...rest,
    isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
    onSelect,
    panelID: getControlledId(target),
    tabID: getControllerId(target),
  };
}
