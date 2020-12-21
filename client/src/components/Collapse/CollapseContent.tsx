import React, { forwardRef } from 'react'
import { m as motion } from 'framer-motion'
import { classNames } from '../../core/utils'
import { useEnsuredRef } from '../../hooks'

interface CollapseContentProps extends Avail.ComponentProps {
  scaleStart?: number
  scaleEnd?: number
  duration?: number
}

const CollapseContent: Avail.RefForwardingComponent<'div', CollapseContentProps> = forwardRef(
  (
    { as: Tag = 'div', className, scaleStart = 0.8, scaleEnd = 1, duration = 0.8, ...props },
    ref,
  ) => {
    const componentRef = useEnsuredRef<HTMLDivElement>(ref)

    const child = React.Children.only(props.children)
    const childElem = () =>
      child ? (
        React.cloneElement(child as React.ReactElement, {
          ...(child as React.ReactElement).props,
          className: classNames(
            'collapse-content',
            (child as React.ReactElement).props.className,
            !!className && className,
          ),
        })
      ) : (
        <Tag className={classNames('collapse-content', !!className && className)} />
      )
    const Component = motion.custom(childElem)

    return (
      <Component
        ref={componentRef}
        variants={{ collapsed: { scale: scaleStart }, open: { scale: scaleEnd } }}
        transition={{ duration: duration }}
        {...props}
      />
    )
  },
)

CollapseContent.displayName = 'CollapseContent'

export { CollapseContent }
