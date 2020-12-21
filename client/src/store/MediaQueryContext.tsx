/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { GRID_BREAKPOINTS } from '../core/constants'

/**
 * `useMedia`
 * Verify a matched media-query size.
 *
 * @example
 * ```
 * // Accepts an object of features to test
 * const isMinLg = useMedia({minWidth: '992px'});
 * // Or a regular media query string
 * const isMaxSm = useMedia('max-width: 576px')
 * const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
 * ```
 */

const useMedia = (query: string) => {
  const [state, setState] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    const onChange = () => {
      if (!mounted) {
        return
      }
      setState(!!mql.matches)
    }

    mql.addEventListener('change', onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeEventListener('change', onChange)
    }
  }, [query])

  return state
}

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'
>
export type UseMeasureRef<E extends HTMLElement = HTMLElement> = (element: E) => void
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

export const useMeasure = <E extends HTMLElement = HTMLElement>(): UseMeasureResult<E> => {
  const [element, ref] = useState<E | null>(null)
  const [rect, setRect] = useState<UseMeasureRect>(defaultState)

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect
          setRect({ x, y, width, height, top, left, bottom, right })
        }
      }),
    [],
  )

  React.useLayoutEffect(() => {
    if (!element) return
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element])

  return [ref, rect]
}

export const MEDIA_QUERY = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px )',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
}

export const MediaQueryContext = createContext(null)

export function MediaQueryProvider({ children }) {
  const isSm = useMedia(MEDIA_QUERY.sm)
  const isMd = useMedia(MEDIA_QUERY.md)
  const isLg = useMedia(MEDIA_QUERY.lg)
  const isXL = useMedia(MEDIA_QUERY.xl)
  const isXXL = useMedia(MEDIA_QUERY.xxl)
  const isPrefersReducedMotion = useMedia(MEDIA_QUERY.prefersReducedMotion)

  const [ref, rect] = useMeasure()

  const context = useMemo(() => {
    return { isSm, isMd, isLg, isXL, isXXL, isPrefersReducedMotion, ref, ...rect }
  }, [isSm, isMd, isLg, isXL, isXXL, isPrefersReducedMotion, ref, rect])

  return <MediaQueryContext.Provider value={context}>{children}</MediaQueryContext.Provider>
}

export const useMediaQueryContext = () => useContext(MediaQueryContext)
