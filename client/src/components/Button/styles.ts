import styled, { css } from 'styled-components'
import { color, mixin, isUnit, toREM } from '../../core/style'
import { isNil } from '../../core/utils'
import { Control } from '../Control'
import { ButtonProps, ToggleButtonProps } from './props'

const ButtonShadowStyles = css`
  ${mixin.boxShadow.elevation(1)}

  &:hover {
    ${mixin.boxShadow.elevation(2)}
  }
`

/** Buttons */
const BaseButton = styled.button<ButtonProps>`
  position: relative;
  ${({ variant }) => mixin.bgColor(variant ? color[variant] : 'transparent')}
  ${({ theme, variant }) => mixin.color(variant ? mixin.invert(color[variant]) : theme.fg)}
  ${mixin.truncateText}
  ${mixin.appearanceNone}
  ${mixin.transition('easeInOut')}

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    ${({ theme }) => mixin.bgColor(theme.fg)}
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

const StyledButton = styled(BaseButton)<ButtonProps>`
  ${mixin.inlineFlexCenter}
  text-align: center;
`

const BaseIconButton = styled(StyledButton)<ButtonProps>`
  flex-direction: column;
  flex: none;
  border: 0;
  padding: 0;
  ${({ size }) => mixin.size(!isNil(size) ? (isUnit(size) ? size : toREM(+size)) : toREM(54))}

  &:focus {
    ${mixin.boxShadow.elevation(1)}
  }
`

export const Styled = {
  Button: styled(StyledButton)`
    padding: 0.375rem 0.75rem;
    ${({ variant }) => mixin.border({ color: color[variant] ?? 'currentColor' })}
    ${mixin.borderRadius('base')}
    ${ButtonShadowStyles}
  `,
  FAB: styled(BaseIconButton)`
    ${mixin.borderRadius('circle')}
    ${ButtonShadowStyles}
  `,
  Icon: BaseIconButton,
  Toggle: styled(BaseButton)<ToggleButtonProps>`
    ${mixin.flex({ inline: true, align: 'center', justify: 'start' })}
  `,
  ToggleControl: styled(Control)`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  `,
}
