import styled from "styled-components";

import { media } from "@utils";

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
