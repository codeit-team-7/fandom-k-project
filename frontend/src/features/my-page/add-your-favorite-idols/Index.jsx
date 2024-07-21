import styled from 'styled-components';

import ObserverProvider from '@pages/my-page/components/ObserverProvider';
import ImageComponent from '@features/my-page/components/ImageComponent';
import useMyPageState from '@pages/my-page/hooks/useMyPageState';
import { Container, Item, SubTitle, Texts, Name, Group } from '@styles/MyPageStyles';
import { media } from '@utils';

const S = {
  Main: styled.main``,
  Container: styled(Container)``,
  ContentWrap: styled.div``,
  Prev: styled.button`
    ${() => media.base`
      display: none;    
    `}
  `,
  Next: styled.button`
    ${() => media.base`
      display: none;    
    `}
  `,
  Items: styled.ul`
    ${({ $cols }) => media.base`
      display: grid;
      grid-template-columns: repeat(${$cols}, ${90});
      grid-template-rows: repeat(2, fit-content);
      justify-content: start;
      column-gap: ${16};
      overflow: auto hidden;
      padding: ${16} ${24};
    `}
  `,
};

export default function Index() {
  const {
    QueryState: { state: queryState },
    DatasState: { state: datasState },
  } = useMyPageState();

  const nestedDatas = [...datasState.datas];
  const flatDatas = nestedDatas?.flat();
  const cols = String(Math.ceil(queryState.pageSize / 2) * datasState.datas.length);

  return (
    <section>
      <SubTitle>관심 있는 아이돌을 추가해보세요</SubTitle>
      <S.ContentWrap>
        <S.Prev>{'<'}</S.Prev>
        <ObserverProvider>
          <S.Items $cols={cols}>
            {flatDatas?.map(({ id, profilePicture, name, group }, index) => {
              const last = index === flatDatas.length - 1;
              return (
                <Item key={id} $cols={cols}>
                  <ImageComponent id={id} src={profilePicture} last={last} />
                  <Texts>
                    <Name>{name}</Name>
                    <Group>{group}</Group>
                  </Texts>
                </Item>
              );
            })}
          </S.Items>
        </ObserverProvider>
        <S.Next>{'>'}</S.Next>
      </S.ContentWrap>
    </section>
  );
}
