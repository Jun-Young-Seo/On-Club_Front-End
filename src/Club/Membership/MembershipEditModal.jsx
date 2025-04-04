import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import securedAPI from "../../Axios/SecuredAPI";
// ─── Styled Components ───
const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Title = styled.h2`
  margin-bottom: 1.8rem;
  font-size: 1.4rem;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.6rem;
  color: #333;
`;

const ReadOnlyField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;


const EditableField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const LeftButtons = styled.div``;

const RightButtons = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const SaveButton = styled.button`
  background: #5fbd7b;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: #999;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
`;
const ModalContainer = styled.div`
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  width: 480px;
  max-width: 95%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;
const Label = styled.label`
  flex: 0 0 120px;
  font-weight: 600;
  font-size: 1rem;
  color: #444;
`;
const ValueText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 500;
  color: #222;
`;


const Select = styled.select`
  width: 100%;                // ✅ select 전체 너비를 고정 (원하는 만큼 조절 가능)
  font-size: 0.95rem;          // ✅ 약간 작게
  padding: 6px 10px;           // ✅ 상하 좌우 여백 조절
  text-align: center;          // ✅ 텍스트 가운데 정렬
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  &:focus {
    outline: none;
    border-color: #5fbd7b;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Emoji = styled.span`
  font-size: 1.2rem;
  margin-right: 0.4rem;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;


// ─── Component ───
const MembershipEditModal = ({ member, onClose, onSave, onDelete }) => {
  const [form, setForm] = useState({ ...member });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await securedAPI.patch("/api/membership/modify", {
        membershipId: form.membershipId,
        role: form.role,
      });
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "수정 완료",
        text: "회원의 역할이 성공적으로 변경되었습니다.",
        confirmButtonColor: "#5fbd7b"
      });
  
      onSave(); // 부모에서 목록 갱신 용도로 넘겨준 콜백
      onClose(); // 모달 닫기
  
    } catch (err) {
      console.error("❌ 수정 실패", err);
      Swal.fire({
        icon: "error",
        title: "수정 실패",
        text: "잠시 후 다시 시도해주세요.",
        confirmButtonColor: "#e74c3c"
      });
    }
  };
  

  const handleDelete = () => {
    Swal.fire({
      title: '정말 탈퇴시키겠습니까?',
      text: '이 작업은 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: '네, 탈퇴시킬게요',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(form.membershipId);
      }
    });
  };

  return (
<ModalBackground>
  <ModalContainer>

    {/* 타이틀과 이모지 분리 */}
    <HeaderWrapper>
      <Title>회원 정보 수정</Title>
    </HeaderWrapper>

    {/* 본문 필드 영역 */}
    <ReadOnlyField>
      <Label><Emoji>🙍</Emoji>이름</Label>
      <ValueText>{form.userName}</ValueText>
    </ReadOnlyField>

    <ReadOnlyField>
      <Label><Emoji>📞</Emoji>전화번호</Label>
      <ValueText>{form.userTel}</ValueText>
    </ReadOnlyField>

    <ReadOnlyField>
      <Label><Emoji>🚻</Emoji>성별</Label>
      <ValueText>{form.gender === 'FEMALE' ? '여자' : '남자'}</ValueText>
    </ReadOnlyField>

    <ReadOnlyField>
      <Label><Emoji>🏅</Emoji>경력</Label>
      <ValueText>{form.career}년차</ValueText>
    </ReadOnlyField>

    <ReadOnlyField>
      <Label><Emoji>🎂</Emoji>생년월일</Label>
      <ValueText>{form.birthDate}</ValueText>
    </ReadOnlyField>

    <ReadOnlyField>
      <Label><Emoji>📍</Emoji>지역</Label>
      <ValueText>{form.region}</ValueText>
    </ReadOnlyField>

    <EditableField>
  <Label><Emoji>🎖</Emoji>역할</Label>
  <SelectWrapper>
    <Select value={form.role} onChange={(e) => handleChange("role", e.target.value)}>
      <option value="LEADER">리더</option>
      <option value="MANAGER">운영진</option>
      <option value="REGULAR">정회원</option>
      <option value="INACTIVE">휴회원</option>
    </Select>
  </SelectWrapper>
</EditableField>
    <ButtonRow>
      <LeftButtons>
        <DeleteButton onClick={handleDelete}>탈퇴</DeleteButton>
      </LeftButtons>
      <RightButtons>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </RightButtons>
    </ButtonRow>
  </ModalContainer>
</ModalBackground>
  );
};

export default MembershipEditModal;
