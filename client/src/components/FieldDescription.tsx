import React from 'react'

import styled from 'styled-components'
import { font, toREM, mixin } from '../core/style'
import { useTheme } from '../ThemeContext'

interface FieldDescriptionProps extends Avail.ComponentProps {
  /** Text color */
  muted?: boolean
}

const FieldDescriptionText: Avail.RefForwardingComponent<
  'small',
  FieldDescriptionProps
> = React.forwardRef(({ as: Component = 'small', muted, ...props }, ref) => {
  const { theme } = useTheme()

  return (
    <Component {...props} muted={muted} theme={theme} ref={ref}>
      {props.children}
    </Component>
  )
})

const FieldDescription = styled(FieldDescriptionText)<FieldDescriptionProps>`
  display: inline-block;
  ${mixin.margin.top('xs')}
  color: ${({ muted, theme }) => (muted ? theme.muted : theme.fg)};
  font-size: ${toREM(font.sizes.sm)};
  line-height: 1.3;
`

FieldDescription.defaultProps = {
  muted: true,
}

FieldDescription.displayName = 'FieldDescription'

export { FieldDescription }
