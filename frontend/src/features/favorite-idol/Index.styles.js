import { media } from '@utils';
import styled from 'styled-components';

export const StyledSection = styled.section`
  ${({ theme }) => `
    ${media.base`
      user-select: none;
      
      .title {
        padding: 0 ${24} ${57};
      }

      .items-wrap {
        min-height: ${165};
        padding: 0 ${24};
      }

      .items {
        display: flex;
        column-gap: ${17};
        overflow-x: scroll;
      }

      .items::-webkit-scrollbar {
        width: 100%;
        height: ${2};
      }

      .items::-webkit-scrollbar-thumb {
        background: #414047;
      }

      .items::-webkit-scrollbar-track {
        background: #transparent;
      }

      .item {
        position: relative;
      }

      .item-picture {
        overflow: hidden;
        width: ${115};
        height: ${115};
        padding: ${7};
        border: 2px solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
      }

      .item-img {
        border: none;
        border-radius: inherit;
        object-fit: cover;
      }

      .item-delete {
        cursor: pointer;
        position: absolute; 
        transform: translate(${70}, ${8});
        scale: 1.3;
      }
    `}
  `}
`;
