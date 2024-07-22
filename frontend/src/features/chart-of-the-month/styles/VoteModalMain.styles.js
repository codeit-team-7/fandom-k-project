import styled from 'styled-components';

import { media } from '@utils';

import { LoadingSpinner } from '@styles/LoadingSpinner';
export const VoteModalMainBox = styled.ul`
  ${({ theme }) =>
    `${media.base`
      padding: 10px 0;
      flex-grow: 1;
      display : flex;
      flex-direction: column;
      font-size: ${theme.fontSize.XSM};
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      .
      &:-webkit-scrollbar
      display: none;

      .list-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      align-items: center;
      cursor: pointer;
        .check {
        background-color: inherit;
        
        }
      }
      .idol {
      display: flex;
      align-items: center;
      gap: 12px;
      }
      .group, .name {
      opacity: 0.87;
      }
      .group {
      padding-right: 10px;}
      .rank{
      color: ${theme.colors.BRAND[100]};
      }
        .img{
          width: 70px;
          height: 70px;
          padding : 5px;
          border: 1px solid ${theme.colors.BRAND[100]};
          border-radius: 50%;
          overflow:hidden;
          img {
          border-radius : 50%;
          object-fit: cover;
          }
        }
      .votes {
      color: #fff;
      opacity: 0.6;
      } 
      .voteWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      }
      .observer {
      width:100px;
      height:100px;
      }
      .spinner-box{
      display: flex;
      justify-content: center;
      }
  `}
  ${media.md`
    height: 540px;
    `}
  `}
`;

export const LoadingItem = styled(LoadingSpinner)``;
