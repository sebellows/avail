/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { mixin } from '../../core/style'
import { Control } from '../Control'
import { CheckmarkIconProps } from './props'

export const Styled = {
  Label: styled(motion.label)<CheckmarkIconProps>`
    position: relative;
    ${mixin.flex({ inline: true, align: 'center' })}
    vertical-align: middle;
    margin-bottom: 0;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    ${({ inline }) => {
      if (inline) {
        return css`
          :not(:last-of-type) {
            ${mixin.margin.right(2)}
          }
        `
      }
    }}
  `,
  Control: styled(Control)<CheckmarkIconProps>`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  `,
  Container: styled.div<Pick<CheckmarkIconProps, 'size'>>`
    display: inline-block;
    flex-shrink: 0;
    ${({ size }) => mixin.size(size)}
    line-height: 0;
    margin-right: 0.3125rem;
    order: 0;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
  `,
  Content: styled.div`
    font-weight: normal;
    position: relative;
    user-select: auto;
  `,
}
