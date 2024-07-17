import styled, { keyframes, css } from "styled-components";

import { media } from "@utils";

const rotate = keyframes`
  from{ transform: rotate(0deg);}
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  ${({ theme }) =>
    `${media.base`
      width:70px;
      height:70px;
      border:7px solid rgba(249, 109, 105, 0.2);
      border-top:7px solid ${theme.colors.BRAND[100]};
      border-radius: 50px;
  `}`}
  ${css`
    animation: ${rotate} 1s linear infinite;
  `}
`;
