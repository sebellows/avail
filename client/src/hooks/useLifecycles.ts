import { useEffect } from 'react'

export const useLifecycles = (
  mount: (...args: any[]) => void,
  unmount?: (...args: any[]) => void,
) => {
  useEffect(() => {
    mount?.()

    return () => {
      unmount?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
