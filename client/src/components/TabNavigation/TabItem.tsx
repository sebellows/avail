import React, { forwardRef, Ref } from 'react';
import { useTabContext } from './useTabContext';
import { to } from './router';
import { Styled } from './styles';
import { classNames } from '../../core/utils';

/**
 * Navigation controllers for the Tabs component.
 */
const TabItem = forwardRef<{}, any>(({ target, children, disabled, ...props }, ref: Ref<any>) => {
  const { isActive, onSelect, tabID } = useTabContext({ target });

  function handleClick(event: any) {
    event.preventDefault();
    onSelect(target);
    to(target);
  }

  return (
    <Styled.Tab
      ref={ref}
      href={`#${target}`}
      role="tab"
      id={tabID}
      className={classNames('tab', props?.className, disabled && 'disabled')}
      aria-selected={isActive}
      onClick={handleClick}
    >
      {children}
    </Styled.Tab>
  );
});

TabItem.displayName = 'TabItem';

export { TabItem };
