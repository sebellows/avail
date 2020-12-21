import { MotionStyle, MotionValue } from 'framer-motion'

export interface CheckmarkIconProps extends Avail.Control, Pick<MotionStyle, 'pathLength'> {
  // checked?: boolean
  inline?: boolean
  child?: any
  size?: number
  opacity?: MotionValue<number>
  pathLength?: MotionValue<number>
  strokeWidth?: number
}

export interface ToggleControlProps extends Avail.Control {
  inline?: boolean
  child?: any
  size?: number
}
