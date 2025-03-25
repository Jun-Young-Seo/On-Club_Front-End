import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../../Axios/SecuredAPI";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fdf6e3;
  padding: 20px;
  border-radius: 12px;
  width: 380px;
  max-height: 500px;
  border: 2px solid #7b716a;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  font-family: "Courier New", Courier, monospace;
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;
`;

const Title = styled.h3`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const Fieldset = styled.fieldset`
  border: 1px solid #a89c94;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Legend = styled.legend`
  font-weight: bold;
  color: #444;
  padding: 2px 5px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  width: 30%;
  text-align: right;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 65%;
  padding: 6px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
`;

const Select = styled.select`
  width: 65%;
  padding: 6px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const SaveButton = styled.button`
  background-color: #5c946e;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
  margin-right: 5px;

  &:hover {
    background-color: #4a7f5c;
  }
`;

const CancelButton = styled.button`
  background-color: #d14d47;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
  margin-left: 5px;

  &:hover {
    background-color: #b63e3a;
  }
`;

const TransactionModal = ({ transaction, onSave, onClose }) => {
  const [editedTransaction, setEditedTransaction] = useState(transaction || {});

  useEffect(() => {
    setEditedTransaction(transaction || {});
  }, [transaction]);

  const handleChange = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await securedAPI.put("/api/budget/update", editedTransaction);
      console.log("✅ 수정 완료:", response.data);
      onSave(editedTransaction);
      onClose();
    } catch (error) {
      console.error("❌ 수정 실패:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>📜 거래 내역 수정</Title>

        <ModalBody>
          <Fieldset>
            <Legend>거래 정보</Legend>
            <InputGroup>
              <Label>거래일</Label>
              <Input name="transactionDate" type="datetime-local" value={editedTransaction.transactionDate || ""} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>입출금</Label>
              <Select name="transactionType" value={editedTransaction.transactionType || ""} onChange={handleChange}>
                <option value="입금">입금</option>
                <option value="출금">출금</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>금액</Label>
              <Input name="transactionAmount" type="number" value={editedTransaction.transactionAmount || ""} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>잔액</Label>
              <Input name="transactionBalance" type="number" value={editedTransaction.transactionBalance || ""} onChange={handleChange} />
            </InputGroup>
          </Fieldset>

          <Fieldset>
            <Legend>카테고리</Legend>
            <InputGroup>
              <Label>거래분류</Label>
              <Input name="transactionCategory" type="text" value={editedTransaction.transactionCategory || ""} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>AI 거래분류</Label>
              <Input name="transactionDetail" type="text" value={editedTransaction.transactionDetail || ""} onChange={handleChange} />
            </InputGroup>
          </Fieldset>

          <Fieldset>
            <Legend>추가 정보</Legend>
            <InputGroup>
              <Label>내용</Label>
              <Input name="transactionDescription" type="text" value={editedTransaction.transactionDescription || ""} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Label>비고</Label>
              <Input name="transactionMemo" type="text" value={editedTransaction.transactionMemo || ""} onChange={handleChange} />
            </InputGroup>
          </Fieldset>
        </ModalBody>

        <ButtonGroup>
          <SaveButton onClick={handleSave}>저장</SaveButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TransactionModal;
