import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { LOADING_EXCEL_MESSAGES } from '../../Constants/Default';
import { HashLoader } from 'react-spinners';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  text-align: center;
`;
const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const Spinner = styled.div`
  margin-top: 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 80%;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
`;

const DropZoneArea = styled.div`
  border: 2px dashed #3498db;
  padding: 30px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  color: #3498db;

  &:hover {
    background: #ecf6fb;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;
const SubmitButton = styled.button`
  background-color: #2ecc71;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  margin-top: 10px;

  &:hover {
    background-color: #27ae60;
  }
`;
const ExcelUploadModal = ({ onClose, onSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [dotCount, setDotCount] = useState(0);
    const [uploadMessage, setUploadMessage] = useState(LOADING_EXCEL_MESSAGES[0]);

    useEffect(() => {
      if (!uploading) return;

      const dotTimer = setInterval(() => {
        setDotCount(prev => (prev + 1) % 4);
      }, 500);

      const messageTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * LOADING_EXCEL_MESSAGES.length);
        setUploadMessage(LOADING_EXCEL_MESSAGES[randomIndex]);
      }, 1500);

      return () => {
        clearInterval(dotTimer);
        clearInterval(messageTimer);
      };
    }, [uploading]);

    const onDrop = useCallback((acceptedFiles) => {
      setErrorMessage('');
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const validExtensions = ['xlsx'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
  
        if (!validExtensions.includes(fileExtension)) {
          setErrorMessage("xlsx 파일만 업로드 가능합니다.");
          return;
        }
  
        setSelectedFile(file);
      }
    }, []);
  
    const handleSubmit = () => {
      setErrorMessage('');
  
      if (!birthDate || birthDate.length !== 6) {
        setErrorMessage("생년월일 (6자리)을 입력하세요.");
        return;
      }
      if (!selectedFile) {
        setErrorMessage("엑셀 파일을 업로드하세요.");
        return;
      }
  
      setUploading(true);
  
      // file, birthDate만 전달
      onSubmit(selectedFile, birthDate)
        .finally(() => {
          setUploading(false);
          onClose();
        });
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: ['.xlsx'],
      multiple: false,
    });
  
    return (
      <ModalOverlay>
        <ModalContent>
          <h3>엑셀 파일 업로드</h3>
  
          <InputField
            type="text"
            placeholder="예금주 생년월일 (6자리)"
            maxLength={6}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value.replace(/\D/g, ''))}
          />
  
          <DropZoneArea {...getRootProps()}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <p>선택된 파일: {selectedFile.name}</p>
            ) : isDragActive ? (
              <p>여기에 파일을 놓으세요...</p>
            ) : (
              <p>여기로 드래그하거나 클릭하여 엑셀 파일을 업로드</p>
            )}
          </DropZoneArea>
  
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
         {uploading && (
          <FullScreenOverlay>
            <HashLoader color="#c9f529" size={60} />
            <p style={{
              marginTop: '1.2rem',
              fontSize: '2rem',
              fontWeight: 800,
              color: '#FFF',
              textAlign: 'center',
            }}>
              {uploadMessage}
              {".".repeat(dotCount)}
            </p>
          </FullScreenOverlay>
        )}

  
          <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  };

  export default ExcelUploadModal;
  