import styled from "styled-components";

import { media } from "@utils";

export const IdolListUl = styled.ul`
  ${({ theme }) =>
    `${media.base`
      margin-bottom: 17px;
      display: flex;
      flex-direction: column;
      width: 100%;
      .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      width: 100%;
      font-size: ${theme.fontSize.XSM};
        .idol {
        display: flex;
        gap: 12px;
          .group, .name {
          opacity: 0.87;
          }
          .rank{
          color: ${theme.colors.BRAND[100]};
          }
        }
        .votes {
        color: #fff;
        opacity: 0.6;

        }
      }
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
  `}
  `}
`;
