import React, { forwardRef, Ref, useEffect, useState, useRef } from 'react';
import { ESCAPE, listen, noScroll } from '../../core/utils';
import { useEventCallback } from '../../hooks/useEventCallback';
import { useWillUnmount } from '../../hooks/useWillUnmount';
import { ModalTrigger } from './ModalTrigger';
import { ModalContent } from './ModalContent';

function ignoreSiblings(siblings: NodeList | string[], fn: (el: HTMLElement) => void) {
  if (siblings && siblings.length) {
    siblings.forEach((selector: string | Node) => {
      if (typeof selector == 'string') {
        const el = document.querySelector(selector) as HTMLElement;
        fn(el);
      } else {
        fn(selector as HTMLElement);
      }
    });
  }
}

const Modal = forwardRef<{}, any>(
  (
    {
      ariaLabel,
      children,
      className = '',
      ignore = ['#root'],
      role = 'dialog',
      show = false,
      trigger,
      onClose = null,
      onShow = null,
      onKeyUp = (event: any) => {},
      onClickPrev = (event: any) => {},
      onClickNext = (event: any) => {},
    },
    ref: Ref<any>,
  ) => {
    const [exited, setExited] = useState(!show);

    const focalRef = useRef(null);
    const prevShow = useRef(!show);
    const removeKeyDownListenerRef = useRef(null);

    const handleShow = useEventCallback(() => {
      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.setAttribute('aria-hidden', 'true'));
      });

      removeKeyDownListenerRef.current = listen(document.documentElement, 'keydown', handleKeyUp);

      onShow?.();

      noScroll.on();

      setExited(false);
    });

    const handleClose = useEventCallback(() => {
      onClose?.();

      noScroll.off();

      setTimeout(() => {
        ignoreSiblings(ignore, (el) => el.removeAttribute('aria-hidden'));
      });

      prevShow.current = true;
    });

    useEffect(() => {
      if (!show) return;

      handleShow();

      prevShow.current = show;

      return () => handleClose();
    }, [show, handleClose, handleShow]);

    useEffect(() => {
      const { current: wasShown } = prevShow;
      if (!exited || (exited && wasShown)) return;

      handleClose();
    }, [exited, handleClose, prevShow]);

    useWillUnmount(() => {
      setExited(true);
      const closeout = setTimeout(() => {
        if (!prevShow.current) {
          handleClose();
        }
      });
      clearTimeout(closeout);
    });

    const handleKeyUp = (event: any) => {
      if (event.keyCode === ESCAPE) {
        onClose?.(event);
      }
      if (onKeyUp) {
        onKeyUp(event);
      }
    };

    return (
      <>
        {trigger && <ModalTrigger>{trigger}</ModalTrigger>}
        {show && (
          <ModalContent
            ref={ref}
            focalRef={focalRef}
            {...{ className, ariaLabel, onKeyUp: handleKeyUp, onClickNext, onClickPrev }}
          >
            {children}
          </ModalContent>
        )}
      </>
    );
  },
);

Modal.displayName = 'Modal';

export { Modal };
