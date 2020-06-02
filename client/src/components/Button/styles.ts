import styled from 'styled-components';
import { color, mixin, isUnit, toREM } from '../../core/style';
import { ButtonProps } from './props';

/** Buttons */
const BaseButton = styled.button<ButtonProps>`
  ${mixin.inlineFlexCenter}
  position: relative;
  text-align: center;
  background: ${({ variant }) => color[variant] ?? 'transparent'};
  box-shadow: none;
  color: ${({ variant }) => (variant ? mixin.invert(color[variant]) : color.dark)};
  ${mixin.appearanceNone}

  * {
    pointer-events: none;
  }
`;

export const StyledButton = styled(BaseButton)<ButtonProps>`
  padding: 0.375rem 0.75rem;
  border: 1px solid ${({ variant }) => color[variant] ?? 'currentColor'};
  ${mixin.borderRadius('xs')}
`;

export const StyledFAB = styled(BaseButton)<ButtonProps>`
  flex-direction: column;
  flex: none;
  border: 0;
  ${mixin.borderRadius('circle')}
  padding: 0;
  ${({ size }) => mixin.size(size ? (isUnit(size) ? size : toREM(+size)) : toREM(54))}
`;
