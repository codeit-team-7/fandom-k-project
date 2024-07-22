import { styled } from 'styled-components';
import { ArrowBtn } from '@shared/styles/ArrowBtn';
import { media } from '@utils';

export const Container = styled.section`
  ${media.base`
    padding-left: 24px;
    margin: 40px 0;
  `}
  ${media.md`
    margin: 64px 0 60px;
  `}
  ${media.lg`
    margin: 50px auto 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 0px;
    max-width: 1200px;
  `}
`;
export const Box = styled.div`
  position: relative;
`;
export const FundingItems = styled.ul`
  display: flex;
  position: relative;
  ${media.base`
    gap: 8px;
    max-width: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;
}
  `}
  ${media.md`
    gap: 16px;
  `}
  ${media.md`
    gap: 24px;
  `}
`;
export const LgArrowBtnLeft = styled(ArrowBtn)`
  display: none;
  position: absolute;
  left: -80px;
  top: 50%;
  transform: translateY(-50%);
  ${media.lg`
   display: block;
   `}
`;
export const LgArrowBtnRight = styled(ArrowBtn)`
  display: none;
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  ${media.lg`
   display: block;
   `}
`;
export const Title = styled.h2`
  font-weight: 700;
  ${media.base`
    font-size: ${16};
    margin-bottom: 16px;
  `}
  ${media.md`
    font-size: ${20};
    margin-bottom: 24px;
  `}
  ${media.lg`
    font-size: ${24};
    margin-bottom: 32px;
  `}
`;
export const MyLoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;
