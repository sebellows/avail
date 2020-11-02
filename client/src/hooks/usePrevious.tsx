import { useEffect, useRef } from 'react'

/**
 * From react-restart/hooks <https://github.com/react-restart/hooks>
 * @author Jason Quense <https://github.com/jquense>
 * @license MIT {@see https://github.com/react-restart/hooks/blob/master/LICENSE}
 *
 * @description
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */
export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
