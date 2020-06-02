import React, { forwardRef } from 'react';
import { classNames } from '../../core/utils';

interface ModalTriggerProps {
  children: any;
  onOpen?: Function;
  [key: string]: any;
}

const ModalTrigger = forwardRef<{}, ModalTriggerProps>(({ children, onOpen, ...props }, ref) => {
  return (
    <>
      {React.cloneElement(children, {
        className: classNames(children.props.className),
        ref: ref,
      })}
    </>
  );
});

ModalTrigger.displayName = 'ModalTrigger';

export { ModalTrigger };
