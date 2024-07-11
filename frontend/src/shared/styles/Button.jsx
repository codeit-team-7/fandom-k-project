import styled from "styled-components";
import { media } from "@utils";

/**  props 전달하지않을 경우 기본색입니다
회색버튼 필요시 $activable로 truthy 값을 전달하시면 됩니다. */
export const Button = styled.button`
  ${({ theme, $activable }) =>
    `${media.base`
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${
        $activable
          ? `${theme.colors.GRAY[200]};`
          : `${theme.colors.MIXED[100]};`
      }
      color: #fff;
      width: 100%;
      height:${42};
      border: none;
      border-radius: 3px;
      font-size: ${theme.fontSize.XSM};
      font-weight: 700;
    `}
  `}
`;
