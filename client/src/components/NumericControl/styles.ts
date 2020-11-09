import styled from 'styled-components'
import { StyledControl } from '../Control'
import { control, font, mixin, normalizeUnit, toRatio, toREM } from '../../core/style'

const controlBorderWidth = normalizeUnit(control.borderWidth)
const controlInnerHeight = normalizeUnit(control.height) - controlBorderWidth
const numberSpinnerHeight = toREM(normalizeUnit(control.height))
const buttonBorderRadius = toREM(normalizeUnit(control.borderRadius) - 1)

const StyledButton = styled.button`
  position: relative;
  ${mixin.inlineFlexCenter}
  ${mixin.size(numberSpinnerHeight)}
  ${({ theme }) => mixin.buttonVariant(theme.primary)}
  padding: 0;
  border-radius: 0;
  flex: none;
  font-family: ${font.family.base};
  font-size: ${font.sizes.sm};
  font-weight: 700;
  line-height: ${toRatio(controlInnerHeight, font.sizes.sm)};
  text-align: center;
  z-index: 1;
  cursor: pointer;
  user-select: none;

  &:hover {
    & ~ .input {
      border-color: ${control.active.borderColor};
    }
  }
  &:active,
  &:focus {
    & ~ .input {
      box-shadow: ${control.active.boxShadow};
    }
  }
`

export const Styled = {
  Wrapper: styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: ${control.height};
    border-radius: ${control.borderRadius};
    outline: none;
  `,
  Control: styled(StyledControl)`
    order: 2;
    flex: 1;
    border-left-width: 0 !important;
    border-right-width: 0 !important;
    text-align: center;
    // Firefox-specific hack
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      ${mixin.appearanceNone}
      margin: 0;
    }
  `,
  IncrementButton: styled(StyledButton)`
    order: 3;
    border-left-width: ${control.borderWidth};
    border-top-right-radius: ${buttonBorderRadius};
    border-bottom-right-radius: ${buttonBorderRadius};
    right: ${control.borderWidth};
  `,
  DecrementButton: styled(StyledButton)`
    order: 1;
    border-right-width: ${control.borderWidth};
    border-top-left-radius: ${buttonBorderRadius};
    border-bottom-left-radius: ${buttonBorderRadius};
    left: ${control.borderWidth};
  `,
}
