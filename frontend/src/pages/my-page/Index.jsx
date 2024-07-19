import styled from 'styled-components';

import { media } from '@utils';
import { Container } from '@styles/StylesByWoosung';
import { useEffect, useMemo, useRef, useState } from 'react';

const dummies = [
  {
    id: 1,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720601735177/chawon.png',
    name: '채원',
    group: '르세라핌',
  },
  {
    id: 2,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720603156587/jihyo.png"',
    name: '지효',
    group: '트와이스',
  },
  {
    id: 3,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720601910966/gyuri.png',
    name: '장규리',
    group: '프로미스나인',
  },
  {
    id: 4,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720601735177/chawon.png',
    name: '채원',
    group: '르세라핌',
  },
  {
    id: 5,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720603189894/jisun.png',
    name: '지선',
    group: '프로미스나인',
  },
  {
    id: 6,
    profilePicture:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Fandom-K/idol/1720603205358/kazha.png',
    name: '카즈하',
    group: '르세라핌',
  },
];

const Main = styled(Container)`
  display: grid;
  grid-auto-flow: rows;
  grid-auto-rows: auto;
  ${media.base` 
    row-gap: ${32};
  `}
`;

const Hr = styled.div`
  width: 100%;
  background: gray;
  opacity: 0.4;
  ${media.base`
    height: ${2};
  `}
`;

const Section2 = styled.section``;
const H2 = styled.h1``;
const Feature = styled.div``;
const Prev = styled.button`
  display: none;
`;
const Next = styled.button`
  display: none;
`;
const Items = styled.ul``;
const Item = styled.li``;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Picture = styled.picture``;
const Img = styled.img``;

const LoadableImage = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef();

  const toggleLoading = () => setIsLoading(prevState => !prevState);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('Is intersecting...');
            const img = entry.target;
            const tmp = new Image();
            tmp.src = img.dataset.src;
            tmp.onload = () => {
              toggleLoading();
              img.src = tmp.src;
            };
          }
        },
        {
          threshold: 0.1,
        },
      ),
    [],
  );

  useEffect(() => {
    const currentRef = ref.current;
    currentRef && observer.observe(currentRef);
    return () => {
      currentRef && observer.unobserve(currentRef);
    };
  }, [observer]);

  return (
    <Picture>
      <Img ref={ref} $isLoading={isLoading} alt='' data-src={src} />
    </Picture>
  );
};

export default function Index() {
  return (
    <Main as={'main'} $width={1920} $padding={360}>
      <section>
        <H2>내가 관심있는 아이돌</H2>
      </section>
      <Hr className='hr'></Hr>
      <Section2>
        <H2>내가 관심있는 아이돌을 추가해보세요</H2>
        <Feature>
          <Prev>{'<'}</Prev>
          <Items>
            {dummies.map(data => (
              <Item key={data.id}>
                <LoadableImage src={data.profilePicture} />
                <Box>
                  <span>{data.name}</span>
                  <span>{data.group}</span>
                </Box>
              </Item>
            ))}
          </Items>
          <Next>{'>'}</Next>
        </Feature>
      </Section2>
    </Main>
  );
}
