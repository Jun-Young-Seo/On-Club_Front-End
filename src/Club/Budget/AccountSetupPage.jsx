import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import dashboardImage from "../../assets/images/budget_dashboard.svg";
import dashboardImage_2 from "../../assets/images/budget_dashboard_2.svg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AccountSetupModal from "./AccountSetupModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [dashboardImage, dashboardImage_2, dashboardImage];

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  flex-wrap: wrap;
  background: #f9fafb;
`;

const ImageBox = styled.div`
  flex: 1;
  max-width: 640px;
  margin-right: 5vw;
  padding: 1rem;
  background: #e5e7eb;
  border: 10px solid #e5e7eb; /* Tailwind gray-200 */
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  .slick-slide > div {
    padding: 0 0.3rem;
  }

  .slick-dots {
    bottom: -20px;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
  }
`;


const SlideImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 460px;
  padding: 1rem;
  flex-direction: column;
`;

const HeadingWrapper = styled.div`
  margin-bottom: 3rem;
`;

const Heading = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f2937;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const InstructionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InstructionItem = styled.li`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #3b82f6;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0.6rem;
  }
`;

const CTAButton = styled.button`
  margin-top: 3rem;
  padding: 0.9rem 2rem;
  background-color: #4f46e5;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-left: 3rem;

  &:hover {
    background-color: #4338ca;
  }
`;

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const AccountSetupPage = () => {
    const [showModal, setShowModal] = useState(false);
    const { clubId } = useParams();

  return (
    <PageWrapper>
      <ImageBox>
        <Slider {...sliderSettings}>
          {images.map((img, idx) => (
            <SlideImage key={idx} src={img} alt={`slide-${idx}`} />
          ))}
        </Slider>
      </ImageBox>

      <TextSection>
        <HeadingWrapper>
          <Heading>아직도 손으로, 엑셀로</Heading>
          <Heading>클럽 예산을 직접 관리하시나요?</Heading>
        </HeadingWrapper>
        <Description>On-Club과 함께라면 예산 관리가 훨씬 쉬워집니다.</Description>
        <InstructionList>
          <InstructionItem>월별 수입·지출 내역을 한눈에 확인할 수 있는 대시보드</InstructionItem>
          <InstructionItem>각 거래 내역을 손쉽게 추가하고 수정할 수 있어요</InstructionItem>
          <InstructionItem>엑셀 파일로 거래 내역을 한번에 업로드할 수 있어요</InstructionItem>
        </InstructionList>
        <CTAButton onClick={() => setShowModal(true)}>
            메인 계좌 지정하고 시작하기
        </CTAButton>
      </TextSection>
      {showModal && <AccountSetupModal clubId={clubId} onClose={() => setShowModal(false)} />}

    </PageWrapper>
  );
};

export default AccountSetupPage;
