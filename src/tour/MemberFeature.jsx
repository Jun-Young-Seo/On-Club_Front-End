import styled from 'styled-components';
import React from 'react';
import sampleImg from '../assets/images/feature/member.svg';
import sampleImg2 from '../assets/images/feature/member_2.svg';
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


const MemberFeature = () => {

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
        <Title>회원 관리</Title>
        <Description>
         팔 아프게 종이에 쓰던 회원 명부는 이제 그만! On-Club과 함께 편리하게 관리하세요.
        </Description>
        <HorizontalDivider2 />

        <ImageTextWrapper id="list">
          <Image src={sampleImg} alt="회원 관리 예시" />
          <StepList>
            <Step>
            <HighlightText>
                회원 관리에서 운영진으로 등록된 사람만{`\n`}
                On-Club의 다양한 클럽 관리 기능을 이용할 수 있어요.
              </HighlightText>
            <StepTitle>클럽 소속 회원 목록 관리</StepTitle>
              <StepDesc>구력, 활동지역, 성별, 등급 등 다양한 정보를 한 눈에 볼 수 있어요.</StepDesc>
              <StepDesc>수정 버튼을 통해 운영진 권한을 부여할 수 있어요.</StepDesc>
            <StepTitle>한 눈에 출석률 관리</StepTitle>
              <StepDesc>클럽 모임 횟수를 기준으로 출석률을 알 수 있어요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider />

        <ImageTextWrapper id="member">
          <Image src={sampleImg2} alt="회원 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>쉽게 회원 추가하기</StepTitle>
              <StepDesc>On-Club에 가입해달라고 얘기하지 않아도 돼요.</StepDesc>
              <StepDesc>각 정보를 입력하면 자동으로 On-Club과 클럽 회원으로 가입됩니다.</StepDesc>
            </Step>
            <Step>
              <StepTitle>On-Club 회원이라면?</StepTitle>
              <StepDesc>전화번호만 입력해도 클럽에 가입돼요.</StepDesc>
            </Step>


          </StepList>
        </ImageTextWrapper>

        
      </ContentArea>

      <Sidebar>
        <AnchorButton onClick={() => scrollTo('list')}>회원 목록</AnchorButton>
        <AnchorButton onClick={() => scrollTo('member')}>클럽 멤버 가입</AnchorButton>
        <AnchorButton onClick={() => scrollToTop()}>맨 위로</AnchorButton>

      </Sidebar>
    </PageWrapper>
  );
};

export default MemberFeature;
