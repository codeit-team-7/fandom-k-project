import styled from 'styled-components';
import Cedit from '@assets/icons/ic_credit.svg';
import { ModalLayout } from '@shared/styles/ModalLayout';
import { Button } from '@shared/styles/Button';
import { media } from '@shared/utils/media-query/index';

export const FundingModal = styled(ModalLayout)`
  padding: 24px 16px 32px 16px;
  border-radius: 8px;
  width: 327px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ModalFundingTitle = styled.p`
  ${({ theme }) => `
  font-size: ${18};
  font-weight: 600;
  color: ${theme.colors.WHITE[100]};
  `}
`;

export const ModalCloseBtn = styled.img`
  cursor: pointer;
`;
export const ModalInfoContainer = styled.div`
  width: 158px;
`;

export const ModalImg = styled.img`
  object-fit: cover;
  margin-top: 24px;
  width: 100%;
  height: 206px;
  border-radius: 8px;
  box-shadow: 0px 0px 40px 0px rgba(255, 255, 255, 0.1);
`;

export const ModalInfo = styled.div`
  width: 100%;
  justify-content: left;
  margin-top: 10px;
  padding: 0 2px;
  gap: 6px;
`;

export const ModalTag = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    opacity: 0.4;
    font-weight: 400;
    font-size: ${12};
    margin-top: 10px;
    `}
`;

export const ModalTitle = styled.p`
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

export const ModalFundingInput = styled.input`
  background-image: url(${Cedit});
  background-position: calc(100% - 8px) center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
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

export const ModalFundingWaring = styled.p`
  width: 100%;
  color: #ff2626;
  font-size: 12px;
  font-weight: 500;
  margin-top: 6px;
`;

export const ModalFundingButton = styled(Button)`
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
