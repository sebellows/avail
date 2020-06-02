import styled from 'styled-components';
import { mixin, control } from '../../core/style';

export const Styled = {
  Wrapper: styled.fieldset`
    ${mixin.padding.bottom(1)}
  `,
  Legend: styled.legend`
    font-weight: normal;
    margin-bottom: 0;
  `,
  FormGroup: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-height: ${control.height};

    label:not(:last-of-type) {
      ${mixin.margin.right(3)}
    }
  `,
};
