import styled, { keyframes } from "styled-components";

import { media } from "@utils";

export const ChartMainBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      display:flex;
      flex-direction: column;
      gap: 16px;
  `}${media.md`
      gap: 24px;
  `}
  `}
`;

export const GenderSelectBox = styled.div`
  ${({ theme, $gender }) =>
    `${media.base`
      position: relative;
      .gender {
      width: 50%;
      height: 42px;
      background-color: inherit;
      }
      .female {
      color: ${$gender === `female` ? `#fff;` : `${theme.colors.GRAY[200]};`}
      }
      .male {
      color: ${$gender === `male` ? `#fff;` : `${theme.colors.GRAY[200]};`}
      }
      .gender-selector {
      display: inline-block;
      position: absolute;
      top: 0;
      ${$gender === `male` ? `right: 0;` : `left: 0;`}
      width: 50%;
      height: 42px;
      background-color: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid;
  }
  `}`}
`;
// ${theme.colors.GRAY[200]}
