import React, { forwardRef, Ref, useEffect, ReactChildren } from 'react';

import { classNames, fadeIn, getNode } from '../../core/utils';

import { Styled } from './styles';
import { useTabContext } from './useTabContext';

export interface TabPanelProps {
  target: string;
  children: ReactChildren;
}

const TabPanel = forwardRef<{}, TabPanelProps>(({ target, children }, ref: Ref<any>) => {
  const { isActive, tabID } = useTabContext({ target });

  if (!ref) {
    ref = React.createRef();
  }

  useEffect(() => {
    const el = getNode(ref);

    if (el) {
      (el as HTMLElement).style.opacity = '0';
      if (isActive) {
        fadeIn(el as HTMLElement);
      }
    }
  }, [isActive, ref]);

  return (
    <Styled.Panel
      ref={ref}
      role="tabpanel"
      id={target}
      aria-labelledby={tabID}
      className={classNames('tab-panel', isActive && 'active')}
    >
      {children}
    </Styled.Panel>
  );
});

TabPanel.displayName = 'TabPanel';

export { TabPanel };
