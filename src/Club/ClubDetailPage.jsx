import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import securedAPI from "../Axios/SecuredAPI";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: ${(props) => `url(${props.bgImage})` || "#ddd"};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClubLogo = styled.img`
  position: absolute;
  bottom: -50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  background: white;
`;

const ClubInfo = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const ClubName = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
`;

const ClubDescription = styled.p`
  font-size: 18px;
  color: #666;
`;

const Content = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 20px;
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        console.log('clubID : ',clubId);
        const response = await securedAPI.get(`/api/club/find/by-club_id?clubId=${clubId}`);
        console.log(response);
        setClub(response.data);
      } catch (error) {
        console.error("클럽 상세 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchClubDetails();
  }, [clubId]);

  if (!club) return <p>Loading...</p>;

  return (
    <Container>
      <Header bgImage={club.clubBackgroundImageURL}>
        <ClubLogo src={club.clubLogoURL} alt="club-logo" />
      </Header>
      <ClubInfo>
        <ClubName>{club.clubName}</ClubName>
        <ClubDescription>{club.clubDescription}</ClubDescription>
      </ClubInfo>
      <Content>
        <LeftColumn>
          <ClubDetails>
            <h2>📌 클럽 소개</h2>
            <p>{club.clubDetails}</p>
          </ClubDetails>
        </LeftColumn>
        <RightColumn>
          <ClubDetails>
            <h2>📸 활동 사진</h2>
            <div>
              {club.clubGalleryImages &&
                club.clubGalleryImages.map((img, index) => (
                  <img key={index} src={img} alt="club-gallery" width="100%" />
                ))}
            </div>
          </ClubDetails>
          <ClubDetails>
            <h2>👥 정회원 수: {club.memberCount}명</h2>
            <h3>🎫 게스트 참여 수: {club.guestCount}명</h3>
          </ClubDetails>
        </RightColumn>
      </Content>
      <ButtonContainer>
        <Button primary>정회원 가입하기</Button>
        <Button>게스트로 참여하기</Button>
        <Button>📅 일정 확인하기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ClubDetailPage;
