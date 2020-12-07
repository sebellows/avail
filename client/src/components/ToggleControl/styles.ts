/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components'
import { Control } from '../Control'
import { mixin } from '../../core/style'
import { CheckmarkIconProps } from './props'

export const Styled = {
  Wrapper: styled.label<CheckmarkIconProps>`
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
    opacity: 0;
    ${mixin.cover}
    z-index: ${({ type }) => (type === 'radio' ? 1 : 'initial')};
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
    // pointer-events: none;
  `,
  Content: styled.div`
    font-weight: normal;
    position: relative;
    user-select: auto;
  `,
}
