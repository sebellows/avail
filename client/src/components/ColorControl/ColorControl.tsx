/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, Ref, useState, ChangeEvent } from 'react'

import { Icon } from '../Icon'
import { useTheme } from '../../ThemeContext'
import { validFormProps } from '../../core/utils'
import { FormControlProps } from '../../core/contracts'
import { Styled } from './styles'

const ColorControl = forwardRef<{}, FormControlProps>(
  ({ showLabel = true, ...props }, ref: Ref<any>) => {
    const { theme } = useTheme()
    const [color, setColor] = useState(props?.value ?? '#000000')

    const formProps = validFormProps(props)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setColor(event.target.value)
      props?.onChange?.(event)
    }

    return (
      <>
        <Styled.Control {...formProps} ref={ref} type="color" onChange={handleChange} />
        {showLabel && (
          <Styled.Overlay
            className="color-control-overlay"
            theme={theme}
            colorValue={color as string}
            aria-hidden="true"
          >
            <Icon name="droplet" className="mr-2" size={16} />
            {color}
          </Styled.Overlay>
        )}
      </>
    )
  },
)

ColorControl.displayName = 'ColorControl'

export { ColorControl }
