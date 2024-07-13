import styled from "styled-components";

import { media } from "@utils";

export const VoteModalBottomBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      display:flex;
      flex-direction: column;
      gap: 12px;
      padding: 10px 0;
      button{
      cursor: pointer;
      }
      p {
      font-weight: 500;
      font-size: ${theme.fontSize["3xSM"]}
      }
      .info {
      display: flex;
      justify-content: center;
      }
      .strong{
      color: ${theme.colors.BRAND[100]}
      }
  `}${media.md`
padding-bottom: 0;
  `}`}
`;
