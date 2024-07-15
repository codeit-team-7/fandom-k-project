import styled from "styled-components";
import DeleteBtn24 from "@assets/icons/btn_delete_24px.svg";
import Cedit from "@assets/icons/credit.svg";
import { ModalBg } from "../../shared/styles/ModalBg";
import { ModalLayout } from "./../../shared/styles/ModalLayout";
import { Button } from "../../shared/styles/Button";
import { media } from "./../../shared/utils/media-query/index";
import { useState } from "react";

const FundingMoadl = styled(ModalLayout)`
  padding: 24px 16px 32px 16px;
  border-radius: 8px;
  width: 327px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ModalFundingTitle = styled.p`
  ${({ theme }) => `
  font-size: ${18};
  font-weight: 600;
  color: ${theme.colors.WHITE[100]};
  `}
`;

const ModalCloseBtn = styled.img`
  cursor: pointer;
`;
const ModalInfoContainer = styled.div`
  width: 158px;
`;

const ModalImg = styled.img`
  margin-top: 24px;
  width: 100%;
  height: 206px;
  border-radius: 8px;
  box-shadow: 0px 0px 40px 0px rgba(255, 255, 255, 0.1);
`;

const ModalInfo = styled.div`
  width: 100%;
  justify-content: left;
  margin-top: 10px;
  padding: 0 2px;
  gap: 6px;
`;

const ModalTag = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    opacity: 0.4;
    font-weight: 400;
    font-size: ${12};
    margin-top: 10px;
    `}
`;

const ModalTitle = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis; 
    font-size: ${14};
    margin-top: 6px;
  `}
`;

const ModalFundingInput = styled.input`
  background-image: url(${Cedit});
  background-position: calc(100% - 8px) center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
  ${({ theme }) => `
  margin-top: 24px;
  width: 295px;
  height: 58px;
  border-radius: 8px;
  border: 1px solid #fff;
  font-size: 20px;
  font-weight: 700;
  padding: 16px 48px 16px 16px;
  color: ${theme.colors.WHITE[100]};
  background-color: #272f3d;
  outline: none;
  ::placeholder {
    color: ${theme.colors.GRAY[300]};
  }
  
  `}
`;
const ModalFundingButton = styled(Button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 700;
  height: 42px;
  ${media.base`
    font-size: ${14};
  `}
`;
export default function IdolFundingModal({ onFundingClick }) {
  const [isInValid, setIsInValid] = useState(true);

  return (
    <>
      <ModalBg />
      <FundingMoadl>
        <ModalHeader>
          <ModalFundingTitle>후원하기</ModalFundingTitle>
          <ModalCloseBtn src={DeleteBtn24} alt="모달창 닫기 버튼" onClick={onFundingClick} />
        </ModalHeader>
        <ModalInfoContainer>
          <ModalImg src={Cedit} alt="후원할 아이돌 이미지" />
          <ModalInfo>
            <ModalTag>태그 이름</ModalTag>
            <ModalTitle>타이틀 이름</ModalTitle>
          </ModalInfo>
        </ModalInfoContainer>
        <ModalFundingInput type="number" placeholder="크레딧 입력"></ModalFundingInput>
        <ModalFundingButton $activable={isInValid}>후원하기</ModalFundingButton>
      </FundingMoadl>
    </>
  );
}
