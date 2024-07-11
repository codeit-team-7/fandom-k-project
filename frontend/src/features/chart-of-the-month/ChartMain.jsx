import { useState } from "react";
import ChartIdolList from "./ChartIdolList";
import { ChartMainBox, GenderSelectBox } from "./ChartMain.style";
import ChartViewMore from "./ChartViewMore";

export default function ChartMain() {
  const [isMale, SetIsMale] = useState(false);
  const onClickGender = (bool) => {
    SetIsMale(bool);
  };
  return (
    <>
      <ChartMainBox>
        <GenderSelectBox $isMale={isMale}>
          <button
            className="gender female"
            onClick={() => {
              onClickGender(false);
            }}
          >
            이달의 여자 아이돌
          </button>
          <div className="gender-selector" />
          <button
            className="gender male"
            onClick={() => {
              onClickGender(true);
            }}
          >
            이달의 남자 아이돌
          </button>
        </GenderSelectBox>
        <ChartIdolList />
      </ChartMainBox>
      <ChartViewMore />
    </>
  );
}
