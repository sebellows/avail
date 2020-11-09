import styled, { css } from 'styled-components'
import { color, mixin, isUnit, toREM, shadow } from '../../core/style'
import { ButtonProps } from './props'

const ButtonShadowStyles = css`
  // ${mixin.shadow(0, 1)}
  box-shadow: ${shadow.elevation(1)};

  &:hover {
    // ${mixin.shadow('depth1')}
    box-shadow: ${shadow.elevation(2)};
  }
  &:focus {
    outline: none;
  }
`
// ${mixin.shadow(focusShadow.depth2)}

/** Buttons */
const BaseButton = styled.button<ButtonProps>`
  ${mixin.inlineFlexCenter}
  position: relative;
  text-align: center;
  background: ${({ variant }) => color[variant] ?? 'transparent'};
  color: ${({ variant }) => (variant ? mixin.invert(color[variant]) : color.dark)};
  overflow: hidden;
  ${mixin.appearanceNone}
  ${mixin.transition('easeInOut')}

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background-color: ${color.black};
    ${mixin.borderRadius('base')}
    opacity: 0;
    transform: translate(-50%, -50%);
    ${mixin.transition({ property: 'opactity', duration: 'easeInOut', timing: 'easeInOut' })}
    pointer-events: none;
  }

  &:focus::after {
    opacity: 0.375;
  }

  * {
    pointer-events: none;
  }
`

const BaseIconButton = styled(BaseButton)<ButtonProps>`
  flex-direction: column;
  flex: none;
  border: 0;
  padding: 0;
  ${({ size }) => mixin.size(size ? (isUnit(size) ? size : toREM(+size)) : toREM(54))}
`

export const Styled = {
  Button: styled(BaseButton)<ButtonProps>`
    padding: 0.375rem 0.75rem;
    border: 1px solid ${({ variant }) => color[variant] ?? 'currentColor'};
    ${mixin.borderRadius('base')}
    ${ButtonShadowStyles}
  `,
  FAB: styled(BaseIconButton)<ButtonProps>`
    ${mixin.borderRadius('circle')}
    ${ButtonShadowStyles}
  `,
  Icon: BaseIconButton,
}
