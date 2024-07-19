import styled from 'styled-components';
import { media } from '@utils';

export const Container = styled.div`
  ${props => `
    ${media.base`
      width: min(${props.$width} - ${props.$padding} * 2, 100%);
      height: auto;
      margin-inline: auto;
    `}
  `}
`;
