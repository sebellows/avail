import styled from 'styled-components'
import { Control } from '../Control'
import { mixin } from '../../core/style'
import { SwitchProps } from './props'
import { motion } from 'framer-motion'

export const Styled = {
  Label: styled(motion.label)<SwitchProps>`
    position: relative;
    ${mixin.flex({ inline: true, align: 'center' })}
    flex: 1;
    white-space: nowrap;
    cursor: pointer;
  `,
  Bar: styled(motion.div)<SwitchProps>`
    order: ${({ alignLabel }) => (alignLabel === 'right' ? '2' : '1')};
    position: relative;
    flex-shrink: 0;
    ${mixin.borderRadius('pill')}
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.12),
      inset -1px -1px 0 0 rgba(255, 255, 255, 0.2);
  `,
  Control: styled(Control)`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  `,
  Content: styled.div<SwitchProps>`
    order: ${({ alignLabel }) => (alignLabel === 'right' ? '1' : '2')};
    ${({ alignLabel }) => (alignLabel === 'right' ? mixin.margin.right(2) : mixin.margin.left(2))}
    line-height: 1.5;
  `,
}
