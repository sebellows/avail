/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, SVGAttributes } from 'react'
import {
  motion,
  MotionProps,
  MotionStyle,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { IconProps } from './Icon'
import { mixin } from '../../core/style'
import { useTheme } from '../../ThemeContext'
import { classNames, Color } from '../../core/utils'

export interface CheckmarkIconProps
  extends Omit<IconProps, 'children' | 'pathLength' | 'opacity'>,
    Pick<MotionStyle, 'pathLength'> {
  checked?: boolean
  opacity?: MotionValue<number>
  pathLength?: MotionValue<number>
}

type UnionMotionProps<T, P> = MotionProps & Omit<P, keyof T>

const CheckboxIcon = forwardRef<SVGSVGElement, CheckmarkIconProps>(
  (
    {
      checked: initialChecked,
      stroke = 'rgba(0, 0, 0, 0.2)',
      strokeWidth = 2,
      fill,
      filled,
      size = 24,
      ...props
    },
    ref,
  ) => {
    const [checked, setIsChecked] = React.useState(initialChecked)
    const pathLength = useMotionValue(0)
    const opacity = useTransform(pathLength, [0.05, 0.15], [Number(checked), Number(!checked)])

    const offset = strokeWidth * 3
    const squareProps = {
      width: Number(+size - offset),
      height: Number(+size - offset),
      x: strokeWidth,
      y: strokeWidth,
      rx: strokeWidth * 2,
      fill: 'transparent',
      stroke,
      strokeWidth,
      pointerEvents: 'none',
    }
    const checkmarkProps: any = {
      d: 'm20.75,6.705l-12,12l-5.5,-5.5l1.41,-1.41l4.09,4.08l10.59,-10.58l1.41,1.41z',
      stroke: 'none',
      strokeWidth: 0,
      strokeLinecap: 'round' as any,
      strokeLinejoin: 'round' as any,
      style: { pathLength, opacity },
      pointerEvents: 'none',
    }

    const boxVariants = {
      hover: { scale: 1.05, strokeWidth: 3 },
      pressed: { scale: 0.95, strokeWidth: 1.5 },
      checked: { stroke: fill, fill },
      unchecked: { stroke: fill, strokeWidth },
    }

    const tickVariants = {
      pressed: (checked: boolean) => ({ pathLength: checked ? 0.85 : 0.2 }),
      checked: { pathLength: 1 },
      unchecked: { pathLength: 0, fill: 'none' },
    }

    return (
      <motion.svg
        initial={false}
        animate={checked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
        width="440"
        height="440"
        onClick={() => setIsChecked(!checked)}
      >
        <motion.rect id="checkbox-box" {...squareProps} variants={boxVariants} />
        <motion.filter id="svg_blur_1">
          <motion.feGaussianBlur stdDeviation="0.5" in="SourceGraphic" />
        </motion.filter>
        <motion.path
          {...checkmarkProps}
          filter="url(#svg_blur_1"
          fill="rgba(0, 0, 0, .4)"
          transform="translate(0 1)"
          variants={tickVariants}
          custom={checked}
        />
        <motion.path {...checkmarkProps} fill={stroke} variants={tickVariants} custom={checked} />
      </motion.svg>
    )
  },
)

CheckboxIcon.displayName = 'CheckboxIcon'

export { CheckboxIcon }
