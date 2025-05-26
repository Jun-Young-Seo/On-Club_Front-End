import React, { useState } from 'react';
import styled from 'styled-components';
import laptopImage from '../assets/images/macbook.png';

const clubCreateImages = [
    require('../assets/images/createclubintro.PNG'),
    require('../assets/images/createclub1.PNG'),
    require('../assets/images/createclub2.PNG'),
    require('../assets/images/createclub3.PNG'),
];

const descriptions = [
    {
        title: '클럽 만들기 소개',
        text: 'On-club으로 클럽 운영을 시작해보세요!'
    },
    {
        title: '클럽 기본 정보 입력',
        text: '클럽명, 지역 등 필수 정보를 간편하게 등록하세요.'
    },
    {
        title: '클럽 설명 작성',
        text: '클럽의 성격과 활동 내용을 소개해보세요.'
    },
    {
        title: '클럽 로고 업로드!',
        text: '이제 여러분의 원하는 클럽로고를 업로드해봐요!'
    },
];

const SectionWrapper = styled.section`
    scroll-snap-align: start;
    min-height: 100vh;
    background-color: #F1F5F9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
    box-sizing: border-box;
    overflow: hidden;
`;

const HorizontalScrollContainer = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    width: 100%;
    max-width: 1200px;
    flex: 1;
    min-height: 0;
    scroll-behavior: smooth;
    margin-top: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Slide = styled.div`
    flex: 0 0 100%;
    scroll-snap-align: start;
    padding: 4rem 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: visible;
`;

const SlideImageCarousel = styled.div`
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 400px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    margin: 0 auto;
`;

const FeatureImage = styled.img`
    width: ${({ large }) => (large ? '100%' : '50%')};
    max-width: ${({ large }) => (large ? '700px' : '400px')};
    height: auto;
    object-fit: contain;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 1rem;
`;

const FeatureText = styled.p`
    font-size: 1.1rem;
    color: #475569;
    line-height: 1.6;

    strong {
        color: #0F172A;
    }
`;

const CarouselImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const ArrowButton = styled.button`
    font-size: 1.2rem;
    background: none;
    border: none;
    color: #475569;
    cursor: pointer;
    margin: 0 1rem;
`;

const DotIndicatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const DotIndicator = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Dot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#475569' : '#CBD5E1')};
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #0F172A;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #475569;
    line-height: 1.6;
    margin-bottom: 1rem;
`;

const SubTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #0F172A;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
`;

const SubDescription = styled.p`
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 1rem;
`;

const SectionTwo = ({ id }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % clubCreateImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? clubCreateImages.length - 1 : prev - 1
        );
    };

    return (
        <SectionWrapper id={id}>
            <HorizontalScrollContainer>
                <Slide>
                    <FeatureImage src={laptopImage} alt="회원 관리" />
                    <Title>운영진은 컴퓨터에서</Title>
                    <Description>
                        <strong>클럽 운영</strong>에 필요한 기능을 직관적인 <strong>웹 대시보드</strong>로 확인하세요.<br />
                        <strong>회원 관리</strong>, <strong>예산 관리</strong>, <strong>공정한 경기 배정</strong>까지 모두 컴퓨터로 간편하게 작업할 수 있습니다.
                    </Description>
                </Slide>
                <Slide>
                    <SubTitle>{descriptions[currentIndex].title}</SubTitle>
                    <SlideImageCarousel>
                        <CarouselImage src={clubCreateImages[currentIndex]} alt="클럽 만들기 안내" />
                    </SlideImageCarousel>
                    <SubDescription>{descriptions[currentIndex].text}</SubDescription>
                    <DotIndicatorWrapper>
                        <ArrowButton onClick={handlePrev}>◀</ArrowButton>
                        <DotIndicator>
                            {clubCreateImages.map((_, idx) => (
                                <Dot key={idx} active={idx === currentIndex} />
                            ))}
                        </DotIndicator>
                        <ArrowButton onClick={handleNext}>▶</ArrowButton>
                    </DotIndicatorWrapper>
                </Slide>

                <Slide>
                    <FeatureTitle>회원 관리</FeatureTitle>
                    <FeatureImage src={require('../assets/images/clubcon.PNG')} alt="회원 관리" large/>
                    <FeatureText><strong>출석률</strong>, <strong>연락처</strong>, <strong>역할</strong>까지 한눈에! 회원 정보를 체계적으로 관리해보세요.</FeatureText>
                </Slide>

                <Slide>
                    <FeatureTitle>일정 관리</FeatureTitle>
                    <FeatureImage src={require('../assets/images/clubevent.PNG')} alt="일정 관리" large/>
                    <FeatureText><strong>클럽 이벤트</strong>와 <strong>경기 일정</strong>을 한눈에 확인하고 쉽게 추가, 수정할 수 있어요.</FeatureText>
                </Slide>

                <Slide>
                    <FeatureTitle>예산 관리</FeatureTitle>
                    <FeatureImage src={require('../assets/images/clubtrans.PNG')} alt="예산 관리" large/>
                    <FeatureText><strong>수입</strong>과 <strong>지출 내역</strong>을 그래프와 함께 시각화해 회계를 투명하게 공유할 수 있어요.</FeatureText>
                </Slide>

                <Slide>
                    <FeatureTitle>보고서 관리</FeatureTitle>
                    <FeatureImage src={require('../assets/images/clubreport.PNG')} alt="정산 내역" large/>
                    <FeatureText><strong>매월 자동 생성</strong>되는 <strong>통계 리포트</strong>로 클럽 운영을 정리하고 공유해보세요.</FeatureText>
                </Slide>

            </HorizontalScrollContainer>
        </SectionWrapper>
    );
};

export default SectionTwo;
