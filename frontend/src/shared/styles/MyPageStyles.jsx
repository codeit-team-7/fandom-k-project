import styled from 'styled-components';
import { media } from '@utils';

export const Container = styled.div`
  ${props => `
    ${media.base`
      width: min(${props.$width} - ${props.$padding} * 2, 100%);
      height: auto;
      margin-inline: auto;
    `}
  `}
`;

export const SubTitle = styled.h4`
  ${() => media.base`
    padding: 0 ${24};  
    font-weight: 700;
  `}
`;

export const Item = styled.li`
  ${() => media.base`
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: ${7};  
  `}
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Name = styled.p`
  ${() => media.base`
    font-weight: 700;  
  `}
`;

export const Group = styled.p`
  ${({ theme }) => media.base`
    font-size: ${theme.fontSize.XSM};
    opacity: 0.6;
  `}
`;

export const Img = styled.img`
  ${() => media.base`
    position: relative;
    border: none;
    border-radius: inherit;
    object-fit: cover;

    @media (hover: hover) {
      &:hover {
        scale: 1.05;
      }
    }
`};
`;
