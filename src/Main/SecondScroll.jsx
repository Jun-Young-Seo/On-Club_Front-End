import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #8874FF 0%, #C3A6FF 70%, #F7C3FF 100%); /* 자연스러운 연결 */
  padding: 50px 20px; /* 여백 추가 */
`;

const CardContainer = styled.div`
  display: flex;
  gap: 179px;
  margin-bottom: 50px;
`;

const Card = styled.div`
  position: relative;
  width: 476px;
  height: 583px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(0deg, rgba(236, 175, 255, 0.90) 0%, rgba(133, 132, 255, 0.90) 100%);
  padding: 8px 16px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardDescription = styled.div`
  color: #000;
  font-family: "Golos Text", sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  text-align: left;
`;

const CardButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #8271FF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 30px;

  &:hover {
    background-color: #6d61e5;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  object-fit: cover;
  border-radius: 10px;
`;

const MiniTitle = styled.div`
  color: #615CEE;
  font-family: "Golos Text", sans-serif;
  font-size: 18px;
  font-weight: 900;
  margin-right: 150px;
  margin-top: 100px;
  margin-bottom: 10px;
`;

// Footer 스타일
const FooterWrapper = styled.div`
  padding: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContainer = styled.footer`
  
  background: #ffffff;
  color: #000;
  padding: 2rem 1.5rem;
  text-align: center;
  font-family: "Golos Text", sans-serif;
  margin: 20px auto;
  max-width: 1200px; /* 가로 최대 크기 */
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); 
  border: 9px solid #efddff;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;


const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;

  button {
    padding: 0.8rem 1.5rem;
    background-color: rgba(130, 113, 255, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(109, 97, 229, 0.9);
      transform: scale(1.05);
    }
  }
`;

const FooterContent = styled.div`
  margin-top: 1rem;
`;

const SecondScroll = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFirstButton = () => {
  };

  const handleSecondButton = () => {
  };

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <PageContainer>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* 카드 컨테이너 */}
      <CardContainer>
        <Card>
          <CardTitle>On club</CardTitle>
          <MiniTitle>
            동호회 운영에 어려움을 겪고 계신가요?
          </MiniTitle>
          <CardDescription>
            설명<br/>
            설명<br/>
            설명
          </CardDescription>
          <CardButton onClick={handleFirstButton}>On club ➜</CardButton>
          {/* <Image src={roomFilterImg} /> */}
        </Card>
        <Card>
          <CardTitle>On club</CardTitle>
          <MiniTitle>
            동호회 관리에 어려움을 겪고 있나요?
          </MiniTitle>
          <CardDescription>
            설명<br/>
            설명<br/>
            설명
          </CardDescription>
          <CardButton onClick={handleSecondButton}>On club ➜</CardButton>
          {/* <Image src={communityImg} /> */}
        </Card>
      </CardContainer>

      {/* 푸터 */}
      <FooterWrapper>
        <ButtonContainer>
          <button onClick={toggleFooter}>
            {isExpanded ? 'Hide About Our Team' : 'About Our Team'}
          </button>
        </ButtonContainer>
        <FooterContainer isVisible={isExpanded}>
          <FooterContent>
            팀 설명<br/>
            저작권<br/>
            뭐 이것저것<br/>
          </FooterContent>
        </FooterContainer>
      </FooterWrapper>
    </PageContainer>
  );
};

export default SecondScroll;
