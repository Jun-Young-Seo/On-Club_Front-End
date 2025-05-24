import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RegionModal from "./RegionModal";
import signupBgImg from "../assets/images/signup_bg.jpg";
import { unSecuredAPI } from "../Axios/UnsecuredAPI";
import Swal from "sweetalert2";

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fc;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top:20px;
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
  width: 94%;
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [career, setCareer] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const handlePhoneInput = (e, nextRef, setValue) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    setValue(value);
    if (value.length >= e.target.maxLength) {
      nextRef?.current?.focus();
    }
  };
  
  const handleLocationSelect = (sido, guGun) => {
    setSelectedLocation(`${sido} ${guGun}`);
  };

const handleSubmit = async () => {
  const userTel = `${phone1}-${phone2}-${phone3}`;

  // === 유효성 검사 ===
  const showWarning = (text) =>
    Swal.fire({
      icon: 'warning',
      title: text,
      confirmButtonColor: '#3085d6',
    });

  if (!name.trim()) {
    return showWarning('이름을 입력해주세요');
  }

  if (!gender) {
    return showWarning('성별을 선택해주세요');
  }

  if (!birthDate) {
    return showWarning('생년월일을 선택해주세요');
  }

  if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
    return showWarning('전화번호를 올바르게 입력해주세요');
  }

  if (!password || !confirmPassword) {
    return showWarning('비밀번호를 입력해주세요');
  }

  if (password !== confirmPassword) {
    return Swal.fire({
      icon: 'error',
      title: '비밀번호가 일치하지 않습니다',
      confirmButtonColor: '#d33',
    });
  }

  if (!selectedLocation) {
    return showWarning('지역을 선택해주세요');
  }

  if (career === "" || isNaN(career) || Number(career) < 0) {
    return showWarning('구력(년)을 올바르게 입력해주세요');
  }

  // === 서버 요청 ===
  try {
    await unSecuredAPI.post("/api/user/join", {
      userName: name,
      userTel,
      password,
      region: selectedLocation,
      gender: gender.toUpperCase(),
      birthDate,
      career: parseInt(career),
    });

    await Swal.fire({
      icon: 'success',
      title: '회원가입이 완료되었습니다!',
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/login");
  } catch (error) {
    if (error.response?.status === 409) {
      return Swal.fire({
        icon: 'error',
        title: '이미 가입된 전화번호입니다.',
        confirmButtonColor: '#d33',
      });
    }

    console.error("회원가입 오류:", error);
    Swal.fire({
      icon: 'error',
      title: '회원가입 중 오류가 발생했습니다.',
      text: '잠시 후 다시 시도해주세요.',
      confirmButtonColor: '#d33',
    });
  }
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
              <option value="">-- 성별 선택 --</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </Select>
          </InputField>

          <InputField>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
          </InputField>

          <InputField>
            <PhoneInputContainer>
              <PhoneInput
              type="tel"
              inputMode="numeric"
              maxLength="3"
              placeholder="010"
              value={phone1}
              onChange={(e) => handlePhoneInput(e, phoneRef2, setPhone1)}
            />
            <PhoneInput
              type="tel"
              inputMode="numeric"
              maxLength="4"
              placeholder="1234"
              value={phone2}
              ref={phoneRef2}
              onChange={(e) => handlePhoneInput(e, phoneRef3, setPhone2)}
            />
            <PhoneInput
              type="tel"
              inputMode="numeric"
              maxLength="4"
              placeholder="5678"
              value={phone3}
              ref={phoneRef3}
              onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ""))}
            />
            </PhoneInputContainer>
          </InputField>

          <InputField>
          <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </InputField>

          <InputField>
          <Input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </InputField>

          <InputField>
            <Input type="text" placeholder="지역 선택" value={selectedLocation} readOnly onClick={() => setIsModalOpen(true)} />
          </InputField>

          <InputField>
          <Input type="number" placeholder="구력 (년)" value={career} onChange={(e) => setCareer(e.target.value)} required />
          </InputField>

          <RegisterButton onClick={handleSubmit}>가입하기</RegisterButton>

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
