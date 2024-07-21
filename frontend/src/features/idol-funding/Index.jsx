import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '@shared/styles/LoadingSpinner';
import { getFundingApi } from './api';
import FundingItem from './components/FundingItem.jsx';
import * as S from './styles/Index.style.js';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemNum, setItemNum] = useState(0);
  const [isReRendering, setIsReRendering] = useState(false);
  const itemRefs = useRef([]);

  // 카드의 처음과 마지막은 화살표 버튼 안 보이게 설정
  const showArrowButton = direction => {
    const lastNum = items.length - 1;
    if (direction === 'left') {
      return itemNum === 0;
    } else if (direction === 'right') {
      return lastNum - 3 === itemNum;
    }
  };

  // 받아온 값만큼 지정한 item으로 scrollIntoView 합니다.
  const scrollItem = nextItemNum => {
    setItemNum(nextItemNum);
    if (itemRefs.current[nextItemNum]) {
      itemRefs.current[nextItemNum].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
        inline: 'start',
      });
    }
  };

  const onClickRight = () => {
    const lastNum = items.length - 1;
    if (lastNum - 3 <= itemNum) return;
    const nextItemNum = itemNum + 1;
    scrollItem(nextItemNum);
  };

  const onClickLeft = () => {
    if (itemNum < 1) return;
    const nextItemNum = itemNum - 1;
    scrollItem(nextItemNum);
  };

  const fetchItemData = async () => {
    try {
      const result = await getFundingApi();
      setItems(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchItemData();
    setIsReRendering(false);
  }, [isReRendering]);

  if (loading) {
    return (
      <S.MyLoadingSpinner>
        <LoadingSpinner />
      </S.MyLoadingSpinner>
    );
  }
  const cutItems = [...items];

  return (
    <S.Container>
      <S.Title>후원을 기다리는 조공</S.Title>
      <S.Box>
        {showArrowButton('left') ? (
          <></>
        ) : (
          <S.LgArrowBtnLeft direction='left' onClick={onClickLeft} />
        )}
        <S.FundingItems>
          {cutItems.map((item, i) => (
            <li key={item.id} ref={el => (itemRefs.current[i] = el)}>
              <FundingItem
                id={`content${i}`}
                item={item}
                setIsReRendering={setIsReRendering}
              />
            </li>
          ))}
        </S.FundingItems>
        {showArrowButton('right') ? (
          <></>
        ) : (
          <S.LgArrowBtnRight direction='right' onClick={onClickRight} />
        )}
      </S.Box>
    </S.Container>
  );
}
