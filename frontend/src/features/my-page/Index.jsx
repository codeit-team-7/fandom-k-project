import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import FavoriteList from './FavoriteList';
import FavoritePick from './FavoritePick';
import { BASE_URL } from './common/constants';
import { Button } from '@styles/Button';
import { useContextSelector, useDebounce } from './common/hooks';
import { currentPageSize } from './common/utils';
import { media } from '@utils';
import { useNavigate } from 'react-router-dom';

const getCursor = ({ type, fetchUpdate, cursorIndex, cursors }) => {
  if (type === 'PREV' || type === 'NEXT') {
    return type === 'PREV' ? cursorIndex - 1 : cursorIndex + 1;
  } else {
    return cursors[fetchUpdate ? cursorIndex + 1 : cursorIndex];
  }
};

const Main = styled.section`
  min-height: 100vh;
`;

const FinalAddButton = styled(Button)`
  ${media.base`
    position: relative;
    left: 50%;
    transform: translate(-50%, 50%);
    width: ${255};
    height: ${48};  
    justify-self: center;
  `}
`;

export default function MyPage() {
  const {
    InfoContext: { state: infoState, dispatch: infoDispatch },
    DataContext: { state: dataState, dispatch: dataDispatch },
  } = useContextSelector();
  const [favoriteState, setFavoriteState] = useState([]);
  const infoRef = useRef(infoState);
  const dataRef = useRef(infoState);
  const favoriteRef = useRef(favoriteState);
  const navigate = useNavigate();

  const findItem = id => {
    return dataRef.current.data.flatMap(subset => subset).find(item => item.id === Number(id));
  };

  const updateFavoriteState = useCallback(({ type, id }) => {
    if (type === 'ADD') {
      const newItem = findItem(id);
      setFavoriteState(prevState => [...prevState.filter(old => old.id !== newItem.id), newItem]);
      return;
    }
    setFavoriteState(prevState => [...prevState.filter(old => old.id !== Number(id))]);
  }, []);

  const insertWorking = useCallback(
    ({ type, nextCursor, list }) => {
      infoDispatch({
        type: `FETCH_${type}`,
        payload: nextCursor,
      });
      dataDispatch({
        type: `FETCH_${type}`,
        payload: list,
      });
    },
    [dataDispatch, infoDispatch],
  );

  const updateWorking = useCallback(
    ({ type, list, nextCursor, cursorIndex, renderIndex }) => {
      infoDispatch({
        type: `FETCH_${type}`,
        payload: {
          nextCursor,
          cursorIndex: cursorIndex + 1,
          renderIndex: renderIndex + 1,
        },
      });
      dataDispatch({ type: `FETCH_${type}`, payload: list });
    },
    [dataDispatch, infoDispatch],
  );

  const fetchData = useCallback(
    async ({ type, retry = 2, delay = 1000 } = {}) => {
      dataDispatch({ type: 'FETCH_LOADING' });
      try {
        // renderIndex 확인 요망
        const { pageSize, cursors, cursorIndex, renderIndex, fetchUpdate } = infoRef.current;
        let cursor = getCursor({ type, fetchUpdate, cursors, cursorIndex });
        if (cursor === null) return;
        const response = await fetch(`${BASE_URL}/idols?pageSize=${pageSize}&cursor=${cursor}`);
        if (!response.ok) throw new Error('Fetch failure');
        const result = await response.json();
        const { list, nextCursor } = result;
        if (fetchUpdate) {
          updateWorking({ type: 'UPDATE', nextCursor, list, cursorIndex, renderIndex });
        } else {
          insertWorking({ type, nextCursor, list });
        }
      } catch (error) {
        if (!retry) {
          dataDispatch({ type: 'FETCH_FAILURE', payload: error.message });
          return;
        }
        setTimeout(() => {
          fetchData({ type, retry: retry - 1 });
        }, delay);
      }
    },
    [dataDispatch, insertWorking, updateWorking],
  );

  const handleResize = useCallback(() => {
    const updatedPageSize = currentPageSize(innerWidth);
    infoDispatch({ type: 'FETCH_RESIZE', payload: updatedPageSize });
  }, [infoDispatch]);

  const handleScroll = useCallback(
    e => {
      const { target } = e;
      const { scrollLeft, scrollWidth, offsetWidth } = target;
      if (offsetWidth === scrollWidth - scrollLeft) {
        infoDispatch({ type: 'FETCH_TRIGGER_UPDATE' });
      }
    },
    [infoDispatch],
  );

  const handlePick = useCallback(
    e => {
      const { id } = e.target;
      updateFavoriteState({ type: 'ADD', id });
    },
    [updateFavoriteState],
  );

  const handleDeletePick = useCallback(
    e => {
      const { id } = e.target;
      updateFavoriteState({ type: 'DEL', id });
    },
    [updateFavoriteState],
  );

  const handleFinalAdd = () => {
    localStorage.setItem('MY-PICK', JSON.stringify(favoriteState));
    navigate('/list');
  };

  const debouncedFetchData = useDebounce(fetchData);
  const debouncedHandleResize = useDebounce(handleResize);
  const debouncedHandleScroll = useDebounce(handleScroll);
  const prevNextEvent = e => {
    const type = e.target.id.toUpperCase();
    if (type === 'NEXT') {
      const { renderIndex } = infoRef.current;
      const { data } = dataRef.current;
      if (data[renderIndex + 1]) {
        infoDispatch({ type: `NAVIGATE_NEXT` });
        return;
      }
    }
    infoDispatch({ type: `FETCH_${type}` });
  };

  useEffect(() => {
    infoRef.current = infoState;
    dataRef.current = dataState;
    favoriteRef.current = favoriteState;
  });

  useEffect(() => {
    const storedItems = localStorage.getItem('MY-PICK');
    if (storedItems) {
      setFavoriteState(JSON.parse(storedItems));
    } else {
      setFavoriteState([]);
    }
  }, []);

  useEffect(() => {
    if (!infoState.fetchTrigger) return;
    debouncedFetchData({ type: 'INSERT' });
  }, [infoState.pageSize, infoState.fetchTrigger, debouncedFetchData]);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  return (
    <Main>
      <FavoriteList handleClick={handleDeletePick} favoriteState={favoriteState} />
      <FavoritePick
        favoriteState={favoriteState}
        handleClick={prevNextEvent}
        handlePick={handlePick}
        handleScroll={debouncedHandleScroll}
      />
      <FinalAddButton onClick={handleFinalAdd}>+ 추가하기</FinalAddButton>
    </Main>
  );
}
