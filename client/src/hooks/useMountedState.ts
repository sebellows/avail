import { useCallback, useEffect, useRef } from 'react'

/**
 * @name useMountedState
 *
 * @see {@link https://github.com/streamich/react-use/blob/master/docs/useMountedState.md}
 *
 * This helps with resolve the `Can't perform a React state update on an unmounted component.`
 * warning coming from React when asyncronously loading a component prior to its parent
 * being mounted to the DOM.
 */
export function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false)
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  })

  return get
}

/**
 * @name useFirstMountState
 * @description Returns true if component is just mounted (on first render) and false otherwise.
 *
 * @see {@link https://github.com/streamich/react-use/blob/master/docs/useFirstMountState.md}
 *
 * @example
 * ```
 * const Demo = () => {
 *   const isFirstMount = useFirstMountState();
 *   const update = useUpdate();
 *
 *   return (
 *     <div>
 *       <span>This component is just mounted: {isFirstMount ? 'YES' : 'NO'}</span>
 *       <br />
 *       <button onClick={update}>re-render</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFirstMountState(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}
