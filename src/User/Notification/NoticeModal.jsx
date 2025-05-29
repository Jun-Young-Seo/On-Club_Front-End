import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 1.2rem;
  width: 30rem;
  max-width: 90%;
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Sender = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #5f5f5f;
  margin-bottom: 0.6rem;
`;

const MessageBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 0.8rem;
  padding: 1rem;
  font-size: 1rem;
  color: #333;
  white-space: pre-wrap;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.5;
`;

const ConfirmButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 0.6rem;
  background: #5fbd7b;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #4aa866;
  }
`;

const NoticeModal = ({ notification, onClose }) => {
  const { title, message, sender } = notification;

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>📢 {title || "클럽 알림"}</Title>
        <Sender>📍 <strong>{sender}</strong></Sender>
        <MessageBox>{message || "내용이 없습니다."}</MessageBox>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NoticeModal;
