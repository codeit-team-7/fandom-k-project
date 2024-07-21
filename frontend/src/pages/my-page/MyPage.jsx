import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useMyPageState from './hooks/useMyPageState';
import useFetchPageData from './hooks/useFetchPageData';
import { AddYourFavoriteIdols, FavoriteIdols } from '@features/my-page';
import { Container } from '@styles/MyPageStyles';

const S = {
  Main: styled.main`
    user-select: none;
  `,
  Container: styled(Container)``,
};

export default function MyPage() {
  const { QueryState, DatasState } = useMyPageState();
  const { state: queryState, dispatch: queryDispatch } = QueryState;
  const { state: datasState, dispatch: datasDispatch } = DatasState;
  const [getLazyData, { isLoading, isError }] = useFetchPageData();

  const queryStateRef = useRef(queryState);
  const datasStateRef = useRef(datasState);

  useEffect(() => {
    queryStateRef.current = queryState;
    datasStateRef.current = datasState;
  });

  const init = useCallback(async () => {
    const pageSize = queryStateRef.current.pageSize;
    const cursor = datasStateRef.current.cursors[datasStateRef.current.cursorIndex];
    const response = await getLazyData({ pageSize, cursor });
    if (response === null) return;
    const data = await response.json();
    const { list, nextCursor } = data;
    queryDispatch({ type: 'UPDATE', payload: { cursorIndex: 1 } });
    datasDispatch({ type: 'UPDATE', payload: { datas: [list], cursors: [0, nextCursor] } });
  }, [datasDispatch, getLazyData, queryDispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <S.Main>
      <S.Container $width={1960} $padding={360}>
        <FavoriteIdols />
        <AddYourFavoriteIdols />
      </S.Container>
    </S.Main>
  );
}
