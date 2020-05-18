import styled from 'styled-components';
import { mixin } from '../../core/style';

export const Styled = {
  Wrapper: styled.fieldset`
    ${mixin.padding.bottom(1)}
  `,
  FormGroup: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    label:not(:last-of-type) {
      ${mixin.margin.right(3)}
    }
  `,
};
