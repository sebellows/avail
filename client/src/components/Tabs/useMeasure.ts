import { useCallback, useState, useLayoutEffect } from 'react'

export function useCallbackRef() {
  const [ref, setRef] = useState(null)
  const fn = useCallback((node) => {
    setRef(node)
  }, [])

  return [ref, fn]
}

export function useMeasure() {
  const [element, attachRef] = useCallbackRef()
  const [bounds, setBounds] = useState({})

  useLayoutEffect(() => {
    function onResize([entry]) {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      })
    }

    // @ts-ignore
    const observer = new ResizeObserver(onResize)

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [element])

  return {
    bounds,
    ref: attachRef,
  }
}
