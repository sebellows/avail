import styled from 'styled-components';
import { mixin, transition, zIndexes, toREM, spacers } from '../../core/style';
import { FocusTrap } from '../FocusTrap';

const NAV_ITEM_WIDTH = 60;

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
  width: ${toREM(NAV_ITEM_WIDTH)};
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
    display: flex;
    justify-content: center;
    z-index: ${zIndexes.modal};

    @media (min-width: 600px) {
      align-items: center;
    }
  `,
  Content: styled(FocusTrap)`
    position: relative;
    top: 0;
    left: 0;
    width: calc(100% - ${toREM(spacers.base * 2)});
    z-index: ${zIndexes.modal + 1};
    transform: translate3d(0, 0, 0);
    ${mixin.transition({ dur: 'easeIn', timing: 'easeIn' })}

    @media (min-width: 600px) {
      max-width: calc(100% - ${toREM(NAV_ITEM_WIDTH * 2)});
    }

    @media (min-width: 960px) {
      position: absolute;
      left: 50%;
      max-width: 840px;
      transform: translate3d(-50%, 0, 0);
    }
  `,
  Nav: styled.nav`
    position: fixed;
    top: calc(100vh - ${toREM(NAV_ITEM_WIDTH)});
    left: 0;
    width: 100%;
    height: ${toREM(NAV_ITEM_WIDTH)};
    list-style: none;
    pointer-events: none;

    @media (min-width: 600px) {
      top: 0;
      height: 100%;
    }

    @media (hover: hover) {
      max-width: calc(100% - 15px);
    }
  `,
  Prev: styled(NavItem)`
    left: 0;
  `,
  Next: styled(NavItem)`
    right: 0;
  `,
};
