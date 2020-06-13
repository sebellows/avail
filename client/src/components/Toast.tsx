import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import { toREM, font, color, mixin } from '../core/style';

const Toast = styled(ToastContainer).attrs({
  toastClassName: 'toast',
})<{ variant?: string }>`
  .toast {
    background-color: ${({ variant = 'danger' }) => color[variant]};
    color: ${({ variant = 'danger' }) => mixin.invert(color[variant])}
    font-family: ${font.family.base};
    letter-spacing: ${toREM(0.5)};
    font-size: ${font.sizes.base};
  }
`;

Toast.displayName = 'Toast';

export { Toast };
