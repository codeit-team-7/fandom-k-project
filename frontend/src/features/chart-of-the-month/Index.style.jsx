import styled from "styled-components";

import { media } from "@utils";

export const ChartLayout = styled.article`
  ${({ theme }) =>
    `${media.base`
      display: flex;
      flex-direction: column;
      max-width: 1200px;
      gap: 16px;
      padding: 0 ${24};
      margin: 0 auto 200px;
    
  `}${media.md`
      gap: 24px;
      
  `}`}
`;
