import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;  
`;

const SidebarContainer = styled.div`
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top:60px;
//   padding-left: 80px; /* ✅ 사이드바 너비만큼 왼쪽 마진 추가 */
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px; /* ✅ 여기에서 패딩 조정 */
  overflow-y: auto;
`;

const Layout = () => {


  return (
    <LayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      {/* ✅ 메인 컨텐츠 (마진 적용) */}
      <MainContent>
        <Header/>
        <ContentContainer>
          <Outlet />  
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
