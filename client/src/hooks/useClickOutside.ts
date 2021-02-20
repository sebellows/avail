import { useCallback, useEffect } from 'react'

export const useClickOutside = (
  ref: any,
  onClickOutside: (event?: any) => void,
  disabled = false,
) => {
  const clickOutside = useCallback(
    (event: any) => {
      const el = ref?.nodeName ? ref : ref?.current

      if (el && !el.contains(event.target)) {
        onClickOutside(event)
      }
    },
    [ref, onClickOutside],
  )

  useEffect(() => {
    if (!disabled) {
      window.addEventListener('mouseup', clickOutside)
    } else {
      window.removeEventListener('click', clickOutside)
    }
    return () => {
      window.removeEventListener('mouseup', clickOutside)
    }
  }, [clickOutside, disabled])

  return ref
}
