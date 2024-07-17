import styled from "styled-components";
import DeleteBtn24 from "@assets/icons/btn_delete_24px.svg";
import Cedit from "@assets/icons/ic_credit.svg";
import { ModalBg } from "@shared/styles/ModalBg";
import { ModalLayout } from "@shared/styles/ModalLayout";
import { Button } from "@shared/styles/Button";
import { media } from "@shared/utils/media-query/index";
import { useState } from "react";
import { getRecheckApi, putDonationsApi } from "./api";

const FundingModal = styled(ModalLayout)`
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
  object-fit: cover;
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
  outline: none;
  border: ${({ isOverCredit }) => (isOverCredit ? `1px solid #FF2626` : `1px solid #fff`)};
  ${({ theme }) => `
  margin-top: 24px;
  width: 295px;
  height: 58px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  padding: 16px 48px 16px 16px;
  color: ${theme.colors.WHITE[100]};
  background-color: #272f3d;
  ::placeholder {
    color: ${theme.colors.GRAY[300]};
  }
  
  `}
`;

const ModalFundingWaring = styled.p`
  width: 100%;
  color: #ff2626;
  font-size: 12px;
  font-weight: 500;
  margin-top: 6px;
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
export default function IdolFundingModal({ item, onFundingClick, myCredit, setIsReRendering }) {
  const {
    id,
    status,
    subtitle,
    title,
    targetDonation,
    profilePicture = item.idol.profilePicture,
    idolId = item.idol.id,
  } = item;
  const [creditUse, setCreditUse] = useState("");
  const [isInValid, setIsInValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOverCredit, setIsOverCredit] = useState(false);

  const deductCredit = () => {
    const resultCredit = myCredit - Number(creditUse);
    localStorage.setItem("credit", resultCredit);
  };

  const onChangeCredit = (e) => {
    const currentEnterCredit = e.target.value;
    if (!currentEnterCredit || currentEnterCredit === "0") {
      setIsInValid(true);
      setCreditUse("");
      setIsOverCredit(false);
    } else if (Number(currentEnterCredit) > myCredit) {
      setIsInValid(true);
      setIsOverCredit(true);
      setCreditUse(Number(currentEnterCredit));
    } else {
      setIsInValid(false);
      setIsOverCredit(false);
      setCreditUse(Number(currentEnterCredit));
    }
  };

  const fetchReCheckData = async (idolId) => {
    try {
      const result = await getRecheckApi(idolId);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    if (isInValid || isProcessing) return;
    setIsProcessing(true);
    try {
      const result = await fetchReCheckData(idolId);
      const check = result.list[0];
      if (reCheckItem(check)) {
        putDonationsApi(id, Number(creditUse));
        deductCredit();
        alert(`후원이 성공적으로 완료되었습니다.`);
        onFundingClick();
      }
    } catch (error) {
      console.error(error);
      alert(`오류 발생`);
    } finally {
      setIsProcessing(false);
      setIsReRendering(true);
    }
  };

  const reCheckItem = (result) => {
    if (result) {
      const reCheckStatus = status === result.status;
      const reCheckValidCredit = targetDonation >= result.receivedDonations + Number(creditUse);
      const overCredit = result.receivedDonations + Number(creditUse) - targetDonation;
      const validType = reCheckStatus && reCheckValidCredit;
      if (overCredit > 0) {
        alert(`목표 후원 금액을 ${overCredit}크레딧 초과하였습니다.`);
      } else if (!reCheckStatus) {
        alert(`이미 마감된 후원입니다.`);
      } else {
        return validType;
      }
    }
  };

  return (
    <>
      <ModalBg />
      <FundingModal>
        <ModalHeader>
          <ModalFundingTitle>후원하기</ModalFundingTitle>
          <ModalCloseBtn src={DeleteBtn24} alt="모달창 닫기 버튼" onClick={onFundingClick} />
        </ModalHeader>
        <ModalInfoContainer>
          <ModalImg src={profilePicture} alt="후원할 아이돌 이미지" />
          <ModalInfo>
            <ModalTag>{subtitle}</ModalTag>
            <ModalTitle>{title}</ModalTitle>
          </ModalInfo>
        </ModalInfoContainer>
        <ModalFundingInput
          onChange={onChangeCredit}
          value={creditUse}
          type="number"
          placeholder="크레딧 입력"
          $isOverCredit={isOverCredit}
        ></ModalFundingInput>
        <ModalFundingWaring>
          {isOverCredit ? "갖고 있는 크레딧보다 더 많이 후원할 수 없어요" : ""}
        </ModalFundingWaring>
        <ModalFundingButton onClick={onClick} $activable={isInValid}>
          {isProcessing ? "처리 중..." : "후원하기"}
        </ModalFundingButton>
      </FundingModal>
    </>
  );
}
