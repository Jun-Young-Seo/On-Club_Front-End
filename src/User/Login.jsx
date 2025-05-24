import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../Axios/UnsecuredAPI";
import loginBgImg from "../assets/images/login_bg.jpg";
import Swal from "sweetalert2";

const primaryColor = "#a4d007";
const warningColor = "#e74c3c";

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

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 90%;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
`;

const TelInput = styled.input`
  width: 5rem;
  padding: 12px;
  text-align: center;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  background: #f8f9fc;
  color: #333;
  outline: none;
  &:focus {
    border-color: ${primaryColor};
    background: white;
  }
`;

const Input = styled.input`
  width: 87%;
  padding: 12px;
  margin-top:12px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  background: #f8f9fc;
  color: #333;
  outline: none;
  margin-bottom: 12px;
  &:focus {
    border-color: ${primaryColor};
    background: white;
  }
`;

const ErrorText = styled.p`
  color: ${warningColor};
  font-size: 12px;
  margin-top: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const LoginButton = styled.button`
  width: 30%;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: ${primaryColor};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s ease-in-out;
  &:hover {
    background-color: #8bc34a;
  }
`;

const SignupLink = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 10px;
  text-align: center;
`;

const SignupButton = styled.a`
  color: #f5b800;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RightPanel = styled.div`
  flex: 1.2;
  background: url(${loginBgImg}) no-repeat center;
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

const Login = () => {
  const navigate = useNavigate();
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const passwordRef = useRef(null);

  const handlePhoneChange = (e, setter, maxLength, nextRef) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= maxLength) {
      setter(value);
      if (value.length === maxLength && nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleLogin = async () => {
    const userTel = `${phone1}-${phone2}-${phone3}`;
    try {
      const response = await login({ userTel, password });

      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      setLoginFailed(false);

      Swal.fire({
        icon: "success",
        title: "로그인 성공!",
        text: `${response.data.userName}님, 환영합니다 😊`,
        confirmButtonColor: "#5fbd7b",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/clubs"), 1600);
    } catch (error) {
      setLoginFailed(true);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "전화번호 또는 비밀번호가 올바르지 않습니다.",
          confirmButtonColor: warningColor,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "서버 오류",
          text: "잠시 후 다시 시도해주세요.",
          confirmButtonColor: warningColor,
        });
      }
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <LeftPanel>
          <Title>On-club</Title>
          <Subtitle>로그인 후 테니스 활동을 즐기세요!</Subtitle>
          <InputGroup>
            <TelInput
              type="text"
              value={phone1}
              maxLength={3}
              placeholder="010"
              ref={ref1}
              onChange={(e) => handlePhoneChange(e, setPhone1, 3, ref2)}
            />
            <span>-</span>
            <TelInput
              type="text"
              value={phone2}
              maxLength={4}
              placeholder="1234"
              ref={ref2}
              onChange={(e) => handlePhoneChange(e, setPhone2, 4, ref3)}
            />
            <span>-</span>
            <TelInput
              type="text"
              value={phone3}
              maxLength={4}
              placeholder="5678"
              ref={ref3}
              onChange={(e) => {
                handlePhoneChange(e, setPhone3, 4);
                if (e.target.value.length === 4 && passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
            />
          </InputGroup>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(); 
                  }
                }}
                ref={passwordRef}
              />

          <ErrorText show={loginFailed}>
            아이디와 비밀번호를 확인해주세요.
          </ErrorText>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SignupLink>
            계정이 없으신가요?{" "}
            <SignupButton href="/signup">회원가입</SignupButton>
          </SignupLink>
        </LeftPanel>
        <RightPanel>
          <Overlay>
            <InfoText>Welcome to On-Club!</InfoText>
            <SmallText>On-Club에서 테니스 커뮤니티를 즐기세요.</SmallText>
          </Overlay>
        </RightPanel>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login;
