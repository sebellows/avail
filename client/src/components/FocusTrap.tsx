/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useEffect, useRef, useImperativeHandle } from 'react';
import { classNames, TAB } from '../core/utils';
import { useEventCallback } from '../hooks/useEventCallback';

let timer = null;
const isDOM = typeof document !== 'undefined';

const getActiveElement = () =>
  isDOM ? ((document.activeElement ?? document.body) as HTMLElement) : null;

/** Selectors for all focusable elements */
const FOCUSABLE_ELEMENT_SELECTORS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

const FocusTrap = forwardRef<{}, any>(
  ({ className, children, tag: Tag = 'div' }, ref: Ref<any>) => {
    const rootRef = useRef(null);
    const innerRef = useRef(null);
    const activeRef = useRef(null);

    useImperativeHandle(ref, () => rootRef, [rootRef]);

    const handleBlur = useEventCallback((event: any) => {
      event.preventDefault();

      if (!activeRef?.current?.contains(event.target)) {
        trapFocus();
      }
    });

    const trapFocus = useEventCallback(() => {
      clearTimeout(timer);
      timer = setTimeout(handleFocus, 10);
    });

    useEffect(() => {
      if (isDOM) {
        activeRef.current = getActiveElement();
      }

      trapFocus();

      document.addEventListener('focus', handleBlur, true);

      return () => {
        document.removeEventListener('focus', handleBlur, true);
        clearTimeout(timer);
        returnFocus();
        activeRef.current = null;
      };
      // eslint-disable react-hooks/exhaustive-deps
    }, [activeRef, handleBlur, trapFocus]);

    const handleFocus = (event?: any) => {
      const activeElement = getActiveElement();

      if (!rootRef?.current.contains(activeElement)) {
        if (innerRef?.current) {
          const focusableSelectors = innerRef.current.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);

          if (!focusableSelectors.length) {
            innerRef.current.focus();
          }

          if (focusableSelectors.length === 1) {
            (focusableSelectors[0] as HTMLElement).focus();
          }

          if (focusableSelectors.length > 1) {
            const {
              0: firstFocusableSelector,
              length: l,
              [l - 1]: lastFocusableSelector,
            } = focusableSelectors;

            if (event && event.keyCode === TAB) {
              event.preventDefault();

              if (event.shiftKey && activeElement === firstFocusableSelector) {
                lastFocusableSelector.focus();
              } else if (!event.shiftKey && activeElement === lastFocusableSelector) {
                firstFocusableSelector.focus();
              }
            } else {
              (firstFocusableSelector as HTMLElement).focus();
            }
          }
        } else {
          rootRef.current.focus();
        }
      }
    };

    function returnFocus() {
      // When transitioning between pages using hash route state,
      // this anchor is some times lost. Do not attempt to focus
      // on a non-existent anchor.
      if (
        activeRef.current &&
        typeof activeRef.current === 'object' &&
        typeof activeRef.current.focus === 'function'
      ) {
        activeRef.current.focus();
      }
    }

    const Component = Tag as 'div';

    return (
      <Component ref={rootRef} className={className}>
        {React.cloneElement(children, {
          className: classNames('fade', children.props.className),
          ref: innerRef,
        })}
      </Component>
    );
  },
);

FocusTrap.displayName = 'FocusTrap';

export { FocusTrap };
