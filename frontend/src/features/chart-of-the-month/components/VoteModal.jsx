import { useState } from 'react';

import { VoteModalLayout } from '../styles/VoteModal.styles';
import VoteModalTop from './VoteModalTop';
import VoteModalMain from './VoteModalMain';
import VoteModalBottom from './VoteModalBottom';

export default function VoteModal({
  idolList,
  handleModal,
  handleVote,
  observer,
  gender,
  isLoading,
}) {
  const [checkedId, setCheckedId] = useState();

  const handleChecked = id => {
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
        isLoading={isLoading}
      />
      <VoteModalBottom onClick={onClickVote} checkedId={checkedId} />
    </VoteModalLayout>
  );
}
