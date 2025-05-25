// SectionThree.jsx
import React from 'react';
import styled from 'styled-components';
import phoneImage from '../assets/images/phone.png';
import appalarm from '../assets/images/appalarm.png';
import appevent from '../assets/images/appevent.png';
import apphome from '../assets/images/apphome.png';
import { useNavigate } from "react-router-dom";

const SectionWrapper = styled.section`
    scroll-snap-align: start;
    height: auto;
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
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;
`;

const FeatureImage = styled.img`
    ${({ size }) => {
        switch (size) {
            case 'large':
                return `
          width: 100%;
          max-width: 700px;
        `;
            case 'small':
                return `
          width: 30%;
          max-width: 300px;
        `;
            case 'medium':
            default:
                return `
          width: 50%;
          max-width: 400px;
        `;
        }
    }}
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

const ActionButton = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  border: 2px solid #64748B;
  background-color: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E2E8F0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.4);
  }
`;

const SectionThree = ({ id }) => {
    const navigate = useNavigate();

    return (
        <SectionWrapper id={id}>
            <HorizontalScrollContainer>
                <Slide style={{ flexDirection: 'row', justifyContent: 'center', gap: '5rem' }}>
                    <FeatureImage src={phoneImage} alt="Phone UI" size="medium" />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '500px' }}>
                        <FeatureTitle>일반 사용자는 모바일 앱으로</FeatureTitle>
                        <FeatureText>
                            <strong>On-Club 앱</strong>을 통해서 다양한 클럽을 만나보세요.<br />
                            클럽에 가입하지 않아도 <strong>게스트</strong>로 참여할 수 있어요.<br />
                            클럽에서 오는 <strong>다양한 알림</strong>도 받을 수 있습니다.
                        </FeatureText>
                        <ActionButton onClick={() => navigate("/signup")}>
                            바로 가입하고 시작하기
                        </ActionButton>

                        <div style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
                                <strong>앱 다운로드:</strong> 곧 앱스토어 / 구글플레이에서 제공될 예정이에요.
                            </p>
                            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#94a3b8' }}>
                                “게스트로도 충분히 즐겨볼 수 있었어요!” - 사용자 리뷰
                            </p>
                        </div>
                    </div>
                </Slide>

                <Slide style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>
                <FeatureImage src={apphome} style={{ width: "280px" }} alt="폰 UI" small />  {/* 왼쪽 폰 이미지 (임시) */}
                    <div style={{ maxWidth: '500px', textAlign: 'left' }}>
                        <FeatureTitle>클럽 가입/찾기 화면</FeatureTitle>
                        <FeatureText>
                            <strong>관심 지역</strong>과 <strong>취향</strong>에 맞는 클럽을 검색하고,<br />
                            바로 <strong>가입 신청</strong>하거나 <strong>게스트로 참여</strong>해보세요.
                        </FeatureText>
                    </div>
                </Slide>
                <Slide style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>
                <FeatureImage src={appevent} style={{ width: "280px" }} alt="폰 UI" small />  {/* 왼쪽 폰 이미지 (임시) */}
                    <div style={{ maxWidth: '500px', textAlign: 'left' }}>
                        <FeatureTitle>일정 참여 신청 화면</FeatureTitle>
                        <FeatureText>
                            클럽이 등록한 <strong>모임 일정</strong>을 한눈에 확인하고,<br />
                            클릭 한 번으로 <strong>참여 신청</strong>을 완료할 수 있어요.
                        </FeatureText>
                    </div>
                </Slide>

                <Slide style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>
                <FeatureImage src={appalarm} style={{ width: "280px" }} alt="폰 UI" small />  {/* 왼쪽 폰 이미지 (임시) */}
                    <div style={{ maxWidth: '500px', textAlign: 'left' }}>
                        <FeatureTitle>알림 수신/푸시 기능</FeatureTitle>
                        <FeatureText>
                            <strong>모임 일정 변경</strong>, <strong>공지사항</strong>, <strong>일정 참여</strong>까지!<br />
                            필요한 정보를 <strong>실시간 알림</strong>으로 빠르게 받아보세요.
                        </FeatureText>
                    </div>
                </Slide>
            </HorizontalScrollContainer>
        </SectionWrapper>
    );
};

export default SectionThree;