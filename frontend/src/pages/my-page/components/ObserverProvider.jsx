import { useCallback, useEffect, useRef, useState } from 'react';
import useMyPageState from '../hooks/useMyPageState';
import useFetchPageData from '../hooks/useFetchPageData';
import { ObserverContext } from '@pages/my-page/app/contexts';
import { getDeviceMode } from '@pages/my-page/app/utils';

export default function ObserverProvider({ children }) {
  const observerRef = useRef(null);
  const [status, setStatus] = useState({});

  const { QueryState, DatasState } = useMyPageState();
  const { state: queryState, dispatch: queryDispatch } = QueryState;
  const { state: datasState, dispatch: datasDispatch } = DatasState;

  const [getLazyData] = useFetchPageData();

  const loadItemsOnLast = useCallback(async () => {
    const pageSize = queryState.pageSize;
    const cursor = datasState.cursors[queryState.cursorIndex];

    if (cursor === null) return;
    const response = await getLazyData({ pageSize, cursor });
    if (response === null) return;

    const data = await response.json();
    const { list, nextCursor } = data;

    let newCursorIndex;
    let newCursors;
    let newDatas;
    if (!(list.length && nextCursor)) {
      newCursorIndex = queryState.cursorIndex;
      newCursors = datasState.cursors;
      newDatas = datasState.datas;
    } else {
      newCursorIndex = queryState.cursorIndex + 1;
      newCursors = [...datasState.cursors, nextCursor];
      newDatas = [...datasState.datas, list];
    }

    queryDispatch({ type: 'UPDATE', payload: { cursorIndex: newCursorIndex } });
    datasDispatch({ type: 'UPDATE', payload: { datas: newDatas, cursors: newCursors } });
  }, [
    datasDispatch,
    datasState.cursors,
    datasState.datas,
    getLazyData,
    queryDispatch,
    queryState.cursorIndex,
    queryState.pageSize,
  ]);

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

        const deviceMode = getDeviceMode(window.innerWidth);
        const last = String(imgEl.dataset.last);
        if (deviceMode === 'mobile' && last === 'true') {
          loadItemsOnLast();
        }

        observerRef.current.unobserve(entry.target);
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadItemsOnLast]);

  return (
    <ObserverContext.Provider
      value={{
        observer: observerRef.current,
        status,
      }}>
      {children}
    </ObserverContext.Provider>
  );
}
