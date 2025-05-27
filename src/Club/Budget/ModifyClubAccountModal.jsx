import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import securedAPI from "../../Axios/SecuredAPI";

const kakaoBankLogoSvg = "https://upload.wikimedia.org/wikipedia/commons/4/48/KakaoBank_logo.svg";
const BankImage = styled.img`
  width: 5vw;
  height: auto;
  margin-bottom: 0.5rem;
  border-radius: 6px;
`;

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
  border-radius: 16px;
  width: 480px;
  max-height: 80vh;
  padding: 2rem;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  font-family: "Segoe UI", sans-serif;
    overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const AccountCard = styled.div`
  border: 5px solid ${({ selected }) => (selected ? "#8b5cf6" : "#e5e7eb")};
  background: ${({ selected }) => (selected ? "#f5f3ff" : "#fff")};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  &:hover {
    border-color: #8b5cf6;
  }
`;

const AccountName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #1f2937;
`;

const AccountInfo = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.7rem 1.5rem;
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
  padding: 0.7rem 1.5rem;
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

const ModifyClubMainAccountModal = ({ clubId, onClose }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await securedAPI.get("/api/account/get-all_accounts", {
          params: { clubId },
        });
        setAccounts(res.data);
      } catch (err) {
        console.error("계좌 불러오기 실패:", err);
        Swal.fire("오류", "계좌 정보를 불러오는 데 실패했습니다.", "error");
      }
    };
    fetchAccounts();
  }, [clubId]);

  const handleConfirm = async () => {
    if (!selectedId) {
      Swal.fire("선택 필요", "변경할 계좌를 선택해 주세요.", "warning");
      return;
    }

    try {
      await securedAPI.post(
        "/api/club/set/main-account",
        null,
        {
          params: {
            clubId,
            accountId: selectedId,
          },
        }
      );
      Swal.fire("완료", "메인 계좌가 변경되었습니다.", "success").then(() => {
        onClose();
        window.location.reload();
      });
    } catch (err) {
      console.error("계좌 변경 실패:", err);
      Swal.fire("오류", "계좌 변경 중 문제가 발생했습니다.", "error");
    }
  };
  
const formatAccountNumber = (raw) => {
  const str = String(raw); 
  if (str.length !== 13) return raw;
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`;
};



  return (
    <Overlay>
      <Modal>
        <Title>주 거래 계좌 변경</Title>
        <SubTitle>클럽에 등록된 계좌 중 하나를 주 거래 계좌로 설정합니다.</SubTitle>

        {accounts.map((acc) => (
          <AccountCard
            key={acc.accountId}
            selected={acc.accountId === selectedId}
            onClick={() => setSelectedId(acc.accountId)}
          >
                <BankImage src={kakaoBankLogoSvg} alt="Bank Logo" />
                <AccountName>{acc.accountName}</AccountName>
                <AccountInfo>{formatAccountNumber(acc.accountNumber)}</AccountInfo>
                <AccountInfo>예금주: {acc.accountOwner}</AccountInfo>
          </AccountCard>
        ))}

        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>변경하기</ConfirmButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default ModifyClubMainAccountModal;
