import React, { AnimationEvent, forwardRef, Ref } from 'react';
import { classNames } from '../core/utils/classNames';
import '../styles/spinner.css';

interface SpinnerProps {
  className?: string;
  exit?: boolean;
  onAnimationEnd?: (event: AnimationEvent) => void;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    { className = '', exit = false, onAnimationEnd = null },
    ref: Ref<HTMLDivElement>,
  ) => {
    function handleAnimationEnd(event: AnimationEvent) {
      if (onAnimationEnd) {
        onAnimationEnd(event);
      }
    }
    return (
      <div
        ref={ref}
        className={classNames('spinner', className, exit && 'spinner-out')}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="spinner-container">
          <div className="spinner-layer">
            <div className="spinner-circle-mask left">
              <div className="spinner-circle" />
            </div>
            <div className="spinner-circle-gap">
              <div className="spinner-circle" />
            </div>
            <div className="spinner-circle-mask right">
              <div className="spinner-circle" />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
