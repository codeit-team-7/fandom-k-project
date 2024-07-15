import styled from "styled-components";
import { media } from "@utils";

export const Container = styled.div`
  ${(props) => `
    ${media.base`
      width: min(${props.$width} - ${props.$padding} * 2, 100%);
      height: auto;
      margin-inline: auto;
    `}
  `}
`;

export const IdolPicture = () => {
  const Skeleton = styled.div`
    ${({ theme }) => `
      border: 1px solid rgba(0,0,0,0);
      border-radius: 50%;
      background: ${theme.colors.GRAY[100]};
    `}
  `;
  const Main = styled.img``;

  return { Main, Skeleton };
};
