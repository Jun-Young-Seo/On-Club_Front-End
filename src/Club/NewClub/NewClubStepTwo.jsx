import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { unSecuredAPI } from '../../Axios/UnsecuredAPI';
import securedAPI from '../../Axios/SecuredAPI';
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { PulseLoader } from "react-spinners";

const PageWrapper = styled.div`
  background-color: #fafece;
  min-height: 100vh;
  padding: 6rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  margin-bottom : 0.2rem;
  color: #888;
`;

const Index = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-top: 1.2rem;
  text-align: center;
  opacity: 0.8;
`;



const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto 2rem;
  max-width: 500px;
  width: 100%;
  text-align: left;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top : 2.5rem;
`;

const Label = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #444;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIButton = styled.button`
  background-color: #ffb300;
  color: #222;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #ffa000;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  resize: vertical;
  min-height: 160px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
`;

const NextButton = styled.button`
  background-color: #27ae60;
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #219150;
  }
`;

const PreButton = styled.button`
  background-color: #27ae60;
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #219150;
  }
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 250, 250, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;


const NewClubStepTwo = () => {
//Spinner용
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    description: ''
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('clubDescription') || '';
    setForm({ description: saved });
  }, []);
  
  useEffect(() => {
    sessionStorage.setItem('clubDescription', form.description);
  }, [form]);
  
  const handleAIClick = async () => {
    setLoading(true);
  
    try {
      const clubName = sessionStorage.getItem('clubName');
      const region = sessionStorage.getItem('region');
      const careerRange = sessionStorage.getItem('careerRange');
      const purpose = sessionStorage.getItem('purpose');
  
      const response = await securedAPI.post('/api/openai/make/club_description', {
        clubName,
        region,
        careerRange,
        purpose
      });
  
      const aiDescription = response.data;
      console.log(aiDescription);
      setForm(prev => ({ ...prev, description: aiDescription }));
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "AI 생성 실패",
            text: "AI 응답 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            confirmButtonColor: "#27ae60"
          });
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <PageWrapper>
        {loading && (
        <SpinnerOverlay>
            <PulseLoader color="#27ae60" size={15} margin={6} />
            <div style={{ marginTop: "1.2rem", fontSize: "1rem", color: "#333" }}>
            AI가 소개글을 작성 중입니다...
            </div>
        </SpinnerOverlay>
        )}


      <Card>
        <Title>클럽 소개</Title>
        <SubTitle>간단한 소개글을 작성해주세요. </SubTitle>
        <SubTitle>글쓰기가 어렵다면 AI와 함께 쓸 수 있어요.</SubTitle>

        <Form>
          <LabelRow>
            <Label>📝 클럽 소개</Label>
            <AIButton onClick={handleAIClick}>AI와 함께 작성하기</AIButton>
          </LabelRow>
          <TextArea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </Form>
        <ButtonContainer>
            <PreButton onClick={()=> window.location.href = "/new/club/step1"}>
                이전
            </PreButton>
            <NextButton onClick={() => window.location.href = "/new/club/step3"}>
            다음
            </NextButton>
        </ButtonContainer>
        <Index>2 / 3</Index>
      </Card>
    </PageWrapper>
  );
};

export default NewClubStepTwo;
