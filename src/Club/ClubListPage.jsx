import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../Axios/SecuredAPI";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGES, DEFAULT_BACKGROUND_COLORS } from "../Constants/Default";


const PageContainer = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(400px, 1fr)); 
  gap: 40px;
  justify-content: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, minmax(400px, 1fr));
  }
`;

const ClubCard = styled.div`
  position: relative;
  width: 100%;
  height: 500px; 
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;
const ClubBackground = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  background: ${(props) =>
    props.bgImage
      ? `url(${props.bgImage})`
      : DEFAULT_BACKGROUND_COLORS[props.index % DEFAULT_BACKGROUND_COLORS.length]};
  background-size: cover;
  background-position: center;
`;


const ClubLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: white;
`;

const ClubInfo = styled.div`
  background: white;
  padding: 25px;
  text-align: center;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #ddd;
`;

const ClubName = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ClubDescription = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 10px;
`;

const ClubListPage = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await securedAPI.get("/api/club/find/all");
        // console.log(response.data);
        setClubs(response.data);
      } catch (error) {
        console.error("클럽 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleCardClicked = (clubId)=>{
    navigate(`/clubs/${clubId}`);
  }

  return (
    <PageContainer>
      <ClubGrid>
        {clubs.map((club, index) => (
          <ClubCard key={club.club_id} onClick={()=>handleCardClicked(club.club_id)}>
            <ClubBackground bgImage={club.clubBackgroundImageURL} index={index} />
            <ClubLogo src={club.clubLogoURL || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]} />
            <ClubInfo>
              <ClubName>{club.clubName}</ClubName>
              <ClubDescription>{club.clubDescription}</ClubDescription>
            </ClubInfo>
          </ClubCard>
        ))}
      </ClubGrid>
    </PageContainer>
  );
};

export default ClubListPage;
