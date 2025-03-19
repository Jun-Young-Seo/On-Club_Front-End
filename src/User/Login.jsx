import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../Axios/UnsecuredAPI';

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #4947FF 0%, #8271FF 100%);
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #a000ff;
    margin-bottom: 10px;
`;

const Subtitle = styled.div`
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
`;

const InputLabel = styled.label`
    align-self: flex-start;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin: 10px 0 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    &:focus {
        border-color: #a000ff;
    }
`;

const ErrorText = styled.p`
    color: red;
    font-size: 12px;
    align-self: flex-start;
    margin-top: 5px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #a000ff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #8700cc;
    }
`;

const SignupLink = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #a000ff;
    background-color: white;
    border: 1px solid #a000ff;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background-color: #f0e0ff;
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const [userTel, setUserTel] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async()=>{
        try{
            const response = await login({ userTel, password });
            console.log(response);
            sessionStorage.setItem('userId',response.data.userId);
            navigate("/");
        }catch(error){
            if(error.response?.status === 401){
                alert("Invalid Password");
            }
            else{
                console.error(error);
            }
        }
    };
    
    return (
        <PageContainer>
            <FormWrapper>
                <Title>On-club</Title>
                <Subtitle>회원가입</Subtitle>
                <InputLabel>전화번호</InputLabel>
                <Input
                    type="text"
                    placeholder="010-0000-0000"
                    value={userTel}
                    onChange={(e) => setUserTel(e.target.value)}
                    required
                />
                <InputLabel>비밀번호</InputLabel>
                <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <ErrorText>아이디와 비밀번호를 확인해주세요.</ErrorText>
                <Button onClick={handleLogin}>로그인</Button>
                <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
            </FormWrapper>
        </PageContainer>
    );
};

export default Login;

// {
//     "password":"password1234",
//     "userTel":"010-1234-5678"
//   }