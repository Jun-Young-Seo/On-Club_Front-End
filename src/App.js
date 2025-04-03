import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Layout/Header";
import Layout from "./Layout/Layout";
import ClubListPage from "./Club/ClubListPage";
import Login from "./User/Login";
import Signup from "./User/Singup";
import Main from "./Main/Main";
import ClubDetailPage from "./Club/ClubDetailPage";
import ClubCalendarPage from "./Club/ClubCalendarPage";
import TransactionTable from "./Club/Budget/TrasactionTable";
import BudgetDashBoard from "./Club/Budget/BudgetDashBoard";
import Match from "./Match/Match";
import MatchDashBoard from "./Match/MatchDashBoard";

const App = () => {
  return (
    <Routes>
      {/* 로그인 안된 경우 처음 렌더링되는 메인 페이지 */}
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* 클럽 리스트 페이지 (레이아웃 적용 X) */}
      <Route 
        path="/clubs" 
        element={
          <>
            <Header />   {/* 헤더 추가 */}
            <ClubListPage />
          </>
        } 
      />

      {/* 클럽 상세 페이지 이하 모든 페이지에 레이아웃 적용 */}
      <Route path="/clubs/:clubId/*" element={<Layout />}>
        <Route index element={<ClubDetailPage />} />
        <Route path="budget_dashboard" element={<BudgetDashBoard/>}/>
        <Route path="calendar" element={<ClubCalendarPage />} />
        <Route path="budget_detail" element={<TransactionTable />} />
        <Route path="event" element={<MatchDashBoard/>}/>
        <Route path="event/:eventId" element={<Match />} />
        </Route>
    </Routes>
  );
};

export default App;
