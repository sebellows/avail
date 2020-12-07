/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { motion, useMotionValue, useTransform } from 'framer-motion'

import { useEnsuredRef } from '../../hooks'
import { Theme, useTheme } from '../../ThemeContext'
import { validFormProps, containerProps, classNames, Color, uuid } from '../../core/utils'

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

const Radio = forwardRef<SVGSVGElement, CheckmarkIconProps>(
  (
    {
      as: Component = 'label',
      checked: isChecked,
      strokeWidth = 2.75,
      size = 24,
      inline = false,
      children,
      type = 'radio',
      onChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    // const [isChecked, setIsChecked] = useState(initialChecked)

    const componentRef = useEnsuredRef<SVGSVGElement>(ref)
    const inputRef = useRef(null)

    React.useEffect(() => {
      console.log('Radio', props?.id, props?.name, isChecked)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked])

    const htmlProps = containerProps(props, { exclude: ['label'] })
    const formProps = validFormProps(props)
    const inputType = type === 'radio' ? type : 'checkbox'

    if (Component === 'label') {
      htmlProps['htmlFor'] = formProps?.name || formProps?.id
    }

    function handleChange(event: any) {
      event.preventDefault()
      // setIsChecked(!isChecked)
      onChange?.(event)
    }

    const computedStrokeWidth = parseFloat('' + strokeWidth)
    const computedSize = +size / 2
    const computedRadius = computedSize - computedStrokeWidth
    const computedOffset = computedSize - computedStrokeWidth * 2

    const filterID = uuid(5, 'shadow-')
    const innerShadowID = `inner-${filterID}`
    const dropShadowID = `drop-${filterID}`

    const variants = {
      hover: { scale: 1.05 },
      pressed: { scale: 0.95 },
    }

    const baseVariants = {
      ...variants,
      checked: { filter: `url(#${dropShadowID})` },
      unchecked: { filter: `url(#${innerShadowID})` },
    }

    const outlineVariants = {
      ...variants,
      checked: { stroke: theme.control.checked },
      unchecked: { stroke: theme.control.borderColor },
    }
    console.log('unchecked', theme.control.borderColor)

    const tickVariants = {
      pressed: {
        scale: 0.5,
        fill: Color(theme.control.checked).alpha(0.4).string(),
      },
      checked: { scale: 1, fill: theme.control.checked },
      unchecked: { scale: 0, fill: theme.control.checked },
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
          aria-checked={isChecked}
          theme={theme}
          checked={isChecked}
          onChange={handleChange}
        />
        <Styled.Container className="toggle-container" size={size}>
          <motion.svg
            ref={ref}
            className={classNames(
              'icon',
              `icon-radio-button`,
              !!props?.className && props?.className,
            )}
            width={size}
            height={size}
            initial={false}
            animate={isChecked ? 'checked' : 'unchecked'}
            whileHover="hover"
            whileTap="pressed"
            // onClick={handleChange}
          >
            <defs>
              <motion.filter id={innerShadowID}>
                <feFlood floodColor="white" />
                <feComposite in2="SourceAlpha" operator="out" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite operator="atop" in2="SourceGraphic" />
              </motion.filter>

              <motion.filter id={dropShadowID}>
                <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="black" />
              </motion.filter>
            </defs>

            <motion.circle
              id="radio-base"
              cx={computedSize}
              cy={computedSize}
              r={computedRadius}
              fill={theme.control.bg}
              filter={`url(#${innerShadowID})`}
              stroke="none"
              strokeWidth={0}
              pointerEvents="none"
              variants={baseVariants}
              custom={isChecked}
            />

            <motion.circle
              id="radio-outline"
              cx={computedSize}
              cy={computedSize}
              r={computedRadius}
              fill="none"
              stroke={theme.control.borderColor}
              strokeWidth={computedStrokeWidth}
              pointerEvents="none"
              variants={outlineVariants}
              transition={{
                delay: 0.25,
                stroke: { type: 'spring', stiffness: 100, duration: 0.05 },
              }}
              custom={isChecked}
            ></motion.circle>

            <motion.circle
              id="radio-checked"
              cx={computedSize}
              cy={computedSize}
              r={computedOffset}
              fill={theme.control.checked}
              stroke="none"
              strokeWidth={0}
              pointerEvents="none"
              variants={tickVariants}
              transition={{
                scale: { type: 'spring', stiffness: 100, duration: 0.1 },
              }}
              custom={isChecked}
            />
          </motion.svg>
        </Styled.Container>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
        )}
      </Styled.Wrapper>
    )
  },
)

Radio.displayName = 'Radio'

export { Radio }
