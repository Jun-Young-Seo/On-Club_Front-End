import React, { useState } from "react";
import styled from "styled-components";

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
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const TransactionModal = ({ transaction, onSave, onClose }) => {
  const [editedTransaction, setEditedTransaction] = useState({ ...transaction });

  const handleChange = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>거래 수정</h3>
        <ModalInput
          name="date"
          type="text"
          value={editedTransaction.date}
          onChange={handleChange}
        />
        <ModalInput
          name="amount"
          type="number"
          value={editedTransaction.amount}
          onChange={handleChange}
        />
        <ModalInput
          name="category"
          type="text"
          value={editedTransaction.category}
          onChange={handleChange}
        />
        <ModalInput
          name="note"
          type="text"
          value={editedTransaction.note}
          onChange={handleChange}
        />
        <SaveButton onClick={() => onSave(editedTransaction)}>저장</SaveButton>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TransactionModal;
