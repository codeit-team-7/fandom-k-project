import { media } from '@utils';
import styled from 'styled-components';

export const StyledSection = styled.section`
  ${({ theme }) => `
    ${media.base`
      user-select: none;

      #prev,
      #next {
        display: none;
      }

      .title {
        padding: 0 ${24};
      }

      .items {
        overflow: scroll hidden;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        column-gap: ${17};
        row-gap: ${24};
        padding: 0 ${24};
        height: ${360};
      }

      .dummy {
        width: ${119};
        height: ${167};
      }
        
      .item-picture {
        overflow: hidden;
        position: relative;
        border: 2px solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
        z-index: 1;
      }

      .item-picture.active {
        .item-img__check {
          opacity: 1;
        }
      }

      .item-img {
        width: ${88};
        height: ${88};      
        padding: ${5};
        border: none;
        border-radius: inherit;
        object-fit: cover;
      }

      .item-img__check {
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .item-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .item-picture.active::before {
        content: '';
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - ${8});
        height: calc(100% - ${8});
        border-radius: 50%;
        background: red;
        opacity: 0.3;
      }

      .item-picture::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          opacity: 0;
      }

      @media (hover: hover) {
        .item-picture:not(.active):hover::after {
          opacity: 1;
        }
      }
    `}

    ${media.md`
      .content-wrap {
        display: grid;
        grid-template:
          "prev items next" auto
          "prev items next" auto
        / auto auto auto;  
        justify-content: center;
      }

      .title {
        margin-bottom: ${57};
      }

      .items {
       overflow: hidden;
       min-width: ${599};
      }

      .item-picture {
        width: fit-content;
        height: fit-content;
      }

      .item-img {
        width: ${115};
        height: ${115};
      }

      #prev,
      #next {
        cursor: pointer;
        display: block;
        align-self: center;
        width: ${29};
        height: ${135};
        border-radius: ${4};
        color: white;
        background: #1b1b1b;
      }

      #prev.hidden,
      #next.hidden {
        visibility: hidden
      }

      #prev { 
        grid-area: prev;
      }

      #next {
        grid-area: next;
      }

      .items {
        grid-area: items;
      }
    `}

    ${media.xlg`
      .items {
        min-width: ${1119};
      }
    `}
  `}
`;
