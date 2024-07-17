import { useEffect, useRef, useState } from 'react';

import ChartTop from './ChartTop';
import ChartMain from './ChartMain';

import { getIdolList } from './api';
import { postVote } from './api';

import { ChartLayout } from './Index.style';
import { ModalBg } from '@styles/ModalBg';
import VoteModal from './VoteModal';
import NotEnoughModal from './NotEnoughModal';

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
  const [cursor, setCursor] = useState(INITIAL_CURSOR);
  const [showItemNum, setShowItemNum] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);
  const [isNotEnough, setIsNotEnough] = useState(false);
  const observerRef = useRef();
  const cursorRef = useRef(cursor);

  const loadIdols = async ({ retry = 3 } = {}) => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    const genderCursor =
      gender === 'female' ? cursorRef.current.female : cursorRef.current.male;
    if (genderCursor === null) {
      return;
    }
    if (showItemNum === 0) {
      setShowItemNum(pageSize);
    }

    const { idols, nextCursor } = await getIdolList({
      cursor: genderCursor,
      gender,
      pageSize,
    });
    if (idols === null && retry) {
      loadIdols({ retry: retry - 1 });
      return;
    }
    if (idols === null) {
      return;
    }
    setCursor(prev => {
      cursorRef.current =
        gender === 'female'
          ? { ...prev, female: nextCursor }
          : { ...prev, male: nextCursor };
      return cursorRef.current;
    });
    if (!idols?.length) {
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
  };

  const handleViewMoreButton = () => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    const hasItemNum =
      gender === 'female' ? idolList.female.length : idolList.male.length;

    if (hasItemNum < showItemNum + pageSize) {
      loadIdols();
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
        return item.id === id
          ? { ...item, totalVotes: item.totalVotes + 1 }
          : item;
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
    console.log('실행');
    setIsOpenVote(false);
  };

  const handleNotEnough = () => {
    setIsNotEnough(false);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    loadIdols();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && cursor[gender] !== null) {
        loadIdols();
      }
    });

    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <ChartLayout>
        <ChartTop onClick={handleVoteModal} />
        <ChartMain
          idolList={gender === 'female' ? idolList.female : idolList.male}
          onClickGender={handleGenderChange}
          onClickViewMore={handleViewMoreButton}
          gender={gender}
          showItemNum={showItemNum}
        />
      </ChartLayout>

      {isOpenVote && (
        <>
          <ModalBg />
          <VoteModal
            idolList={gender === 'female' ? idolList.female : idolList.male}
            handleModal={handleVoteModal}
            handleVote={handleVoteButton}
            observer={observerRef.current}
            gender={gender}
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
