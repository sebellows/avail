import styled, { keyframes, css } from 'styled-components'
import { calcControlHeight, color, control, mixin, radius, toREM } from '../../core/style'
import { Control } from '../Control'

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
  Field: styled(Control)`
    ${mixin.flex({ align: 'stretch', justify: 'space-between' })}
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
  ColorTarget: styled.div<Avail.Control>`
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: ${toREM(calcControlHeight({ borderWidth: 0 }))};
    line-height: 1;
    background-clip: content-box;
    ${({ value }) => mixin.bgColor(value as string)}
    border: 1px solid ${({ theme }) => theme.control.borderColor};
    ${mixin.borderRadius('sm', 0, 0, 'sm')}
    box-shadow: ${({ theme }) => `inset 0 0 0 5px ${theme.bg}, inset 0 0 0 6px ${mixin.rgba(
      theme.fg,
      0.2,
    )},
      1px 0 1px 0 ${color.compute(theme.fg).alpha(0.12).string()}`};
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
  Control: styled(Control)` {
    background-color: transparent;
    border-color: transparent;
    ${mixin.borderRadius(0, `calc(${radius.base} - 1px)`, `calc(${radius.base} - 1px)`, 0)}
    flex: 1 1;
  `,

  /* Options */
  Panel: styled.div`
    ${mixin.borderRadius('base')}
    ${({ theme }) => mixin.bgColor(theme.bg)}
    ${mixin.boxShadow.elevation(4)}
    position: absolute;
    top: calc(1.5em + 0.75rem + 2px);
    left: 0;
    right: 0;
    overflow: hidden;
    max-height: 240px;
    visibility: hidden;
    transform-origin: 50% 24px 0;
    overflow: hidden;
    overflow-y: auto;

    &.is-active {
      ${mixin.hardwareAccelerate};
      ${mixin.zIndex('dropdown')}
      visibility: visible;
    }

    &.colorpicker-panel-enter {
      ${mixin.animation({ property: dropdownEnter, duration: 'easeIn', timing: 'easeIn' })}
    }
    &.colorpicker-panel-leave {
      ${mixin.animation({ property: dropdownLeave, duration: 'easeIn', timing: 'easeIn' })}
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
      ${({ theme }) => mixin.bgColor(theme.hover.bg)}
    }

    /* Selected "option" */
    &.is-selected {
      ${({ theme }) => mixin.bgColor(theme.hover.bg)}
      ${({ theme }) => mixin.color(theme.muted)}
    }
  `,

  /* Display the value of an option in `colorpicker`. */
  PreviewBox: styled.div`
    display: none;
    line-height: 1;
    position: relative;
    top: -3px;
    vertical-align: middle;
    ${({ theme }) => mixin.border({ color: theme.control.borderColor })}
    ${mixin.boxShadow.elevation(0)}
    ${mixin.margin.right(2)}
    ${mixin.padding.all(1)}

    &[style] {
      display: inline-block;
    }
    &[style*='background-color'] {
      background-clip: content-box;
      ${({ theme }) => css`
        box-shadow: inset 0 0 0 5px ${theme.bg}, inset 0 0 0 6px rgba(0, 0, 0, 0.2),
          0px 1px 3px 0px rgba(0, 0, 0, 0.2);
      `}
      box-sizing: content-box;
      ${mixin.borderRadius('circle')}
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
