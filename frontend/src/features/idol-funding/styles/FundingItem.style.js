import { styled } from 'styled-components';
import { media } from '@shared/utils/media-query/index';
import { Button } from '@shared/styles/Button';

export const IdolFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  ${media.base`
    width: 158px;
`}
  ${media.md`
    width: 282px;
`}
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageButtonBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IdolImage = styled.img`
  position: relative;
  border-radius: 8px;
  ${media.base`
    width: 100%;
    object-fit: cover;
  `}
  ${media.md`
    width: 282px;
    height: 293px;
    border-radius: 8px;
    object-fit: none;
  `}
`;

export const IdolGradient = styled.div`
  top: 0;
  left: -1px;
  position: absolute;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 58.9%, #000000 100%);
  border-radius: 8px;
  ${media.base`
    width: 160px;
    height: 100%;
    object-fit: cover;
  `}
  ${media.md`
    width: 284px;
    height: 293px;
    border-radius: 8px;
    object-fit: none;
  `}
`;

export const FundingButton = styled(Button)`
  z-index: 3;
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  ${media.base`
    width: calc(100% - 16px);
    font-size: ${13};
    font-weight: 700;
    bottom: 8px;
    height: 31px;
  `}
  ${media.md`
    width: calc(100% - 48px);
    font-size: ${13};
    font-weight: 700;
    bottom: 20px;
    height: 40px;
  `}
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 2px;
`;

export const ItemTag = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    opacity: 0.4;
    font-weight: 400;
  ${media.base`
    font-size: ${12};
    margin-top: 10px;
  `}
  ${media.md`
    font-size: ${16};
    margin-top: 12px;
    `}
  `}
`;

export const ItemTitle = styled.h3`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis; 
  ${media.base`
    font-size: ${14};
    margin-top: 6px;
  `}
  ${media.md`
    font-size: ${18};
    margin-top: 8px;
  `}
  `}
`;

export const DonationGoalContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.base`
    padding-bottom: 3px;
  `}
  ${media.md`
    padding-bottom: 7px;
  `}
`;

export const DonationAmount = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    color: ${theme.colors.BRAND[100]};
    font-weight: 400;
  ${media.base`
    font-size: ${12};
  `}
  `}
`;

export const DaysRemaining = styled.p`
  ${({ theme }) => `
  color: ${theme.colors.WHITE[100]};
  ${media.base`
  font-size: ${12};
  font-weight: 400;
  `}
  `}
`;

export const FundingMeter = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: #fff;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $percentage }) => ($percentage ? `${$percentage}%` : '0%')};
    height: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.BRAND[100]};
  }
`;
