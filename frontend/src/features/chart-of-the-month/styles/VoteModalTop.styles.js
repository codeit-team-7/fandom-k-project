import styled from 'styled-components';

import { media } from '@utils';

export const VoteModalTopBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      display: flex;
      justify-content: center;
      padding-bottom: 5px;
      font-size: ${theme.fontSize.XSM};
      position: relative;
      button {
        background-color: inherit;
        cursor: pointer;
      }
      .back-button {
        position: absolute;
        top: 4px;
        left: 0;
      }
      .close-button {
      display: none;
      }
  `}${media.md`
      justify-content: space-between;
      font-size: ${theme.fontSize.LG};
      .back-button {
        display: none;
      }
      .close-button {
        display: inline-block;
      }
  `}`}
`;
