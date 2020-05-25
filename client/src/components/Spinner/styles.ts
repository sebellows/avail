import styled, { keyframes } from 'styled-components';
import { color, mixin, transition } from '../../core/style';

const containerRotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const fillUnfillRotate = keyframes`
  12.5% {
    transform: rotate(135deg);
  } // 0.5 * ARCSIZE
  25% {
    transform: rotate(270deg);
  } // 1 * ARCSIZE
  37.5% {
    transform: rotate(405deg);
  } // 1.5 * ARCSIZE
  50% {
    transform: rotate(540deg);
  } // 2 * ARCSIZE
  62.5% {
    transform: rotate(675deg);
  } // 2.5 * ARCSIZE
  75% {
    transform: rotate(810deg);
  } // 3 * ARCSIZE
  87.5% {
    transform: rotate(945deg);
  } // 3.5 * ARCSIZE
  to {
    transform: rotate(1080deg);
  } // 4 * ARCSIZE
`;

const leftSpin = keyframes`
  from {
    transform: rotate(130deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(130deg);
  }
`;

const rightSpin = keyframes`
  from {
    transform: rotate(-130deg);
  }
  50% {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-130deg);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledCircle = styled.div`
  ${mixin.cover}
  height: 100%;
  border-width: 3px;
  border-style: solid;
  border-color: inherit;
  border-bottom-color: transparent !important;
  border-radius: 50%;
`;

export const Styled = {
  Wrapper: styled.div`
    display: inline-block;
    position: relative;
    width: 28px;
    height: 28px;
    border-color: ${color.primary};
    &.spinner-out {
      // duration: SHRINK_TIME
      animation: ${fadeOut} ${transition.duration.easeOut} ${transition.timing.fastOutSlowIn} both;
    }
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    border-color: inherit;
    // duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE))
    animation: ${containerRotate} 1568ms linear infinite;
  `,

  Layer: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    border-color: inherit;
    white-space: nowrap;
    font-size: 0px;
    /* durations: 4 * ARCTIME */
    animation: ${fillUnfillRotate} 5332ms ${transition.timing.fastOutSlowIn} infinite both;
  `,
  // Patch the gap that appear between the two adjacent div.circle-clipper while the
  // spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).
  Gap: styled.div`
    position: absolute;
    top: 0;
    left: 45%;
    width: 10%;
    height: 100%;
    overflow: hidden;
    border-color: inherit;
  `,
  GapCircle: styled(StyledCircle)`
    width: 1000%;
    left: -450%;
  `,
  Mask: styled.div`
    display: inline-block;
    position: relative;
    width: 50%;
    height: 100%;
    overflow: hidden;
    border-color: inherit;
  `,
  LeftMaskCircle: styled(StyledCircle)`
    border-right-color: transparent !important;
    transform: rotate(129deg);
    animation: ${leftSpin} 1333ms ${transition.timing.fastOutSlowIn} infinite both;
  `,
  RightMaskCircle: styled.div`
    left: -100%;
    border-left-color: transparent !important;
    transform: rotate(-129deg);
    animation: ${rightSpin} 1333ms ${transition.timing.fastOutSlowIn} infinite both;
  `,
};