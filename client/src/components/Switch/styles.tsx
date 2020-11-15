import styled from 'styled-components'
import { Control } from '../Control'
import { mixin, toREM } from '../../core/style'
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
    ${({ checked, theme }) =>
      mixin.bgColor(checked ? mixin.rgba(theme.primary, 0.54) : mixin.rgba(theme.fg, 0.4))}
    ${mixin.borderRadius('pill')}
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.12),
      inset -1px -1px 0 0 rgba(255, 255, 255, 0.2);
    margin-bottom: 0;
    ${mixin.transition({
      property: 'background-color',
      duration: '80ms',
      timing: 'linear',
      delay: '50ms',
    })}
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
    ${({ checked, theme }) =>
      mixin.bgColor(checked ? mixin.rgba(theme.primary, 0.54) : mixin.rgba(theme.bg, 0.4))}
    ${({ checked, theme }) =>
      mixin.color(checked ? mixin.rgba(theme.bg, 0.54) : mixin.rgba(theme.fg, 0.4))}
    ${mixin.borderRadius('circle')}
    ${mixin.boxShadow.elevation(1)}
    ${mixin.size(toREM(TOGGLE_SIZE))}
    transform: ${({ checked }) => (checked ? 'translate3d(1rem, 0, 0)' : 'translate3d(0, 0, 0)')};
    ${mixin.transition({
      property: 'transform',
      duration: '80ms',
      timing: 'linear',
      delay: '50ms',
    })}
    pointer-events: none;
  `,
  ToggleInner: styled.span`
    position: relative;
    line-height: 1;
  `,
  Content: styled.div<SwitchProps>`
    order: ${({ alignLabel }) => (alignLabel === 'right' ? '1' : '2')};
    ${mixin.margin.x(2)}
    ${mixin.font.size('sm')}
    line-height: 1.5;
  `,
}
