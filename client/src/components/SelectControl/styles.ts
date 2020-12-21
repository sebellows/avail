import styled from 'styled-components'
import { Control } from '../Control'
import { mixin } from '../../core/style'

export const Styled = {
  Wrapper: styled.div`
    position: relative;
    display: inline-block;
    width: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 1.25rem;
      display: inline-block;
      width: 0;
      height: 0;
      margin-top: -0.15625rem; // ~2.75px
      border: 0.34375rem solid transparent; // ~5.5px
      ${({ theme }) => `border-top-color: ${theme.control.fg}`}
      pointer-events: none;
    }
  `,
  Select: styled(Control)`
    display: inline-block;
    padding-right: 2rem;
    ${mixin.appearanceNone}
  `,
}
