import styled, { keyframes, css } from 'styled-components'
import { Control } from '../Control'
import { mixin, control } from '../../core/style'
import { ToggleControlProps } from './props'

const checkStrokeDashOffset = '22.910259'

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
`
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
`
/* "Draws" in the checkmark when the checkbox goes from unchecked -> checked. */
const toCheckedPath = keyframes`
  0%,
  50% {
    stroke-dashoffset: ${checkStrokeDashOffset};
  }
  100% {
    stroke-dashoffset: 0;
  }
`
/* Hides the checkmark when the checkbox goes from checked -> unchecked. */
const toUncheckedPath = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: ${checkStrokeDashOffset};
  }
`

const ToggleUI = styled.div<{ inputType }>`
  ${mixin.cover}
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.54);
  border-radius: ${({ inputType }) => (inputType === 'radio' ? '50%' : '0.25em')};
  width: 1rem;
  height: 1rem;
  ${({ inputType }) =>
    inputType === 'radio'
      ? mixin.transition({ property: 'border-color', duration: 280, timing: 'ease' })
      : mixin.transition({ property: 'border-color', duration: 150, timing: [0, 0, 0.2, 0.1] })}
`
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
        mixin.animation({ property: fadeInBg, duration: 'easeIn', timing: 'linear' })}
    &:not(:checked) ~ .toggle-container .toggle-inner {
      ${({ type }) =>
        type === 'checkbox' &&
        mixin.animation({ property: fadeOutBg, duration: 'easeIn', timing: 'linear' })}
    &:checked ~ .toggle-container .toggle-inner .icon {
      stroke-dashoffset: 0;
    }
    &:checked ~ .toggle-container .toggle-inner .icon .check-icon-path {
      ${mixin.animation({ property: toCheckedPath, duration: 'easeIn', timing: 'linearOutSlowIn' })}
    }
    &:not(:checked) ~ .toggle-container .toggle-inner .icon .check-icon-path {
      ${mixin.animation({ property: toUncheckedPath, duration: 'easeIn', timing: 'fastOutSlowIn' })}
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
    ${({ inputType }) =>
      inputType === 'radio'
        ? mixin.transition({ property: 'background-color', duration: 280, timing: 'ease' })
        : mixin.transition(
            { duration: 150, timing: 'linearOutSlowIn' },
            'background-color',
            'opacity',
          )}
    transform: ${({ inputType }) => (inputType === 'radio' ? 'scale(0.001)' : 'none')};
  `,
  Content: styled.div`
    font-weight: normal;
    position: relative;
    user-select: auto;
  `,
}
