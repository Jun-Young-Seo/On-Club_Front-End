import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import logo from '../assets/icons/logo.PNG';

const PageContainer = styled.div`
    height: 100vh;
    background: linear-gradient(180deg, #4947FF 0%, #8271FF 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 1500px;
    height: 500px;
`;

const TextContainer = styled.div`
    max-width: 600px;
    margin-right: 20px;
    margin-left: 180px;
`;

const Title = styled.div`
    color: #FFF;
    -webkit-text-stroke-width: 1px;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space : nowrap;
`;

const SubTitle = styled.div`
    color: #FFF;
    font-family: 'Glory', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Description = styled.div`
      color: #FFF;
      font-family: 'Glory', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-top: 40px;
`;

const LoginButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight:bold;
    border-radius: 10px;
    background-color: #D9D9FF;
    color: #4a00e0;
    border: none;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #f0f0f0;
    }
`;


const FirstScroll = () => {
    const navigate = useNavigate(); // useNavigate 훅 호출
    
    const handleLoginClick = () => {
        console.log('✅ BASE_URL:', process.env.REACT_APP_API_URL);

        navigate('/login'); // login 경로로 이동
    };


    return (
        <PageContainer>
            <Helmet>
            <link href="https://fonts.googleapis.com/css2?family=Edu+QLD+Beginner&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
            </Helmet>
            <ContentWrapper>
                <TextContainer>
                    <SubTitle>동호회 관리가 어려우신가요?</SubTitle>
                    <Title>
                        AI와 함께하는 효과적인 동호회 관리<br />
                        On Club
                    </Title>
                    <Description>지금 바로 로그인하고 시작해보세요</Description>
                    <LoginButton onClick={handleLoginClick}>로그인 하기</LoginButton>
                </TextContainer>
                {/* <ImageSection /> */}
            </ContentWrapper>
        </PageContainer>
    );
};

export default FirstScroll;
