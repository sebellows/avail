/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react'
import { ComponentProps } from '../core/contracts'
import { useEnsuredRef } from '../hooks'

interface DraggableProps extends ComponentProps {
  draggable?: boolean
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ children, draggable: initialDraggable = false }, ref) => {
    const [draggable, makeDraggable] = useState(initialDraggable)

    const containerRef = useEnsuredRef(ref)

    const container = React.Children.only(children) as React.ReactElement

    useEffect(() => {
      if (container?.props?.children) {
        React.Children.map(container.props.children, (child, i) => {
          const childProps = { ...(child?.props ?? {}) }
          if (draggable) {
            childProps.draggable = false
          } else if (childProps.draggable) {
            delete childProps.draggable
          }
          React.cloneElement(child, childProps)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draggable])

    // function onDrag(e: any) {
    //   const { left, right, bottom, top, width, height } = containerRef.current?.getBoundingClientRect()
    //   if (left < 0)
    //   //
    // }

    return (
      <>
        {container
          ? React.cloneElement(container, { ...container.props, draggable, ref: containerRef })
          : children}
      </>
    )
  },
)

Draggable.displayName = 'Draggable'

export { Draggable }
