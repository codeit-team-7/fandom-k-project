import { useReducer, useState } from "react";
import ChartIdolList from "./ChartIdolList";
import { ChartMainBox, GenderSelectBox } from "./ChartMain.style";
import ChartViewMore from "./ChartViewMore";

export default function ChartMain({
  idolList,
  onClickViewMore,
  onClickGender,
  cursor,
  gender,
}) {
  const isMale = gender === "male" ? true : false;
  return (
    <>
      <ChartMainBox>
        <GenderSelectBox $isMale={isMale}>
          <button
            className="gender female"
            onClick={() => {
              onClickGender("female");
            }}
          >
            이달의 여자 아이돌
          </button>
          <div className="gender-selector" />
          <button
            className="gender male"
            onClick={() => {
              onClickGender("male");
            }}
          >
            이달의 남자 아이돌
          </button>
        </GenderSelectBox>
        <ChartIdolList idolList={idolList} />
      </ChartMainBox>
      <ChartViewMore onClick={onClickViewMore} cursor={cursor} />
    </>
  );
}
