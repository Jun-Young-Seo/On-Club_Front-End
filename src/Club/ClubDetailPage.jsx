import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../Axios/SecuredAPI";
import { useParams } from "react-router-dom";
import { DEFAULT_IMAGES, DEFAULT_BACKGROUND_COLORS } from "../Constants/Default";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

const Container = styled.div`
  width: 80%;
  max-width: 1100px;
  margin: auto;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  min-height: 40vh;
  background: ${(props) =>
    props.bgImage
      ? `url(${props.bgImage})`
      : DEFAULT_BACKGROUND_COLORS[props.index % DEFAULT_BACKGROUND_COLORS.length]};
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClubLogo = styled.img`
  position: absolute;
  bottom: -4vh;
  width: 14.375rem;  /* 230px */
  height: 14.375rem;
  border-radius: 50%;
  border: 0.25rem solid white;
  background: white;
`;

const ClubInfo = styled.div`
  text-align: center;
  margin-top: 1.25rem;
`;

const ClubName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  padding-top: 5vh;
  color: #333;
`;

const ClubDescription = styled.p`
  font-size: 1.125rem;
  color: #666;
  margin-top: 0.625rem;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Tag = styled.div`
  background-color: #e0f7fa;
  color: #00796b;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CreatedDate = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #999;
  margin-top: 0.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  border-bottom: 2px solid #ddd;
`;

const TabButton = styled.button`
  padding: 0.9rem 1.25rem;
  font-size: 1.125rem;
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

const Content = styled.div`
  margin-top: 1.25rem;
  padding: 1.25rem;
`;

const ClubDetails = styled.div`
  padding: 1.25rem;
  background: #f8f8f8;
  border-radius: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  border-radius: 0.5rem;
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

const MarkdownBox = styled.div`
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  .markdown-body {
    font-size: 1rem;
    line-height: 1.6;
    color: #1f2937;
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
        console.log(response.data);
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
        userId,
        clubId,
      });
  
      // 성공 알림
      Swal.fire("가입 신청이 완료되었습니다.", "빨리 검토해서 응답할게요.😊", "success");
  
    } catch (err) {
      console.error("가입 처리 중 오류 발생:", err);
  
      //중복신청은 서버에서 409 CONFOLICT 반환
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "이미 가입 신청됨",
          text: "이미 가입 신청을 하셨습니다. 곧 연락드릴게요 😊",
          confirmButtonColor: "#5fbd7b"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "오류 발생",
          text: "가입 신청에 실패했습니다. 잠시 후 다시 시도해주세요.",
          confirmButtonColor: "#e74c3c"
        });
      }
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
      <ClubInfo>
        <ClubName>{club.clubName}</ClubName>
        <ClubDescription>{club.clubDescription}</ClubDescription>

        {/* 태그들 */}
        <TagWrapper>
          {club.tagOne && <Tag>#{club.tagOne}</Tag>}
          {club.tagTwo && <Tag>#{club.tagTwo}</Tag>}
          {club.tagThree && <Tag>#{club.tagThree}</Tag>}
        </TagWrapper>

        {/* 생성일 표시 */}
        {club.clubWhenCreated && (
          <CreatedDate>
            클럽 생성일: {new Date(club.clubWhenCreated).toLocaleDateString("ko-KR")}
          </CreatedDate>
        )}
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
            <MarkdownBox className="markdown-body">
              <ReactMarkdown>{club.clubDescriptionDetail || "소개가 없습니다."}</ReactMarkdown>
            </MarkdownBox>
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
            <h2>👥 정회원 수: {club.clubMemberCount || 0}명</h2>
            <h2>🎫 누적 게스트 참여 수: {club.guestCount || 0}명</h2>
          </ClubDetails>
        )}
      </Content>

      {/* 🔹 버튼들 */}
      <ButtonContainer>
        <Button primary onClick={handleMemberButtonClick}>정회원 가입하기</Button>
        {/* <Button>게스트로 참여하기</Button> */}
        <Button onClick={() => navigate(`/clubs/${clubId}/calendar`)}>📅 일정 확인하기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ClubDetailPage;
