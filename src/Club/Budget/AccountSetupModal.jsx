import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import securedAPI from "../../Axios/SecuredAPI";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const kakaoBankLogoSvg = "https://upload.wikimedia.org/wikipedia/commons/4/48/KakaoBank_logo.svg";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 440px;
  padding: 2.5rem;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  font-family: "Segoe UI", sans-serif;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.4rem;
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.div`
  font-size: 1rem;
  margin-bottom : 0.5rem;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  width: 90%;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const ConfirmButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #7c3aed;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  cursor: pointer;

  &:hover {
    background: #6d28d9;
  }
`;
const BankLogo = styled.img`
  width: 100%;
  margin-top:2rem;
  margin-bottom:2rem;
  height: auto;
`;

const AccountSetupModal = ({ clubId, onClose }) => {
  const [accountName, setAccountName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");
  
  const ref2 = useRef();
  const ref3 = useRef();

  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!accountName || !part1 || !part2 || !part3 || !accountOwner) {
      Swal.fire("입력 오류", "모든 항목을 입력해 주세요.", "warning");
      return;
    }
  
    try {
      await securedAPI.post(`/api/account/make`, {
        clubId,
        accountName,
        accountNumber: part1 + part2 + part3,
        accountOwner,
        bankName: "카카오뱅크",
      });
  
      Swal.fire("완료", "메인 계좌가 등록되었습니다.", "success").then(() => {
        onClose();
        navigate(`/clubs/${clubId}/budget_dashboard`);        
    });
    } catch (err) {
      console.error(err);
      Swal.fire("오류", "계좌 등록에 실패했습니다.", "error");
    }
  };
  

  return (
    <Overlay>
      <Modal>
        <Title>메인 계좌 등록</Title>
        <SubTitle>메인 계좌를 등록하면 On-Club의 예산관리 기능을 이용할 수 있어요.</SubTitle>
        <BankLogo src={kakaoBankLogoSvg} alt="KakaoBank Logo" />

        <Form>
        <div>
            <Label>계좌 이름</Label>
            <Input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="회비 통장, 클럽 통장 등"
            />
        </div>

        <div>
          <Label>계좌번호</Label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
            <Input
            maxLength={4}
            value={part1}
            onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // 숫자만
                setPart1(value);
                if (value.length === 4) ref2.current.focus();
            }}
            />
            <Input
            maxLength={2}
            ref={ref2}
            value={part2}
            onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPart2(value);
                if (value.length === 2) ref3.current.focus();
            }}
            />
            <Input
            maxLength={7}
            ref={ref3}
            value={part3}
            onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPart3(value);
            }}
            />
        </div>
        </div>

        <div>
            <Label>예금주</Label>
            <Input
            value={accountOwner}
            onChange={(e) => setAccountOwner(e.target.value)}
            placeholder="계좌 주인의 이름을 적어주세요"
            />
        </div>
        </Form>


        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleSubmit}>등록하기</ConfirmButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default AccountSetupModal;
