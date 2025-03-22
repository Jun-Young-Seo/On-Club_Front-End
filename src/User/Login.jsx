import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../Axios/UnsecuredAPI";
import loginBgImg from "../assets/images/login_bg.jpg";

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
  width: 90%;
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
    border-color: #f5b800;
    background: white;
  }
`;

const ErrorText = styled.p`
  color: red;
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
  background-color: #a4d007;
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
  const [userTel, setUserTel] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login({ userTel, password });
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      setLoginFailed(false);
      navigate("/clubs");
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginFailed(true);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <LeftPanel>
          <Title>On-club</Title>
          <Subtitle>로그인 후 테니스 활동을 즐기세요!</Subtitle>
          <InputField>
            <Input
              type="text"
              placeholder="010-0000-0000"
              value={userTel}
              onChange={(e) => setUserTel(e.target.value)}
              required
            />
          </InputField>
          <InputField>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputField>
          <ErrorText show={loginFailed}>아이디와 비밀번호를 확인해주세요.</ErrorText>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SignupLink>
            계정이 없으신가요? <SignupButton href="/signup">회원가입</SignupButton>
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
