import React, { useState, useEffect } from "react";
import styled from "styled-components";
import securedAPI from "../Axios/SecuredAPI";

// 🎨 styled-components
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

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 420px;
  max-height: 80vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 16px;

`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: ${(props) => (props.primary ? "#4CAF50" : "#ccc")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const DropArea = styled.div`
  border: 2px dashed #bbb;
  border-radius: 8px;
  padding: 30px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #888;
  background-color: #fafafa;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const ClubCreateModal = ({ onClose }) => {
  const [form, setForm] = useState({
    clubName: "",
    clubDescription: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewBackground, setPreviewBackground] = useState(null);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "logo") {
        setLogoFile(file);
        setPreviewLogo(reader.result);
      } else {
        setBackgroundFile(file);
        setPreviewBackground(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileInput({ target: { files: [file] } }, type);
  };

  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await securedAPI.post("/api/s3/upload-file", formData);
    if (!res.data || typeof res.data !== "string") {
      throw new Error("S3 응답이 예상과 다름");
    }
    return res.data.replace("File 업로드 성공 : ", "");
  };

  const handleSubmit = async () => {
    try {
      const clubLogoURL = logoFile ? await uploadToS3(logoFile) : "";
      const clubBackgroundImageURL = backgroundFile
        ? await uploadToS3(backgroundFile)
        : "";

      const body = {
        clubName: form.clubName,
        clubDescription: form.clubDescription,
        clubLogoURL,
        clubBackgroundImageURL,
      };

      await securedAPI.post("/api/club/add", body);
      onClose();
    } catch (err) {
      console.error("❌ 클럽 생성 실패", err);
      alert("클럽 생성에 실패했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <h2>새 클럽 만들기</h2>
        <Input
          name="clubName"
          placeholder="클럽 이름"
          value={form.clubName}
          onChange={handleChange}
        />
        <TextArea
          name="clubDescription"
          placeholder="클럽 설명"
          value={form.clubDescription}
          rows={3}
          onChange={handleChange}
        />

        <h4>로고 이미지</h4>
        <DropArea
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "logo")}
          onClick={() => document.getElementById("logoUpload").click()}
        >
          {previewLogo ? (
            <PreviewImage src={previewLogo} alt="로고 미리보기" />
          ) : (
            <>여기에 로고 이미지를 드래그하거나 클릭해서 업로드</>
          )}
        </DropArea>
        <Input
          id="logoUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileInput(e, "logo")}
        />

        <h4>배경 이미지</h4>
        <DropArea
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "background")}
          onClick={() => document.getElementById("backgroundUpload").click()}
        >
          {previewBackground ? (
            <PreviewImage src={previewBackground} alt="배경 미리보기" />
          ) : (
            <>여기에 배경 이미지를 드래그하거나 클릭해서 업로드</>
          )}
        </DropArea>
        <Input
          id="backgroundUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileInput(e, "background")}
        />

        <ButtonRow>
          <ModalButton onClick={onClose}>취소</ModalButton>
          <ModalButton primary onClick={handleSubmit}>생성</ModalButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ClubCreateModal;
