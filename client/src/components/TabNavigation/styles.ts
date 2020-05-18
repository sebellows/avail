import styled from 'styled-components';
import { control, mixin } from '../../core/style';

export const Styled = {
  Tabs: styled.nav`
    ${mixin.flexCenter}
  `,
  Tab: styled.a`
    background-color: ${control.bg};
    border: 0;
    color: ${control.color};
    display: block;
    flex: 1;
    text-align: center;
    text-decoration: none;
    ${mixin.padding.all(2, 3)}
    transition: background-color var(--ease-in-duratin) var(--ease-in-timing);

    &:hover,
    &[aria-selected='true'] {
      background-color: ${control.active.bg};
      color: ${control.active.color};
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
};
