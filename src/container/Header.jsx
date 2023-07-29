import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Logo from "../asset/png/logo.png";
import Icon from "../component/Icon";
import { LogoImg } from "../component/Logo";
import { SearchContainer } from "./SearchContainer";

const StyledIcon = styled.div`
  svg {
    width: 24px;
  }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%)
  };
  to {
    transform: translateX(0);
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0 0 3px #000;
  z-index: 20;
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 80px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const HeaderHamburger = styled.button`
  border: none;
  background-color: transparent;
  font-size: 2rem;
`;

const HeaderTitle = styled.span`
  font-size: 1.2rem;
  padding: 0 6px;
`;

const HeaderCenter = styled.div`
  width: 50%;
`;

const HeaderInputButton = styled.button`
  width: 60px;
  height: 40px;
  padding: 0 6px;
`;

const MenuInputButton = styled.button`
  width: 140px;
  height: 20px;
  padding: 0 6px;
  margin-top: 20px;
  text-align: left;
  margin-left: 30px;
`;

const HeaderEnd = styled.div`
  display: flex;
`;

const HeaderSearch = styled.button`
  display: none;
  margin-right: 5px;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
`;

const Menu = styled.div`
  position: absolute;
  top: 80px;
  left: ${(props) => (props.isOpen ? "0" : "-200px")};
  width: 31%;
  height: 100vh;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  animation: ${(props) => (props.isOpen ? slideInAnimation : "none")} 0.3s
    ease-in-out;
  transition: left 0.3s ease-in-out;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MenuButtonWrapper = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;
const slideInAnimation2 = keyframes`
  from {
    transform: translateY(-60%);
  }
  to {
    transform: translateY(0);
  }
`;
const SubMenu = styled.div`
  padding: 10px;
  background-color: #ffffff;
  margin-top: 10px;
  animation: ${slideInAnimation2} 0.3s ease-in-out;
`;
const Subbutton = styled.button`
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 20px;
  padding: 0 px;
  margin-top: 20px;
  text-align: left;
  margin-left: 50px;
  color: gray;
`;

const MenuButton = ({ children }) => {
  return (
    <MenuButtonContainer>
      {React.Children.map(children, (child, index) => (
        <MenuButtonWrapper key={index}>{child}</MenuButtonWrapper>
      ))}
    </MenuButtonContainer>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const handleSettingsClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    toggleSubMenu();
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <StyledIcon>
          <HeaderHamburger onClick={toggleMenu}>
            <Icon.Menu />
          </HeaderHamburger>
          <HeaderTitle>
            <a href="/"><LogoImg src={Logo} alt="logo "/></a>
          </HeaderTitle>
        </StyledIcon>
        <HeaderCenter>{isSearchOpen && <SearchContainer />}</HeaderCenter>
        <HeaderEnd>
          <HeaderSearch></HeaderSearch>
          <StyledIcon>
            <HeaderInputButton onClick={toggleSearch}>
              <Icon.Search />
            </HeaderInputButton>
            <HeaderInputButton onClick>
              <Icon.Dark />
            </HeaderInputButton>
            <HeaderInputButton onClick>
              <Icon.Option />
            </HeaderInputButton>
          </StyledIcon>
        </HeaderEnd>
      </HeaderWrapper>
      <div className="menu-container">
        {isMenuOpen && (
          <Menu isOpen={isMenuOpen} onClick={toggleMenu}>
            <MenuButton>
              <MenuInputButton>공지 사항</MenuInputButton>
              <MenuInputButton>신규 장소 등록</MenuInputButton>
              <MenuInputButton>고객 센터</MenuInputButton>

              <MenuInputButton onClick={handleSettingsClick}>
                설정
              </MenuInputButton>
              {isSubMenuOpen && (
                <SubMenu>
                  <Subbutton>장소 수정</Subbutton>
                  <Subbutton>매장 삭제 신청</Subbutton>
                  <Subbutton>검색 기록 삭제</Subbutton>
                </SubMenu>
              )}
              <MenuInputButton>버전 정보 v0.0.0</MenuInputButton>
            </MenuButton>
          </Menu>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
