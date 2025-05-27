// SectionThree.jsx
import React from 'react';
import styled from 'styled-components';
import phoneImage from '../assets/images/phone.png';
import { useNavigate } from "react-router-dom";

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

const PhoneImage = styled.img`
  height: 70vh;
  object-fit: contain;
  margin-left : 7vw;
`;

const TextBox = styled.div`
  color: #0F172A;
//   max-width: 500px;
  text-align: left;
  margin-right : 10vw;
  h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #0F172A;
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
    }

    .primary {
      background-color: white;
      color: black;
    }

    .secondary {
      background: transparent;
      color: white;
      border: 1px solid white;
    }
  }
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

const SectionThree = ({ id }) => {
    const navigate = useNavigate();

  return (
    <SectionWrapper id={id}>
      <PhoneImage src={phoneImage} alt="Phone UI" />
      <TextBox>
        <h1>일반 사용자는 모바일 앱으로 </h1>
        <p>
            On-Club 앱을 통해서 다양한 클럽을 만나보세요.<br></br>
            클럽에 가입하지 않아도 게스트로 참여할 수 있어요.<br></br>
            클럽에서 오는 다양한 알림도 받을 수 있습니다.
        </p>
        <ActionButton onClick={() => navigate("/signup")}>
            바로 가입하고 시작하기
        </ActionButton>
      </TextBox>
    </SectionWrapper>
  );
};

export default SectionThree;