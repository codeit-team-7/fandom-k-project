import { useEffect, useState } from "react";

import ChartTop from "./ChartTop";
import ChartMain from "./ChartMain";

import { getIdolList } from "./api";

import { ChartLayout } from "./Index.style";
import { ModalBg } from "@styles/ModalBg";
import VoteModal from "./VoteModal";

export default function Index() {
  const [idols, setIdols] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [isOpenVote, setIsOpenVote] = useState(false);
  const loadIdols = async ({ cursor }) => {
    const { list, nextCursor } = await getIdolList({ cursor });
    setIdols((prev) => [...prev, ...list]);
    setCursor(nextCursor);
  };
  const handleViewMoreButton = () => {
    loadIdols({ cursor: cursor });
  };
  const handleOpenModal = () => {
    setIsOpenVote(true);
  };

  useEffect(() => {
    loadIdols({ cursor: cursor });
  }, []);
  return (
    <>
      <ChartLayout>
        <ChartTop onClick={handleOpenModal} />
        <ChartMain
          idols={idols}
          onClickViewMore={handleViewMoreButton}
          cursor={cursor}
        />
      </ChartLayout>
      {isOpenVote && (
        <>
          <ModalBg />
          <VoteModal />
        </>
      )}
    </>
  );
}
