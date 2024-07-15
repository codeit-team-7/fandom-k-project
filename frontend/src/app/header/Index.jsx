import styled from "styled-components";
import { media } from "@utils";

const StyledHeader = styled.header`
  ${({ theme }) => `
    ${media.base`
      font-size: ${65};
      color: ${theme.colors.BRAND[200]};
    `}

  `}
`;

export default function Index() {
  return <StyledHeader></StyledHeader>;
}
