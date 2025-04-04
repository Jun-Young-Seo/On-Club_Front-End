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
import MembershipTable from "./Club/Membership/MembershipTable";
import NotificationPage from "./User/Notification/NotificationPage";

const App = () => {
  return (
    <>
      <Header /> {/* 항상 보이게 */}
      <Routes>
        {/* 메인/회원가입/로그인 */}
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 클럽 리스트는 단독 페이지 */}
        <Route path="/clubs" element={<ClubListPage />} />

        {/* 알림도 Header만 있는 단독 페이지 */}
        <Route path="/notifications" element={<NotificationPage />} />

        {/* 클럽 상세 페이지 이하 모든 경로에는 Layout 적용 (→ 사이드바 포함됨) */}
        <Route path="/clubs/:clubId/*" element={<Layout />}>
          <Route index element={<ClubDetailPage />} />
          <Route path="budget_dashboard" element={<BudgetDashBoard />} />
          <Route path="calendar" element={<ClubCalendarPage />} />
          <Route path="budget_detail" element={<TransactionTable />} />
          <Route path="event" element={<MatchDashBoard />} />
          <Route path="event/:eventId" element={<Match />} />
          <Route path="membership_detail" element={<MembershipTable />} />
        </Route>
      </Routes>
    </>
  );
};


export default App;
