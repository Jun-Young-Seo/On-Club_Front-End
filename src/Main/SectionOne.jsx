import React from 'react';
import styled from 'styled-components';
import phoneImage from '../assets/images/hand.png';

const SectionWrapper = styled.section`
  scroll-snap-align: start;
  height: 100vh;
  background-color: #F1F5F9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6vw;
  box-sizing: border-box;
`;

const TextBox = styled.div`
  color: #0F172A;
  max-width: 540px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    color: #0F172A;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #334155;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #475569;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;

    button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 2rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .primary {
      background-color: #2563EB; /* 파란색 버튼 */
      color: white;

      &:hover {
        background-color: #1D4ED8;
      }
    }
  }
`;

const PhoneImage = styled.img`
  height: 70vh;
  object-fit: contain;
`;
const OutlinedPurpleButton = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #334155; /* 진한 슬레이트 텍스트 */
  border: 2px solid #64748B; /* 중간 슬레이트 테두리 */
  background-color: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E2E8F0; /* 밝은 슬레이트 hover 배경 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.4); /* 테두리 강조 */
  }
`;


const SectionOne = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <TextBox>
        <h1>On-Club</h1>
        <h2>테니스 클럽 운영, 더 쉽고 스마트하게</h2>
        <p>
          회원 명부부터 예산 관리, 게임 출석까지.<br />
          이제 엑셀 없이도 모든 운영을 한 번에 관리하세요.<br />
          On-Club과 함께라면, 당신의 클럽이 더 효율적으로 바뀝니다.
        </p>
        <OutlinedPurpleButton>지금 시작하기</OutlinedPurpleButton>

      </TextBox>
      <PhoneImage src={phoneImage} alt="Phone" />
    </SectionWrapper>
  );
};

export default SectionOne;
