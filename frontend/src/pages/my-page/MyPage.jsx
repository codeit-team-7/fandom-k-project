import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useMyPageState from './hooks/useMyPageState';
import useFetchPageData from './hooks/useFetchPageData';
import useDebounce from './hooks/useDebounce';

import { getCurrentPageSize } from './app/utils';
import { AddYourFavoriteIdols, FavoriteIdols } from '@features/my-page';
import { Container } from '@styles/MyPageStyles';
import AddButton from './components/AddButton';
import { useNavigate } from 'react-router-dom';

const S = {
  Main: styled.main`
    user-select: none;
  `,
  Container: styled(Container)``,
};

export default function MyPage() {
  const {
    QueryState: { state: queryState, dispatch: queryDispatch },
    DatasState: { state: datasState, dispatch: datasDispatch },
    FavoriteState: { state: FavoriteState },
  } = useMyPageState();

  const queryStateRef = useRef(queryState);
  const datasStateRef = useRef(datasState);
  const favoriteStateRef = useRef(FavoriteIdols);
  const navigate = useNavigate();

  const [getLazyData, { isLoading, isError }] = useFetchPageData();

  const add = useCallback(
    async (type, retry = 2) => {
      const currentQueryState = queryStateRef.current;
      const currentDataState = datasStateRef.current;
      const { pageSize, cursorIndex } = currentQueryState;
      const { datas, cursors, renderPosition } = currentDataState;

      let newRenderPosition;
      if (type === 'NEXT' && datas[renderPosition + 1] !== undefined) {
        newRenderPosition = renderPosition + 1;
      } else if (type === 'PREV' && renderPosition - 1 !== -1) {
        newRenderPosition = renderPosition - 1;
        datasDispatch({ type: 'UPDATE', payload: { renderPosition: newRenderPosition } });
        return;
      }

      if (newRenderPosition !== undefined) {
        datasDispatch({ type: 'UPDATE', payload: { renderPosition: newRenderPosition } });
        return;
      }

      const cursor = cursors[cursorIndex];
      if (cursor === null) return;
      const response = await getLazyData({ pageSize, cursor });
      if (response === null) {
        if (retry === 0) {
          return;
        }
        setTimeout(() => {
          add(type, retry - 1);
        }, 3000);
        return;
      }
      const data = await response.json();
      const { list, nextCursor } = data;
      let newCursors;
      let newCursorIndex;
      let newDatas;
      newCursors = [...cursors, nextCursor];
      newCursorIndex = cursorIndex + 1;
      newDatas = [...datas, list];
      newRenderPosition = renderPosition + 1;
      queryDispatch({ type: 'UPDATE', payload: { cursorIndex: newCursorIndex } });
      datasDispatch({
        type: 'UPDATE',
        payload: { datas: newDatas, cursors: newCursors, renderPosition: newRenderPosition },
      });
    },
    [datasDispatch, getLazyData, queryDispatch],
  );

  const handlePage = e => {
    const type = String(e.target.id).toUpperCase();
    add(type);
  };

  const handleAddClick = () => {
    const favoriteState = favoriteStateRef.current;
    localStorage.setItem('my-page', JSON.stringify(favoriteState));
    navigate('/list');
  };

  const init = useCallback(
    async (retry = 2) => {
      const pageSize = getCurrentPageSize(window.innerWidth);
      const cursor = datasStateRef.current.cursors[datasStateRef.current.cursorIndex];
      const response = await getLazyData({ pageSize, cursor });
      if (response === null) {
        if (retry === 0) {
          console.error('Request Error');
          return;
        }
        setTimeout(() => {
          init(retry - 1);
        }, 3000);
        return;
      }
      const data = await response.json();
      const { list, nextCursor } = data;
      queryDispatch({ type: 'UPDATE', payload: { cursorIndex: 1 } });
      datasDispatch({ type: 'UPDATE', payload: { datas: [list], cursors: [0, nextCursor] } });
    },
    [datasDispatch, getLazyData, queryDispatch],
  );

  const debouncedHandleResize = useDebounce(() => init(), 300);

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    queryStateRef.current = queryState;
    datasStateRef.current = datasState;
    favoriteStateRef.current = FavoriteState;
  });

  return (
    <S.Main>
      <S.Container $width={1960} $padding={360}>
        <FavoriteIdols />
        <AddYourFavoriteIdols handlePage={handlePage} queryState={queryState} datasState={datasState} />
        <AddButton handleClick={handleAddClick} />
      </S.Container>
    </S.Main>
  );
}
