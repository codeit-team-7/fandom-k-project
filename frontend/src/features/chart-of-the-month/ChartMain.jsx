import ChartIdolList from './ChartIdolList';
import { ChartMainBox, GenderSelectBox, LoadingItem, ViewMoreBox } from './ChartMain.style';

export default function ChartMain({
  idolList,
  onClickViewMore,
  onClickGender,
  gender,
  showItemNum,
  lastItemRef,
  isLoading,
}) {
  const isMale = gender === 'male' ? true : false;

  return (
    <>
      <ChartMainBox>
        <GenderSelectBox $isMale={isMale}>
          <button
            className='gender female'
            onClick={() => {
              onClickGender('female');
            }}>
            이달의 여자 아이돌
          </button>
          <div className='gender-selector' />
          <button
            className='gender male'
            onClick={() => {
              onClickGender('male');
            }}>
            이달의 남자 아이돌
          </button>
        </GenderSelectBox>
        <ChartIdolList
          showItemNum={showItemNum}
          idolList={idolList}
          lastItemRef={lastItemRef}
        />
      </ChartMainBox>
      {idolList.length >= showItemNum && (
        <ViewMoreBox>
          <button onClick={onClickViewMore}>더보기</button>
        </ViewMoreBox>
      )}
      {isLoading && <LoadingItem />}
    </>
  );
}
