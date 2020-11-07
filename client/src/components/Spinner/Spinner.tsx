import React, { AnimationEvent, forwardRef, Ref } from 'react';
import { classNames } from '../../core/utils/classNames';
import { Styled } from './styles';

interface SpinnerProps {
  className?: string;
  exit?: boolean;
  onAnimationEnd?: (event: AnimationEvent) => void;
}

export const Spinner = forwardRef<{}, SpinnerProps>(
  ({ className, exit = false, onAnimationEnd = null }, ref: Ref<any>) => {
    function handleAnimationEnd(event: AnimationEvent) {
      if (onAnimationEnd) {
        onAnimationEnd(event);
      }
    }

    return (
      <Styled.Wrapper
        ref={ref}
        className={classNames('spinner', className, exit && 'spinner-out')}
        onAnimationEnd={handleAnimationEnd}
      >
        <Styled.Container className="spinner-container">
          <Styled.Layer className="spinner-layer">
            <Styled.Mask className="spinner-circle-mask left">
              <Styled.LeftMaskCircle className="spinner-circle" />
            </Styled.Mask>
            <Styled.Gap className="spinner-circle-gap">
              <Styled.GapCircle className="spinner-circle" />
            </Styled.Gap>
            <Styled.Mask className="spinner-circle-mask right">
              <Styled.RightMaskCircle className="spinner-circle" />
            </Styled.Mask>
          </Styled.Layer>
        </Styled.Container>
      </Styled.Wrapper>
    );
  },
);
