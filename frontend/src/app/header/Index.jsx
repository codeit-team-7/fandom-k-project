import styled, { css } from "styled-components";
import { media } from "@utils";

const StyledHeader = styled.header`
  ${() => css`
    ${media.base`
      font-size: ${16};
    `}
  `}
`;

export default function Index() {
  return <StyledHeader>헤더</StyledHeader>;
}
