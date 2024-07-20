import ChartIdolList from './ChartIdolList';
import {
  ChartLayout,
  ChartMainBox,
  GenderSelectBox,
  LoadingItem,
  ViewMoreBox,
} from '../styles/ChartMain.style';

export default function ChartMain({
  idolList,
  onClickViewMore,
  onClickGender,
  gender,
  showItemNum,
  lastItemRef,
  isLoading,
}) {
  return (
    <ChartLayout>
      <ChartMainBox>
        <GenderSelectBox $isMale={gender === 'male' ? true : false}>
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
      {idolList.length >= showItemNum && !isLoading && (
        <ViewMoreBox>
          <button onClick={onClickViewMore}>더보기</button>
        </ViewMoreBox>
      )}
      {isLoading && <LoadingItem />}
    </ChartLayout>
  );
}
