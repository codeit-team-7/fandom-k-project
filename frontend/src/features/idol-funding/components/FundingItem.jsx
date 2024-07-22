import { useState } from 'react';
import CreditSVG from '@assets/icons/ic_credit.svg';
import IdolFundingModal from './IdolFundingModal';
import * as S from '../styles/FundingItem.style.js';

export default function FundingItem({ item, setIsReRendering }) {
  const {
    deadline,
    subtitle,
    title,
    receivedDonations,
    targetDonation,
    profilePicture = item.idol.profilePicture,
  } = item;
  const [isIdolFundingModal, setIsIdolFundingModal] = useState(false);
  const handleIdolFundingModal = () => setIsIdolFundingModal(prev => !prev);

  // 목표금액, 모인 금액을 %로 바꿈
  const calculatePercentage = (part, whole) => {
    return Math.round((part / whole) * 100);
  };
  const percentage = calculatePercentage(receivedDonations, targetDonation);

  // 모인 금액을 원단위로 바꿈
  const korReceivedDonations = receivedDonations.toLocaleString();

  // 데드라인(모금 종료)까지 남은 기한 계산
  const getTimegap = deadTime => {
    const nowTimeDate = new Date();
    const nowTimeStamp = nowTimeDate.getTime();

    const deadTimeDate = new Date(deadTime);
    const deadTimeStamp = deadTimeDate.getTime();

    const msgap = deadTimeStamp - nowTimeStamp;
    const minutegap = Math.floor(msgap / (1000 * 60));
    const hourgap = Math.floor(msgap / (1000 * 60 * 60));
    const daygap = Math.floor(msgap / (1000 * 60 * 60 * 24));
    if (daygap >= 1) {
      return `${daygap}일 남음`;
    }
    if (hourgap < 24) {
      return `${hourgap}시간 남음`;
    }
    if (minutegap < 60) {
      return `${minutegap}분 남음`;
    }
  };

  if (isIdolFundingModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <S.IdolFundingContainer>
      {isIdolFundingModal && (
        <IdolFundingModal
          item={item}
          onFundingClick={handleIdolFundingModal}
          setIsReRendering={setIsReRendering}
        />
      )}
      <S.ItemBox>
        <S.ImageButtonBox>
          <S.IdolImage
            src={profilePicture}
            alt='후원을 기다리는 아이돌 이미지'
            width='158px'
            height='206px'
          />
          <S.IdolGradient />
          <S.FundingButton onClick={handleIdolFundingModal} as='button'>
            후원하기
          </S.FundingButton>
        </S.ImageButtonBox>
        <S.InfoContainer>
          <S.ItemTag>{subtitle}</S.ItemTag>
          <S.ItemTitle>{title}</S.ItemTitle>
          <S.DonationGoalContainer>
            <S.InfoBox>
              <S.DonationAmount>
                <img
                  src={CreditSVG}
                  alt='크레딧 아이콘 이미지'
                  width={12}
                  height={12}
                />
                {korReceivedDonations}
              </S.DonationAmount>
              <S.DaysRemaining>{getTimegap(deadline)}</S.DaysRemaining>
            </S.InfoBox>
            <S.FundingMeter $percentage={percentage} />
          </S.DonationGoalContainer>
        </S.InfoContainer>
      </S.ItemBox>
    </S.IdolFundingContainer>
  );
}
