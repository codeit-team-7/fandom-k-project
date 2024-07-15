import { useEffect, useRef, useState } from "react";

import ChartTop from "./ChartTop";
import ChartMain from "./ChartMain";

import { getIdolList } from "./api";
import { postVote } from "./api";

import { ChartLayout } from "./Index.style";
import { ModalBg } from "@styles/ModalBg";
import VoteModal from "./VoteModal";

const INITIAL_LIST = {
  female: [],
  male: [],
};
const INITIAL_CURSOR = {
  female: 0,
  male: 0,
};
export default function Index() {
  const [idolList, setIdolList] = useState(INITIAL_LIST);
  const [cursor, setCursor] = useState(INITIAL_CURSOR);
  const [gender, setGender] = useState("female");
  const [showItemNum, setShowItemNum] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);

  const loadIdols = async () => {
    if (gender === "female" && cursor.female === null) {
      return;
    }
    if (gender === "male" && cursor.male === null) {
      return;
    }
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    if (showItemNum === 0) {
      setShowItemNum(pageSize);
    }
    const { idols, nextCursor } = await getIdolList({
      cursor,
      gender,
      pageSize,
    });
    if (!idols?.length) {
      return;
    }

    if (gender === "female") {
      setIdolList((prev) => ({
        ...prev,
        female: [...prev.female, ...idols],
      }));
    } else {
      setIdolList((prev) => ({
        ...prev,
        male: [...prev.male, ...idols],
      }));
    }
    setCursor((prev) =>
      gender === "female"
        ? { ...prev, female: nextCursor }
        : { ...prev, male: nextCursor }
    );
  };
  const handleViewMoreButton = async () => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    const hasItemNum =
      gender === "female" ? idolList.female.length : idolList.male.length;

    if (hasItemNum < showItemNum + pageSize) {
      loadIdols({ gender, cursor });
    }
    setShowItemNum((prev) => prev + pageSize);
  };

  const handleGenderChange = (gender) => {
    const pageSize = window.innerWidth > 1024 ? 10 : 5;
    setGender(gender);
    setShowItemNum(pageSize);
  };

  const handleModal = () => {
    if (!isOpenVote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setIsOpenVote(!isOpenVote);
  };

  const handleVoteButton = async (id) => {
    try {
      await postVote(id);
      setIdolList((prev) => {
        const updateList = prev[gender].map((item) => {
          return item.id === id
            ? { ...item, totalVotes: item.totalVotes + 1 }
            : item;
        });
        updateList.sort((a, b) => b.totalVotes - a.totalVotes);
        return { ...prev, [gender]: updateList };
      });
    } catch (err) {
      console.log("Vote post 실패", err);
    }
  };
  useEffect(() => {
    loadIdols({ cursor, gender });
  }, []);

  return (
    <>
      <ChartLayout>
        <ChartTop onClick={handleModal} />
        <ChartMain
          idolList={gender === "female" ? idolList.female : idolList.male}
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
            idolList={gender === "female" ? idolList.female : idolList.male}
            handleModal={handleModal}
            handleVote={handleVoteButton}
          />
        </>
      )}
    </>
  );
}
