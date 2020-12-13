/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useRef } from 'react'
import { motion } from 'framer-motion'

import { useEnsuredRef } from '../../hooks'
import { useTheme } from '../../ThemeContext'
import { validFormProps, containerProps, classNames, Color, uuid } from '../../core/utils'

import { Styled } from './styles'
import { CheckmarkIconProps } from './props'

const Radio = forwardRef<HTMLLabelElement, CheckmarkIconProps>(
  (
    {
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

    const componentRef = useEnsuredRef<HTMLLabelElement>(ref)
    const inputID = props?.id ?? props?.name ?? 'avail-radio'
    const labelID = uuid(5, `${inputID}-`)
    const inputRef = useRef(null)

    React.useEffect(() => {
      console.log('Radio', props?.id, props?.name, isChecked)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked])

    const htmlProps = containerProps(props, { exclude: ['label'] })
    const formProps = validFormProps(props)
    const inputType = type === 'radio' ? type : 'checkbox'

    function handleChange(event: any) {
      // event.preventDefault()
      onChange?.(event)
    }

    const computedSize = +size / 2
    const computedRadius = computedSize - strokeWidth
    const computedOffset = computedSize - strokeWidth * 2

    const variants = {
      hover: { scale: 1.05 },
      pressed: { scale: 0.95 },
    }

    const baseVariants = {
      ...variants,
      checked: { filter: 'url(#dropShadow)' },
      unchecked: { filter: 'url(#innerShadow)' },
    }

    const outlineVariants = {
      ...variants,
      checked: { stroke: theme.control.checked },
      unchecked: { stroke: theme.control.borderColor },
    }

    const tickVariants = {
      pressed: {
        scale: 0.5,
        fill: Color(theme.control.checked).alpha(0.4).string(),
      },
      checked: { scale: 1, fill: theme.control.checked },
      unchecked: { scale: 0, fill: theme.control.checked },
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
          theme={theme}
          checked={isChecked}
          onChange={handleChange}
        />
        <Styled.Container className="toggle-container" size={size}>
          <motion.svg
            className={classNames(
              'icon',
              `icon-radio-button`,
              !!props?.className && props?.className,
            )}
            width={size}
            height={size}
            pointerEvents="none"
          >
            <defs>
              <motion.filter id="innerShadow">
                <feFlood floodColor={Color(theme.control.fg).alpha(0.3).string()} />
                <feComposite in2="SourceAlpha" operator="out" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite operator="atop" in2="SourceGraphic" />
              </motion.filter>

              <motion.filter id="dropShadow">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="0.5"
                  floodColor={Color(theme.control.fg).alpha(0.8).string()}
                />
              </motion.filter>

              <radialGradient id="radialGradient">
                <stop offset="10%" stopColor={theme.control.bg} />
                <stop offset="95%" stopColor={Color(theme.control.bg).darken(0.03).string()} />
              </radialGradient>
            </defs>

            <motion.circle
              id="radio-base"
              cx={computedSize}
              cy={computedSize}
              r={computedRadius}
              fill="url(#radialGradient)"
              filter="url(#innerShadow)"
              stroke="none"
              pointerEvents="none"
              variants={baseVariants}
            />

            <motion.circle
              id="radio-outline"
              cx={computedSize}
              cy={computedSize}
              r={computedRadius}
              fill="none"
              stroke={theme.control.borderColor}
              strokeWidth={strokeWidth}
              pointerEvents="none"
              variants={outlineVariants}
              transition={{
                stroke: { duration: 0.5 },
              }}
            ></motion.circle>

            <motion.circle
              id="radio-checked"
              cx={computedSize}
              cy={computedSize}
              r={computedOffset}
              fill={theme.control.checked}
              stroke="none"
              pointerEvents="none"
              variants={tickVariants}
              transition={{
                scale: { type: 'spring', duration: 0.5 },
              }}
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

Radio.displayName = 'Radio'

export { Radio }
