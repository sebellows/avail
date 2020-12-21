import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

import { useTheme } from '../../ThemeContext'
import { cssTextToParams, mixin } from '../../core/style'
import { classNames, Color, validFormProps } from '../../core/utils'

import { Styled } from './styles'

export interface SwitchProps extends Omit<Avail.Control, 'label'> {
  alignLabel?: 'left' | 'right'
  on?: string | React.ReactNode
  off?: string | React.ReactNode
  inline?: boolean
  label?: string | React.ReactNode
  barLength?: number
  strokeWidth?: number
}

const Switch: Avail.RefForwardingComponent<'label', SwitchProps> = React.forwardRef(
  (
    {
      as: Component = motion.label,
      checked: initialChecked = false,
      children,
      className = null,
      disabled = false,
      inline = false,
      isInvalid = false,
      isValid = false,
      alignLabel = 'right',
      label: labelText = null,
      size = 32,
      barLength = 48,
      strokeWidth = 2.75,
      type = 'checkbox',
      onChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const [isChecked, setCheckedState] = useState(initialChecked)

    const inputRef = useRef(null)

    /** Get the valid form properties to pass to the hidden input element. */
    const formProps = validFormProps(props)

    function handleChange(event: any) {
      setCheckedState(!isChecked)
      onChange?.(event)
    }

    /** Variants for the slider bar/track that the toggle runs across. */
    const barVariants = {
      checked: {
        backgroundColor: Color(theme.control.checked).lighten(0.5).string(),
      },
      unchecked: {
        backgroundColor: theme.control.bg,
      },
    }

    /** Shared line properties for the SVG lines that compose the "✕" and "✓" icons. */
    const lineProps = {
      rotate: 0,
      stroke: Color(theme.control.fg).lighten(0.2).string(),
      strokeWidth,
      strokeLinecap: 'round' as any,
      strokeLinejoin: 'round' as any,
      pointerEvents: 'none',
      vectorEffect: 'non-scaling-stroke',
    }
    /** The line that runs top left corner to bottom right corner on the "✕", short line on "✓". */
    const leftLineProps = {
      x1: size * 0.6875, // 22
      x2: size * 0.3125, // 10
      y1: size * 0.6875, // 22
      y2: size * 0.3125, // 10
    }
    /** The line that runs top right corner to bottom left corner on the "✕", long line on "✓". */
    const rightLineProps = {
      x1: size * 0.6875, // 22
      x2: size * 0.3125, // 10
      y1: size * 0.3125, // 10
      y2: size * 0.6875, // 22
    }
    const leftVariants = {
      checked: {
        rotate: -360,
        stroke: theme.control.bg,
        x1: size * 0.296875, // 9
        x2: size * 0.4375, // 14
        y1: size * 0.546875, // 17.5
        y2: size * 0.703125, // 22.5
      },
      unchecked: {
        rotate: 0,
        stroke: theme.control.fg,
        ...leftLineProps,
      },
    }
    const rightVariants = {
      checked: {
        rotate: -360,
        stroke: theme.control.bg,
        x1: size * 0.703125, // 22.5
        x2: size * 0.4375, // 14
        y1: size * 0.3125, // 10
        y2: size * 0.703125, // 22.5
      },
      unchecked: {
        rotate: 0,
        stroke: theme.control.fg,
        ...rightLineProps,
      },
    }

    /** Calculated size passed to SVG circle's `cx`, `cy`, and `r` attributes. */
    const computedSize = size / 2
    /** Calculated traversable distance for toggle across slider bar/track */
    const computedOffset = barLength - size

    /**
     * Framer-Motion variants for the main SVG element composing the toggle.
     * This is what moves across the bar/track of the Switch.
     */
    const toggleVariants = {
      checked: {
        x: computedOffset,
      },
      unchecked: {
        x: 0,
      },
    }

    /** Framer-Motion variants for the SVG cicle that composes the background of the toggle. */
    const circleVariants = {
      pressed: {
        fill: Color(theme.control.checked).lighten(0.3).string(),
      },
      checked: {
        fill: theme.control.checked,
      },
      unchecked: {
        fill: theme.control.bg,
      },
    }

    const rippleSize = computedSize * 1.5
    const computedRippleOffset = -(computedSize / 2)
    const rippleDefaults = {
      fill: theme.control.fg,
      opacity: 0,
      scale: 0,
    }
    const rippleVariants = {
      hover: {
        fill: theme.control.fg,
        opacity: 0.05,
        scale: 1,
      },
      pressed: {
        fill: theme.control.checked,
        scale: 1,
        opacity: 0.165,
      },
      checked: rippleDefaults,
      unchecked: rippleDefaults,
    }

    return (
      <Styled.Label
        as={Component}
        ref={ref}
        htmlFor={formProps.name ?? formProps.id}
        className={classNames(
          'switch',
          className,
          isChecked ? 'is-checked' : 'is-unchecked',
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
        )}
        style={{ height: size, lineHeight: 1 }}
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
      >
        <Styled.Control
          {...formProps}
          ref={inputRef}
          type={type}
          checked={isChecked}
          onChange={handleChange}
        />
        <Styled.Bar
          as={motion.div}
          variants={barVariants}
          style={{
            width: barLength,
            height: computedSize,
            pointerEvents: 'none',
          }}
          transition={{
            backgroundColor: { duration: 0.5 },
          }}
        >
          <motion.svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            overflow="visible"
            preserveAspectRatio="none"
            variants={toggleVariants}
            transition={{ x: { type: 'spring', duration: 0.5 } }}
            pointerEvents="none"
            fill={theme.control.bg}
            x={0}
            y={-(size / 4)}
            style={cssTextToParams(mixin.dropShadow(1).toString())}
          >
            <motion.circle
              cx={computedSize}
              cy={computedSize}
              r={computedSize}
              fill={theme.control.bg}
              stroke="none"
              variants={circleVariants}
              transition={{ fill: { duration: 0.5 } }}
              pointerEvents="none"
            />
            <motion.line {...lineProps} {...leftLineProps} variants={leftVariants} />
            <motion.line {...lineProps} {...rightLineProps} variants={rightVariants} />
            <motion.circle
              cx={rippleSize}
              cy={rippleSize}
              r={rippleSize}
              x={computedRippleOffset}
              y={computedRippleOffset}
              fill={theme.control.fg}
              stroke="none"
              scale={0}
              opacity={0}
              variants={rippleVariants}
              transition={{
                opacity: { duration: 0.5 },
                scale: { type: 'spring', duration: 0.5 },
              }}
              pointerEvents="none"
            />
          </motion.svg>
        </Styled.Bar>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
        )}
      </Styled.Label>
    )
  },
)
Switch.displayName = 'Switch'

export { Switch }
