import styled, { keyframes, css } from "styled-components";

import { media } from "@utils";

import { LoadingSpinner } from "@styles/LoadingSpinner";

const moveRight = keyframes`
  from{ left : 0; }
  to { left : 50%; }
`;

const moveLeft = keyframes`
  from{ right: 0; }
  to { right: 50%; }
`;

export const ChartMainBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      position: relative;
      display:flex;
      flex-direction: column;
      gap: 16px;
  `}${media.md`
      gap: 24px;
  `}
  `}
`;

export const GenderSelectBox = styled.div`
  ${({ theme, $isMale }) => `
    ${media.base`
      position: relative;
      .gender {
      width: 50%;
      height: 42px;
      background-color: inherit;
      cursor: pointer;
      }
      .female {
      color: ${!$isMale ? `#fff;` : `${theme.colors.GRAY[200]};`}
      }
      .male {
      color: ${$isMale ? `#fff;` : `${theme.colors.GRAY[200]};`}
      }
      .gender-selector {
      display: inline-block;
      position: absolute;
      top: 0;
      width: 50%;
      height: 42px;
      background-color: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid;
  }
  `}
  `}
  ${css`
    .gender-selector {
      animation: ${({ $isMale }) =>
        $isMale
          ? css`
              ${moveRight} 0.2s forwards
            `
          : css`
              ${moveLeft} 0.2s forwards
            `};
    }
  `}
`;

export const ViewMoreBox = styled.div`
  ${({ theme }) =>
    `${media.base`
      display:flex;
      justify-content:center;
        button{
        width: 100%;
        height: 42px;
        max-width: 326px;
        color: #fff;
        background-color:rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.8);
        border-radius: 3px;
        }
`}`}
`;

const rotate = keyframes`
  from{ transform: rotate(0deg);}
  to { transform: rotate(360deg); }
`;

export const LoadingItem = styled(LoadingSpinner)``;
