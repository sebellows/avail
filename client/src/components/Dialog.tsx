/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  forwardRef,
  Ref,
  useContext,
  useEffect,
  useState,
  useRef,
  CSSProperties,
  MutableRefObject,
  useCallback,
  useImperativeHandle,
} from 'react';
import { CloseIcon } from './Icon';
import { classNames } from '../core/utils';

interface DialogProps {
  tag?: JSX.IntrinsicElements;
  className?: string;
  children?: any;
  focus?: boolean;
  title?: any;
  style?: CSSProperties;
  tabIndex?: number;
  width?: string;
  onClose?: (event: React.SyntheticEvent) => void;
}

interface DialogHeaderProps {
  className?: string;
  children?: any;
  focus?: boolean;
  onClose?: (event: React.SyntheticEvent) => void;
}

const noopEvent = (event: React.SyntheticEvent) => {};

const DialogHeader = forwardRef<{}, DialogHeaderProps>(
  ({ className = null, children, onClose }, ref) => {
    const buttonRef = useRef(null);

    function handleClick(event: React.SyntheticEvent) {
      event.preventDefault();
      onClose(event);
    }

    const headerContent =
      typeof children == 'string' ? <h3 className="dialog-title">{children}</h3> : children;

    return (
      <div className={classNames('dialog-header', className)}>
        {headerContent}
        <button
          ref={buttonRef}
          type="button"
          className="close"
          aria-label="Close"
          onClick={handleClick}
        >
          <span className="sr-only">Close</span>
          <CloseIcon aria-hidden="true" />
        </button>
      </div>
    );
  },
);

DialogHeader.displayName = 'DialogHeader';

const Dialog = forwardRef<{}, DialogProps>(
  ({ tag = 'div', className = '', title, onClose = noopEvent, children }, ref: Ref<any>) => {
    const Component = tag as 'div';

    return (
      <Component ref={ref} role="document" className={classNames('dialog', className)}>
        <div className="dialog-content">
          <DialogHeader onClose={onClose}>{title}</DialogHeader>
          <div className="dialog-body">
            <div className="dialog-body-inner">{children}</div>
          </div>
        </div>
      </Component>
    );
  },
);

Dialog.displayName = 'Modal';

export { Dialog, DialogHeader };
