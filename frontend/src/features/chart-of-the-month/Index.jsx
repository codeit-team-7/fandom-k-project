import { useEffect, useRef, useState } from "react";

import ChartTop from "./ChartTop";
import ChartMain from "./ChartMain";

import { getIdolList } from "./api";

import { ChartLayout } from "./Index.style";
import { ModalBg } from "@styles/ModalBg";
import VoteModal from "./VoteModal";

export default function Index() {
  const [gender, setGender] = useState("female");
  const [idolList, setIdolList] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);

  const loadIdols = async ({ cursor, gender, scroll = false }) => {
    const { idols, nextCursor } = await getIdolList({ cursor, gender });
    if (idols) {
      setIdolList((prev) => [...prev, ...idols]);
      setCursor(nextCursor);
    }
  };
  const handleViewMoreButton = (e) => {
    loadIdols({ cursor, gender, scroll: true });
  };
  const handleModal = () => {
    if (!isOpenVote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setIsOpenVote(!isOpenVote);
  };

  const handleGenderChange = (gender) => {
    setCursor(0);
    setIdolList([]);
    setGender(gender);
  };

  useEffect(() => {
    loadIdols({ cursor, gender });
  }, [gender]);

  return (
    <>
      <ChartLayout>
        <ChartTop onClick={handleModal} />
        <ChartMain
          idolList={idolList}
          onClickGender={handleGenderChange}
          onClickViewMore={handleViewMoreButton}
          cursor={cursor}
          gender={gender}
        />
      </ChartLayout>
      {isOpenVote && (
        <>
          <ModalBg />
          <VoteModal idolList={idolList} handleModal={handleModal} />
        </>
      )}
    </>
  );
}
