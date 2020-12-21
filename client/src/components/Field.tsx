import React, { forwardRef } from 'react'
import { classNames } from '../core/utils/classNames'
import { cssTextToParams, mixin } from '../core/style'

const Field: Avail.RefForwardingComponent<'div', Avail.ComponentProps> = forwardRef(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    const styles = cssTextToParams(mixin.padding.y(1))
    return (
      <Component {...props} ref={ref} className={classNames('field', className)} style={styles}>
        {children}
      </Component>
    )
  },
)

Field.displayName = 'Field'

export { Field }
