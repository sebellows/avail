/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion, Transition, SVGMotionProps } from 'framer-motion';

interface SwitchIconProps extends SVGMotionProps<any> {
  checked?: boolean;
  color?: string;
  size?: number;
  strokeWidth?: string | number;
  transition?: Transition;
  lineProps?: Record<string, any>;
}

export const SwitchIcon = ({
  checked = false,
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  transition = null,
  lineProps = {},
  ...props
}: SwitchIconProps) => {
  const variant = checked ? 'checked' : 'unchecked';
  const lineStart = size / 4; // 6 if `size` equals 24
  const lineEnd = size * 0.75; // 18 if `size` equals 24
  const left = {
    checked: {
      rotate: -360,
      pathLength: 0,
    },
    unchecked: {
      rotate: 0,
      pathLength: 1,
    },
  };
  const right = {
    checked: {
      rotate: -360,
    },
    unchecked: {
      rotate: 0,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    vectorEffect: 'non-scaling-stroke',
    initial: 'unchecked',
    animate: variant,
    transition,
    style: { originX: '50%', originY: '50%' },
    ...lineProps,
  };

  const leftCoords = {
    ...lineProps,
    x1: checked ? lineStart - (strokeWidth as number) : lineEnd, // 4
    x2: checked ? lineStart + (strokeWidth as number) : lineStart, // 8
    y1: checked ? lineEnd - lineStart : lineEnd, // 14
    y2: checked ? lineEnd : lineStart, // 18
  };

  const rightCoords = {
    ...lineProps,
    x1: checked ? lineEnd + (strokeWidth as number) : lineEnd, // 20
    x2: checked ? lineStart + (strokeWidth as number) : lineStart, // 8
    y1: checked ? lineStart : lineStart, // 6
    y2: checked ? lineEnd : lineEnd, // 18
  };

  return (
    <motion.svg
      initial={false}
      animate={variant}
      viewBox={`0 0 ${size} ${size}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={size}
      height={size}
      {...props}
    >
      <motion.line {...leftCoords} variants={left}></motion.line>
      <motion.line {...rightCoords} variants={right}></motion.line>
    </motion.svg>
  );
};
