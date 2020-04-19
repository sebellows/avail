/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, ReactElement, useState, Props, ComponentState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

import { classNames } from '../core/utils/classNames';
import { style, transitionEnd } from '../core/utils/style';

import '../styles/collapse.css';

function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
}

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

type Dimension = 'width' | 'height';

function getDimensionValue(dimension: 'width' | 'height', elem: HTMLElement) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];

  return (
    value +
    parseInt(style(elem, margins[0]) as string, 10) +
    parseInt(style(elem, margins[1]) as string, 10)
  );
}

function getDimension(dimension: Dimension | Function) {
  return typeof dimension === 'function' ? dimension() : dimension;
}

const transitionState = {
  exited: 'is-collapsed',
  exiting: 'is-collapsing',
  entering: 'is-expanding',
  entered: 'is-expanded',
};

export const Collapse = forwardRef<Transition, TransitionProps>(
  (
    {
      in: inProp = false,
      appear = false,
      className = '',
      children,
      timeout = 300,
      dimension = 'height',
      role = 'menu',
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    },
    ref: Ref<Transition>,
  ) => {
    // const [inProp, setInProp] = useState(initialIn);

    /* -- Expanding -- */
    function handleEnter(elem: HTMLElement) {
      elem.style[getDimension(dimension as Dimension)] = '0';

      if (onEnter) {
        onEnter(elem, true);
      }
    }

    function handleEntering(elem: HTMLElement) {
      elem.style[`${dimension}`] = _getScrollDimensionValue(
        elem,
        getDimension(dimension as Dimension),
      );

      if (onEntering) {
        onEntering(elem, true);
      }
    }

    function handleEntered(elem: HTMLElement): void {
      elem.style[getDimension(dimension as Dimension)] = '';

      if (onEntered) {
        onEntered(elem, true);
      }
    }

    /* -- Collapsing -- */
    function handleExit(elem: HTMLElement) {
      elem.style[`${dimension}`] = `${getDimensionValue(
        getDimension(dimension as Dimension),
        elem,
      )}px`;
      triggerBrowserReflow(elem);

      if (onExit) {
        onExit(elem);
      }
    }

    function handleExiting(elem: HTMLElement) {
      elem.style[getDimension(dimension as Dimension)] = '';

      if (onExiting) {
        onExiting(elem);
      }
    }

    // for testing
    function _getScrollDimensionValue(elem: HTMLElement, dimension: 'width' | 'height') {
      const scroll = `scroll${dimension[0].toUpperCase()}${dimension.slice(1)}`;
      return `${elem[scroll]}px`;
    }

    return (
      <Transition
        addEndListener={transitionEnd}
        in={inProp}
        timeout={timeout}
        {...props}
        aria-expanded={role ? inProp : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
      >
        {(state: ComponentState, innerProps: Props<{}>) =>
          React.cloneElement(children as ReactElement<any, any>, {
            ...innerProps,
            ref,
            className: classNames(
              className,
              children!['props'].className,
              transitionState[state],
              getDimension(dimension as Dimension) === 'width' && 'width',
            ),
          })
        }
      </Transition>
    );
  },
);
