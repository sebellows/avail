import { MotionStyle, MotionValue } from 'framer-motion'
import { ComponentType, InputHTMLAttributes } from 'react'
import { ComponentProps, FormControlProps, FormControlType } from '../../core/contracts'

export interface CheckmarkIconProps
  extends InputHTMLAttributes<FormControlType>,
    ComponentProps,
    Pick<MotionStyle, 'pathLength'> {
  as?: keyof JSX.IntrinsicElements | ComponentType<any>
  checked?: boolean
  inline?: boolean
  child?: any
  size?: number
  opacity?: MotionValue<number>
  pathLength?: MotionValue<number>
  strokeWidth?: number | string
}

export interface ToggleControlProps extends FormControlProps {
  inline?: boolean
  child?: any
  size?: number
}
