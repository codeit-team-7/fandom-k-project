import { useEffect, useRef, useState } from 'react';

import { getIdolList } from './api';
import { postVote } from './api';

import ChartMain from './components/ChartMain';
import VoteModal from './components/VoteModal';
import NotEnoughModal from './components/NotEnoughModal';

import { ModalBg } from '@styles/ModalBg';

const INITIAL_LIST = {
  female: [],
  male: [],
};
const INITIAL_CURSOR = {
  female: 0,
  male: 0,
};
export default function Index() {
  const [gender, setGender] = useState('female');
  const [idolList, setIdolList] = useState(INITIAL_LIST);
  const [showItemNum, setShowItemNum] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);
  const [isNotEnough, setIsNotEnough] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollObserverRef = useRef();
  const lastItemRef = useRef();
  const cursorRef = useRef(INITIAL_CURSOR);

  const loadIdols = async ({ retry = 3 } = {}) => {
    setIsLoading(true);
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    if (cursorRef.current[gender] === null) {
      setIsLoading(false);
      return;
    }
    if (showItemNum === 0) {
      setShowItemNum(pageSize);
    }
    const { idols, nextCursor } = await getIdolList({
      cursor: cursorRef.current[gender],
      gender,
      pageSize,
    });
    if (idols === null && retry) {
      console.log(`차트 불러오기 실패 남은 재시도 횟수 ${retry}`);
      loadIdols({ retry: retry - 1 });
      return;
    }
    if (idols === null) {
      console.log(`차트 불러오기 실패`);
      return;
    }
    cursorRef.current[gender] = nextCursor;
    if (!idols?.length) {
      setIsLoading(false);
      return;
    }
    if (gender === 'female') {
      setIdolList(prev => ({
        ...prev,
        female: [...prev.female, ...idols],
      }));
    } else {
      setIdolList(prev => ({
        ...prev,
        male: [...prev.male, ...idols],
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!idolList[gender].length) {
      loadIdols();
    }
  }, [gender]);

  const handleViewMoreButton = async () => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    const hasItemNum = gender === 'female' ? idolList.female.length : idolList.male.length;

    if (hasItemNum < showItemNum + pageSize) {
      await loadIdols();
      setShowItemNum(prev => prev + pageSize);
      return;
    }
    setShowItemNum(prev => prev + pageSize);
  };

  const handleGenderChange = gender => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    setGender(gender);
    setShowItemNum(pageSize);
  };

  const handleVoteModal = () => {
    if (!isOpenVote) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setIsOpenVote(!isOpenVote);
  };

  const handleVoteButton = async (id, { retry = 3 } = {}) => {
    const credit = localStorage.getItem('credit');
    if (credit < 1000) {
      setIsOpenVote(false);
      setIsNotEnough(true);
      return;
    }
    const voteResult = await postVote(id);
    setIdolList(prev => {
      const updateList = prev[gender].map(item => {
        return item.id === id ? { ...item, totalVotes: item.totalVotes + 1 } : item;
      });
      updateList.sort((a, b) => b.totalVotes - a.totalVotes);
      return { ...prev, [gender]: updateList };
    });
    if (!voteResult && retry) {
      console.log(`투표재요청 남은횟수${retry}`);
      handleVoteButton({ id, retry: retry - 1 });
      return;
    }
    if (!voteResult) {
      console.log('투표 실패');
      return;
    }
    localStorage.setItem('credit', credit - 1000);
    setIsOpenVote(false);
    document.body.style.overflow = 'auto';
  };

  const handleNotEnough = () => {
    setIsNotEnough(false);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showItemNum]);

  useEffect(() => {
    scrollObserverRef.current = new IntersectionObserver(entries => {
      if (cursorRef.current[gender] === null) {
        scrollObserverRef.current.disconnect();
        return;
      }
      if (entries[0].isIntersecting && !isLoading) {
        loadIdols();
      }
    });

    return () => {
      scrollObserverRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <ChartMain
        idolList={gender === 'female' ? idolList.female.slice(0, showItemNum) : idolList.male.slice(0, showItemNum)}
        onClickGender={handleGenderChange}
        onClickViewMore={handleViewMoreButton}
        gender={gender}
        showItemNum={showItemNum}
        lastItemRef={lastItemRef}
        onClickOpenVote={handleVoteModal}
        isLoading={isLoading}></ChartMain>

      {isOpenVote && (
        <>
          <ModalBg />
          <VoteModal
            idolList={gender === 'female' ? idolList.female : idolList.male}
            handleModal={handleVoteModal}
            handleVote={handleVoteButton}
            observer={scrollObserverRef.current}
            gender={gender}
            isLoading={isLoading}
          />
        </>
      )}
      {isNotEnough && (
        <>
          <ModalBg />
          <NotEnoughModal onClick={handleNotEnough} />
        </>
      )}
    </>
  );
}
