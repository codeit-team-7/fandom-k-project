import styled from 'styled-components';

import { media } from '@utils';

import { ModalLayout } from '@styles/ModalLayout';

export const VoteModalLayout = styled(ModalLayout)`
  ${({ theme }) =>
    `${media.base`
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.BLACK[200]};
      padding-bottom: 12px;
  `}${media.md`
    position: fixed;
    width: 525px;
    height: 693px;
      background-color: ${theme.colors.BLACK[100]};
  `}`}
`;
