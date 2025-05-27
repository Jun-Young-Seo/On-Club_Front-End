import styled from 'styled-components';
import React from 'react';
import sampleImg from '../assets/images/feature/budget_dashboard.svg';
import sampleImg2 from '../assets/images/feature/budget_dashboard_2.svg';
import sampleImg3 from '../assets/images/feature/excel.svg';

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
const StepPS = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-top: 7rem;
  font-style: italic;
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


const BudgetFeature = () => {
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <PageWrapper>
      <ContentArea>
        <Title>예산 관리</Title>
        <Description>
          클럽의 수입과 지출을 손쉽게 기록하고 확인할 수 있어요. 각 항목은 월별로 분류되며, 카테고리별로 집계된 통계를 제공합니다.
        </Description>

        <HorizontalDivider2 />

        <ImageTextWrapper id="dashboard">
          <Image src={sampleImg} alt="예산 관리 예시" />
          <StepList>
            <Step>
              <HighlightText>
                오늘이 5월 20일이라면{`\n`}
                5월 1일부터 20일까지의 내역을 보여줘요.
              </HighlightText>
              <StepTitle>한 달 거래내역 모아보기</StepTitle>
              <StepDesc>이월금은 이번 달 예산에서 남은 돈으로, 다음 달로 넘어가는 돈이에요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>최근 거래내역</StepTitle>
              <StepDesc>한 눈에 최근 거래내역을 확인할 수 있어요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>월별 모아보기</StepTitle>
              <StepDesc>이 달의 수입과 지출을 한 눈에 볼 수 있어요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider />

        <ImageTextWrapper id="detail">
          <Image src={sampleImg2} alt="예산 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>클럽 계좌 분리</StepTitle>
              <StepDesc>계좌별로 각각의 거래내역이 분리돼서 관리돼요.</StepDesc>
              <StepDesc>회비 통장, 용품비 통장 등 다양하게 활용해보세요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>AI 거래분류</StepTitle>
              <StepDesc>AI가 거래를 보고 자동으로 분류해줘요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>직접 수정하기</StepTitle>
              <StepDesc>각 거래 우측의 수정하기 버튼을 통해 수정할 수 있어요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>필터 기능</StepTitle>
              <StepDesc>상단 필터를 클릭해 기간별, 입/출금만 모아보기를 할 수 있어요.</StepDesc>
            </Step>

          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider/>
        
        <ImageTextWrapper id="excel">
          <Image src={sampleImg3} alt="예산 관리 예시" />
          <StepList>
            <Step>
                <HighlightText>
                카카오뱅크 모임통장 내보내기 기능을 이용하세요.{`\n`}
              </HighlightText>

              <StepTitle>거래내역 한 번에 업로드하기</StepTitle>
              <StepDesc>내보내기를 통해 얻은 엑셀 파일을 업로드하세요.</StepDesc>
              <StepDesc>모든 거래내역이 자동으로 저장돼요.</StepDesc>
              <StepDesc>엑셀 프로그램이 없어도 괜찮아요.</StepDesc>

            </Step>
            <Step>
              <StepPS> ⌗ 다양한 은행이 추가될 예정이에요.</StepPS>
            </Step>
          </StepList>
        </ImageTextWrapper>
      </ContentArea>

      <Sidebar>
        <AnchorButton onClick={() => scrollTo('dashboard')}>한 눈에 보는 예산관리</AnchorButton>
        <AnchorButton onClick={() => scrollTo('detail')}>계좌별 거래 분리</AnchorButton>
        <AnchorButton onClick={() => scrollTo('excel')}>엑셀로 편리하게</AnchorButton>
        <AnchorButton onClick={() => scrollToTop()}>맨 위로</AnchorButton>
      </Sidebar>
    </PageWrapper>
  );
};

export default BudgetFeature;
