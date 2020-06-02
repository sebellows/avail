import styled from 'styled-components';
import { mixin, transition, zIndexes } from '../../core/style';
import { FocusTrap } from '../FocusTrap';

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const NavItem = styled.a`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  padding: 0;
  opacity: 0.5;
  pointer-events: auto;
`;

export const Styled = {
  Backdrop: styled(ModalBase)`
    background: rgba(255, 255, 255, 0.9);
    animation: fade-in;
    animation-duration: ${transition.duration.easeOut};
    animation-timing-function: ${transition.timing.easeOut};
  `,
  Modal: styled(ModalBase)`
    ${mixin.flexCenter}
    z-index: ${zIndexes.modal};
  `,
  Content: styled(FocusTrap)`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: calc(var(--modal-zindex) + 1);
    transform: translate3d(0, 0, 0);
    ${mixin.transition({ dur: 'easeIn', timing: 'easeIn' })}

    @media (min-width: 960px) {
      position: absolute;
      left: 50%;
      max-width: 840px;
      transform: translate3d(-50%, 0, 0);
    }
  `,
  Nav: styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    pointer-events: none;
  `,
  Prev: styled(NavItem)`
    left: 0;
  `,
  Next: styled(NavItem)`
    right: 0;
  `,
};
