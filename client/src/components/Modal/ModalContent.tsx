/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../core/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icon';
import { Styled } from './styles';

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
      <Styled.Modal ref={ref} className="modal">
        <Styled.Backdrop aria-hidden="true" className="modal-backdrop" />
        <Styled.Nav className="modal-navigation">
          <Styled.Prev href="#" className="prev" onClick={handleClickPrev}>
            <ChevronLeftIcon size="64" />
          </Styled.Prev>
          <Styled.Next href="#" className="next" onClick={handleClickNext}>
            <ChevronRightIcon size="64" />
          </Styled.Next>
        </Styled.Nav>
        <Styled.Content
          as="aside"
          ref={focalRef}
          className={classNames('modal-content', className)}
          role={role}
          aria-label={ariaLabel}
          aria-modal="true"
          onKeyUp={onKeyUp}
        >
          {children}
        </Styled.Content>
      </Styled.Modal>,
      document.body,
    );
  },
);

ModalContent.displayName = 'ModalContent';

export { ModalContent };
