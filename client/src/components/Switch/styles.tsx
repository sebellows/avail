import styled from 'styled-components'
import { Control } from '../Control'
import { color, font, mixin, radius, shadow, toREM } from '../../core/style'
import { SwitchProps } from './props'

const SWITCH_BAR_WIDTH = 40
const SWITCH_BAR_HEIGHT = 16
const TOGGLE_SIZE = 24
const TOGGLE_ICON_SIZE = 16
const TOGGLE_OFFSET = TOGGLE_SIZE - TOGGLE_ICON_SIZE // ~8

export const Styled = {
  Wrapper: styled.div`
    display: inline-block;
    height: ${toREM(TOGGLE_SIZE + TOGGLE_OFFSET)};
    white-space: nowrap;
  `,
  Label: styled.label`
    display: flex;
    flex: 1;
    align-items: center;
    height: inherit;
    padding: 0 ${toREM(TOGGLE_OFFSET / 2)}
    cursor: pointer;
  `,
  Bar: styled.div<SwitchProps>`
    order: ${({ alignLabel }) => (alignLabel === 'right' ? '2' : '1')};
    position: relative;
    width: ${toREM(SWITCH_BAR_WIDTH)};
    height: ${toREM(SWITCH_BAR_HEIGHT)};
    flex-shrink: 0;
    background-color: ${({ checked }) =>
      checked ? mixin.rgba(color.magenta, 0.54) : mixin.rgba(color.black, 0.4)};
    border-radius: ${radius.pill};
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.12),
      inset -1px -1px 0 0 rgba(255, 255, 255, 0.2);
    margin-bottom: 0;
    ${mixin.transition({ dur: '80ms', timing: 'linear', delay: '50ms' }, 'background-color')}
  `,
  Control: styled(Control)`
    position: absolute;
    opacity: 0;
  `,
  Toggle: styled.div<SwitchProps>`
    position: absolute;
    top: -${toREM(TOGGLE_OFFSET / 2)};
    left: 0;
    z-index: 1;
    ${mixin.inlineFlexCenter}
    background-color: ${({ checked }) => (checked ? color.magenta : color.light)};
    ${mixin.borderRadius('circle')}
    box-shadow: ${shadow.elevation(1)};
    color: ${({ checked }) => (checked ? color.light : color.text.body)};
    ${mixin.size(toREM(TOGGLE_SIZE))}
    transform: ${({ checked }) => (checked ? 'translate3d(1rem, 0, 0)' : 'translate3d(0, 0, 0)')};
    ${mixin.transition({ dur: '80ms', timing: 'linear', delay: '50ms' }, 'transform')}
    pointer-events: none;
  `,
  ToggleInner: styled.span`
    position: relative;
    line-height: 1;
  `,
  Content: styled.div<SwitchProps>`
    order: ${({ alignLabel }) => (alignLabel === 'right' ? '1' : '2')};
    ${mixin.margin.x(2)}
    font-size: ${font.sizes.sm};
    line-height: 1.5;
  `,
}
