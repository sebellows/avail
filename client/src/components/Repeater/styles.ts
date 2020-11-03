import styled, { css } from 'styled-components'

import { font, mixin, color, control, toREM } from '../../core/style'

import { Field } from '../Field'

interface StyledLabelProps {
  first?: boolean
}

interface StyledLegendProps {
  description?: string
  isInvalid?: boolean
}

export const Styled = {
  Wrapper: styled.fieldset`
    padding-top: 1rem;

    small + .repeater-item:first-of-type {
      ${mixin.margin.top('2.25rem')}
    }
  `,
  Legend: styled.legend<StyledLegendProps>`
    position: relative;
    font-size: ${toREM(font.sizes.lg)};
    ${({ description, isInvalid }) =>
      description || isInvalid ? mixin.margin.bottom(1) : mixin.margin.bottom(2)}

    + .repeater-item:first-of-type {
      ${mixin.margin.top('4.25rem')}
    }
  `,
  Label: styled.label<StyledLabelProps>`
    display: ${({ first }) => (first ? 'block' : 'none')};
    ${({ first }) => {
      if (first) {
        return css`
          position: absolute;
          top: -2rem;
          margin: 0;
          font-weight: 700;
        `
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
}

const StyledItemAddon = styled.span`
  ${mixin.inlineFlexCenter}
  flex-direction: column;
  ${mixin.padding.all(1)}
  min-width: 2rem;
  background-color: ${color.compute(color.bg.light).alpha(0.5).string()};
`

// RepeaterItem styles
export const StyledItem = {
  Wrapper: styled.div`
    background-color: ${color.compute(color.white).alpha(0.5).string()};
    border: solid ${color.border.base};
    border-width: 1px 1px 0 1px;
    border-radius: 0.325rem;
    box-shadow: inset 1px 1px 2px 0 rgba(255, 255, 255, 0.5),
      inset -1px -1px 2px 0 rgba(0, 0, 0, 0.25);
    overflow: hidden;

    display: flex;
    align-items: stretch;
    width: 100%;

    &:last-of-type {
      border-bottom-width: 1px;
    }
  `,
  Group: styled.div`
    // background-color: ${color.bg.body};
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
}
