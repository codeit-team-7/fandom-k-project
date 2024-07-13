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
export default function Index() {
  const [gender, setGender] = useState("female");
  const [idolList, setIdolList] = useState(INITIAL_LIST);
  const [cursor, setCursor] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);

  const loadIdols = async ({ cursor = cursor, gender = gender }) => {
    if (cursor === null) {
      return;
    }
    const pageSize = window.innerHeight > 1024 ? 10 : 5;
    console.log("🚀 ~ loadIdols ~ pageSize:", pageSize);
    const { idols, nextCursor } = await getIdolList({
      cursor,
      gender,
      pageSize,
    });
    if (idols.length <= 0) {
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
    setCursor(nextCursor);
  };

  const handleViewMoreButton = () => {
    loadIdols({ cursor, gender });
  };

  const handleGenderChange = (gender) => {
    setCursor(0);
    setIdolList(INITIAL_LIST);
    setGender(gender);
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
    await postVote(id);
  };

  useEffect(() => {
    loadIdols({ cursor, gender });
  }, [gender]);

  return (
    <>
      <ChartLayout>
        <ChartTop onClick={handleModal} />
        <ChartMain
          idolList={gender === "female" ? idolList.female : idolList.male}
          onClickGender={handleGenderChange}
          onClickViewMore={handleViewMoreButton}
          cursor={cursor}
          gender={gender}
        />
      </ChartLayout>

      {isOpenVote && (
        <>
          <ModalBg />
          <VoteModal
            idolList={idolList.female}
            handleModal={handleModal}
            handleVote={handleVoteButton}
          />
        </>
      )}
    </>
  );
}
