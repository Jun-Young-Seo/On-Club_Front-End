import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import ClubListPage from "./Club/ClubListPage";
import Login from "./User/Login";
import Main from "./Main/Main";

const App = () => {
  return (
    <Routes>
      {/* 🔹 메인 페이지 */}
      <Route path="/" element={<Main />} />

      {/* 🔹 로그인 페이지 (성공 시 Layout이 직접 렌더링됨) */}
      <Route path="/login" element={<Login />} />

      {/* 🔹 Club List는 Layout 내부에서 관리 */}
      <Route path="/clubs/*" element={<Layout />}>
        <Route index element={<ClubListPage />} />
      </Route>
    </Routes>
  );
};

export default App;
