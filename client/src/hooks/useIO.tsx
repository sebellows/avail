import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Use IntersectionObserver for handling things like infinite scrolling
 * lazy loading, and many other scroll related events.
 *
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver}
 *
 * @example
 * ```
 * const InfiniteScroll = () => {
 *   const [scrollingList, setScrollingList] = useState([]);
 *   const fetchMoreItems = useCallback(() => fetchItemsFn('/api/items'));
 *   const [targetRef] = useIntersect({
 *     onIntersect: (entry) => {
 *       const newItems = fetchMoreItems();
 *       setScrollingList([...scrollingList, ...newItems]);
 *     },
 *     threshold: [.8]
 *   });
 *
 *   return (
 *     <div className="infinite-scroll-list">
 *       {scrollingList.map((item, i) => (
 *         <Card key={i} className="mb-3">
 *           <Card.Body>{i}. This is a card.</Card.Body>
 *         </Card>
 *       ))}
 *       <Spinner ref={targetRef} animation="border" variant="primary" role="status"></Spinner>
 *     </div>
 *   );
 * }
 * ```
 */
export const useIO = ({
  root = null,
  rootMargin = '0px',
  threshold = [0.98, 0.99, 1],
  onIntersect,
}) => {
  // This gets exported and will allow the developer to have access
  // to the IntersectionObserverEntry instance's properties.
  const [entry, updateEntry] = useState(null);
  // We use `useState` here instead of `useRef` for handling our
  // target element, because we may not get access to it otherwise.
  const [target, setTarget] = useState(null);

  const observer = useRef<IntersectionObserver>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        updateEntry(entry);
        if (onIntersect && entry.intersectionRatio > 0 && entry.isIntersecting) {
          onIntersect(entry);
        }
      });
    },
    [onIntersect, updateEntry],
  );

  useEffect(() => {
    // Destroy any existing current IntersectionObserver to
    // prevent the same one from being used each time.
    if (observer.current) observer.current.disconnect();

    // Prevent the creation of a new IntersectionObserver instance whenever
    // our component re-renders by creating it inside of `useEffect`.
    // This also allows us to update any configuration of the IntersectionObserver.
    observer.current = new IntersectionObserver(handleObserver, { root, rootMargin, threshold });

    // Assignment via destructuring ensures we have a defined instance,
    // because `current` may have been reassigned at some point.
    const { current: currentObserver } = observer;

    // Observe our target Ref
    if (target) currentObserver.observe(target);

    // When component is unmounted, this will be fired for cleanup.
    return () => currentObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, handleObserver]);

  return [setTarget, entry];
};
