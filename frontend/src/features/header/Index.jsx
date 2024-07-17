import MainLogo from "@assets/icons/logo.svg";
import UserIcon from "@assets/images/Frame-28.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderMargin = styled.div`
  padding: 0 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 88px;
  padding-bottom: 16px;
  @media (min-width: 728px) {
    align-items: center;
  }
  @media (min-width: 1024px) {
    max-width: 1200px;
    margin: 0 auto 50px;
  }
`;

const HeaderLogo = styled.img`
  height: 21px;
  @media (min-width: 728px) {
    height: 23px;
  }
  @media (min-width: 1024px) {
    height: 32px;
  }
`;

const HeaderIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export default function Index() {
  return (
    <HeaderMargin>
      <HeaderContainer>
        <div></div>
        <HeaderLogo src={MainLogo} alt="MainLogo" />
        <div>
          <Link to="/mypage">
            <HeaderIcon src={UserIcon} alt="UserIcon" />
          </Link>
        </div>
      </HeaderContainer>
    </HeaderMargin>
  );
}
