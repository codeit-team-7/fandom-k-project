import { useCallback, useEffect, useRef, useState } from 'react';
import { ObserverContext } from '@pages/my-page/app/contexts';
import useMyPageState from '../hooks/useMyPageState';
import useFetchPageData from '../hooks/useFetchPageData';

export default function ObserverProvider({ children }) {
  const { QueryState, DatasState } = useMyPageState();
  const { state: queryState, dispatch: queryDispatch } = QueryState;
  const { state: datasState, dispatch: datasDispatch } = DatasState;

  const [getLazyData, { isLoading, isError }] = useFetchPageData();
  const [isPossibleFetch, setisPossibleFetch] = useState(true);

  const observerRef = useRef(null);
  const [status, setStatus] = useState({});

  const queryStateRef = useRef(null);
  const datasStateRef = useRef(null);

  const loadItemsOnLast = useCallback(async () => {
    if (isPossibleFetch === false) return;
    const queryState = queryStateRef.current;
    const datasState = datasStateRef.current;
    const pageSize = queryState.pageSize;
    const cursor = datasState.cursors[queryState.cursorIndex];

    if (cursor === null) return;

    const response = await getLazyData({ pageSize, cursor });

    if (response === null) return;

    const data = await response.json();
    const { list, nextCursor } = data;

    if (list.length === 0) {
      setisPossibleFetch(false);
      return;
    }

    const newCursorIndex = queryState.cursorIndex + 1;
    const newCursors = [...datasState.cursors, nextCursor];
    const newDatas = [...datasState.datas, list];

    queryDispatch({ type: 'UPDATE', payload: { cursorIndex: newCursorIndex } });
    datasDispatch({ type: 'UPDATE', payload: { datas: newDatas, cursors: newCursors } });
  }, [datasDispatch, getLazyData, isPossibleFetch, queryDispatch]);

  useEffect(() => {
    queryStateRef.current = queryState;
    datasStateRef.current = datasState;
  });

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || !entry.target) return;
        const imgEl = entry.target;
        const tmpEl = new Image();
        tmpEl.src = imgEl.dataset.src;

        setStatus(prevStatus => ({
          ...prevStatus,
          [imgEl.id]: 'pending',
        }));

        tmpEl.onload = () => {
          imgEl.src = tmpEl.src;
          setStatus(prevStatus => ({
            ...prevStatus,
            [imgEl.id]: 'fullfield',
          }));
        };

        tmpEl.onerror = () => {
          setStatus(prevStatus => ({
            ...prevStatus,
            [imgEl.id]: 'rejected',
          }));
        };

        const last = String(imgEl.dataset.last);
        if (last === 'true') {
          loadItemsOnLast();
        }
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadItemsOnLast]);

  return (
    <ObserverContext.Provider value={{ observer: observerRef.current, status }}>{children}</ObserverContext.Provider>
  );
}
