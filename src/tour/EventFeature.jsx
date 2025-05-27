import styled from 'styled-components';
import React from 'react';
import sampleImg from '../assets/images/feature/event.svg';
import sampleImg2 from '../assets/images/feature/event_2.svg';
import sampleImg3 from '../assets/images/feature/event_3.svg';
import sampleImg4 from "../assets/images/feature/event_4.svg";

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
const StepPS = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1rem;
  font-style: italic;
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

const EventFeature = () => {

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
        <Title>모임 관리</Title>
        <Description>
          매번 손으로 스코어를 기록하고, 게임을 분배했나요? On-Club과 함께라면 더 편해질 수 있어요!
        </Description>
        <HorizontalDivider2 />

        <ImageTextWrapper id="first">
          <Image src={sampleImg} alt="모임 관리 예시" />
          <StepList>
            <Step>
            <HighlightText>
                모임 일정이 추가되면 클럽 회원들에게 알림이 전송됩니다.{`\n`}
                모바일 앱으로도 확인할 수 있어요.
              </HighlightText>
            <StepTitle>손쉬운 모임 추가와 공지</StepTitle>
              <StepDesc>날짜와 시간, 설명만으로 모임을 추가하세요.</StepDesc>
              <StepDesc>모든 클럽 회원들에게 자동으로 알림이 전송됩니다.</StepDesc>
            <StepTitle>모임 기록 관리</StepTitle>
              <StepDesc>그 날의 점수, 참여자 등 모든 모임 기록이 저장됩니다.</StepDesc>
              <StepDesc>날짜와 설명으로 검색도 할 수 있어요.</StepDesc>
            </Step>
            <StepPS># 자세히보기 버튼을 눌러 게임 관리로 이동할 수 있어요.</StepPS>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider />

        <ImageTextWrapper id="second">
          <Image src={sampleImg2} alt="모임 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>공평한 게임 분배</StepTitle>
              <StepDesc>공평한 게임 분배를 위해 게임 대기 시간을 볼 수 있어요.</StepDesc>
              <StepDesc>구력과 성별을 보고 게임을 분배할 수 있어요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>게임 기록 관리</StepTitle>
              <StepDesc>누구끼리 페어였는지, 점수는 어땠는지 손으로 다 쓰실건가요?</StepDesc>
              <StepDesc>On-Club으로 관리하면, 자동으로 저장됩니다!</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider/>

        <ImageTextWrapper id="third">
          <Image src={sampleImg4} alt="모임 관리 예시" />
          <StepList>
            <HighlightText>
                게스트로 모임에 참여한다면{`\n`}
                처음부터 대기자 명단에 게스트가 있어요.
              </HighlightText>

            <Step>
              <StepTitle>모임 참여 회원 추가하기</StepTitle>
              <StepDesc>모든 클럽 회원을 다 볼 수 있어요.</StepDesc>
              <StepDesc>참석한 모든 회원을 선택하고 게임을 시작할 수 있어요.</StepDesc>
            </Step>

            <Step>
              <StepTitle>게스트로 하루만 참여하기</StepTitle>
              <StepDesc>모바일 앱과 클럽 상세 페이지에서 게스트 참여 신청을 할 수 있어요.</StepDesc>
              <StepDesc>운영진이 승인한 경우에만 게스트가 참여할 수 있어요.</StepDesc>
              <StepDesc>게스트가 참여 신청을 하면 모든 운영진에게 알림이 전송돼요.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>

        <HorizontalDivider/>

        <ImageTextWrapper id="fourth">
          <Image src={sampleImg3} alt="모임 관리 예시" />
          <StepList>
            <Step>
              <StepTitle>게임 시작하기</StepTitle>
              <StepDesc>4명의 사람을 선택하고 게임을 시작하세요.</StepDesc>
              <StepDesc>같은 색깔끼리 팀이에요.</StepDesc>
            </Step>
            <Step>
              <StepTitle>게임 진행과 종료</StepTitle>
              <StepDesc>잘못 만들었다면 X 버튼을 눌러 삭제할 수 있어요.</StepDesc>
              <StepDesc>스코어를 입력하고 완료를 누르면 저장됩니다.</StepDesc>
            </Step>
          </StepList>
        </ImageTextWrapper>



      </ContentArea>

      <Sidebar>
        <AnchorButton onClick={() => scrollTo('first')}>모임 일정 생성하기</AnchorButton>
        <AnchorButton onClick={() => scrollTo('second')}>모임 자세히 보기</AnchorButton>
        <AnchorButton onClick={() => scrollTo('third')}>회원 추가하기</AnchorButton>
        <AnchorButton onClick={() => scrollTo('fourth')}>게임 종료하기</AnchorButton>
        <AnchorButton onClick={() => scrollToTop()}>맨 위로</AnchorButton>
      </Sidebar>
    </PageWrapper>
  );
};

export default EventFeature;
