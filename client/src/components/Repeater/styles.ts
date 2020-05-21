import styled, { css } from 'styled-components';
import { font, mixin, color, control, toREM } from '../../core/style';
import { Field } from '../Field';

interface StyledLabelProps {
  first?: boolean;
}

export const Styled = {
  Wrapper: styled.fieldset`
    padding-top: 2rem;

    legend {
      position: relative;
      top: -1rem;
    }
  `,
  Legend: styled.legend`
    font-size: ${toREM(font.sizes.lg)};
  `,
  Label: styled.label<StyledLabelProps>`
    display: ${({ first }) => (first ? 'block' : 'none')};
    ${({ first }) => {
      if (first) {
        return css`
          margin: 0;
          position: absolute;
          top: -2rem;
        `;
      }
    }}
  `,
  Field: styled(Field)`
    flex: 1;
    width: auto;
    position: relative;
  `,
  Separator: styled.span`
    ${mixin.inlineFlexCenter}
    ${mixin.margin.x(1)}
  `,
};

const StyledItemAddon = styled.span`
  ${mixin.inlineFlexCenter}
  flex-direction: column;
  ${mixin.padding.all(1)}
  min-width: 2rem;
  background-color: ${color.bg.light};
`;

export const StyledItem = {
  Wrapper: styled.div`
    border: solid ${color.border.base};
    border-width: 1px 1px 0 1px;
    display: flex;
    align-items: stretch;
    width: 100%;

    &:last-of-type {
      border-bottom-width: 1px;
    }
  `,
  Group: styled.div`
    background-color: ${color.bg.body};
    border: solid ${color.border.base};
    border-width: 0 ${control.borderWidth};
    display: flex;
    flex: 1;
    align-items: center;
    ${mixin.padding.all(1, 2)}
  `,
  Prepend: StyledItemAddon,
  Append: styled(StyledItemAddon)`
    justify-content: space-between;
  `,
};
