import { useState } from 'react';
import DeleteBtn24 from '@assets/icons/btn_delete_24px.svg';
import { ModalBg } from '@shared/styles/ModalBg';
import { getRecheckApi, putDonationsApi } from '../api';
import * as S from '../styles/IdolFundingModal.style';

export default function IdolFundingModal({
  item,
  onFundingClick,
  setIsReRendering,
}) {
  const {
    id,
    status,
    subtitle,
    title,
    targetDonation,
    profilePicture = item.idol.profilePicture,
    idolId = item.idol.id,
  } = item;
  const [creditUse, setCreditUse] = useState('');
  const [isInValid, setIsInValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOverCredit, setIsOverCredit] = useState(false);

  const getCharge = () => {
    return Number(localStorage.getItem('credit'));
  };

  const myCredit = getCharge();

  const deductCredit = () => {
    const resultCredit = myCredit - Number(creditUse);
    localStorage.setItem('credit', resultCredit);
  };

  const onChangeCredit = e => {
    const currentEnterCredit = e.target.value;
    if (!currentEnterCredit || currentEnterCredit === '0') {
      setIsInValid(true);
      setCreditUse('');
      setIsOverCredit(false);
    } else if (Number(currentEnterCredit) > myCredit) {
      setIsInValid(true);
      setIsOverCredit(true);
      setCreditUse(Number(currentEnterCredit));
    } else {
      setIsInValid(false);
      setIsOverCredit(false);
      setCreditUse(Number(currentEnterCredit));
    }
  };

  const fetchReCheckData = async idolId => {
    try {
      const result = await getRecheckApi(idolId);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async () => {
    if (isInValid || isProcessing) return;
    setIsProcessing(true);
    try {
      const result = await fetchReCheckData(idolId);
      const check = result.list[0];
      if (reCheckItem(check)) {
        putDonationsApi(id, Number(creditUse));
        deductCredit();
        alert(`후원이 성공적으로 완료되었습니다.`);
        onFundingClick();
      }
    } catch (error) {
      console.error(error);
      alert(`후원에 오류가 발생하였습니다.`);
    } finally {
      setIsProcessing(false);
      setIsReRendering(true);
    }
  };

  const reCheckItem = result => {
    if (result) {
      const reCheckStatus = status === result.status;
      const reCheckValidCredit =
        targetDonation >= result.receivedDonations + Number(creditUse);
      const overCredit =
        result.receivedDonations + Number(creditUse) - targetDonation;
      const validType = reCheckStatus && reCheckValidCredit;
      if (overCredit > 0) {
        alert(`목표 후원 금액을 ${overCredit}크레딧 초과하였습니다.`);
      } else if (!reCheckStatus) {
        alert(`이미 마감된 후원입니다.`);
      } else {
        return validType;
      }
    }
  };

  return (
    <>
      <ModalBg />
      <S.FundingModal>
        <S.ModalHeader>
          <S.ModalFundingTitle>후원하기</S.ModalFundingTitle>
          <S.ModalCloseBtn
            src={DeleteBtn24}
            alt='모달창 닫기 버튼'
            onClick={onFundingClick}
          />
        </S.ModalHeader>
        <S.ModalInfoContainer>
          <S.ModalImg src={profilePicture} alt='후원할 아이돌 이미지' />
          <S.ModalInfo>
            <S.ModalTag>{subtitle}</S.ModalTag>
            <S.ModalTitle>{title}</S.ModalTitle>
          </S.ModalInfo>
        </S.ModalInfoContainer>
        <S.ModalFundingInput
          onChange={onChangeCredit}
          value={creditUse}
          type='number'
          placeholder='크레딧 입력'
          $isOverCredit={isOverCredit}></S.ModalFundingInput>
        <S.ModalFundingWaring>
          {isOverCredit ? '갖고 있는 크레딧보다 더 많이 후원할 수 없어요' : ''}
        </S.ModalFundingWaring>
        <S.ModalFundingButton onClick={onClick} $activable={isInValid}>
          {isProcessing ? '처리 중...' : '후원하기'}
        </S.ModalFundingButton>
      </S.FundingModal>
    </>
  );
}
