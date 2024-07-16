import { useState } from "react";

import { VoteModalLayout } from "./VoteModal.style";
import VoteModalTop from "./VoteModalTop";
import VoteModalMain from "./VoteModalMain";
import VoteModalBottom from "./VoteModalBottom";

export default function VoteModal({
  idolList,
  handleModal,
  handleVote,
  observer,
  gender,
}) {
  const [checkedId, setCheckedId] = useState();

  const handleChecked = (id) => {
    setCheckedId(id);
  };
  const onClickVote = () => {
    if (!checkedId) {
      return;
    }
    handleVote(checkedId);
    setCheckedId(null);
  };

  return (
    <VoteModalLayout>
      <VoteModalTop handleModal={handleModal} gender={gender} />
      <VoteModalMain
        idolList={idolList}
        onClickCheck={handleChecked}
        checkedId={checkedId}
        observer={observer}
      />
      <VoteModalBottom onClick={onClickVote} />
    </VoteModalLayout>
  );
}
