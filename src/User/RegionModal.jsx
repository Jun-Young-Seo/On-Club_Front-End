import React, { useState } from "react";
import styled from "styled-components";
import koreaRegions from "../assets/KoreaRegions.json"
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ModalList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  text-align: left;
`;

const RegionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  background: #4947FF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #8271FF;
  }
`;

const RegionModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedSido, setSelectedSido] = useState("");
  const [availableGuGun, setAvailableGuGun] = useState([]);

  if (!isOpen) return null;

  const handleSidoSelect = (sido) => {
    setSelectedSido(sido);
    setAvailableGuGun(koreaRegions[sido]); // 선택한 시/도의 구/군 리스트 업데이트
  };

  const handleGuGunSelect = (guGun) => {
    onSelect(selectedSido, guGun); // 선택한 지역을 부모 컴포넌트로 전달
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h3>지역 선택</h3>
        
        {/* 시/도 목록 */}
        <ModalList>
          {Object.keys(koreaRegions).map((sido) => (
            <RegionItem key={sido} onClick={() => handleSidoSelect(sido)}>
              {sido}
            </RegionItem>
          ))}
        </ModalList>

        {/* 구/군 목록 */}
        {selectedSido && (
          <>
            <h4>{selectedSido}의 구/군 선택</h4>
            <ModalList>
              {availableGuGun.map((guGun) => (
                <RegionItem key={guGun} onClick={() => handleGuGunSelect(guGun)}>
                  {guGun}
                </RegionItem>
              ))}
            </ModalList>
          </>
        )}

        <Button onClick={onClose}>닫기</Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RegionModal;
