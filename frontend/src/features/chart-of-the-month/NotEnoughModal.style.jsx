import styled from "styled-components";

import { media } from "@utils";

import { ModalLayout } from "@styles/ModalLayout";
import { Button } from "@styles/Button";
import icCredit from "@assets/icons/ic_credit.svg";
export const NotEnoughModalBox = styled(ModalLayout)`
  ${({ theme }) =>
    `${media.base`
      background-image: url(${icCredit});
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: top 20% left 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      width:339px;
      height:331px;
      border-radius: 12px;
      .credit-img {
      height: 100%}
      .close-button {
        background-color: inherit;
        cursor: pointer;
      }
        .bottom-box {
        display:flex;
        flex-direction: column;
        gap: 31px;
        align-items:center;
        width: 100%
        }
      p {
      display: flex;
      font-size:${theme.fontSize.MD};
        .color-p
        {
        color: ${theme.colors.BRAND[100]};
        }
      }
     
  `}`}
`;

export const ModalButton = styled(Button)`
  ${({ theme }) =>
    `${media.base`
  `}`}
`;
