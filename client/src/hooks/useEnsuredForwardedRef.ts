import { useRef, useEffect } from 'react'

export default function useEnsuredForwardedRef<T>(
  ...refs: any[]
): React.MutableRefObject<T> | undefined {
  const defaultRef = useRef(null)

  useEffect(() => {
    for (let ref of refs) {
      if (!ref) break

      if (typeof ref === 'function') {
        ref(defaultRef.current)
      } else {
        ref.current = defaultRef.current
      }
    }
  }, [refs])

  return defaultRef
}

// export function ensuredForwardRef<T extends React.ElementType = React.ElementType, P = {}>(
//   Component: ForwardRefRenderFunction<T, P>
// ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
//   return forwardRef((props: PropsWithChildren<P>, ref: MutableRefObject<T>) => {
//     const ensuredRef = useEnsuredForwardedRef(ref as MutableRefObject<T>)
//     return Component(props, ensuredRef)
//   })
// }
