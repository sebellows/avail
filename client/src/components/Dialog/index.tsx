/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref } from 'react';
import { classNames } from '../../core/utils';
import { Styled } from './styles';
import { DialogProps } from './props';
import { DialogHeader } from './DialogHeader';

const noopEvent = (event: React.SyntheticEvent) => {};

const Dialog = forwardRef<{}, DialogProps>(
  ({ className = '', title, onClose = noopEvent, children }, ref: Ref<any>) => {
    return (
      <Styled.Wrapper ref={ref} role="document" className={classNames('dialog', className)}>
        <Styled.Content className="dialog-content">
          <DialogHeader onClose={onClose}>{title}</DialogHeader>
          <Styled.Body className="dialog-body">
            <div className="dialog-body-inner">{children}</div>
          </Styled.Body>
        </Styled.Content>
      </Styled.Wrapper>
    );
  },
);

Dialog.displayName = 'Modal';

export { Dialog, DialogHeader };
