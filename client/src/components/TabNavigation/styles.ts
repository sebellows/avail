import styled from 'styled-components'
import { mixin } from '../../core/style'

export const Styled = {
  Tabs: styled.nav`
    ${mixin.flexCenter}
  `,
  Tab: styled.a`
    ${({ theme }) => mixin.color(theme.fg)}
    ${({ theme }) => mixin.bgColor(theme.bg)}
    border: 0;
    display: block;
    flex: 1;
    text-align: center;
    text-decoration: none;
    ${mixin.padding.all(2, 3)}
    ${mixin.transition({ property: 'background-color', duration: 'easeIn', timing: 'easeIn' })}

    &:hover,
    &[aria-selected='true'] {
      ${({ theme }) => mixin.color(theme.hover.fg)}
      ${({ theme }) => mixin.bgColor(theme.hover.bg)}
      text-decoration: none;
    }
  `,
  Panel: styled.section`
    display: none;
    visibility: hidden;

    &.active {
      display: block;
      visibility: visible;
    }
  `,
}
