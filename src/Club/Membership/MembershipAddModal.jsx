import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  FaUser, FaPhone, FaLock, FaMapMarkerAlt,
  FaVenusMars, FaBirthdayCake, FaBaseballBall
} from "react-icons/fa";

// ───── Styled Components ─────
const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 450px;
  border-radius: 16px;
  padding: 2rem 2rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 0.4rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  text-align: center;
  color: #666;
  margin-bottom: 1.8rem;
`;

const ToggleButton = styled.button`
  background: #f0f0f0;
  color: #333;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  margin: 0 auto 1.2rem auto;
  display: block;
  cursor: pointer;
  &:hover {
    background: #e2e2e2;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;


const IconWrapper = styled.div`
  margin-right: 10px;
  color: #888;
  font-size: 1rem;
`;
const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  color: ${({ disabled }) => (disabled ? "#888" : "#000")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

const Select = styled.select`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  color: ${({ disabled }) => (disabled ? "#888" : "#000")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;


const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px ${({ disabled }) => (disabled ? "dashed #ccc" : "solid #ddd")};
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  background: ${({ disabled }) => (disabled ? "#eaeaea" : "#fafafa")};
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "auto")};
  transition: background 0.3s ease;
  box-shadow: ${({ disabled }) =>
    disabled ? "inset 0 0 5px rgba(0, 0, 0, 0.1)" : "none"};
`;


const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.8rem;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#f5f5f5" : "#2563eb"};
  color: ${({ variant }) => (variant === "cancel" ? "#333" : "white")};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

// ───── Component ─────
const MembershipAddModal = ({ onClose, onSubmit }) => {
  const [isExistingUser, setIsExistingUser] = useState(false);
  const toggleExistingUser = () => {
    setIsExistingUser(prev => !prev);
  };

  const [form, setForm] = useState({
    userName: "",
    userTel: "",
    password: "",
    region: "",
    gender: "MALE",
    birthDate: "",
    career: 0,
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.userTel || (!isExistingUser && (!form.userName || !form.password))) {
      Swal.fire("필수 정보 누락", "전화번호는 필수이며, 신규 회원일 경우 이름과 비밀번호도 필요합니다!", "warning");
      return;
    }
    onSubmit(form, isExistingUser); 
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>👋 회원 추가</Title>
        <Subtitle>아래 정보를 입력하여 새 회원을 추가합니다.</Subtitle>

        <ToggleButton onClick={toggleExistingUser}>
          {isExistingUser ? "🔄 신규 회원 추가" : "📱 기존 회원인가요?"}
        </ToggleButton>

        <Form>
          <InputBox>
            <IconWrapper><FaUser /></IconWrapper>
            <Input
              placeholder="이름"
              value={form.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              disabled={isExistingUser}
            />
          </InputBox>

          <InputBox>
            <IconWrapper><FaPhone /></IconWrapper>
            <Input
              placeholder="전화번호"
              value={form.userTel}
              onChange={(e) => handleChange("userTel", e.target.value)}
            />
          </InputBox>

          <InputBox>
            <IconWrapper><FaLock /></IconWrapper>
            <Input
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={isExistingUser}
            />
          </InputBox>

          <InputBox>
            <IconWrapper><FaMapMarkerAlt /></IconWrapper>
            <Input
              placeholder="지역"
              value={form.region}
              onChange={(e) => handleChange("region", e.target.value)}
              disabled={isExistingUser}
            />
          </InputBox>

          <InputBox>
            <IconWrapper><FaVenusMars /></IconWrapper>
            <Select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              disabled={isExistingUser}
            >
              <option value="MALE">남자</option>
              <option value="FEMALE">여자</option>
            </Select>
          </InputBox>

          <InputBox>
            <IconWrapper><FaBirthdayCake /></IconWrapper>
            <Input
              type="date"
              value={form.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              disabled={isExistingUser}
            />
          </InputBox>

          <InputBox disable={isExistingUser}>
            <IconWrapper><FaBaseballBall /></IconWrapper>
            <Input
              type="number"
              placeholder="구력 (년)"
              value={form.career}
              onChange={(e) => handleChange("career", e.target.value)}
              disabled={isExistingUser}
            />
          </InputBox>
        </Form>

        <ButtonRow>
          <Button variant="cancel" onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>추가</Button>
        </ButtonRow>
      </ModalContainer>
    </ModalBackground>
  );
};

export default MembershipAddModal;
