import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useObserver from '../hooks/useObserver';
import { ObserverContext } from '../app/contexts';
import { media } from '@utils';

const S = {
  Img: styled.img`
    ${media.base`
      object-fit: cover;
    `};
  `,
};

export default function ImageComponent({ id, src, last }) {
  const ref = useRef(null);
  const { observer, status } = useObserver(ObserverContext);

  useEffect(() => {
    const currentRef = ref.current;
    if (observer && currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observer]);

  return <S.Img ref={ref} id={`img-${id}`} alt='' data-src={src} data-last={last} />;
}
