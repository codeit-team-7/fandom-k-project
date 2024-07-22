import styled from 'styled-components';
import { media } from '@utils';

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
  border-radius: 8px;
  z-index: 11;
  `}`}
`;
