/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState, useLayoutEffect } from 'react'
import { isPlainObject, typeOf } from '../../core/utils'
import { useEnsuredRef } from '../../hooks'

export function useCallbackRef(context: any = null): [any, (node: any) => void] {
  const [ref, setRef] = useState(context)
  const fn = useCallback((node) => {
    setRef(isPlainObject(node) ? node?.current : node)
  }, [])

  return [ref, fn]
}

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>
export type UseMeasureRef<E extends HTMLElement = HTMLElement> = React.MutableRefObject<E>
export type UseMeasureResult<E extends HTMLElement = HTMLElement> = [
  UseMeasureRef<E>,
  UseMeasureRect,
]

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export function useMeasure<E extends HTMLElement = HTMLElement>(
  context: any = null,
): UseMeasureResult<E> {
  const ref = useEnsuredRef<E | null>(context)
  const [rect, setRect] = useState<UseMeasureRect>(defaultState)

  const observer = React.useMemo(
    () =>
      new (window as any).ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect
          setRect({ x, y, width, height, top, left, bottom, right })
        }
      }),
    [],
  )

  useLayoutEffect(() => {
    if (!ref.current) return

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return [ref, rect]
}
