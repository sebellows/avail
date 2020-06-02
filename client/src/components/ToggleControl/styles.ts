import styled, { keyframes, css } from 'styled-components';
import { Control } from '../Control';
import { mixin, control, transition } from '../../core/style';
import { ToggleControlProps } from './props';

const checkStrokeDashOffset = '22.910259';

/* Fades in the background of the checkbox when it goes from unchecked -> checked. */
const fadeInBg = keyframes`
  0% {
    opacity: 0;
    background-color: ${control.bg};
  }
  50% {
    opacity: 1;
    background-color: ${control.checked.bg};
  }
`;
/* Fades out the background of the checkbox when it goes from checked -> unchecked. */
const fadeOutBg = keyframes`
  0%,
  50% {
    opacity: 1;
    background-color: ${control.checked.bg};
  }
  100% {
    opacity: 0;
    background-color: ${control.bg};
  }
`;
/* "Draws" in the checkmark when the checkbox goes from unchecked -> checked. */
const toCheckedPath = keyframes`
  0%,
  50% {
    stroke-dashoffset: ${checkStrokeDashOffset};
  }
  50% {
    animation-timing-function: ${transition.timing.linearOutSlowIn};
  }
  100% {
    stroke-dashoffset: 0;
  }
`;
/* Hides the checkmark when the checkbox goes from checked -> unchecked. */
const toUncheckedPath = keyframes`
  from {
    animation-timing-function: ${transition.timing.fastOutSlowIn};
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: ${checkStrokeDashOffset};
  }
`;

const ToggleUI = styled.div<{ inputType }>`
  ${mixin.cover}
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.54);
  border-radius: ${({ inputType }) => (inputType === 'radio' ? '50%' : '0.25em')};
  width: 1rem;
  height: 1rem;
  transition: ${({ inputType }) =>
    inputType === 'radio'
      ? 'border-color ease 280ms'
      : `border-color 150ms ${transition.timing.linearOutSlowIn}`};
`;
export const Styled = {
  Wrapper: styled.label`
    position: relative;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    margin-bottom: 0;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    :not(:last-of-type) {
      ${mixin.margin.right(2)}
    }
  `,
  Control: styled(Control)<ToggleControlProps>`
    opacity: 0;
    z-index: 1;
    ${mixin.cover}

    // animation
    &:checked ~ .toggle-container .toggle-outer {
      background-color: transparent;
      border-color: ${(props) =>
        props?.type === 'radio' ? control.checked.borderColor : control.borderColor};
    }
    &:checked ~ .toggle-container .toggle-inner {
      background-color: ${control.checked.bg};
      ${({ type }) =>
        type === 'radio' &&
        css`
          transform: scale(0.5);
        `}
      ${({ type }) =>
        type === 'checkbox' &&
        css`
          animation: ${transition.duration.easeIn} linear 0ms ${fadeInBg};
        `}
    }
    &:not(:checked) ~ .toggle-container .toggle-inner {
      ${({ type }) =>
        type === 'checkbox' &&
        css`
          animation: ${transition.duration.easeIn} linear 0ms ${fadeOutBg};
        `}
    }
    &:checked ~ .toggle-container .toggle-inner .icon {
      stroke-dashoffset: 0;
    }
    &:checked ~ .toggle-container .toggle-inner .icon .check-icon-path {
      animation: ${transition.duration.easeIn} linear 0ms ${toCheckedPath};
    }
    &:not(:checked) ~ .toggle-container .toggle-inner .icon .check-icon-path {
      animation: ${transition.duration.easeIn} linear 0ms ${toUncheckedPath};
    }
  `,
  Container: styled.div`
    display: inline-block;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    line-height: 0;
    margin-right: 0.3125rem;
    order: 0;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    pointer-events: none;

    .icon {
      width: 100%;
      height: 100%;
    }
  `,
  Outer: ToggleUI,
  Inner: styled(ToggleUI)`
    border-color: transparent;
    transition: ${({ inputType }) =>
      inputType === 'radio'
        ? 'transform ease 280ms, background-color ease 280ms'
        : `background-color 150ms cubic-bezier(0, 0, 0.2, 0.1), opacity 150ms ${transition.timing.linearOutSlowIn}`};
    transform: ${({ inputType }) => (inputType === 'radio' ? 'scale(0.001)' : 'none')};
  `,
  Content: styled.div`
    font-weight: normal;
    position: relative;
    user-select: auto;
  `,
};
