import { useRef, useEffect } from 'react'

export function useEnsuredForwardedRef<T>(...refs: any[]): React.MutableRefObject<T> | undefined {
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
