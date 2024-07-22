import styled from 'styled-components';
import { Button } from '@styles/Button';
import { media } from '@utils';

const StyledButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${media.base`
    
  `}
`;

const StyledButton = styled(Button)`
  ${() => `
  width: 70%;
  ${media.base`
    height: ${48};
    border-radius: ${24};
  `}    
`}
`;
export default function AddButton({ handleClick }) {
  return (
    <StyledButtonWrap>
      <StyledButton onClick={handleClick}>+ 추가하기</StyledButton>
    </StyledButtonWrap>
  );
}
