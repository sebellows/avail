import React, { Ref, useRef, useState } from 'react'
import { validFormProps, containerProps } from '../../core/utils'
// import { Icon } from '../Icon'
import { Styled } from './styles'
import { ToggleControlProps } from './props'
import { useTheme } from '../../ThemeContext'
import { CheckboxIcon } from '../Icon/CheckboxIcon'
import { RadioIcon } from '../Icon/RadioIcon'

const ToggleControl = React.forwardRef<{}, ToggleControlProps>(
  (
    {
      as: Component = 'label',
      checked: initialChecked,
      inline = false,
      children,
      size = 24,
      type = 'checkbox',
      onChange,
      ...props
    },
    ref: Ref<any>,
  ) => {
    const { theme } = useTheme()
    const [checked, setChecked] = useState(initialChecked)

    React.useEffect(() => {
      console.log('ToggleControl', props?.id, props?.name, checked)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    const inputRef = useRef(null)
    const htmlProps = containerProps(props, { exclude: ['checked', 'label'] })
    const formProps = validFormProps(props)
    const inputType = type === 'radio' ? type : 'checkbox'

    if (Component === 'label') {
      htmlProps['htmlFor'] = formProps?.name || formProps?.id
    }

    function handleChange(event: any) {
      setChecked(event.target.checked)
      onChange?.(event)
    }

    return (
      <Styled.Label ref={ref} {...htmlProps} as={Component} inline={inline}>
        <Styled.Control
          ref={inputRef}
          {...formProps}
          type={inputType}
          theme={theme}
          checked={checked}
          onChange={handleChange}
        />
        <Styled.Container className="toggle-container" size={size}>
          {inputType === 'radio' ? (
            <RadioIcon
              name="radio"
              checked={checked}
              fill={checked ? theme.control.checked : theme.control.borderColor}
              size={size}
              stroke={theme.control.borderColor}
              onClick={handleChange}
            />
          ) : (
            <CheckboxIcon
              name="check"
              checked={checked}
              fill={checked ? theme.control.checked : theme.control.borderColor}
              size={size}
              stroke="#ffffff"
              onClick={handleChange}
            />
          )}
          {/* <Styled.Outer className="toggle-outer" inputType={inputType} />
          <Styled.Inner className="toggle-inner" inputType={inputType}>
            {inputType === 'checkbox' && (
              <Icon
                name="check"
                fill={checked ? control.active.bg : control.bg}
                size={size}
                strokeDashoffset="22.91026"
                strokeDasharray="22.91026"
              />
            )}
          </Styled.Inner> */}
        </Styled.Container>
        {children && (
          <Styled.Content {...(children as React.ReactElement)?.props}>{children}</Styled.Content>
        )}
      </Styled.Label>
    )
  },
)

ToggleControl.displayName = 'ToggleControl'

export { ToggleControl }
