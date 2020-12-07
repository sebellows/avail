/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

import { useEnsuredRef } from '../../hooks'
import { Theme, useTheme } from '../../ThemeContext'
import { validFormProps, containerProps } from '../../core/utils'

import { Styled } from './styles'
import { CheckmarkIconProps } from './props'

const configureBoxVariants = (theme: Theme, strokeWidth: number) => ({
  hover: { scale: 1.05, strokeWidth: Math.floor(strokeWidth * 1.2) },
  pressed: { scale: 0.95, strokeWidth: Math.floor(strokeWidth * 0.7) },
  checked: { stroke: theme.accent },
  unchecked: {
    stroke: theme.control.borderColor,
    strokeWidth,
  },
})

const Checkbox = forwardRef<SVGSVGElement, CheckmarkIconProps>(
  (
    {
      as: Component = 'label',
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
    const pathLength = useMotionValue(0)
    const stroke = useMotionValue(0)
    const [isChecked, setIsChecked] = useState(initialChecked)
    const opacity = useTransform(stroke, [0.05, 0.15], [Number(isChecked), Number(isChecked)])

    const componentRef = useEnsuredRef<SVGSVGElement>(ref)

    React.useEffect(() => {
      componentRef.current.addEventListener('change', (event: any) => {
        if (event.target === inputRef.current) {
          onChange?.(event)
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
      console.log('Checkbox', props?.id, props?.name, isChecked)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked])

    const inputRef = useRef(null)
    const htmlProps = containerProps(props, { exclude: ['label'] })
    const formProps = validFormProps(props)
    const inputType = type === 'radio' ? type : 'checkbox'

    if (Component === 'label') {
      htmlProps['htmlFor'] = formProps?.name || formProps?.id
    }

    function handleChange(event: any) {
      event.preventDefault()
      setIsChecked(!isChecked)
      console.log('handleChange', event.target)
      const changeEvent = new Event('change', { bubbles: true })
      inputRef.current.dispatchEvent(changeEvent)
      // onChange?.(changeEvent)
    }

    const calcProp = (num = 0) => ((+strokeWidth + num) / +size) * 440 // if '0', equals ~0.08333(∞)
    const computedStrokeWidth = Math.floor(calcProp()) // ~50px
    const offset = computedStrokeWidth * 2

    const boxVariants = configureBoxVariants(theme, computedStrokeWidth)
    const boxVariants2 = {
      checked: { stroke: 'url(#gradient)', strokeDasharray: 0, strokeDashoffset: 0 },
      unchecked: { stroke: 'none', strokeDasharray: size * 4, strokeDashoffset: size * 4 },
    }
    const tickVariants = {
      pressed: { pathLength: isChecked ? 0.85 : 0.2 },
      checked: { pathLength: 1 },
      unchecked: { pathLength: 0 },
    }
    console.log('computedStrokeWidth', computedStrokeWidth)
    const tickVariants2 = {
      checked: {
        stroke: 'url(#gradient)',
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
      unchecked: {
        stroke: 'none',
        strokeDasharray: size,
        strokeDashoffset: size,
      },
    }

    const tickProps = {
      d: 'M 0 128.666 L 128.658 257.373 L 341.808 0',
      fill: 'transparent',
      strokeWidth: computedStrokeWidth,
      strokeLinecap: 'round' as any,
      strokeLinejoin: 'round' as any,
      variants: tickVariants,
      style: { pathLength, opacity },
      custom: isChecked,
    }

    return (
      <Styled.Wrapper
        ref={componentRef}
        {...htmlProps}
        as={Component}
        inline={inline}
        // onClick={handleChange}
      >
        <Styled.Control
          ref={inputRef}
          {...formProps}
          type={inputType}
          aria-describedby={props?.id ?? props?.name}
          aria-checked={isChecked}
          theme={theme}
          checked={isChecked}
          // onChange={handleChange}
        />
        <Styled.Container className="toggle-container" size={size}>
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 440 440"
            initial={false}
            animate={isChecked ? 'checked' : 'unchecked'}
            whileHover="hover"
            whileTap="pressed"
            onClick={handleChange}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff8a00"></stop>
                <stop offset="100%" stopColor="#da1b60"></stop>
              </linearGradient>
            </defs>
            <motion.rect
              id="checkbox-box"
              width={440 - offset}
              height={440 - offset}
              x={computedStrokeWidth}
              y={computedStrokeWidth}
              rx={computedStrokeWidth * 2}
              fill="transparent"
              stroke={theme.control.borderColor}
              strokeWidth={computedStrokeWidth}
              pointerEvents="none"
              // variants={boxVariants}
              // transition={{ duration: 0.5 }}
              // custom={isChecked}
            />
            <motion.rect
              id="checkbox-outline"
              width={440 - offset}
              height={440 - offset}
              x={computedStrokeWidth / 2}
              y={computedStrokeWidth / 2}
              rx={computedStrokeWidth}
              fill="transparent"
              stroke="none"
              // stroke="url(#gradient)"
              strokeWidth={computedStrokeWidth}
              strokeDasharray={size * 4}
              pointerEvents="none"
              variants={boxVariants2}
              transition={{ duration: 0.5 }}
              custom={isChecked}
            />
            <motion.polyline
              // points="9,22 18,30 32,9"
              points="110,218.888 195,306.666 316.111,120"
              fill="none"
              strokeLinecap="round"
              strokeWidth={computedStrokeWidth}
              transition={{ duration: 0.5 }}
              // stroke="url(#gradient)"
              strokeDasharray={size}
              variants={tickVariants2}
            />
            {/* <motion.path
              {...tickProps}
              transform={`translate(${calcProp(1)} ${calcProp(3.5)}) rotate(4 170.904 128.687)`}
              stroke={theme.bg}
            />
            <motion.path
              {...tickProps}
              transform={`translate(${calcProp(1)} ${calcProp(2)}) rotate(4 170.904 128.687)`}
              stroke={theme.control.checked}
            /> */}
          </motion.svg>
        </Styled.Container>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
        )}
      </Styled.Wrapper>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
