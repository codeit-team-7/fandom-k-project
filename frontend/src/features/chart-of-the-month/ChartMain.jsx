import { useReducer, useState } from "react";
import ChartIdolList from "./ChartIdolList";
import { ChartMainBox, GenderSelectBox } from "./ChartMain.style";
import ChartViewMore from "./ChartViewMore";

export default function ChartMain({ idols, onClickViewMore, cursor }) {
  const [isMale, ChangeIsMale] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <>
      <ChartMainBox>
        <GenderSelectBox $isMale={isMale}>
          <button className="gender female" onClick={ChangeIsMale}>
            이달의 여자 아이돌
          </button>
          <div className="gender-selector" />
          <button className="gender male" onClick={ChangeIsMale}>
            이달의 남자 아이돌
          </button>
        </GenderSelectBox>
        <ChartIdolList idols={idols} />
      </ChartMainBox>
      <ChartViewMore onClick={onClickViewMore} cursor={cursor} />
    </>
  );
}
