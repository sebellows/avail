/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useMemo } from 'react'
import styled from 'styled-components'
import { mixin, transitions } from '../../core/style'
import { useTheme } from '../../ThemeContext'
import { isOption, toOptions } from '../../core/models/Option'
import { classNames, validFormProps, containerProps } from '../../core/utils'
import { BaseControl, Control } from '../Control'

const Select = (props: Avail.Control) => <Control {...props} as="select" />

export const Styled = {
  Wrapper: styled.div`
    position: relative;
    display: inline-block;
    width: 100%;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 1.25rem;
      display: inline-block;
      width: 0;
      height: 0;
      margin-top: -0.15625rem; // ~2.75px
      border: 0.34375rem solid transparent; // ~5.5px
      ${({ theme }) => mixin.border({ dir: 'top', color: theme.control.fg, width: '0.34375rem' })}
      opacity: 0.5;
      pointer-events: none;
      z-index: 1;
      ${mixin.transition(
        { duration: transitions.duration.easeInOut, timing: transitions.timing.easeIn },
        'border-top-color',
        'opacity',
      )}
    }
    &:hover::after {
      ${({ theme }) => `border-top-color: ${theme.control.checked};`}
      opacity: 0.8;
    }
  `,
  Select: styled(Select)`
    display: inline-block;
    padding-right: 2rem;
    ${mixin.appearanceNone}
  `,
}

const SelectControl: Avail.RefForwardingComponent<'select', Avail.ControlGroup> = forwardRef(
  (
    {
      as: Component = 'div',
      className,
      defaultOption,
      isValid,
      isInvalid,
      arialabel,
      options: initialOptions,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme()
    const options = useMemo(() => {
      if (Array.isArray(initialOptions) && initialOptions.some(isOption)) {
        return initialOptions
      }
      return toOptions(initialOptions)
    }, [initialOptions])

    function handleChange(event: any) {
      props?.onChange(event)
    }

    const { controlClass = '' } = props
    delete props.type
    const htmlProps = containerProps(props, { exclude: ['controlClass', 'label'] })
    const formProps = validFormProps(props, { exclude: ['type'] })

    return (
      <Styled.Wrapper
        {...htmlProps}
        as={Component}
        ref={ref}
        className={classNames(
          'select',
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
          className,
        )}
        theme={theme}
      >
        <Styled.Select
          {...formProps}
          theme={theme}
          className={classNames('control', controlClass)}
          aria-label={arialabel}
          onChange={handleChange}
        >
          {defaultOption && <option value="">{defaultOption}</option>}
          {(options as Avail.OptionProps[]).map((_option: Avail.OptionProps, i: number) => {
            return (
              <option key={`${_option.label}-${i}`} value={_option.value}>
                {_option.label}
              </option>
            )
          })}
        </Styled.Select>
      </Styled.Wrapper>
    )
  },
)

SelectControl.displayName = 'SelectControl'

export { SelectControl }
