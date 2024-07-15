import creditIcon from "@assets/icons/ic_credit.svg";
import styled from "styled-components";

const CreditConainer = styled.div`
  padding: 0 24px;
`;

const CreditBox = styled.div`
  ${({ theme }) => `

  background-color: ${theme.colors.BLACK[200]};
   `}
  display:flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #f1eef9;
  height: 87px;
  @media (min-width: 728px) {
    height: 131px;
  }
  @media (min-width: 1024px) {
    max-width: 1200px;
  }
`;

const MyCredit = styled.span`
  ${({ theme }) => `
  font-size: ${theme.fontSize["3xSM"]}px;
  color: #ffffff;
  `}
  @media (min-width: 728px) {
    font-size: 16px;
  }
`;

const CreditAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const CreditAmount = styled.div`
  ${({ theme }) => `
  font-size: ${theme.fontSize["XLG"]}px;
  
  `}
  color: #ffffff;
  @media (min-width: 728px) {
    font-size: 24px;
  }
`;

const Charge = styled.div`
  ${({ theme }) => `
  color: ${theme.colors.BRAND[100]};
  font-size: ${theme.fontSize["2xSM"]}px;
  
  `}
  cursor: pointer;
  @media (min-width: 728px) {
    font-size: 16px;
  }
`;

const CreditIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: -2px;
`;

const getCharge = () => {
  return Number(localStorage.getItem("credit"));
};

export default function Index({ onChargeClick }) {
  const credit = getCharge();
  return (
    <CreditConainer>
      <CreditBox>
        <div>
          <MyCredit>내 크레딧</MyCredit>
          <CreditAmountContainer>
            <CreditIcon src={creditIcon} alt="크레딧 아이콘" />
            <CreditAmount>{credit.toLocaleString("ko-kr")}</CreditAmount>
          </CreditAmountContainer>
        </div>
        <Charge onClick={onChargeClick}>충전하기</Charge>
      </CreditBox>
    </CreditConainer>
  );
}
