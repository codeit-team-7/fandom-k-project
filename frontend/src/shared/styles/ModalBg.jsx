import styled from 'styled-components';
import { media } from '@utils';

export const ModalBg = styled.div`
  ${() =>
    `${media.base`
      position: fixed;
      background-color: #000;
      opacity: 0.8;
      inset: 0 0 0 0;
      z-index: 10;
  `}`}
`;
