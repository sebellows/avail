import React, { forwardRef, Ref } from 'react';

import { classNames } from '../../core/utils';

import { Styled } from './styles';
import { PillTabsProps } from './props';

const PillTabs = forwardRef<HTMLOListElement, PillTabsProps>(
  ({ id, children, ...props }, ref: Ref<HTMLOListElement>) => {
    return (
      <Styled.Tabs
        {...props}
        ref={ref}
        id={id}
        className={classNames('pill-tabs', props.className)}
      >
        {children}
      </Styled.Tabs>
    );
  },
);

PillTabs.displayName = 'PillTabs';

export { PillTabs };
