import {
  forwardRef,
  useRef,
  useEffect,
  MutableRefObject,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
  PropsWithChildren,
} from 'react'

/**
 * ensuredForwardRef/useEnsuredRef
 *
 * Taken from the `useEnsuredForwardedRef` hook from the `react-use` library on GitHub.
 * @see {@link https://github.com/streamich/react-use/blob/master/src/useEnsuredForwardedRef.ts}
 *
 * React hook to use a ForwardedRef safely and to ensure that a valid reference on the other side.
 * @example {@link https://github.com/streamich/react-use/blob/master/docs/useEnsuredForwardedRef.md}
 */

export type EnsuredRef<T> = ((instance: T | null) => void) | MutableRefObject<T>

export function useEnsuredRef<T>(forwardedRef: EnsuredRef<T>): MutableRefObject<T> {
  const ensuredRef = useRef(forwardedRef && (forwardedRef as MutableRefObject<T>).current)

  useEffect(() => {
    if (!forwardedRef) {
      return
    }
    ;(forwardedRef as MutableRefObject<T>).current = ensuredRef.current
  }, [forwardedRef])

  return ensuredRef
}

export function ensuredForwardRef<T, P = {}>(
  Component: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  return forwardRef((props: PropsWithChildren<P>, ref) => {
    const ensuredRef = useEnsuredRef(ref as MutableRefObject<T>)
    return Component(props, ensuredRef)
  })
}
