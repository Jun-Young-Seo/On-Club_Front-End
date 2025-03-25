import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import securedAPI from "../../Axios/SecuredAPI"; // ✅ API 호출을 위한 import
import { useParams } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReceiptContainer = styled.div`
  background: #fdf6e3;
  padding: 20px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #000;
  font-family: "Courier New", Courier, monospace;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px dashed #888;
  padding-bottom: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px dashed #ccc;
`;

const Label = styled.span`
  color: #555;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  background: white;
  text-align: right;
  font-size: 14px;
  font-family: "Courier New", Courier, monospace;
  width: 55%;
  padding: 6px;
  border-radius: 5px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Select = styled.select`
  border: 1px solid #ccc;
  background: white;
  text-align: right;
  font-size: 14px;
  font-family: "Courier New", Courier, monospace;
  width: 58%;
  padding: 6px;
  border-radius: 5px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: #2ecc71;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  font-family: "Courier New", Courier, monospace;

  &:hover {
    background-color: #27ae60;
  }
`;

const CancelButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  font-family: "Courier New", Courier, monospace;

  &:hover {
    background-color: #bbb;
  }
`;

const TransactionCreateModal = ({ onClose, onCreate, selectedAccount }) => {
  const { clubId } = useParams();
  const [transaction, setTransaction] = useState({
    transactionDate: dayjs().format("YYYY-MM-DD"),
    transactionTime: dayjs().format("HH:mm"),
    transactionType: "입금",
    transactionBalance:"",
    transactionAmount: "",
    transactionCategory: "",
    transactionDetail: "",
    transactionMemo: "",
    transactionDescription:""
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!transaction.transactionAmount || !transaction.transactionCategory) {
      alert("필수 항목을 입력하세요.");
      return;
    }

    const formattedTransaction = {
      clubId : clubId,
      clubAccountId: selectedAccount, // 선택한 계좌 ID
      transactionDate: `${transaction.transactionDate}T${transaction.transactionTime}:00`,
      transactionType: transaction.transactionType,
      transactionBalance:parseInt(transaction.transactionBalance),
      transactionAmount: parseInt(transaction.transactionAmount),
      transactionCategory: transaction.transactionCategory,
      transactionDetail: transaction.transactionDetail,
      transactionMemo: transaction.transactionMemo,
      transactionDescription: transaction.transactionDescription
    };

    try {
      // ✅ 거래 생성 API 호출
      const response = await securedAPI.post("/api/budget/add", formattedTransaction);
      console.log("🚀 거래 생성 성공:", response.data);

      // ✅ 부모 컴포넌트에 새 거래 추가 후 업데이트
      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error("❌ 거래 생성 실패:", error);
      alert("거래를 생성하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ReceiptContainer>
        <Title>거래내역 추가하기</Title>

        <FormGroup>
          <Label>거래일</Label>
          <Input type="date" name="transactionDate" value={transaction.transactionDate} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>입출금</Label>
          <Select name="transactionType" value={transaction.transactionType} onChange={handleChange}>
            <option value="입금">입금</option>
            <option value="출금">출금</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>시간</Label>
          <Input type="time" name="transactionTime" value={transaction.transactionTime} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>금액</Label>
          <Input type="number" name="transactionAmount" value={transaction.transactionAmount} onChange={handleChange} />
        </FormGroup>
        
        <FormGroup>
          <Label>잔액</Label>
          <Input type="number" name="transactionBalance" value={transaction.transactionBalance} onChange={handleChange}/>
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <Input type="text" name="transactionDescription" value={transaction.transactionDescription} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>거래분류</Label>
          <Input type="text" name="transactionCategory" value={transaction.transactionCategory} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>AI 거래분류</Label>
          <Input type="text" name="transactionDetail" value={transaction.transactionDetail} onChange={handleChange} />
        </FormGroup>
        
        <FormGroup>
          <Label>메모</Label>
          <Input type="text" name="transactionMemo" value={transaction.transactionMemo} onChange={handleChange} />
        </FormGroup>

        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>추가하기</ConfirmButton>
        </ButtonGroup>
      </ReceiptContainer>
    </ModalOverlay>
  );
};

export default TransactionCreateModal;
