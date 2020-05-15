import styled from 'styled-components';
import { control } from '../../core/style';

export const Styled = {
  Wrapper: styled.div`
    position: relative;
    display: inline-block;
    width: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: calc(var(--font-size-base) * 1.25);
      display: inline-block;
      width: 0;
      height: 0;
      margin-top: -0.15625rem; // ~2.5px
      border: 0.34375rem solid transparent; // ~3px
      border-top-color: ${control.color};
      pointer-events: none;
    }
  `,
  Select: styled.select`
    border: 0;
    display: inline-block;
    width: 100%;
    padding: 0.5rem 2.25rem 0.5rem 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  `,
};
