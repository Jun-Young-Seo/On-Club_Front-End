import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #fafece; /* 테니스공 느낌 배경 */
  min-height: 100vh;
  padding: 6rem 1rem 6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  background: white;
  border-radius: 2rem;
  padding: 4rem 2rem 3rem;
  max-width: 1000px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  font-family: 'Pretendard', 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: #222;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 3.5rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 4rem;
`;

const FeatureItem = styled.div`
  background-color: #f9fafb;
  border-radius: 1.5rem;
  padding: 2rem;
  width: 260px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Emoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h2`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FeatureDesc = styled.p`
  font-size: 1.05rem;
  color: #666;
`;

const NextButton = styled.button`
  background-color: #27ae60;
  color: white;
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #219150;
  }
`;

const NewClubPage = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>당신만의 테니스 클럽을 만들어보세요 🎾</Title>
        <Subtitle>On-Club은 클럽 관리의 새로운 기준입니다.</Subtitle>
        <FeatureList>
            <FeatureItem>
                <Emoji>📅</Emoji>
                <FeatureTitle>일정 관리</FeatureTitle>
                <FeatureDesc>클럽 이벤트와 경기 일정을 한눈에 확인하고 관리할 수 있어요.</FeatureDesc>
            </FeatureItem>
            <FeatureItem>
                <Emoji>🧾</Emoji>
                <FeatureTitle>예산 및 회비 관리</FeatureTitle>
                <FeatureDesc>회비 걱정은 그만! 투명하고 편리한 예산 관리 기능을 제공합니다.</FeatureDesc>
            </FeatureItem>
            <FeatureItem>
                <Emoji>👥</Emoji>
                <FeatureTitle>회원 관리</FeatureTitle>
                <FeatureDesc>출석률, 연락처, 역할까지 한눈에! 회원 정보를 체계적으로 관리해보세요.</FeatureDesc>
            </FeatureItem>
            <FeatureItem>
                <Emoji>🎯</Emoji>
                <FeatureTitle>공정한 경기 분배</FeatureTitle>
                <FeatureDesc>자동으로 팀을 구성하고 공정하게 경기를 배정해드립니다.</FeatureDesc>
            </FeatureItem>
            <FeatureItem>
                <Emoji>📝</Emoji>
                <FeatureTitle>보고서 기능</FeatureTitle>
                <FeatureDesc>회원과 예산 데이터를 기반으로 인사이트를 제공하는 보고서를 생성합니다.</FeatureDesc>
            </FeatureItem>
            <FeatureItem>
                <Emoji>☁️</Emoji>
                <FeatureTitle>클라우드 파일 저장</FeatureTitle>
                <FeatureDesc>계약서, 회의록 등 클럽 관리에 필요한 다양한 파일을 안전하게 저장하세요.</FeatureDesc>
            </FeatureItem>
            </FeatureList>
        <NextButton onClick={() => window.location.href = "/new/club/step1"}>
          클럽 만들기 시작하기
        </NextButton>
      </Container>
    </PageWrapper>
  );
};

export default NewClubPage;
