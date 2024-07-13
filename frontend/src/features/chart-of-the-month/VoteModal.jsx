import { VoteModalLayout } from "./VoteModal.style";

import VoteModalTop from "./VoteModalTop";
import VoteModalMain from "./VoteModalMain";
import VoteModalBottom from "./VoteModalBottom";

export default function VoteModal({ idolList, handleModal }) {
  return (
    <VoteModalLayout>
      <VoteModalTop handleModal={handleModal} />
      <VoteModalMain idolList={idolList} />
      <VoteModalBottom />
    </VoteModalLayout>
  );
}
