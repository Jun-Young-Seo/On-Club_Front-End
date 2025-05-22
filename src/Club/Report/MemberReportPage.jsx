// components/MemberReport.jsx
import React from "react";
import styled from "styled-components";

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
  text-align: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportBox = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 1rem;
  color: #374151;
`;

const MemberReportPage = () => {
  return (
    <CardWrapper>
      <ChartTitle>👥 회원 관리 보고서</ChartTitle>
      <ReportBox>
        현재 정회원은 총 62명이며, 평균 출석률은 84%입니다.
        최근 3개월간 신규 가입자는 8명, 탈퇴자는 2명입니다.
        성비는 남성 63%, 여성 37%로 구성되어 있으며, 평균 구력은 2.8년입니다.
      </ReportBox>
    </CardWrapper>
  );
};

export default MemberReportPage;
