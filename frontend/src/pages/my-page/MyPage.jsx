import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ObserverProvider from './components/ObserverProvider';
import useMyPageState from './hooks/useMyPageState';
import useFetchPageData from './hooks/useFetchPageData';
import ImageComponent from './components/ImageComponent';
import { Container } from '@styles/StylesByWoosung';
import { media } from '@utils';

const S = {
  Main: styled.main``,
  Container: styled(Container)``,
  Section1: styled.section``,
  Section2: styled.section``,
  SubTitle: styled.h4``,
  ContentWrap: styled.div``,
  Prev: styled.button``,
  Next: styled.button``,
  Items: styled.ul`
    ${({ $cols }) => media.base`
      display: grid;
      grid-template-columns: repeat(${$cols}, minmax(${90}, ${120}));
      grid-template-rows: repeat(2, fit-content);
      justify-content: start;
      column-gap: ${16};
      overflow: auto hidden;
    `}
  `,
  Item: styled.li``,
  Texts: styled.div``,
  Name: styled.p``,
  Group: styled.p``,
};

export default function MyPage() {
  const { QueryState, DatasState } = useMyPageState();
  const { state: queryState, dispatch: queryDispatch } = QueryState;
  const { state: datasState, dispatch: datasDispatch } = DatasState;
  const [getLazyData, { isLoading, isError }] = useFetchPageData();

  const queryStateRef = useRef(null);
  const datasStateRef = useRef(null);

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

  const nestedDatas = [...datasState.datas];
  const flatDatas = nestedDatas?.flat();
  const cols = String(Math.ceil(queryState.pageSize / 2) * datasState.datas.length);
  return (
    <S.Main>
      <S.Container $width={1960} $padding={360}>
        <S.Section1>
          <S.SubTitle>관심 있는 아이돌</S.SubTitle>
        </S.Section1>
        <S.Section2>
          <S.SubTitle>관심 있는 아이돌</S.SubTitle>
          <S.ContentWrap>
            <S.Prev>{'<'}</S.Prev>
            <ObserverProvider>
              <S.Items $cols={cols}>
                {flatDatas?.map(({ id, profilePicture, name, group }, index) => {
                  const last = index === flatDatas.length - 1;
                  return (
                    <S.Item key={id} $cols={cols}>
                      <ImageComponent id={id} src={profilePicture} last={last} />
                      <S.Texts>
                        <S.Name>{name}</S.Name>
                        <S.Group>{group}</S.Group>
                      </S.Texts>
                    </S.Item>
                  );
                })}
              </S.Items>
            </ObserverProvider>
            <S.Next>{'>'}</S.Next>
          </S.ContentWrap>
        </S.Section2>
      </S.Container>
    </S.Main>
  );
}
