// SectionTwo.jsx
import React from 'react';
import styled from 'styled-components';
import laptopImage from '../assets/images/macbook.png';

const SectionWrapper = styled.section`
  scroll-snap-align: start;
  height: 100vh;
  background-color: #F1F5F9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  box-sizing: border-box;
`;

const LaptopImage = styled.img`
  width: 30vw;
  max-width: 800px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  max-width: 700px;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  border: 2px solid #64748B;
  background-color: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E2E8F0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.4);
  }
`;

const SectionTwo = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <LaptopImage src={laptopImage} alt="Laptop" />
      <Title>운영진은 컴퓨터에서</Title>
      <Description>
        클럽 운영에 필요한 기능을 직관적인 웹 대시보드로 확인하세요.<br />
        회원 관리, 회계 관리, 공정한 경기 배정까지 모두 컴퓨터로 간편하게 작업할 수 있습니다.
      </Description>
      <ActionButton>기능 살펴보기</ActionButton>
    </SectionWrapper>
  );
};

export default SectionTwo;
