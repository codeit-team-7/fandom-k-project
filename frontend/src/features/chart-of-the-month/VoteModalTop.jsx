import { VoteModalTopBox } from "./VoteModalTop.style";

import icClose from "@assets/icons/btn_delete_24px.svg";
import icLeft from "@assets/icons/ic_arrow_left.svg";

const TITLE = {
  male: "이달의 남자 아이돌",
  female: "이달의 여자 아이돌",
};
export default function VoteModalTop({ handleModal }) {
  return (
    <VoteModalTopBox>
      <button className="back-button" onClick={handleModal}>
        <img src={icLeft} alt="뒤로가기" />
      </button>
      <span>{TITLE.female}</span>
      <button className="close-button" onClick={handleModal}>
        <img src={icClose} alt="투표창 닫기" />
      </button>
    </VoteModalTopBox>
  );
}
