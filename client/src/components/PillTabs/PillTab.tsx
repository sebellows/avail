import React, { forwardRef, Ref } from 'react';
import { classNames } from '../../core/utils';

import { SettingsIcon } from '../Icon';

import { Styled } from './styles';
import { PillTabProps } from './props';

const PillTab = forwardRef<{}, PillTabProps>(
  (
    { selected = false, checked = false, children, id, value, onSelect, ...props },
    ref: Ref<any>,
  ) => {
    return (
      <Styled.Tab id={id} ref={ref} className={classNames('pill-tab', props.className)}>
        <Styled.TabContent>
          <Styled.TabSwitch name={`${id}-active`} checked={checked} value={value}>
            {children}
          </Styled.TabSwitch>
        </Styled.TabContent>

        <Styled.Toggle
          fab
          size={24}
          className="pill-tab-toggle"
          onClick={onSelect}
          aria-controls={id}
          aria-expanded={selected}
        >
          <SettingsIcon />
        </Styled.Toggle>
      </Styled.Tab>
    );
  },
);

PillTab.displayName = 'PillTab';

export { PillTab };
