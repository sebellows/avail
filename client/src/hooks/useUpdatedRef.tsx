import { useRef } from 'react';

/**
 * From react-restart/hooks <https://github.com/react-restart/hooks>
 * @author Jason Quense <https://github.com/jquense>
 * @license MIT {@see https://github.com/react-restart/hooks/blob/master/LICENSE}
 *
 * @description
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */
export function useUpdatedRef<T>(value: T) {
  const valueRef = useRef<T>(value);
  valueRef.current = value;
  return valueRef;
}
