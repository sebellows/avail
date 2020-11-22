import styled, { keyframes, css } from 'styled-components'
import { Control } from '../Control'
import { mixin } from '../../core/style'
import { Theme } from '../../ThemeContext'
import { ToggleControlProps } from './props'

const checkStrokeDashOffset = '22.910259'

/* Fades in the background of the checkbox when it goes from unchecked -> checked. */
const fadeInBg = (theme: Theme) => keyframes`
  0% {
    opacity: 0;
    ${mixin.bgColor(theme.control.bg)}
  }
  50% {
    opacity: 1;
    ${mixin.bgColor(theme.control.checked)}
  }
`
/* Fades out the background of the checkbox when it goes from checked -> unchecked. */
const fadeOutBg = (theme) => keyframes`
  0%,
  50% {
    opacity: 1;
    ${mixin.bgColor(theme.control.checked)}
  }
  100% {
    opacity: 0;
    ${mixin.bgColor(theme.control.bg)}
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

const ToggleUI = styled.div<ToggleControlProps>`
  ${mixin.cover}
  background-color: transparent;
  ${mixin.border({ width: '2px', color: mixin.rgba('#000000', 0.54) })}
  ${({ inputType }) =>
    inputType === 'radio' ? mixin.borderRadius('circle') : mixin.borderRadius('base')}
  ${({ size }) => mixin.size(size)}
  ${({ inputType }) =>
    inputType === 'radio'
      ? mixin.transition({ property: 'border-color', duration: 280, timing: 'ease' })
      : mixin.transition({ property: 'border-color', duration: 150, timing: [0, 0, 0.2, 0.1] })}
`
export const Styled = {
  Wrapper: styled.label<ToggleControlProps>`
    position: relative;
    ${mixin.flex({ inline: true, align: 'center' })}
    vertical-align: middle;
    margin-bottom: 0;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    ${({ inline }) => {
      if (inline) {
        return css`
          :not(:last-of-type) {
            ${mixin.margin.right(2)}
          }
        `
      }
    }}
  `,
  Control: styled(Control)<ToggleControlProps>`
    opacity: 0;
    z-index: 1;
    ${mixin.cover}

    // animation
    &:checked ~ .toggle-container .toggle-outer {
      background-color: transparent;
      ${({ theme, type }) =>
        mixin.border({
          width: '2px',
          color: type === 'radio' ? theme.control.checked : theme.control.borderColor,
        })}
    }
    &:checked ~ .toggle-container .toggle-inner {
      ${({ theme }) => mixin.bgColor(theme.control.checked)}
      ${({ type }) =>
        type === 'radio' &&
        css`
          transform: scale(0.5);
        `}
      ${({ theme, type }) =>
        type === 'checkbox' &&
        mixin.animation({ property: fadeInBg(theme), duration: 'easeIn', timing: 'linear' })}
    &:not(:checked) ~ .toggle-container .toggle-inner {
      ${({ theme, type }) =>
        type === 'checkbox' &&
        mixin.animation({ property: fadeOutBg(theme), duration: 'easeIn', timing: 'linear' })}
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
  Container: styled.div<Pick<ToggleControlProps, 'size'>>`
    display: inline-block;
    flex-shrink: 0;
    ${({ size }) => mixin.size(size)}
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
