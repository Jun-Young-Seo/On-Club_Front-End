import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import ClubListPage from "./Club/ClubListPage";
import Login from "./User/Login";
import Main from "./Main/Main";
import ClubDetailPage from "./Club/ClubDetailPage";
import ClubCalendarPage from "./Club/ClubCalendarPage";
const App = () => {
  return (
    <Routes>
      {/* 로그인 안된 경우 처음 렌더링되는 메인 페이지 */}
      <Route path="/" element={<Main />} />

      {/* 로그인 페이지 */}
      {/* 로그인 성ㅇ공시 레이아웃(헤더+사이드바) 렌더링 --> login모듈에 리다이렉트 코드 잉ㅆ음 */}
      <Route path="/login" element={<Login />} />

      <Route path="/clubs/*" element={<Layout />}>
        <Route index element={<ClubListPage />} />
        <Route path=":clubId" element={<ClubDetailPage/>}/>
        <Route path=":clubId/calendar" element={<ClubCalendarPage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
