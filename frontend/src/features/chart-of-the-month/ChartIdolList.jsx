import { IdolListUl } from "./ChartIdolList.style";

export default function ChartIdolList() {
  return (
    <IdolListUl>
      <li className="list-item">
        <div className="idol">
          <span className="img">이미지</span>
          <span className="rank">1</span>
          <span className="group">뉴진스</span>
          <span className="name">민지</span>
        </div>
        <span className="votes">100표</span>
      </li>

      <li className="list-item">
        <div className="idol">
          <span className="img">이미지</span>
          <span className="rank">1</span>
          <span className="group">뉴진스</span>
          <span className="name">민지</span>
        </div>
        <span className="votes">100표</span>
      </li>
    </IdolListUl>
  );
}
