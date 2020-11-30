/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { classNames, Color } from '../../core/utils'
import { CheckmarkIconProps } from './CheckboxIcon'

// const tickVariants = {
//   pressed: (checked: boolean) => ({ pathLength: checked ? 0.85 : 0.2 }),
//   checked: (fill: any) => ({ scale: 1, fill }),
//   unchecked: { scale: 0.5, fill: 'transparent' },
// }

// const boxVariants = {
//   hover: (strokeWidth: unknown) => ({ scale: 1.05, strokeWidth: Number(strokeWidth) }),
//   pressed: (strokeWidth: unknown) => ({ scale: 0.95, strokeWidth: Number(+strokeWidth * 0.65) }),
//   checked: (stroke: any, fill: any) => ({ stroke: stroke as string, fill }),
//   unchecked: (stroke: any, strokeWidth: unknown) => {
//     console.log('unchecked', stroke, strokeWidth)
//     return {
//       stroke: stroke as string,
//       strokeWidth: Number(strokeWidth),
//     }
//   },
// }

/**
 * Based off of example from Framer-Motion
 * @see {@link https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx}
 */

const RadioIcon = forwardRef<SVGSVGElement, CheckmarkIconProps>(
  ({ checked: initialChecked, stroke, strokeWidth = 2, fill, filled, size, ...props }, ref) => {
    const [checked, toggle] = React.useState(initialChecked)

    React.useEffect(() => {
      console.log('RadioIcon', fill, stroke, strokeWidth)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <motion.svg
        ref={ref}
        className={classNames('icon', `icon-radio-button`, !!props?.className && props?.className, {
          'is-filled': !!filled,
        })}
        initial={false}
        animate={checked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
        width={size}
        height={size}
        onClick={() => toggle(!checked)}
      >
        <motion.circle
          id="radio-outline"
          cx={+size / 2}
          cy={+size / 2}
          r={+size / 2 - strokeWidth}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
          variants={{
            hover: { scale: 1.05, strokeWidth: Number(strokeWidth) },
            pressed: {
              scale: 0.95,
              strokeWidth: Number(+strokeWidth * 0.65),
            },
            checked: { stroke: fill },
            unchecked: {
              stroke: stroke,
              strokeWidth: Number(strokeWidth),
            },
          }}
          custom={checked}
        ></motion.circle>
        <motion.circle
          id="radio-checked"
          cx={+size / 2}
          cy={+size / 2}
          r={+size / 2 - strokeWidth * 2}
          fill="none"
          stroke="none"
          strokeWidth={0}
          variants={{
            checked: { scale: 0.85, fill },
            unchecked: { scale: 0.5 },
          }}
        ></motion.circle>
      </motion.svg>
    )
  },
)

RadioIcon.displayName = 'RadioIcon'

export { RadioIcon }
