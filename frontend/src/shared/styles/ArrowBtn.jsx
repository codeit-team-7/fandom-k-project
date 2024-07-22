import styled from 'styled-components';
import ArrowLeft from '../../assets/icons/btn_pagination_arrow_left.svg';
import ArrowRight from '../../assets/icons/btn_pagination_arrow_right.svg';

const directionToImage = {
  left: ArrowLeft,
  right: ArrowRight,
};

export const ArrowBtn = styled.button`
  background-color: rgba(27, 27, 27, 0.8);
  background-image: ${({ direction }) => `url(${directionToImage[direction]})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: inherit;
  border-radius: 6.67px;
  width: 40px;
  height: 78px;
  cursor: pointer;
  z-index: 5;
`;
