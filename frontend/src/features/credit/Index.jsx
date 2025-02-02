import creditIcon from '@assets/icons/ic_credit.svg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChargeCredit } from '@features';

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
  font-size: ${theme.fontSize['3xSM']}px;
  color: #ffffff;
  `}
  opacity: 60%;
  font-weight: 400;
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
  font-size: ${theme.fontSize['XLG']}px;
  
  `}
  font-weight:700;
  color: #ffffff;
  @media (min-width: 728px) {
    font-size: 24px;
  }
`;

const Charge = styled.div`
  ${({ theme }) => `
  color: ${theme.colors.BRAND[100]};
  font-size: ${theme.fontSize['2xSM']}px;
  
  `}
  font-weight: 700;
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
  return Number(localStorage.getItem('credit'));
};

export default function Index() {
  const [credit, setCredit] = useState(getCharge());
  const [chargeModal, setChargeModal] = useState(false);

  const handleChargeModal = () => {
    setChargeModal(chargeModal ? false : true);

    document.body.style.overflow = chargeModal ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCredit(getCharge());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentCredit = getCharge();
      if (currentCredit !== credit) {
        setCredit(currentCredit);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [credit]);

  return (
    <>
      {chargeModal && <ChargeCredit onChargeClick={handleChargeModal} />}
      <CreditConainer>
        <CreditBox>
          <div>
            <MyCredit>내 크레딧</MyCredit>
            <CreditAmountContainer>
              <CreditIcon src={creditIcon} alt='크레딧 아이콘' />
              <CreditAmount>{credit.toLocaleString('ko-kr')}</CreditAmount>
            </CreditAmountContainer>
          </div>
          <Charge onClick={handleChargeModal}>충전하기</Charge>
        </CreditBox>
      </CreditConainer>
    </>
  );
}
