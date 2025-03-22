import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RegionModal from "./RegionModal";
import signupBgImg from "../assets/images/signup_bg.jpg";

const PageContainer = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fc;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 950px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const InputField = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  background: #f8f9fc;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #007bff;
    background: white;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  background: #f8f9fc;
  color: #333;
  outline: none;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #f5b800;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #ffd700;
  }
`;

const LoginText = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 10px;
  text-align: center;
`;

const LoginButton = styled.a`
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RightPanel = styled.div`
  flex: 1.2;
  background: url(${signupBgImg}) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`;

const InfoText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const SmallText = styled.p`
  font-size: 13px;
  color: #555;
  max-width: 80%;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const PhoneInput = styled(Input)`
  width: 32%;
  text-align: center;
`;

const Signup = () => {
  const navigate = useNavigate();
  const phoneRef2 = useRef(null);
  const phoneRef3 = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handlePhoneInput = (e, nextRef) => {
    if (e.target.value.length >= e.target.maxLength) {
      nextRef?.current?.focus();
    }
  };

  const handleLocationSelect = (sido, guGun) => {
    setSelectedLocation(`${sido} ${guGun}`);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <LeftPanel>
          <Title>On-Club 회원가입</Title>
          <Subtitle>회원가입을 위해 정보를 입력해주세요.</Subtitle>

          <InputField>
            <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
          </InputField>

          <InputField>
            <Select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </Select>
          </InputField>

          <InputField>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
          </InputField>

          <InputField>
            <PhoneInputContainer>
              <PhoneInput type="text" maxLength="3" placeholder="010" onInput={(e) => handlePhoneInput(e, phoneRef2)} />
              <PhoneInput type="text" maxLength="4" placeholder="1234" ref={phoneRef2} onInput={(e) => handlePhoneInput(e, phoneRef3)} />
              <PhoneInput type="text" maxLength="4" placeholder="5678" ref={phoneRef3} />
            </PhoneInputContainer>
          </InputField>

          <InputField>
            <Input type="password" placeholder="비밀번호" required />
          </InputField>

          <InputField>
            <Input type="password" placeholder="비밀번호 확인" required />
          </InputField>

          <InputField>
            <Input type="text" placeholder="지역 선택" value={selectedLocation} readOnly onClick={() => setIsModalOpen(true)} />
          </InputField>

          <InputField>
            <Input type="number" placeholder="구력 (년)" min="0" required />
          </InputField>

          <RegisterButton>Sign Up</RegisterButton>

          <LoginText>
            이미 가입했나요? <LoginButton href="/login">로그인</LoginButton>
          </LoginText>
        </LeftPanel>

        <RightPanel>
          <Overlay>
            <InfoText>On-Club</InfoText>
            <SmallText>🎾함께하는 테니스</SmallText>
          </Overlay>
        </RightPanel>
      </ContentWrapper>

      <RegionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleLocationSelect} />
    </PageContainer>
  );
};

export default Signup;
