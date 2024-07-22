import styled from 'styled-components';

import ObserverProvider from '@pages/my-page/components/ObserverProvider';

import { media } from '@utils';
import { Fragment, useEffect, useRef, useState } from 'react';
import ImageComponent from '../components/ImageComponent';
import { getCurrentPageSize, getDeviceMode } from '../../../pages/my-page/app/utils';

const S = {
  Section: styled.section`
    padding: 1rem;
  `,
  SubTitle: styled.h4`
    ${({ theme }) => `
      ${media.base`
        font-weight: 700;
        padding: 0 ${24};
      `}  

      ${media.md`
        font-size: ${theme.fontSize.XLG};
      `}
    `}
  `,
  ContentWrap: styled.div`
    ${() => `
      ${media.base`
      `}
      ${media.sm`
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: auto;
        align-items: center;
        justify-content: center;
        column-gap: 1rem;
      `}  
    `}
  `,
  Prev: styled.button`
    ${() => `
      ${media.base`
        display: none;
        width: ${29};
        height: ${135};
        border-radius: ${4};
        background: #1b1b1b;
        color: white;
      `}

      ${media.sm`
        display: block;
        visibility: visible;

        &.none {
          visibility: hidden;
        }
      `}
    `}
  `,
  Next: styled.button`
    ${() => `
      ${media.base`
        display: none;
        width: ${29};
        height: ${135};
        border-radius: ${4};
        background: #1b1b1b;
        color: white;

        
      `}

      ${media.sm`
        display: block;
        visibility: visible;

        &.none {
          visibility: hidden;
        }
      `}
    `}
  `,
  Items: styled.ul`
    ${({ $cols }) => `
      ${media.base`
        overflow: auto hidden;
        display: grid;
        grid-template-columns: repeat(${$cols}, ${90});
        grid-template-rows: repeat(2, fit-content);
        column-gap: ${16};
        width: 100%;
        height: ${400};
        padding: ${32} ${24}; 
      `}

      ${media.sm`
        grid-template-columns: repeat(4, ${120});
        grid-template-rows: repeat(2, fit-content);
      `}

      ${media.md`
        grid-template-columns: repeat(8, ${120});
        grid-template-rows: repeat(2, fit-content);
      `}
    `}
  `,
  Item: styled.li`
    ${() => media.base`
      
    `}
  `,
  Texts: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Name: styled.p`
    ${() => media.base`
      font-weight: 700;
    `}
  `,
  Group: styled.p`
    ${() => media.base`
      font-size: ${14};
      opacity: 0.6;
    `}
  `,
};

export default function Index({ handlePage, queryState, datasState }) {
  const itemsRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const deviceMode = getDeviceMode(window.innerWidth);

  let nestedDatas;
  let flatDatas;
  let cols = '0';

  if (deviceMode === 'mobile') {
    nestedDatas = [...datasState.datas];
    flatDatas = nestedDatas?.flat();
    cols = String(Math.ceil(getCurrentPageSize(window.innerWidth) / 2) * datasState.datas.length);
  } else {
    const { datas, cursors, renderPosition } = datasState;
    const { cursorIndex } = queryState;
    flatDatas = datas[renderPosition];
    console.log(flatDatas);
  }

  useEffect(() => {
    const element = itemsRef?.current;
    if (element) {
      element.scrollLeft = scrollPosition;
    }
  }, [scrollPosition, flatDatas]);

  const handleScrollWithPosition = e => {
    setScrollPosition(e.target.scrollLeft);
  };

  const currentRenderPosition = datasState.renderPosition;

  return (
    <S.Section>
      <S.SubTitle>관심 있는 아이돌을 추가해보세요</S.SubTitle>
      <S.ContentWrap>
        <S.Prev id='prev' className={currentRenderPosition === 0 && 'none'} onClick={handlePage}>
          {'<'}
        </S.Prev>
        <ObserverProvider>
          <S.Items ref={itemsRef} onScroll={handleScrollWithPosition} $cols={cols}>
            {flatDatas?.map(({ id, profilePicture, name, group }, index) => {
              const last = index === flatDatas.length - 1;
              return (
                <Fragment key={id}>
                  <S.Item>
                    <ImageComponent id={id} src={profilePicture} last={last} />
                    <S.Texts>
                      <S.Name>{name}</S.Name>
                      <S.Group>{group}</S.Group>
                    </S.Texts>
                  </S.Item>
                </Fragment>
              );
            })}
          </S.Items>
        </ObserverProvider>
        <S.Next className={`${!flatDatas?.length && 'none'}`} id='next' onClick={handlePage}>
          {'>'}
        </S.Next>
      </S.ContentWrap>
    </S.Section>
  );
}
