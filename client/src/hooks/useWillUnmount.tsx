import { useEffect, useRef } from 'react';

/**
 * @description
 * Attach a callback that fires when a component unmounts
 *
 * From react-restart/hooks <https://github.com/react-restart/hooks>
 * @author Jason Quense <https://github.com/jquense>
 * @license MIT {@see https://github.com/react-restart/hooks/blob/master/LICENSE}
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
export function useWillUnmount(fn: () => void) {
  const onUnmount = useRef(fn);
  onUnmount.current = fn;

  useEffect(() => () => onUnmount.current(), []);
}
