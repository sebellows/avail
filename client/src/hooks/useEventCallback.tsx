import { useEffect, useCallback, useRef } from 'react';

export function useEventCallback<Cb extends (...args: any[]) => any>(fn?: Cb | null): Cb {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    function (...args: any[]) {
      return ref.current && ref.current(...args);
    },
    [ref],
  ) as any;
}
