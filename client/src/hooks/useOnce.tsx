import * as React from 'react';

type CallOnceResult<T> = { value: T };

export function useOnce<T>(fn: () => T): T {
  const ref = React.useRef<CallOnceResult<T>>();

  if (!ref.current) {
    ref.current = { value: fn() };
  }

  return ref.current.value;
}
