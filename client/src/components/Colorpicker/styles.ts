import styled, { keyframes, css } from 'styled-components'
import {
  calcControlHeight,
  color,
  control,
  mixin,
  radius,
  shadow,
  zIndexes,
  transition,
  toREM,
} from '../../core/style'
import { FormControlProps } from '../../core/contracts'
import { StyledControl, StyledBaseInput } from '../Control'

const dropdownEnter = keyframes`
  from {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, -16px, 0);
    opacity: 1;
  }
`

const dropdownLeave = keyframes`
  from {
    transform: translate3d(0, -16px, 0);
    opacity: 1;
  }

  to {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
`

const DialogControl = styled.div`
  display: block;
  position: absolute;
  top: 0;
  padding: 0.375rem;
`

interface WrapperProps {
  open?: boolean
}

/**
 * Datalist Form Field (i.e., autocomplete, typeahead)
 */
export const Styled = {
  Wrapper: styled.div<WrapperProps>`
    display: block;
    width: 100%;
    max-width: 500px;
    height: ${control.height};
    position: relative;
    ${(props) =>
      props &&
      props.open &&
      css`
        z-index: 100;
      `};
    user-select: none;

    &:focus {
      outline: none;
    }
  `,

  /** Form group */
  Field: styled(StyledControl)`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    position: relative;
    padding: 0;
  `,

  /** Color input */
  ColorControl: styled.div`
    position: relative;
    width: 3rem;

    &::before {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='100%25' y2='100%25' stroke='%23FF0000' stroke-width='3'%3E%3C/line%3E%3C/svg%3E");
      position: absolute;
      top: 7px;
      left: 7px;
      right: 5px;
      bottom: 6px;
    }
  `,
  ColorTarget: styled.div<FormControlProps>`
    position: absolute;
    top: -${control.borderWidth};
    left: -${control.borderWidth};
    width: 100%;
    height: ${toREM(calcControlHeight({ borderWidth: 0 }))};
    line-height: 1;
    background-clip: content-box;
    background-color: ${({ value }) => value};
    border: 1px solid ${control.borderColor};
    border-radius: ${radius.sm} 0 0 ${radius.sm};
    box-shadow: inset 0 0 0 5px ${color.bg.body}, inset 0 0 0 6px ${mixin.rgba(color.black, 0.2)},
      1px 0 1px 0 ${color.compute(color.black).alpha(0.12).string()};
    box-sizing: content-box;
    z-index: 1;
    pointer-events: none;
  `,
  ColorInput: styled.input`
    ${mixin.cover}
    ${mixin.size('100%')}
    opacity: 0;
    ${mixin.appearanceNone}
  `,

  /** Form control */
  Control: styled(StyledBaseInput)` {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0 calc(${radius.base} - 1px) calc(${radius.base} - 1px) 0;
    flex: 1 1;
  `,

  /* Options */
  Panel: styled.div`
    border-radius: ${radius.base};
    // box-shadow: ${shadow[1]}, ${shadow[2]}, ${shadow[3]};
    box-shadow: ${shadow.elevation(4)};
    position: absolute;
    top: calc(1.5em + 0.75rem + 2px);
    left: 0;
    right: 0;
    overflow: hidden;
    max-height: 240px;
    background: ${color.bg.body};
    visibility: hidden;
    transform-origin: 50% 24px 0;
    overflow: hidden;
    overflow-y: auto;

    &.is-active {
      ${mixin.hardwareAccelerate};
      visibility: visible;
      z-index: ${zIndexes.dropdown};
    }

    &.colorpicker-panel-enter {
      animation: ${dropdownEnter} ${transition.duration.easeIn} ${transition.timing.easeIn};
    }
    &.colorpicker-panel-leave {
      animation: ${dropdownLeave} ${transition.duration.easeOut} ${transition.timing.easeOut};
    }
  `,

  Options: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  `,
  Option: styled.li`
    cursor: pointer;
    line-height: 2.5em;
    height: 2.5em;
    ${mixin.padding.all(0, 3)}

    &:hover,
    &.is-focused {
      background-color: ${color.bg.hovered};
    }

    /* Selected "option" */
    &.is-selected {
      background-color: ${color.bg.hovered};
      color: ${color.text.medium};
    }
  `,

  /* Display the value of an option in `colorpicker`. */
  PreviewBox: styled.div`
    border: 1px solid ${control.borderColor};
    ${mixin.shadow(0)};
    display: none;
    line-height: 1;
    ${mixin.margin.right(2)}
    ${mixin.padding.all(1)}
    position: relative;
    top: -3px;
    vertical-align: middle;

    &[style] {
      display: inline-block;
    }
    &[style*='background-color'] {
      background-clip: content-box;
      box-shadow: inset 0 0 0 5px var(--white), inset 0 0 0 6px rgba(0, 0, 0, 0.2),
        ${shadow.levels[0]};
      box-sizing: content-box;
      border-radius: 50%;
      height: 1rem;
      width: 1rem;
    }
  `,
  Dialog: {
    Wrapper: styled.div`
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 1040;
      border-radius: 0.5rem;
      box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.2);
    `,
    Inner: styled.div`
      display: flex;
      align-items: stretch;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0.375rem;
    `,
    Crosshair: styled.div`
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 20px;
      width: 20px;
    `,
    Skein: styled.div`
      background: rgba(255, 0, 0, 0.2);
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: crosshair;
      pointer-events: none;
    `,
    /* Controls for Hue, Lightness, and Alpha */
    HueControl: styled(DialogControl)`
      left: 0;
      width: 75%;
    `,
    LightnessControl: styled(DialogControl)`
      left: 75%;
      width: 12.5%;
    `,
    AlphaControl: styled(DialogControl)`
      left: 87.5%;
      width: 12.5%;
    `,
    Slider: styled.div`
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    `,
    SliderButton: styled.div`
      position: absolute;
      left: -4px;
      top: -4px;
    `,
    SliderButtonInner: styled.div`
      position: relative;
      padding: 8px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 3px solid black;
        z-index: 1;
        outline: 1px solid white;
      }
      &::after {
        content: '';
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        border: 1px solid white;
        z-index: 2;
      }
    `,
    Close: styled.button`
      display: none;
      position: absolute;
      left: 12px;
      bottom: 12px;
      padding: 0px 15px;
      max-width: 317px;
      overflow: hidden;
      height: 18px;
      white-space: nowrap;
      border: 1px solid rgb(153, 153, 153);
      color: rgb(240, 240, 240);
      font: 12px sans-serif;
      text-align: center;
      cursor: pointer;
    `,
  },
}
