import styled, { css } from 'styled-components'

import { font, mixin, color, toREM, shadow } from '../../core/style'

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
  position: relative;

  &::before {
    content: '';
    ${mixin.cover}
    background-color: ${({ theme }) => color.alpha(theme.bg, 0.5)};
    mix-blend-mode: overlay;
  }
`

// RepeaterItem styles
export const StyledItem = {
  Wrapper: styled.div`
    border: 1px solid ${color.border.base};
    border-radius: 0.325rem;

    display: flex;
    align-items: stretch;
    position: relative;
    width: 100%;
    overflow: hidden;

    &:last-of-type {
      border-bottom-width: 1px;
    }
  `,
  Group: styled.div`
    border: 0 solid ${color.border.base};
    display: flex;
    flex: 1;
    align-items: center;
    ${mixin.padding.all(1, 2)}
  `,
  Skein: styled.div`
    ${mixin.cover}
    background-color: ${({ theme }) => theme.bg};
    mix-blend-mode: overlay;
    box-shadow: ${shadow.bevel(1)};
    border: 2px solid;
    border-color: ${color.white} ${color.black} ${color.black} ${color.white};
    filter: blur(4px) opacity(0.25);
    pointer-events: none;
  `,
  Prepend: StyledItemAddon,
  Append: styled(StyledItemAddon)`
    justify-content: space-between;
  `,
}
