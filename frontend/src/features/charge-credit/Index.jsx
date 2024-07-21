import React, { useState } from 'react';
import creditIcon from '@assets/icons/ic_credit.svg';
import creditWhiteIcon from '@assets/icons/credit_white.svg';
import deleteBtn24 from '@assets/icons/btn_delete_24px.svg';
import { ModalBg } from '@shared/styles/ModalBg';
import styled from 'styled-components';

const ChargeModal = styled.div`
  ${({ theme }) => `
    background-color: ${theme.colors.BLACK[100]};
  `}
  position: fixed;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  width: 327px;
  height: 372px;
  border-radius: 8px;
  padding: 0 16px;
  z-index: 20;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`;
const Title = styled.span`
  ${({ theme }) => `
   font-size: ${theme.fontSize['LG']}px;
  `}
  color: #ffffff;
`;
const CloseBtn = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectPrice = styled.div`
  display: flex;
  align-items: center;
`;

const SelectLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 62px;
  border: 1px solid #f7f7f8;
  cursor: pointer;
  border-radius: 5px;
  ${({ checked }) => checked && `border-color: #f96d69;`}
`;

const SelectIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SelectAmount = styled.span`
  ${({ theme }) => `
   font-size: ${theme.fontSize['XLG']}px;
  `}
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  background-color: #8c92ab;
  width: 16px;
  height: 16px;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #8c92ab;
  &:checked {
    background-color: #f96d96;
    box-shadow: 0 0 0 1px #f96d96;
  }
`;

const ChargeButton = styled.button.attrs({ type: 'submit' })`
  display: flex;
  width: 100%;
  height: 42px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  background: linear-gradient(to right, #f86f65, #fe5493);
  cursor: pointer;
  border-radius: 3px;
`;

const ChargeButtonIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const ChargeButtonText = styled.span`
  color: #ffffff;
`;

export default function Index({ onChargeClick }) {
  const [selectedCredit, setSelectedCredit] = useState('100');

  const handleCreditChange = e => {
    setSelectedCredit(e.target.value);
  };

  const getCharge = () => {
    return Number(localStorage.getItem('credit'));
  };

  const handleCreditCharge = e => {
    e.preventDefault();
    const creditTemp = getCharge() + Number(selectedCredit);
    localStorage.setItem('credit', creditTemp);
    if (onChargeClick) {
      onChargeClick();
    }
  };
  const creditValue = [100, 200, 300];
  return (
    <>
      <ModalBg />
      <ChargeModal>
        <form onSubmit={handleCreditCharge}>
          <TopSection>
            <Title>크레딧 충전하기</Title>
            <CloseBtn onClick={onChargeClick} src={deleteBtn24} alt='삭제 버튼' />
          </TopSection>
          <Select>
            {creditValue.map(credit => {
              return (
                <SelectLabel htmlFor={`${credit}`} checked={selectedCredit === `${credit}`}>
                  <SelectPrice>
                    <SelectIcon src={creditIcon} alt='creditIcon' />
                    <SelectAmount>{credit}</SelectAmount>
                  </SelectPrice>
                  <RadioInput
                    type='radio'
                    name='credit'
                    id={`${credit}`}
                    value={`${credit}`}
                    checked={selectedCredit === `${credit}`}
                    onChange={handleCreditChange}
                  />
                </SelectLabel>
              );
            })}
          </Select>
          <ChargeButton>
            <ChargeButtonIcon src={creditWhiteIcon} alt='creditWhiteIcon' />
            <ChargeButtonText>충전하기</ChargeButtonText>
          </ChargeButton>
        </form>
      </ChargeModal>
    </>
  );
}
