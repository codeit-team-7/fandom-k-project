import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useObserver from '@pages/my-page/hooks/useObserver';
import useMyPageState from '@pages/my-page/hooks/useMyPageState';
import checkIcon from '@assets/icons/ic_check.svg';
import { ObserverContext } from '@pages/my-page/app/contexts';
import { media } from '@utils';

const S = {
  ImgWrap: styled.picture`
    ${({ theme }) => `
      ${media.base`
        position: relative;
        overflow: hidden;
        max-width: ${120};
        width: 100%;
        border: 2px solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
        padding: ${7};
        
        &::before {
          display: none;
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - ${12});
          height: calc(100% - ${12});
          border-radius: inherit;
          background: rgba(255, 0, 0, 0.3);
          background-image: url(${checkIcon});
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        &.checked::before {
          display: block;
        }
      `}
    `}
  `,
  Img: styled.img`
    ${() => media.base`
        position: relative;
        max-width: ${120};
        width: 100%;
        border: none;
        border-radius: inherit;

        @media (hover: hover) {
          &:hover {
            scale: 1.02;
          }
        }
    `};
  `,
};

export default function ImageComponent({ id, src, last }) {
  const {
    DatasState: { state: datasState },
    FavoriteState: { state: favoriteState, update: favoriteUpdate },
  } = useMyPageState();
  const { observer, status } = useObserver(ObserverContext);
  const imgRef = useRef(null);
  const favoriteStateRef = useRef(favoriteState);
  const datasStateRef = useRef(datasState);

  const handleClick = e => {
    const { currentTarget } = e;
    const img = currentTarget.firstChild;
    const id = Number(img.id.substring(img.id.indexOf('-') + 1));
    const datas = datasStateRef.current.datas;
    const found = datas.flatMap(subArr => subArr).find(item => item.id === id);
    favoriteUpdate(found);
  };

  useEffect(() => {
    favoriteStateRef.current = favoriteState;
    datasStateRef.current = datasState;
  });

  useEffect(() => {
    const currentRef = imgRef.current;
    if (observer && currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observer]);

  const favorited = favoriteState.findIndex(item => item.id === id);

  return (
    <S.ImgWrap
      className={`${favorited !== -1 ? 'checked' : ''} ${status === 'pending' ? 'pending' : ''}`}
      onClick={handleClick}>
      <S.Img ref={imgRef} id={`img-${id}`} alt='' data-src={src} data-last={last} />
    </S.ImgWrap>
  );
}
