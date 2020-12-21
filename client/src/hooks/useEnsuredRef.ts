import {
  // forwardRef,
  useRef,
  useEffect,
  // MutableRefObject,
  // ForwardRefExoticComponent,
  // ForwardRefRenderFunction,
  // PropsWithoutRef,
  // RefAttributes,
  // PropsWithChildren,
} from 'react'

// TODO: type for `refs` should be `(((instance: T | null) => void) | React.MutableRefObject<T | null> | null)`
export function useEnsuredRef<T>(...refs: any[]): React.MutableRefObject<T> | null {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    for (const ref of refs) {
      if (!ref) break

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        ref.current = targetRef.current
      }
    }
  }, [refs])

  return targetRef as React.MutableRefObject<T | null>
}

/**
 * ensuredForwardRef/useEnsuredRef
 *
 * Taken from the `useEnsuredForwardedRef` hook from the `react-use` library on GitHub.
 * @see {@link https://github.com/streamich/react-use/blob/master/src/useEnsuredForwardedRef.ts}
 *
 * React hook to use a ForwardedRef safely and to ensure that a valid reference on the other side.
 * @example {@link https://github.com/streamich/react-use/blob/master/docs/useEnsuredForwardedRef.md}
 */

// export type EnsuredRef<T> = ((instance: T | null) => void) | MutableRefObject<T>
// export type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null

// export function useEnsuredRef<T>(forwardedRef: MutableRefObject<T>): MutableRefObject<T> {
//   const ensuredRef = useRef(forwardedRef && forwardedRef.current)

//   useEffect(() => {
//     if (!forwardedRef) {
//       return
//     }
//     forwardedRef.current = ensuredRef.current
//   }, [forwardedRef])

//   return ensuredRef
// }

// export function ensuredForwardRef<T, P = {}>(
//   Component: ForwardRefRenderFunction<T, P>,
// ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
//   return forwardRef((props: PropsWithChildren<P>, ref) => {
//     const ensuredRef = useEnsuredRef(ref as MutableRefObject<T>)
//     return Component(props, ensuredRef)
//   })
// }
