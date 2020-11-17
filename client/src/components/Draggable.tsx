/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { ComponentProps } from '../core/contracts'
import { isFastEqual } from '../core/utils/isEqual'
import { useEnsuredRef, useFirstMountState, useLifecycles, usePrevious } from '../hooks'

type Coordinates = { x: number; y: number }

interface DraggableProps extends ComponentProps {
  draggable?: boolean
  position?: Coordinates
  target?: Element
}

type ItemsWithLength<T> = T & { length: number }

function getDefinedSelection<T, U = unknown>(
  optsA: ItemsWithLength<T>,
  optsB?: ItemsWithLength<U>,
  defaultRet: any = false,
) {
  if (optsA && optsA.length) return optsA
  if (optsB && optsB.length) return optsB
  return defaultRet
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ children, draggable = true, position: initialPosition, target = document.body }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [offsetX, setOffsetX] = useState(initialPosition?.x ?? 0)
    const [offsetY, setOffsetY] = useState(initialPosition?.y ?? 0)

    // const prevPosition = useRef<Coordinates>(initialPosition)

    const containerRef = useEnsuredRef<HTMLElement>(ref)

    // const rect = useRef<DOMRect>(null)
    const prevRect = useRef<DOMRect>(null)

    const mirror = useRef<Element>(null)

    const container = React.Children.only(children) as React.ReactElement

    useEffect(() => {
      if (containerRef.current && !offsetX) {
        const { left: x, top: y } = containerRef.current.getBoundingClientRect()
        setOffsetX(x)
        setOffsetY(y)
        // const { left: x, top: y } = prevRect.current
        //
      }
    }, [])

    const onDrop = (e: any) => {
      prevRect.current = containerRef.current?.getBoundingClientRect()
      const { left, top, width, height } = prevRect.current
      const { pageX, pageY } = getCurrentCordinates(e)
      const x = left <= 0 ? pageX : pageX - width / 2
      const y = top <= 0 ? pageY : pageY - height / 2
      setOffsetX(x)
      setOffsetY(y)
      console.log('onDrop', x, y, pageX, pageY)
      containerRef.current.parentElement.removeChild(mirror.current)
      mirror.current = null
    }

    useLifecycles(
      () => {
        target.addEventListener('drop', onDrop)
      },
      () => {
        target.removeEventListener('drop', onDrop)
      },
    )

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

    // function getRect() {
    //   const currentRect = containerRef.current?.getBoundingClientRect()
    //   if (!isFastEqual(rect.current, currentRect)) {
    //     return currentRect
    //   }
    //   return currentRect
    // }

    function createMirror() {
      const clone = containerRef.current.cloneNode() as HTMLElement
      const computedStyle = window.getComputedStyle(containerRef.current)
      clone.style.opacity = '0.3'
      clone.style.zIndex = `${
        computedStyle.getPropertyValue('z-index')
          ? +computedStyle.getPropertyValue('z-index') - 1
          : 0
      }`
      clone.setAttribute('id', 'mirror')
      clone.removeAttribute('draggable')
      const nextSib = containerRef.current.nextSibling
      const parent = containerRef.current.parentElement
      if (nextSib) {
        parent.insertBefore(nextSib, clone)
      } else {
        parent.appendChild(clone)
      }
      return parent.querySelector('#mirror')
    }

    function getCurrentCordinates(e: any) {
      const touches = getDefinedSelection(e.targetTouches, e.changedTouches)
      if (touches) {
        return touches[0]
      }
      return e
    }

    function onDragStart(e: any) {
      if (!isDragging) {
        setIsDragging(true)
        mirror.current = createMirror()
        prevRect.current = e.target.getBoundingClientRect()
      }
    }

    function onDragEnd(e: any) {
      if (isDragging) {
        setIsDragging(false)
        containerRef.current.parentElement.removeChild(mirror.current)
        mirror.current = null
      }
    }

    function onDrag(e: any) {
      const rect = e.target.getBoundingClientRect()
      prevRect.current = rect
      const { left, top, width, height } = rect
      const { pageX, pageY } = getCurrentCordinates(e)
      if (pageX !== 0 && pageY !== 0) {
        const x = left <= 0 ? pageX : pageX - width / 2
        const y = top <= 0 ? pageY : pageY - height / 2
        setOffsetX(x)
        setOffsetY(y)
        console.log('onDrag', x, y, pageX, pageY, e.target)
      }
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
              onDragEnd,
            })
          : children}
      </>
    )
  },
)

Draggable.displayName = 'Draggable'

export { Draggable }
