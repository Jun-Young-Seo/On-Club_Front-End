import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;  // ✅ 전체 화면을 차지
`;

const SidebarContainer = styled.div`
  width: 80px;  // ✅ 사이드바 고정 크기
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;  // ✅ 나머지 공간 차지
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;  // ✅ 스크롤 가능하도록 설정
`;

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/login"); // ✅ 로그아웃 시 로그인 페이지로 이동
  };

  return (
    <LayoutContainer>
      {/* ✅ 사이드바 */}
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      {/* ✅ 메인 컨텐츠 */}
      <MainContent>
        <Header onLogout={handleLogout} />
        <ContentContainer>
          <Outlet />  {/* 🔹 여기서 ClubListPage 등 자식 컴포넌트가 렌더링됨 */}
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
