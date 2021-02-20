import React, { useEffect } from 'react'

type ElementWithCustomValidity = { setCustomValidity: (validity: string) => void }

export function useCustomValidity<T extends Element & ElementWithCustomValidity>(
  ref: React.MutableRefObject<T> | { current: null | T },
  customValidity: string | undefined,
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.setCustomValidity(customValidity || '')
    }
  }, [customValidity, ref])
}
