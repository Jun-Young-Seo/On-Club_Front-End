import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 2vh 5%;
  background: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  flex-shrink: 0; /* 🔹 크기가 줄어들지 않도록 고정 */
  min-width: 150px;
`;

const LogoIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #ff3d00, #ff9100, #ffeb3b);
  border-radius: 4px;
  margin-right: 8px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-grow: 0.9; /* 🔹 네비게이션이 가능한 공간을 최대한 차지하도록 */
  justify-content: center; /* 🔹 가운데 정렬 */
  gap: 3vw;

  a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    transition: 0.3s;

    &:hover {
      color: #3498db;
    }
  }

  @media (max-width: 768px) {
    display: none; /* 🔹 모바일에서는 네비게이션 숨김 */
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-shrink: 0; /* 🔹 버튼이 줄어들지 않도록 고정 */
  gap: 1vw;
  min-width: 160px; /* 🔹 최소 크기 설정하여 버튼이 짤리지 않도록 */
`;

const AuthButton = styled.button`
  background: ${(props) => (props.primary ? "transparent" : "#3498db")};
  color: ${(props) => (props.primary ? "black" : "white")};
  border: ${(props) => (props.primary ? "none" : "2px solid #3498db")};
  padding: 0.8vh 2vw;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap; 

  &:hover {
    background: ${(props) => (props.primary ? "#f2f2f2" : "#2980b9")};
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <HeaderContainer>
      {/* 로고 */}
      <LogoContainer onClick={() => navigate("/clubs")}>
        <LogoIcon />
        On<strong>-Club</strong>
      </LogoContainer>

      {/* 네비게이션 */}
      <NavLinks>
        <Link to="/about">menu1</Link>
        <Link to="/">Features</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/team">Team</Link>
      </NavLinks>

      {/* 로그인 상태에 따라 다른 버튼 표시 */}
      <AuthContainer>
        {userId ? (
          <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
        ) : (
          <>
            <AuthButton primary onClick={() => navigate("/login")}>
              Sign In
            </AuthButton>
            <AuthButton onClick={() => navigate("/signup")}>Register</AuthButton>
          </>
        )}
      </AuthContainer>
    </HeaderContainer>
  );
};

export default Header;
