import React, { lazy, useEffect, useState } from 'react';

/**
 * Lazy load secondary components that don’t need to render on the first view.
 *
 * See {@link https://levelup.gitconnected.com/4-custom-hooks-to-boost-your-react-app-d54aefe34061}
 *
 * @example
 * ```
 * const importModal = () => import('./components/Modal');
 *
 * const App = (props) => {
 *   const [show, setShow] = useState(false);
 *
 *   return <div>
 *     <Suspense fallback={<h1>Waiting for...</h1>}>
 *       {show && <Modal />}
 *     </Suspense>
 *   </div>;
 * }
 * ```
 * @param factory
 */
export function usePreFetch(factory: () => Promise<any>) {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    factory();
    const comp = lazy(factory);
    setComponent(comp);
  }, [factory]);

  return component;
}
