import React, { useMemo, useEffect } from 'react';
import { SelectableContext, TabContext } from './context';
import { to } from './router';

export const TabContainer = ({ id, onSelect, activeKey, children, ...props }) => {
  useEffect(() => {
    if (window.location.pathname.slice(1) !== activeKey) {
      to(activeKey);
    }
  }, [activeKey]);

  const generateChildId = useMemo(
    () => (key: string, type: string) => (id ? `${id}-${type}-${key}` : null),
    [id],
  );

  const tabContext = useMemo(
    () => ({
      onSelect,
      activeKey,
      getControlledId: (key: string) => generateChildId(key, 'tabpanel'),
      getControllerId: (key: string) => generateChildId(key, 'tab'),
    }),
    [onSelect, activeKey, generateChildId],
  );

  return (
    <TabContext.Provider value={tabContext}>
      <SelectableContext.Provider value={onSelect}>{children}</SelectableContext.Provider>
    </TabContext.Provider>
  );
};
