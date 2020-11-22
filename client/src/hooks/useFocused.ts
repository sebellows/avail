import { useState } from 'react'
import { useLifecycles } from './useLifecycles'

export const useFocused = (ref: any) => {
  const [active, setActive] = useState(false)

  const handleFocusIn = (e: any) => {
    if (ref?.current === document.activeElement) setActive(true)
    else setActive(false)
  }

  useLifecycles(
    () => {
      document.addEventListener('focusin', handleFocusIn)
    },
    () => {
      document.removeEventListener('focusin', handleFocusIn)
    },
  )

  return active
}
