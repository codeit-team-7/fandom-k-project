import styled from "styled-components";

import { media } from "@utils";

export const IdolListUl = styled.ul`
  ${({ theme }) =>
    `${media.base`
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: ${theme.fontSize.XSM};
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border: none;
    }
    .idol {
      display: flex;
      gap: 12px;
      align-items: center;
      .group,
      .name {
        opacity: 0.87;
      }
      .rank {
        color: ${theme.colors.BRAND[100]};
      }
      .img {
        width: 70px;
        height: 70px;
        padding: 5px;
        border: 1px solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
        overflow: hidden;
        img {
          border-radius: 50%;
          object-fit: cover;
        }
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
      .list-item:nth-last-child(2) {
      border: none ; }
  `}
  `}
`;

export const SkeletonUl = styled(IdolListUl)`
  ${({ theme }) =>
    `${media.base`
  background-color: ${theme.colors.GRAY[100]}
`}`}
`;
