import styled from 'styled-components'
import { Color } from '../../core/utils'

import { Control } from '../Control'
import { control, mixin } from '../../core/style'

interface StyledProps {
  colorValue?: string
}

export const Styled = {
  Control: styled(Control)<Avail.Control>`
    padding: 0.3125rem;

    &::-webkit-color-swatch {
      ${({ theme }) => mixin.border({ color: theme.control.borderColor })}
    }

    &:hover ~ .color-control-overlay {
      mix-blend-mode: ${({ value }) => (Color(value).isDark() ? 'overlay' : 'exclusion')};
    }
  `,
  Overlay: styled.div<StyledProps>`
    ${mixin.flexCenter}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${control.height};
    z-index: 1;
    ${({ theme, colorValue }) => mixin.color(Color(colorValue).isDark() ? theme.bg : theme.fg)}
    pointer-events: none;
    ${mixin.transition({ property: 'mix-blend-mode', duration: 'easeIn', timing: 'easeIn' })}
  `,
}
