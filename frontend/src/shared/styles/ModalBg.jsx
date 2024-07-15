import styled from "styled-components";
import { media } from "@utils";
/**모달창 백그라운드 불투명하게 덮어주는 div입니다 그대로 쓰시면됩니다.*/
export const ModalBg = styled.div`
  ${({ theme }) =>
    `${media.base`
      position: fixed;
      background-color: #000;
      opacity: 0.8;
      inset: 0 0 0 0;
      z-index: 10;
  `}`}
`;
