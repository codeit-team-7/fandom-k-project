import styled from "styled-components";

import { media } from "@utils";

export const IdolListUl = styled.ul`
  ${({ theme }) =>
    `${media.base`
      margin-bottom: 17px;
      display: flex;
      flex-direction: column;
      flex-wrap:wrap;
      width: 100%;
      .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: ${theme.fontSize.XSM};
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
        .idol {
        display: flex;
        gap: 12px;
        align-items: center;
          .group, .name {
          opacity: 0.87;
          }
          .rank{
          color: ${theme.colors.BRAND[100]};
          }
          .img{
          width: 70px;
          height: 70px;
          }
        }
        .votes {
        color: #fff;
        opacity: 0.6;
        }
      }
      .list-item:last-child {
      border: none ; }
  `}
  ${media.md`
      margin-bottom: 3px
  `}
  ${media.lg`
      margin-bottom: 27px;
      flex-direction: row;
      gap: 1%;

      .list-item {
      width: 49.5%;
      }
      .list-item:nth-last-child(2) {
      border: none ; }
  `}
  `}
`;
