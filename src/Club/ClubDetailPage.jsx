import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../Axios/SecuredAPI";
import { useParams } from "react-router-dom";
import { DEFAULT_IMAGES, DEFAULT_BACKGROUND_COLORS } from "../Constants/Default";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 40px;
  display: flex;
  // padding-top: 120px;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  min-height : 40vh;
  background: ${(props) =>
    props.bgImage
      ? `url(${props.bgImage})`
      : DEFAULT_BACKGROUND_COLORS[props.index % DEFAULT_BACKGROUND_COLORS.length]};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClubLogo = styled.img`
  position: absolute;
  bottom: -4vh;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 4px solid white;
  background: white;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  border-bottom: 2px solid #ddd;
`;

const TabButton = styled.button`
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: ${(props) => (props.active ? "#4CAF50" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;
  transition: 0.3s;
  flex: 1;
  text-align: center;
  &:hover {
    background: #4caf50;
    color: white;
  }
`;

const ClubInfo = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ClubName = styled.h1`
  font-size: 32px;
  font-weight: bold;
  padding-top:5vh;
  color: #333;
`;

const ClubDescription = styled.p`
  font-size: 18px;
  color: #666;
  margin-top: 10px;
`;

const Content = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

const ClubDetails = styled.div`
  padding: 20px;
  background: #f8f8f8;
  border-radius: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  ${(props) =>
    props.primary
      ? `background: #4CAF50; color: white;`
      : `background: #f1f1f1; color: black;`}
  &:hover {
    opacity: 0.8;
  }
`;

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [activeTab, setActiveTab] = useState("소개");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await securedAPI.get(`/api/club/find/by-club_id?clubId=${clubId}`);
        setClub(response.data);
      } catch (error) {
        console.error("클럽 상세 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchClubDetails();
  }, [clubId]);

  if (!club) return <p>Loading...</p>;

  const handleMemberButtonClick = async () => {
    const userId = sessionStorage.getItem("userId");
  
    try {
      await securedAPI.post(`/api/membership/join/request`, {
        userId: userId,
        clubId: clubId
      });
  
      // 성공 알림
      Swal.fire("가입 신청이 완료되었습니다.", "빨리 검토해서 응답할게요.😊", "success");
  
    } catch (err) {
      console.error("가입 처리 중 오류 발생:", err);
      Swal.fire("오류 발생", "가입 신청에 실패했습니다. 잠시 후 다시 시도해주세요.", "error");
    }
  };
  
  return (
    <Container>
      {/* 🔹 상단 배경 + 로고 */}
      <Header
        bgImage={club.clubBackgroundImageURL}
        index={parseInt(clubId, 10) % DEFAULT_BACKGROUND_COLORS.length+1}
      >
        <ClubLogo src={club.clubLogoURL || DEFAULT_IMAGES[parseInt(clubId, 10) % DEFAULT_IMAGES.length]} />
      </Header>

      {/* 🔹 클럽 기본 정보 */}
      <ClubInfo>
        <ClubName>{club.clubName}</ClubName>
        <ClubDescription>{club.clubDescription}</ClubDescription>
      </ClubInfo>

      {/* 🔹 탭 버튼 */}
      <TabContainer>
        {["소개", "활동 사진", "회원 정보"].map((tab) => (
          <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      {/* 🔹 탭별 컨텐츠 */}
      <Content>
        {activeTab === "소개" && (
          <ClubDetails>
            <h2>📌 클럽 소개</h2>
            <br></br>
            <p>{club.clubDetails || "클럽 소개가 없습니다."}</p>
          </ClubDetails>
        )}

        {activeTab === "활동 사진" && (
          <ClubDetails>
            <h2>📸 활동 사진</h2>
            <div>
              {club.clubGalleryImages && club.clubGalleryImages.length > 0 ? (
                club.clubGalleryImages.map((img, index) => (
                  <img key={index} src={img} alt="club-gallery" width="100%" />
                ))
              ) : (
                <p>활동 사진이 없습니다.</p>
              )}
            </div>
          </ClubDetails>
        )}

        {activeTab === "회원 정보" && (
          <ClubDetails>
            <h2>👥 정회원 수: {club.memberCount || 0}명</h2>
            <h3>🎫 게스트 참여 수: {club.guestCount || 0}명</h3>
          </ClubDetails>
        )}
      </Content>

      {/* 🔹 버튼들 */}
      <ButtonContainer>
        <Button primary onClick={handleMemberButtonClick}>정회원 가입하기</Button>
        <Button>게스트로 참여하기</Button>
        <Button onClick={() => navigate(`/clubs/${clubId}/calendar`)}>📅 일정 확인하기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ClubDetailPage;
