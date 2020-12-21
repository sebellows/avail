/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react'
import { throttle } from '../core/utils'
// import { isFastEqual } from '../core/utils/isEqual'
import { useEnsuredRef, useLifecycles } from '../hooks'

type Coordinates = { x: number; y: number }

interface DraggableProps extends Avail.ComponentProps {
  draggable?: boolean
  position?: Coordinates
  target?: Element
}

type ItemsWithLength<T> = T & { length: number }

const getDefinedSelection = <T, U = unknown>(
  optsA: ItemsWithLength<T>,
  optsB?: ItemsWithLength<U>,
  defaultRet: any = false,
) => {
  if (optsA && optsA.length) return optsA
  if (optsB && optsB.length) return optsB
  return defaultRet
}

const getCurrentCordinates = (e: any): { pageX: number; pageY: number } => {
  const { pageX, pageY } = e

  let coords = { pageX, pageY }

  const touches = getDefinedSelection(e.targetTouches, e.changedTouches)
  if (touches) {
    coords = touches[0]
  } else if (e.clientX) {
    coords = { pageX: e.clientX, pageY: e.clientY }
  }

  if (coords.pageX < 0) coords.pageX = 0
  if (coords.pageY < 0) coords.pageY = 0

  return coords
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ children, draggable = true, position: initialPosition, target = document.body }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [offsetX, setOffsetX] = useState(initialPosition?.x)
    const [offsetY, setOffsetY] = useState(initialPosition?.y)

    const containerRef = useEnsuredRef<HTMLDivElement>(ref)
    const container = React.Children.only(children) as React.ReactElement

    useLifecycles(
      () => {
        if (containerRef.current && !offsetX) {
          const { left: x, top: y } = containerRef.current.getBoundingClientRect()
          setOffsetX(x)
          setOffsetY(y)
        }
        target.addEventListener('drop', onDrop)
      },
      () => {
        target.removeEventListener('drop', onDrop)
        updateCoords.cancel()
      },
    )

    const updateCoords = throttle((e: any) => {
      const target = e.target === containerRef.current ? e.target : containerRef.current

      const { width, height } = target.getBoundingClientRect()

      let { pageX, pageY } = getCurrentCordinates(e)

      const x = pageX - width / 2
      const y = pageY - height / 2

      setOffsetX(x)
      setOffsetY(y)
    })

    const onDrop = (e: any) => {
      updateCoords(e)
    }

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

    const onDragStart = (e: any) => {
      if (!isDragging) {
        setIsDragging(true)
      }
    }

    const onDragOver = (e: any) => {
      // Otherwise `onDrop` event never fires
      e.preventDefault()
    }

    const onDragEnd = (e: any) => {
      if (isDragging) {
        e.persist()
        updateCoords(e)
        setIsDragging(false)
      }
    }

    const onDrag = (e: any) => {
      e.persist()
      e.preventDefault()
      updateCoords(e)
    }

    return (
      <>
        {container
          ? React.cloneElement(container, {
              ...container.props,
              draggable,
              ref: containerRef,
              style: { ...container.props.style, left: offsetX, top: offsetY },
              onDragStart,
              onDrag,
              onDragOver,
              onDragEnd,
            })
          : children}
      </>
    )
  },
)

Draggable.displayName = 'Draggable'

export { Draggable }
