import styled from "styled-components";
import { media } from "@utils";
/**모달창 기본레이아웃입니다.
width와 height는 직접 추가,
모달 최하단이 버튼이 아니라면 padding-bottom에 대한 수정이 필요함*/
export const ModalLayout = styled.div`
  ${({ theme }) =>
    `${media.base`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: ${24};
  padding-left: ${24}; 
  padding-right: ${24}; 
  padding-bottom: ${32}; 
  background-color: ${theme.colors.BLACK[100]};
  z-index: 11;
  `}`}
`;
