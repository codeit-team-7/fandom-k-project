import styled from "styled-components";

import { media } from "@utils";

import { ModalLayout } from "@styles/ModalLayout";

export const VoteModalLayout = styled(ModalLayout)`
  ${({ theme }) =>
    `${media.base`
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.BLACK[200]};
  `}${media.md`
    position: fixed;
    width: 525px;
    height: 693px;
      background-color: ${theme.colors.BLACK[100]};
  `}`}
`;
