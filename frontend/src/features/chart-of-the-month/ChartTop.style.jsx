import styled from "styled-components";

import { media } from "@utils";

import { Button } from "@styles/Button";

export const ChartTopBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      display: flex;
      justify-content: space-between;

      & .chart-text {
      font-size:${theme.fontSize.XLG};
      font-weight: 700;
      }
  `}`}
`;

export const OpenVoteButton = styled(Button)`
  ${({ theme }) =>
    `${media.base`
      width: 128px;
      height: 32px;
      font-size: ${theme.fontSize["2xSM"]};
      gap: 4px;
  `}`}
`;
