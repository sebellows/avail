import React, { forwardRef, Ref, ReactChildren } from 'react';
import { Styled } from './styles';
import { TabContainer } from './TabContainer';

import { classNames } from '../../core/utils';
import { TabItem } from './TabItem';
import { TabPanel } from './TabPanel';

export interface TabProps {
  disabled?: boolean;
  target?: string;
  title?: string;
  tabClassName?: string;
  children: ReactChildren;
}

/**
 * `Tab` is a phony wrapper component that we use to extract
 * props from and pass to the rendered `TabItem`s and `TabPanel`s.
 */
const Tab = ({ target, title, children }) => {
  return null;
};

const Tabs = forwardRef<{}, any>(
  ({ id, activeKey, onSelect, children, ...props }, ref: Ref<any>) => {
    return (
      <TabContainer ref={ref} id={id} onSelect={onSelect} activeKey={activeKey}>
        <Styled.Tabs className={classNames('tabs', props.className)} role="tablist">
          {children &&
            children.map((child: React.Component<TabProps>) => {
              const { title, target, disabled, tabClassName } = child.props;
              return (
                <TabItem key={target} target={target} disabled={disabled} className={tabClassName}>
                  {title}
                </TabItem>
              );
            })}
        </Styled.Tabs>

        <div className="tab-content">
          {children &&
            children.map((child) => {
              const childProps = { ...child.props };
              ['title', 'disabled', 'tabClassName'].forEach((prop) => {
                delete childProps[prop];
              });
              const { target } = childProps;

              return <TabPanel key={target} {...childProps} />;
            })}
        </div>
      </TabContainer>
    );
  },
);

Tabs.displayName = 'Tabs';

export { Tab, Tabs };
