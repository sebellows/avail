import { useEffect, useLayoutEffect, useReducer, EffectCallback, DependencyList } from 'react'
import { useFirstMountState } from './useMounted'

/**
 * `useUpdate` and `useUpdateEffect` come from the React-Use library.
 * @see {@link https://github.com/streamich/react-use/blob/master/src/useUpdateEffect.ts}
 */

const updateReducer = (num: number): number => (num + 1) % 1_000_000

export const useUpdate = () => {
  const [, update] = useReducer(updateReducer, 0)
  return update as () => void
}

export const useUpdateEffect: typeof useEffect = (effect: EffectCallback, deps: DependencyList) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export const useUpdateLayoutEffect: typeof useLayoutEffect = (
  effect: EffectCallback,
  deps: DependencyList,
) => {
  const isFirstMount = useFirstMountState()

  useLayoutEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
