import styled from "styled-components";
import { media } from "@utils";

const StyledHeader = styled.header`
  ${({ theme }) => `
    ${media.base`
      font-size: ${65};
      color: ${theme.colors.BRAND[200]};
    `}

    ${media.sm`
      font-size: ${85};
    `}

    ${media.md`
      font-size: ${320};
    `}
  `}
`;

export default function Index() {
  return <StyledHeader>test</StyledHeader>;
}
