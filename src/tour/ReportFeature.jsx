import styled from 'styled-components';
import React from 'react';
import sampleImg from '../assets/images/feature/report.svg';
import sampleImg2 from '../assets/images/feature/report2.svg';
import sampleImg3 from '../assets/images/feature/report3.svg';
import sampleImg4 from "../assets/images/feature/report4.svg";

const PageWrapper = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  margin: 0 auto;
  width: 90%;
`;

const ContentArea = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const Sidebar = styled.div`
  position: sticky;
  top: 120px;
  right: 0;
  align-self: flex-start;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: auto;

  padding: 1.5rem;
  border-radius: 1rem;

  background: #f9fafb;
  border: 1.5px solid #d1d5db;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08); 
`;

const AnchorButton = styled.button`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
  text-align: left;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    background: #eef2ff;
    border-color: #6366f1;
    color: #4338ca;
  }
`;

const Title = styled.div`
  margin-top: 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
`;

const Description = styled.div`
  margin-top: 1.2rem;
  font-size: 1rem;
  text-align: center;
  color: #4b5563;
`;

const ImageTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center; 
  margin: 2rem 0;
`;

const Image = styled.img`
  width: 60%;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
`;


const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const Step = styled.div``;

const StepTitle = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
`;

const StepDesc = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-top: 0.3rem;
`;


const HighlightText = styled.div`
  font-size: 1.05rem;
  color: #111827;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;

  background-color: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  white-space: pre-line;
`;
const HorizontalDivider = styled.div`
  width: 100%;
  border-top: 1px dashed #d1d5db;
  margin: 6rem 0;
`;
const HorizontalDivider2= styled.div`
  width: 100%;
  border-top: 1px dashed #d1d5db;
  margin: 2rem 0;
`;


const ReportFeature = () => {

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

  return (
    <PageWrapper>
      <ContentArea>
        <Title>AI 보고서</Title>
        <Description>
          AI가 분석한 우리 클럽 보고서를 보고, 새로운 인사이트를 얻어요!
        </Description>
        <HorizontalDivider2 />

        <ImageTextWrapper id="first">
          <Image src={sampleImg} alt="모임 관리 예시" />
          <StepList>
            <Step>
            <HighlightText>
                정확한 분석을 위해 예산관리 페이지에서 {`\n`}
                "?" 로 분류된 기능을 수정해주세요.
            </HighlightText>
            <StepTitle>한 눈에 보는 지난 달 예산관리 보고서</StepTitle>
              <StepDesc>지난 달의 모든 데이터를 모아 정리했어요.</StepDesc>
              <StepDesc>수입과 지출, 그리고 내역 분류까지 한 눈에 파악하세요.</StepDesc>
            <StepTitle>계좌가 분리되어 있는 경우엔?</StepTitle>
              <StepDesc>계좌가 분리되어 있어도 상관 없어요.</StepDesc>
              <StepDesc>모든 계좌의 기록을 한데 모아 정리했어요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider />

        <ImageTextWrapper id="second">
          <Image src={sampleImg2} alt="모임 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>AI 보고서</StepTitle>
              <StepDesc>AI가 지난 달의 모든 거래를 확인하고, 보고서를 작성해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>요약</StepTitle>
              <StepDesc>적자와 흑자 여부를 파악해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>수입 / 지출 분석</StepTitle>
              <StepDesc>AI가 주요 수입과 지출 내용을 분석해요.</StepDesc>
              <StepDesc>너무 과하거나 부족한 내용은 없는지 알려줘요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>회비 조정 제안</StepTitle>
              <StepDesc>적자가 심하다면, 적절한 회비 인상안을 제시해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>운영 방안</StepTitle>
              <StepDesc>비용 절감, 회비 인상 등 다양한 방법을 제시해요.</StepDesc>
              <StepDesc>보고서를 바탕으로 클럽 운영에 새로운 인사이트를 얻을 수 있어요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider/>

        <ImageTextWrapper id="third">
          <Image src={sampleImg3} alt="모임 관리 예시" />
          <StepList>

            <Step>
            <StepTitle>한 눈에 보는 지난 달 회원관리 보고서</StepTitle>
              <StepDesc>지난 달의 모든 데이터를 모아 정리했어요.</StepDesc>
              <StepDesc>클럽 회원 성비와 증감, 그리고 게스트까지 한 눈에 파악하세요.</StepDesc>
              </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider/>

        <ImageTextWrapper id="fourth">
          <Image src={sampleImg4} alt="모임 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>이 달의 우수회원</StepTitle>
              <StepDesc>모임, 게임 최다 참여자와 득점왕을 확인해요.</StepDesc>
              <StepDesc>우수회원들에게 적절한 보상이 따르면 더 좋겠죠?</StepDesc>
            </Step>
            <Step>
              <StepTitle>AI 보고서</StepTitle>
              <StepDesc>AI가 지난 달의 모든 멤버와 게스트를 확인하고, 보고서를 작성해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>요약</StepTitle>
              <StepDesc>회원 수를 분석하고, 증감 추세를 파악해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>성비 및 구성 분석</StepTitle>
              <StepDesc>보통 혼복 클럽이 더 많은 회원을 보유하고 있어요.</StepDesc>
              <StepDesc>성비 균형을 맞추고 더 많은 회원을 모집해봐요!</StepDesc>
            </Step>
            <Step>
              <StepTitle>핵심 활동 회원</StepTitle>
              <StepDesc>우수한 회원을 파악하고, 보상을 추천해요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>운영 방안</StepTitle>
              <StepDesc>클럽 회원을 늘릴 수 있는 다양한 방법을 제시해요.</StepDesc>
              <StepDesc>보고서를 바탕으로 클럽 운영에 새로운 인사이트를 얻을 수 있어요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>



      </ContentArea>

      <Sidebar>
        <AnchorButton onClick={() => scrollTo('first')}>예산 관리 통계</AnchorButton>
        <AnchorButton onClick={() => scrollTo('second')}>예산 AI 보고서</AnchorButton>
        <AnchorButton onClick={() => scrollTo('third')}>회원 관리 통계</AnchorButton>
        <AnchorButton onClick={() => scrollTo('fourth')}>회원 AI 보고서</AnchorButton>
        <AnchorButton onClick={() => scrollToTop()}>맨 위로</AnchorButton>

      </Sidebar>
    </PageWrapper>
  );
};

export default ReportFeature;
