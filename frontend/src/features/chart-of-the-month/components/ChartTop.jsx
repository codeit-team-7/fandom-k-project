import { ChartTopBox, OpenVoteButton } from '../styles/ChartTop.styles';
import chartIc from '@assets/icons/ic_chart.svg';

export default function ChartTop({ onClick }) {
  return (
    <ChartTopBox>
      <span className='chart-text'>이달의 차트</span>
      <OpenVoteButton onClick={onClick}>
        <img src={chartIc} />
        <span>차트 투표하기</span>
      </OpenVoteButton>
    </ChartTopBox>
  );
}
