import { ViewMoreBox } from "./ChartViewMore.style";

export default function ChartViewMore({ onClick, cursor }) {
  return (
    <ViewMoreBox>
      {cursor && <button onClick={onClick}>더보기</button>}
    </ViewMoreBox>
  );
}
