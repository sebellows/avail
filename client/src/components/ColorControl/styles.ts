import styled from 'styled-components';
import { Color } from '../../core/utils';

import { Control } from '../Control';
import { FormControlProps } from '../../core/contracts';
import { color, control, mixin, transition } from '../../core/style';

interface StyledProps {
  colorValue?: string;
}

export const Styled = {
  Control: styled(Control)<FormControlProps>`
    padding: 0.3125rem;

    &::-webkit-color-swatch {
      border-color: ${control.borderColor};
    }

    &:hover ~ .color-control-overlay {
      mix-blend-mode: ${({ value }) => (Color(value).isDark() ? 'overlay' : 'exclusion')};
    }
  `,
  Overlay: styled.div<StyledProps>`
    ${mixin.flexCenter}
    position: absolute;
    top: 0.25rem;
    left: 0;
    width: 100%;
    height: ${control.height};
    z-index: 1;
    color: ${({ colorValue }) => (Color(colorValue).isDark() ? color.text.light : color.text.dark)};
    pointer-events: none;
    transition: mix-blend-mode ${transition.duration.easeIn} ${transition.timing.easeIn};
  `,
};
