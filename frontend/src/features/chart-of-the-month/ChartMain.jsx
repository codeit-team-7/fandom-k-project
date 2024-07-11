import ChartIdolList from "./ChartIdolList";
import { ChartMainBox, GenderSelectBox } from "./ChartMain.style";
import ChartViewMore from "./ChartViewMore";

export default function ChartMain() {
  return (
    <>
      <ChartMainBox>
        <GenderSelectBox $gender="female">
          <button className="gender female">이달의 여자 아이돌</button>
          <div className="gender-selector" />
          <button className="gender male">이달의 남자 아이돌</button>
        </GenderSelectBox>
        <ChartIdolList />
      </ChartMainBox>
      <ChartViewMore />
    </>
  );
}
