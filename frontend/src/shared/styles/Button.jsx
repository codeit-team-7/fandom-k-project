import styled from "styled-components";
import { media } from "@utils";

/**  props 전달하지않을 경우 기본색입니다
회색버튼 필요시 $activable로 truthy 값을 전달하시면 됩니다. */
export const Button = styled.button`
  ${({ theme, $activable }) =>
    `${media.base`
      background: ${
        $activable
          ? `${theme.colors.GRAY[200]};`
          : `linear-gradient(to right, ${theme.colors.BRAND[100]}, ${theme.colors.BRAND[200]}`
      });
      color: #fff;
      width: 100%;
      height:${42};
      border: none;
      font-size: ${theme.fontSize.XSM};
      font-weight: 700;
    `}
  `}
`;
