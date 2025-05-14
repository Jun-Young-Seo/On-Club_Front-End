import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';
import Swal from 'sweetalert2';
import securedAPI from '../../Axios/SecuredAPI';

const PageWrapper = styled.div`
  background-color: #fafece;
  min-height: 100vh;
  padding: 6rem 1rem;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: white;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 45vw;
  text-align: center;
`;


const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.3rem;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 2.5rem;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  background: ${({ bgImage }) =>
    bgImage ? `url(${bgImage})` : '#edf2fa'};
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  min-height: 38vh;
  padding-bottom: 18vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const ClubLogo = styled.div`
  position: absolute;
  bottom: 13vh;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(100px, 20vw, 160px);
  height: clamp(100px, 20vw, 160px);
  border-radius: 50%;
  border: 0.4rem solid white;
  background: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const UploadButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 8vh;
  margin-bottom: 4vh;
`;

const UploadButton = styled.button`
  border: 1px solid #1976d2;
  color: #1976d2;
  font-size: 0.95rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.6rem;
  background: white;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #e3f2fd;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
`;

const SubmitButton = styled.button`
  background-color: #27ae60;
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #219150;
  }
`;

const PreButton = styled.button`
  background-color: #27ae60;
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #219150;
  }
`;
const Index = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-top: 1.2rem;
  text-align: center;
  opacity: 0.8;
`;

const NewClubStepThree = () => {
  const logoInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const [logoPreview, setLogoPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBgPreview(URL.createObjectURL(file));
  };

  const handleClubSubmit = async () => {
    try {
      const clubName = sessionStorage.getItem('clubName');
      const clubDescription = sessionStorage.getItem('clubDescription');
  
      if (!clubName || !clubDescription) {
        Swal.fire({
          icon: "warning",
          title: "누락된 정보",
          text: "클럽 이름이나 소개가 누락되었습니다.",
          confirmButtonColor: "#27ae60"
        });
        return;
      }
  
      const response = await securedAPI.post('/api/club/add', {
        clubName,
        clubDescription,
        clubLogoURL: "",
        clubBackgroundURL: ""
      });
  
      const clubId = response.data.clubId;
      Swal.fire({
        icon: "success",
        title: "클럽 생성 완료",
        text: `${clubName} 클럽이 성공적으로 생성되었습니다!`,
        confirmButtonColor: "#27ae60"
      }).then(() => {
        // 이후 페이지로 이동하거나 추가 API 호출
        window.location.href = `/clubs/${clubId}/detail`;
      });
  
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "중복된 클럽 이름",
          text: "이미 존재하는 클럽 이름입니다. 다른 이름을 사용해주세요.",
          confirmButtonColor: "#e74c3c"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "생성 실패",
          text: "클럽 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          confirmButtonColor: "#e74c3c"
        });
      }
    }
  };
  
  return (
    <PageWrapper>
      <Card>
        <Title>클럽 이미지 업로드</Title>
        <SubTitle>로고와 배경 사진으로 클럽의 얼굴을 만들어 주세요.</SubTitle>
        
                    <Header
            bgImage={bgPreview}
            onClick={() => bgInputRef.current?.click()}
            style={{ cursor: 'pointer' }}
            >
            <ClubLogo onClick={(e) => {
                e.stopPropagation(); 
                logoInputRef.current?.click();
            }}>
                {logoPreview ? <img src={logoPreview} alt="로고 미리보기" /> : <FiUpload size={28} color="#1976d2" />}
            </ClubLogo>
            </Header>
        <UploadButtons>
          <UploadButton onClick={() => logoInputRef.current.click()}>
            <FiUpload /> 로고 업로드
          </UploadButton>
          <UploadButton onClick={() => bgInputRef.current.click()}>
            <FiUpload /> 배경 이미지 업로드
          </UploadButton>
        </UploadButtons>

        <input
          type="file"
          accept="image/*"
          ref={logoInputRef}
          style={{ display: 'none' }}
          onChange={handleLogoUpload}
        />
        <input
          type="file"
          accept="image/*"
          ref={bgInputRef}
          style={{ display: 'none' }}
          onChange={handleBgUpload}
        />
        <ButtonContainer>
            <PreButton onClick={() => window.location.href = "/new/club/step2"}>
                이전
            </PreButton>
            <SubmitButton onClick={handleClubSubmit}>
                클럽 생성 완료
            </SubmitButton>
        </ButtonContainer>
        <Index>3 / 3</Index>
      </Card>
    </PageWrapper>
  );
};

export default NewClubStepThree;
