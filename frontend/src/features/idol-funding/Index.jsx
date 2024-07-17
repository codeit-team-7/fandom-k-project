import CreditSVG from '../../assets/icons/ic_credit.svg';
import { styled } from 'styled-components';
import { media } from '@utils';
import { Button } from '../../shared/styles/Button';
import { useEffect, useRef, useState } from 'react';
import { getFundingApi } from './api';
import { ArrowBtn } from '../../shared/styles/ArrowBtn';

const Container = styled.section`
  ${media.base`
    padding-left: 24px;
  `}
  ${media.lg`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 0px;
    max-width: 1200px;
  `}
`;
const Box = styled.div`
  position: relative;
`;

const IdolFundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  ${media.base`
    width: 158px;
`}
  ${media.md`
    width: 282px;
`}
`;

const FundingItems = styled.ul`
  display: flex;
  position: relative;
  ${media.base`
    gap: 8px;
    max-width: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;
}
  `}
  ${media.md`
    gap: 16px;
  `}
  ${media.md`
    gap: 24px;
  `}
`;

const LgArrowBtnLeft = styled(ArrowBtn)`
  display: none;
  position: absolute;
  left: -80px;
  top: 50%;
  transform: translateY(-50%);
  ${media.lg`
   display: block;
   `}
`;

const LgArrowBtnRight = styled(ArrowBtn)`
  display: none;
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  ${media.lg`
   display: block;
   `}
`;

const Title = styled.h2`
  font-weight: 700;
  ${media.base`
    font-size: ${16};
    margin-bottom: 16px;
  `}
  ${media.md`
    font-size: ${20};
    margin-bottom: 24px;
  `}
  ${media.lg`
    font-size: ${24};
    margin-bottom: 32px;
  `}
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageButtonBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IdolImage = styled.img`
  border-radius: 8px;
  ${media.base`
    width: 100%;
    object-fit: cover;
  `}
  ${media.md`
    width: 282px;
    height: 293px;
    border-radius: 8px;
    object-fit: none;
  `}
`;

const FundingButton = styled(Button)`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  ${media.base`
    width: calc(100% - 16px);
    font-size: ${13};
    font-weight: 700;
    bottom: 8px;
    height: 31px;
  `}
  ${media.md`
    width: calc(100% - 48px);
    font-size: ${13};
    font-weight: 700;
    bottom: 20px;
    height: 40px;
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 2px;
`;

const ItemTag = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    opacity: 0.4;
    font-weight: 400;
  ${media.base`
    font-size: ${12};
    margin-top: 10px;
  `}
  ${media.md`
    font-size: ${16};
    margin-top: 12px;
    `}
  `}
`;

const ItemTitle = styled.h3`
  ${({ theme }) => `
    color: ${theme.colors.WHITE[100]};
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis; 
  ${media.base`
    font-size: ${14};
    margin-top: 6px;
  `}
  ${media.md`
    font-size: ${18};
    margin-top: 8px;
  `}
  `}
`;

const DonationGoalContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.base`
    padding-bottom: 3px;
  `}
  ${media.md`
    padding-bottom: 7px;
  `}
`;

const DonationAmount = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    color: ${theme.colors.BRAND[100]};
    font-weight: 400;
  ${media.base`
    font-size: ${12};
  `}
  `}
`;

const DaysRemaining = styled.p`
  ${({ theme }) => `
  color: ${theme.colors.WHITE[100]};
  ${media.base`
  font-size: ${12};
  font-weight: 400;
  `}
  `}
`;

const FundingMeter = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: #fff;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ percentage }) => (percentage ? percentage : '0%')};
    height: 100%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.BRAND[100]};
  }
`;

function FundingItem({ item, onFundingClick }) {
  const {
    deadline,
    subtitle,
    title,
    receivedDonations,
    targetDonation,
    profilePicture = item.idol.profilePicture,
  } = item;

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

  return (
    <IdolFundingContainer>
      <ItemBox>
        <ImageButtonBox>
          <IdolImage
            src={profilePicture}
            alt='후원을 기다리는 아이돌 이미지'
            width='158px'
            height='206px'
          />
          <FundingButton onClick={onFundingClick} as='button'>
            후원하기
          </FundingButton>
        </ImageButtonBox>
        <InfoContainer>
          <ItemTag>{subtitle}</ItemTag>
          <ItemTitle>{title}</ItemTitle>
          <DonationGoalContainer>
            <InfoBox>
              <DonationAmount>
                <img
                  src={CreditSVG}
                  alt='크레딧 아이콘 이미지'
                  width={12}
                  height={12}
                />
                {korReceivedDonations}
              </DonationAmount>
              <DaysRemaining>{getTimegap(deadline)}</DaysRemaining>
            </InfoBox>
            <FundingMeter $percentage={`${percentage}%`} />
          </DonationGoalContainer>
        </InfoContainer>
      </ItemBox>
    </IdolFundingContainer>
  );
}

export default function Index({ onFundingClick }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemNum, setItemNum] = useState(0);
  const itemRefs = useRef([]);

  // 받아온 값만큼 지정한 item으로 scrollIntoView 합니다.
  const scrollItem = nextItemNum => {
    setItemNum(nextItemNum);
    if (itemRefs.current[nextItemNum]) {
      itemRefs.current[nextItemNum].scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start',
      });
    }
  };

  const onClickRight = () => {
    const lastNum = items.list.length - 1;
    if (lastNum - 3 <= itemNum) return;
    const nextItemNum = itemNum + 1;
    scrollItem(nextItemNum);
  };

  const onClickLeft = () => {
    if (itemNum < 1) return;
    const nextItemNum = itemNum - 1;
    scrollItem(nextItemNum);
  };

  const fetchItemData = async () => {
    try {
      const result = await getFundingApi();
      setItems(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const cutItems = [...items.list];

  return (
    <Container>
      <Title>후원을 기다리는 조공</Title>
      <Box>
        <LgArrowBtnLeft direction='left' onClick={onClickLeft} />
        <FundingItems>
          {cutItems
            .filter(item => item.status)
            .map((item, i) => (
              <li key={item.id} ref={el => (itemRefs.current[i] = el)}>
                <FundingItem
                  id={`content${i}`}
                  item={item}
                  onFundingClick={onFundingClick}
                />
              </li>
            ))}
        </FundingItems>
        <LgArrowBtnRight direction='right' onClick={onClickRight} />
      </Box>
    </Container>
  );
}
