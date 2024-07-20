import { Button } from '@styles/Button';
import { VoteModalBottomBox } from '../styles/VoteModalBottom.style';

export default function VoteModalBottom({ onClick, checkedId }) {
  return (
    <VoteModalBottomBox>
      <Button $activable={!checkedId} onClick={onClick}>
        투표하기
      </Button>
      <div className='info'>
        <p>투표하는 데&nbsp;</p>
        <p className='strong'>1000 크레딧</p>
        <p>이 소모됩니다.</p>
      </div>
    </VoteModalBottomBox>
  );
}
