import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RegionModal from '../../User/RegionModal';
import Swal from "sweetalert2";
import { unSecuredAPI } from '../../Axios/UnsecuredAPI';

const PageWrapper = styled.div`
  background-color: #fafece;
  min-height: 100vh;
  padding: 6rem 1rem; /* 상단 여백 추가 */
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
  max-width: 500px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  color: #333;
`;

const Index = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-top: 1.2rem;
  text-align: center;
  opacity: 0.8;
`;



const SubTitle = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 2.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 0 auto 2rem;
  max-width: 400px;
  width: 100%;
  text-align: left;
`;

const Label = styled.div`
  font-size: 1.1rem;
  color: #444;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const Input = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: ${({ invalid }) => (invalid ? "3px solid #e74c3c" : "1px solid #ccc")};
  border-radius: 0.6rem;
  width: 100%;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: ${({ invalid }) => (invalid ? "#e74c3c" : "#4f63e7")};
  }
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
  margin: 0 auto;
  display: block;

  &:hover {
    background-color: #219150;
  }
`;

const RegionSelectButton = styled.button`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ invalid }) => (invalid ? "#e74c3c" : "#ccc")};
  border-radius: 0.6rem;
  background-color: white;
  text-align: left;
  width: 108%;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NewClubStepOne = () => {
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const handleRegionSelect = (sido, guGun) => {
        const fullRegion = `${sido} ${guGun}`;
        setForm(prev => ({ ...prev, region: fullRegion }));
        setIsRegionModalOpen(false);
      };
      
    const [form, setForm] = useState(() => ({
        clubName: sessionStorage.getItem('clubName') || '',
        region: sessionStorage.getItem('region') || '',
        careerRange: sessionStorage.getItem('careerRange') || '',
        purpose: sessionStorage.getItem('purpose') || ''
      }));
      
  useEffect(() => {
    setForm({
      clubName: sessionStorage.getItem('clubName') || '',
      region: sessionStorage.getItem('region') || '',
      careerRange: sessionStorage.getItem('careerRange') || '',
      purpose: sessionStorage.getItem('purpose') || ''
    });
  }, []);
  
  useEffect(() => {
    sessionStorage.setItem('clubName', form.clubName);
    sessionStorage.setItem('region', form.region);
    sessionStorage.setItem('careerRange', form.careerRange);
    sessionStorage.setItem('purpose', form.purpose);
  }, [form]);

  const validateForm = () => {
    const requiredFields = ["clubName", "region", "careerRange", "purpose"];
    const missing = requiredFields.filter(field => !form[field]);
  
    if (missing.length > 0) {
      setInvalidFields(missing);
      Swal.fire({
        icon: "warning",
        title: "입력되지 않은 항목이 있어요!",
        text: "모든 필드를 입력해주세요.",
        confirmButtonColor: "#27ae60"
      });
      return false;
    }
  
    setInvalidFields([]);
    return true;
  };

  const handleNext = async () => {
  if (!validateForm()) return;

  try {
    const res = await unSecuredAPI.get('/api/club/find/by-name', {
      params: { clubName: form.clubName }
    });

    if (res.data === true) {
      Swal.fire({
        icon: "error",
        title: "중복된 이름",
        text: "이미 사용 중인 클럽 이름이에요. 다른 이름을 입력해주세요.",
        confirmButtonColor: "#e74c3c"
      });
      return;
    }

    // 중복 아님 → 다음 단계로 이동
    window.location.href = "/new/club/step2";

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "서버 오류",
      text: "중복 확인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      confirmButtonColor: "#e74c3c"
    });
  }
};

  return (
    <PageWrapper>
      <Card>
        <Title>기본 정보 입력</Title>
        <SubTitle>On-Club과 함께할 클럽을 소개해주세요!</SubTitle>

        <Form>
            <Label>🏷️ 클럽 이름</Label>
            <Input
            invalid={invalidFields.includes("clubName")}
            value={form.clubName}
            onChange={e => setForm({ ...form, clubName: e.target.value })}
            placeholder="예: 오목클럽"
            />

            <Label>📍 주 활동 지역</Label>
            <RegionSelectButton
            type="button"
            invalid={invalidFields.includes("region")}
            onClick={() => setIsRegionModalOpen(true)}
            >
            {form.region || "지역을 선택해주세요"}
            </RegionSelectButton>


            <Label>🎾 주요 구력</Label>
            <Input
                invalid={invalidFields.includes("careerRange")}
                value={form.careerRange}
                onChange={e => setForm({ ...form, careerRange: e.target.value })}
                placeholder="예: 1~3년"
                />

            <Label>🎯 클럽 목적</Label>
            <Input
                invalid={invalidFields.includes("purpose")}
                value={form.purpose}
                onChange={e => setForm({ ...form, purpose: e.target.value })}
                placeholder="예: 친목, 대회 우승"
                />
        </Form>


        <NextButton onClick={handleNext}>
        다음
        </NextButton>
        <Index>1 / 3</Index>
      </Card>
      <RegionModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onSelect={handleRegionSelect}
        />
    </PageWrapper>
  );
};

export default NewClubStepOne;
