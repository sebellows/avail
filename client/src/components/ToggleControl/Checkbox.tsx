/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { useEnsuredRef } from '../../hooks'
import { Theme, useTheme } from '../../ThemeContext'
import { validFormProps, containerProps, Color, uuid } from '../../core/utils'

import { Styled } from './styles'
import { CheckmarkIconProps } from './props'

const Checkbox = forwardRef<HTMLLabelElement, CheckmarkIconProps>(
  (
    {
      checked: initialChecked,
      strokeWidth = 2.75,
      size = 24,
      inline = false,
      children,
      type = 'checkbox',
      onChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const [isChecked, setIsChecked] = useState(initialChecked)

    const inputID = props?.id ?? props?.name ?? 'avail-checkbox'
    const labelID = uuid(5, `${inputID}-`)

    const componentRef = useEnsuredRef<HTMLLabelElement>(ref)

    const inputRef = useRef(null)

    const htmlProps = containerProps(props)
    const formProps = validFormProps(props)
    const inputType = type === 'radio' ? type : 'checkbox'

    function handleChange(event: any) {
      setIsChecked(!isChecked)
      onChange?.(event)
      console.log('checkbox-handleChange', event.target.checked)
    }

    const offset = strokeWidth * 2
    const computedSize = size - offset

    const variants = {
      checked: {
        stroke: theme.control.checked,
        strokeDashoffset: 0,
      },
      unchecked: {
        stroke: Color(theme.control.checked).alpha(0).string(),
        strokeDashoffset: computedSize * 4,
      },
    }
    const boxVariants = {
      hover: { scale: 1.05, strokeWidth: Math.floor(strokeWidth * 1.2) },
      pressed: {
        scale: 0.95,
        stroke: theme.control.checked,
        strokeDashoffset: computedSize * 2,
        strokeWidth: Math.floor(strokeWidth * 0.9),
      },
      ...variants,
    }

    return (
      <Styled.Label
        ref={componentRef}
        {...htmlProps}
        inline={inline}
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
      >
        <Styled.Control
          ref={inputRef}
          {...formProps}
          type={inputType}
          aria-labelledby={labelID}
          aria-checked={isChecked}
          checked={isChecked}
          onChange={handleChange}
        />
        <Styled.Container className="toggle-container" size={size}>
          <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            pointerEvents="none"
          >
            <defs>
              <radialGradient id="radialGradient">
                <stop offset="10%" stopColor={theme.control.bg} />
                <stop offset="95%" stopColor={Color(theme.control.bg).darken(0.03).string()} />
              </radialGradient>
            </defs>
            <motion.rect
              id="checkbox-box"
              width={computedSize}
              height={computedSize}
              x={strokeWidth}
              y={strokeWidth}
              rx={strokeWidth * 2}
              fill="url(#radialGradient)"
              stroke={theme.control.borderColor}
              strokeWidth={strokeWidth}
              pointerEvents="none"
            />
            <motion.rect
              id="checkbox-outline"
              width={computedSize}
              height={computedSize}
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              rx={strokeWidth}
              fill="transparent"
              stroke={theme.control.checked}
              strokeWidth={strokeWidth}
              strokeDasharray={computedSize * 4}
              pointerEvents="none"
              variants={boxVariants}
              transition={{ strokeDashoffset: { type: 'spring', duration: 1 } }}
            />
            <motion.polyline
              points="6,11.939 10.636,16.727 17.242,6.545"
              fill="none"
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              stroke={theme.control.checked}
              strokeDasharray={computedSize * 4}
              variants={variants}
              transition={{
                strokeDashoffset: { type: 'spring', duration: 1 },
                stroke: { type: 'spring', duration: 1 },
              }}
              pointerEvents="none"
            />
          </motion.svg>
        </Styled.Container>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props} aria-label={labelID}>
            {children}
          </Styled.Content>
        )}
      </Styled.Label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
