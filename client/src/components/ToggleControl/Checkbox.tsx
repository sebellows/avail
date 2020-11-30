/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, forwardRef, Ref, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
// import { Icon } from '../Icon'
import {
  motion,
  MotionProps,
  MotionStyle,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion'

import { useTheme } from '../../ThemeContext'
// import { Styled } from './styles'
import { color, mixin } from '../../core/style'
import { validFormProps, containerProps } from '../../core/utils'
import { ComponentProps, FormControlType } from '../../core/contracts'

import { ToggleControlProps } from './props'
import { Control } from '../Control'
import { useEnsuredRef } from '../../hooks'

export interface CheckmarkIconProps
  extends React.InputHTMLAttributes<FormControlType>,
    ComponentProps,
    Pick<MotionStyle, 'pathLength'> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  checked?: boolean
  inline?: boolean
  child?: any
  size?: number
  opacity?: MotionValue<number>
  pathLength?: MotionValue<number>
  strokeWidth?: number | string
}

const Styled = {
  Wrapper: styled(motion.label)<ToggleControlProps>`
    position: relative;
    ${mixin.flex({ inline: true, align: 'center' })}
    vertical-align: middle;
    margin-bottom: 0;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    ${({ inline }) => {
      if (inline) {
        return css`
          :not(:last-of-type) {
            ${mixin.margin.right(2)}
          }
        `
      }
    }}
  `,
  Control: styled(Control)<ToggleControlProps>`
    opacity: 0;
    ${mixin.cover}
  `,
  Container: styled.div<Pick<ToggleControlProps, 'size'>>`
    display: inline-block;
    flex-shrink: 0;
    ${({ size }) => mixin.size(size)}
    line-height: 0;
    margin-right: 0.3125rem;
    order: 0;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    // pointer-events: none;
  `,
  Content: styled.div`
    font-weight: normal;
    position: relative;
    user-select: auto;
  `,
}

const tickVariants = {
  pressed: (isChecked: boolean) => {
    console.log('tickVariants', isChecked)
    return {
      pathLength: isChecked ? 0.85 : 0.2,
      opacity: 1,
      fill: '#ff0000',
      scale: 2,
    }
  },
  checked: { pathLength: 1, fill: '#ffffff' },
  unchecked: { pathLength: 0, fill: 'rgba(255, 255, 255, 0.5)' },
}

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 5 },
  pressed: (isChecked: boolean) => ({
    scale: 0.95,
    strokeWidth: 1.5,
    stroke: color.primary,
    fill: isChecked ? color.primary : mixin.rgba(color.primary, 0.5),
    opacity: 1,
  }),
  checked: {
    stroke: color.primary,
    fill: color.primary,
  },
  unchecked: {
    stroke: color.border.base,
    strokeWidth: 2,
    fill: mixin.rgba(color.primary, 0),
  },
}

const Checkbox = forwardRef<SVGSVGElement, CheckmarkIconProps>(
  (
    {
      as: Component = 'label',
      checked: initialChecked,
      strokeWidth = 2,
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
    const [isChecked, setIsChecked] = useState(initialChecked)
    const opacity = useTransform(pathLength, [0.05, 0.15], [Number(isChecked), Number(isChecked)])

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

    const offset = +strokeWidth * 3
    const transparent = mixin.rgba(theme.control.borderColor, 0)

    const boxProps = {
      width: Number(+size - offset),
      height: Number(+size - offset),
      x: strokeWidth,
      y: strokeWidth,
      rx: +strokeWidth * 2,
      fill: isChecked ? theme.control.checked : transparent,
      stroke: isChecked ? theme.control.checked : theme.control.borderColor,
      strokeWidth,
      pointerEvents: 'none',
    }
    const checkmarkProps: any = {
      d: 'm20.75,6.705l-12,12l-5.5,-5.5l1.41,-1.41l4.09,4.08l10.59,-10.58l1.41,1.41z',
      fill: isChecked ? '#ffffff' : transparent,
      stroke: 'none',
      strokeWidth: 0,
      strokeLinecap: 'round' as any,
      strokeLinejoin: 'round' as any,
      pointerEvents: 'none',
    }

    return (
      <Styled.Wrapper
        ref={componentRef}
        {...htmlProps}
        as={Component}
        inline={inline}
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
        onClick={handleChange}
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
            // onClick={() => setIsChecked(!isChecked)}
          >
            <motion.rect
              id="checkbox-box"
              {...boxProps}
              variants={boxVariants}
              custom={isChecked}
            />
            <motion.filter id="svg_blur_1">
              <motion.feGaussianBlur stdDeviation="0.5" in="SourceGraphic" />
            </motion.filter>
            <motion.path
              {...checkmarkProps}
              filter="url(#svg_blur_1"
              fill="rgba(0, 0, 0, .4)"
              transform="translate(0 1)"
              variants={tickVariants}
              style={{ pathLength, opacity }}
              custom={isChecked}
            />
            <motion.path
              {...checkmarkProps}
              variants={tickVariants}
              style={{ pathLength, opacity }}
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

Checkbox.displayName = 'Checkbox'

export { Checkbox }
