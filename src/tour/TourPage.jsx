import React, { useState } from 'react';
import styled from 'styled-components';
import BudgetFeature from "./BudgetFeature";
import EventFeature from "./EventFeature";
import MemberFeature from "./MemberFeature";
import ReportFeature from "./ReportFeature";

const TABS = ['예산 관리', '회원 관리', '모임 관리', 'AI 보고서'];
const Container = styled.div`
  width: 100%;
  padding: 4rem 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const TabItem = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: 2px solid ${({ active }) => (active ? '#6366f1' : '#d1d5db')};
  background-color: ${({ active }) => (active ? '#eef2ff' : '#ffffff')};
  color: ${({ active }) => (active ? '#3730a3' : '#374151')};

  box-shadow: ${({ active }) =>
    active ? '0 2px 6px rgba(99, 102, 241, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.03)'};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f7ff;
    border-color: #6366f1;
    color: #3730a3;
  }
`;



const Tourpage = () => {
  const [activeTab, setActiveTab] = useState('예산 관리');

  const renderContent = () => {
    switch (activeTab) {
      case '예산 관리':
        return <BudgetFeature />;
      case '회원 관리':
        return <MemberFeature />;
      case '모임 관리':
        return <EventFeature />;
      case 'AI 보고서':
        return <ReportFeature />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <TabMenu>
        {TABS.map((tab) => (
          <TabItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabItem>
        ))}
      </TabMenu>
      {renderContent()}
    </Container>
  );
};

export default Tourpage;

