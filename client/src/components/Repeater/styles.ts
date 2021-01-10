import styled from 'styled-components'

import { font, mixin, toREM } from '../../core/style'

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
    display: none;
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
    ${({ theme }) => mixin.color(mixin.alpha(theme.bg, 0.5))}
    mix-blend-mode: overlay;
  }
`

// RepeaterItem styles
export const StyledItem = {
  Wrapper: styled.div`
    ${({ theme }) => mixin.border({ color: theme.borderColor })}
    border-bottom-width: 0;
    ${mixin.flex({ align: 'stretch' })}
    position: relative;
    width: 100%;
    &:first-of-type {
      ${mixin.borderRadius('base', 'base', 0, 0)}

      label {
        display: block;
        position: absolute;
        top: -2rem;
        margin: 0;
        font-weight: 700;
      }
    }
    &:last-of-type {
      ${mixin.borderRadius(0, 0, 'base', 'base')}
    }
    &:not(:first-of-type):not(:last-of-type) {
      ${mixin.borderRadius(0)}
    }
    &:last-of-type {
      border-bottom-width: 1px;
    }
  `,
  Group: styled.div`
    ${mixin.flex({ align: 'center' })}
    flex: 1;
    ${mixin.padding.all(1, 2)}
  `,
  Skein: styled.div`
    ${mixin.cover}
    background-color: ${({ theme }) => theme.bg};
    mix-blend-mode: overlay;
    ${mixin.boxShadow.bevel(1)}
    ${mixin.border({ width: '2px' })}
    filter: blur(4px) opacity(0.25);
    pointer-events: none;
  `,
  Prepend: StyledItemAddon,
  Append: styled(StyledItemAddon)`
    justify-content: space-between;
  `,
}
