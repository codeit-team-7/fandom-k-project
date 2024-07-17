import { Button } from '@shared/styles/Button';
import titleImg from '@assets/images/img_title.png';
import mainLogo from '@assets/icons/logo.svg';
import home01 from '@assets/images/Home-1.png';
import home02 from '@assets/images/Home-2.png';
import home03 from '@assets/images/Home-3.png';
import homeBg01 from '@assets/images/Img_web_01.png';
import homeBg02 from '@assets/images/Img_web_02.png';
import homeBg03 from '@assets/images/Img_web_03.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListButton = styled(Button)`
  width: 230px;
  height: 48px;
  margin: 93px auto 100px;
  cursor: pointer;
  @media (min-width: 728px) {
    width: 477px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 812px;
  @media (min-width: 728px) {
    height: 1200px;
  }
  @media (min-width: 1024px) {
    height: 1080px;
  }
`;

const TitleSection = styled.div`
  margin: 0 auto;
`;

const TitleText = styled.span`
  ${({ theme }) => `
  font-size: ${theme.fontSize['XLG']}px;
  `}
  display:block;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;

  position: relative;
  z-index: 5;
  @media (min-width: 1024px) {
    font-size: 26px;
  }
`;

const PointText = styled.span`
  ${({ theme }) => `
  color: ${theme.colors.BRAND[100]};
  `}
`;

const MainLogo = styled.img`
  height: 45px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 28px;
  position: relative;
  z-index: 5;

  @media (min-width: 728px) {
    height: 62px;
  }
  @media (min-width: 1024px) {
    height: 97px;
  }
`;

const BackgroundImg = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 330px;
  background: radial-gradient(circle, transparent, #02000e), url(${titleImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 70%;

  @media (min-width: 728px) {
    height: 598px;
    width: 714px;
  }
  @media (min-width: 1024px) {
    width: 932px;
    margin-top: -250px;
    height: 781px;
  }
`;

const Intro = styled.div``;

const IntroBgContainer = styled.div`
  height: 812px;
  width: 100%;
  margin: 0 auto;
  background-image: ${({ $bgImg }) => `url(${$bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 728px) {
    height: 744px;
  }
  @media (min-width: 1024px) {
    height: 1200px;
  }
`;

const IntroSectionContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  z-index: 5;
`;

const IntroTextContainer = styled.div`
  margin: 76px 32px 66px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  align-items: ${({ $sortDir }) => ($sortDir ? 'flex-start' : 'flex-end')};
  text-align: ${({ $sortDir }) => ($sortDir ? 'left' : 'right')};
  @media (min-width: 728px) {
    align-items: center;
  }
`;

const IntroTitle = styled.span`
  color: #d2c030;
  z-index: 5;
  font-size: 14px;
  @media (min-width: 728px) {
    font-size: 16px;
  }
`;

const IntroText = styled.p`
  font-size: 20px;
  white-space: pre-line;
  z-index: 5;
  @media (min-width: 728px) {
    text-align: center;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const IntroImg = styled.img`
  width: 240px;
  height: 520px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
  @media (min-width: 728px) {
    height: 434px;
    width: 200px;
  }
  @media (min-width: 1024px) {
    width: 329px;
    height: 694px;
  }
`;

const IntroDeco = styled.div`
  width: 117px;
  height: 2133px;
  margin: 0 auto;
  background-color: #14c3fe;
  position: absolute;
  left: 50%;
  top: 1200px;
  transform: translate(-50%, 0);
  opacity: 10%;
  @media (min-width: 728px) {
    top: 1600px;
    height: 2000px;
  }
  @media (min-width: 1024px) {
    width: 187px;
    height: 2133px;
    top: 2000px;
  }
`;

// eslint-disable-next-line react/prop-types
function IntroSection({ title, text, img, $bgImg, $sortDir }) {
  return (
    <IntroBgContainer $bgImg={$bgImg}>
      <IntroSectionContainer>
        <IntroTextContainer $sortDir={$sortDir}>
          <IntroTitle>{title}</IntroTitle>
          <IntroText>{text}</IntroText>
        </IntroTextContainer>
        <IntroImg src={img} alt={img} />
      </IntroSectionContainer>
    </IntroBgContainer>
  );
}

export default function Index() {
  const handleButtonClick = () => {
    localStorage.setItem('credit', 0);
  };

  return (
    <main>
      <Title>
        <TitleSection>
          <TitleText>
            내가 좋아하는 아이돌을 <br /> 가장 <PointText>쉽게 덕질</PointText>
            하는 방법
          </TitleText>
          <MainLogo src={mainLogo}></MainLogo>
          <BackgroundImg />
        </TitleSection>
        <Link to='list' style={{ textDecoration: 'none' }}>
          <ListButton onClick={handleButtonClick}>지금 시작하기</ListButton>
        </Link>
      </Title>
      <Intro>
        <IntroDeco />
        <IntroSection
          title={'후원하기'}
          text={'좋아하는 아이돌에게 \n 쉽게 조공해 보세요'}
          img={home01}
          bgImg={homeBg01}
          $sortDir={true}
        />
        <IntroSection
          title={'이달의 아티스트'}
          text={'내 아티스트에게 1등의 \n 영예를 선물하세요'}
          img={home02}
          $bgImg={homeBg02}
          $sortDir={false}
        />
        <IntroSection
          title={'나만의 아티스트'}
          text={'좋아하는 아티스트들의 \n 소식을 모아보세요'}
          img={home03}
          $bgImg={homeBg03}
          $sortDir={true}
        />
      </Intro>
    </main>
  );
}
