/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { classNames, ESCAPE, listen, noScroll } from '../core/utils';
// import { useClickOutside } from '../hooks/useClickOutside';
import { EventHandler, TransitionProps } from '../core/contracts';
import { useEventCallback } from '../hooks/useEventCallback';
import { useWillUnmount } from '../hooks/useWillUnmount';
import { FocusTrap } from './FocusTrap';
import { ChevronLeftIcon, ChevronRightIcon } from './Icon';
import '../styles/modal.css';

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

const ModalContent = forwardRef<{}, any>(
  (
    {
      ariaLabel,
      children,
      className = '',
      focalRef,
      role = 'dialog',
      onKeyUp = (event: any) => {},
      onClickPrev = (event: any) => {},
      onClickNext = (event: any) => {},
    },
    ref: Ref<any>,
  ) => {
    function handleClickPrev(event: any) {
      event.preventDefault();
      if (onClickPrev) {
        onClickPrev(event);
      }
    }

    function handleClickNext(event: any) {
      event.preventDefault();
      if (onClickNext) {
        onClickNext(event);
      }
    }

    return createPortal(
      <div ref={ref} className="modal">
        <div aria-hidden="true" className="modal-backdrop" />
        <nav className="modal-navigation">
          <a href="#" className="prev" onClick={handleClickPrev}>
            <ChevronLeftIcon size="64" />
          </a>
          <a href="#" className="next" onClick={handleClickNext}>
            <ChevronRightIcon size="64" />
          </a>
        </nav>
        <FocusTrap
          tag="aside"
          ref={focalRef}
          className={classNames('modal-content', className)}
          role={role}
          aria-label={ariaLabel}
          aria-modal="true"
          onKeyUp={onKeyUp}
        >
          {children}
        </FocusTrap>
      </div>,
      document.body,
    );
  },
);

ModalContent.displayName = 'ModalContent';

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

    // const backdropRef = useRef(null);
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
