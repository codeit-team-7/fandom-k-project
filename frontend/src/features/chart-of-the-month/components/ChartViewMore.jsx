import { ViewMoreBox } from '../styles/ChartViewMore.style';

export default function ChartViewMore({ onClick, cursor }) {
  return <ViewMoreBox>{(cursor ?? 0) ? <button onClick={onClick}>더보기</button> : null}</ViewMoreBox>;
}
