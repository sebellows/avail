import styled, { keyframes } from 'styled-components';
import {
  color,
  control,
  mixin,
  radius,
  shadow,
  spacers,
  zIndexes,
  transition,
} from '../../core/style';
import { Control } from '../Control';

const dropdownEnter = keyframes`
  from {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, -16px, 0);
    opacity: 1;
  }
`;

const dropdownLeave = keyframes`
  from {
    transform: translate3d(0, -16px, 0);
    opacity: 1;
  }

  to {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
`;

interface WrapperProps {
  open?: boolean;
}

export const Styled = {
  /**
   * Datalist Form Field (i.e., autocomplete, typeahead)
   */
  Wrapper: styled.div<WrapperProps>`
    background-color: ${color.bg.body};
    background-clip: padding-box;
    border-radius: calc(${radius.base} / 2);
    box-shadow: none;
    color: ${control.color};
    display: block;
    width: 100%;
    max-width: 500px;
    height: calc(1.5em + 0.75rem + 2px);
    position: relative;
    z-index: ${(props) => (props.open ? 200 : 100)};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    user-select: none;

    &:focus {
      outline: none;
    }

    /* Selected "option" */
    .is-selected {
      background-color: ${color.bg.hovered};
    }
  `,

  /** Form group */
  Field: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  `,

  /** Color input */
  ColorControl: styled.div`
    position: relative;
    // padding-bottom: calc(1.5em + 0.75rem + 2px);
    width: 3rem;
  `,
  Target: styled.div`
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: calc(1.5em + 0.75rem);
    line-height: 1;
    background-clip: content-box;
    border: 1px solid ${control.borderColor};
    box-shadow: inset 0 0 0 5px var(--white), inset 0 0 0 6px rgba(0, 0, 0, 0.2), ${shadow[0]};
    box-sizing: content-box;
    z-index: 1;
    pointer-events: none;
  `,
  Input: styled.input`
    ${mixin.cover}
    opacity: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  `,

  /** Form control */
  Control: styled(Control)` {
    border-color: rgba(0, 0, 0, 0.03125);
    border-radius: 0 calc(${radius.base} - 1px) calc(${radius.base} - 1px) 0;
    flex: 1 1;
  `,

  /* Options */
  Panel: styled.div`
    border-radius: ${radius.base};
    box-shadow: ${shadow[1]}, ${shadow[2]}, ${shadow[3]};
    position: absolute;
    top: calc(1.5em + 0.75rem + 2px);
    left: 3.25rem;
    right: 0;
    overflow: hidden;
    max-height: 240px;
    background: ${color.bg.body};
    visibility: hidden;
    transform-origin: 50% 24px 0;
    overflow: hidden;
    overflow-y: auto;

    &.is-active {
      transform: ${mixin.hardwareAccelerate};
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
    padding: 0 ${spacers[3]};

    &:hover {
      background-color: ${color.bg.hovered};
    }

    &.is-focused {
      background-color: ${color.bg.focused};
    }
  `,

  /* Display the value of an option in `colorpicker`. */
  PreviewBox: styled.div`
    border: 1px solid ${control.borderColor};
    box-shadow: ${shadow[0]};
    display: none;
    line-height: 1;
    margin-right: ${spacers[2]};
    padding: ${spacers[1]};
    position: relative;
    top: -3px;
    vertical-align: middle;

    &[style] {
      display: inline-block;
    }
    &[style*='background-color'] {
      background-clip: content-box;
      box-shadow: inset 0 0 0 5px var(--white), inset 0 0 0 6px rgba(0, 0, 0, 0.2), ${shadow[0]};
      box-sizing: content-box;
      border-radius: 50%;
      height: 1rem;
      width: 1rem;
    }
  `,
};
