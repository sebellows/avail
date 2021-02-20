import { useEffect, useRef } from 'react'
import { useFirstMountState } from './useMountedState'

export function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}

export type Predicate<T> = (prev: T | undefined, next: T) => boolean

const strictEquals = <T>(prev: T | undefined, next: T) => prev === next

/**
 * @name usePreviousDistinct
 * @description
 * This will only update once the value actually changes. This is important when other
 * hooks are involved and you aren't just interested in the previous props version,
 * but want to know the previous distinct value.
 *
 * You can either set just a value to check against AND you can also provide a way of
 * identifying the value as unique. By default, a strict equals is used (as in example below).
 *
 * @example
 * ```
 * const Demo = () => {
 *   const [str, setStr] = React.useState("something_lowercase")
 *   const [unrelatedCount] = React.useState(0)
 *   const prevStr = usePreviousDistinct(str, (prev, next) => (prev && prev.toUpperCase()) === next.toUpperCase())
 *
 *   return (
 *     <p>
 *       Now: {count}, before: {prevCount}
 *       Unrelated: {unrelatedCount}
 *     </p>
 *   )
 * }
 * ```
 */
export function usePreviousDistinct<T>(
  value: T,
  compare: Predicate<T> = strictEquals,
): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>(value)
  const isFirstMount = useFirstMountState()

  if (!isFirstMount && !compare(curRef.current, value)) {
    prevRef.current = curRef.current
    curRef.current = value
  }

  return prevRef.current
}
