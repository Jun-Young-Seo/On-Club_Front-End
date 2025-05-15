import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { unSecuredAPI } from "../Axios/UnsecuredAPI";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGES, DEFAULT_BACKGROUND_COLORS } from "../Constants/Default";
import logoImage from "../assets/images/cute_logo_2.svg";


const PageContainer = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top:120px;
  background-color: #f9fafb;

`;

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(400px, 1fr)); 
  gap: 4vw;
  justify-content: center;
  margin : 0 auto;
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, minmax(400px, 1fr));
  }
`;

const ClubCard = styled.div`
  position: relative;
  width: 25vw;
  aspect-ratio: 3 / 4.5;
  border-radius: 1rem;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    max-width: 90vw;
  }
`;


const ClubBackground = styled.div`
  position: relative;
  height: 60%;
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
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 6px solid white;
  background: white;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const ClubInfo = styled.div`
  padding: 4.5rem 1.2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  flex: 1;
`;


const ClubName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;
const ClubDescription = styled.div`
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.5;
  min-height: 5.7em; /* 줄 수 제한 대신 공간 확보 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;


const TagList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  background-color: #f3f4f6;
  color: #374151;
  // border: 1px solid #d1d5db;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  border: 1px solid #e5e7eb; 
  border-radius: 1rem;
  background-color: #fff;
  width: 60%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

`;

const SearchInput = styled.input`
  padding: 0.7rem 1.2rem;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #d1d5db; // soft border
  border-radius: 8px;
  outline: none;
  transition: border 0.2s ease;
  text-align:center;
  &:focus {
    border-color: #7c3aed; // violet
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }
`;


const LogoIcon = styled.img`
  height: 160px;
  width: 160px;
  object-fit: contain;
`;

const ClubListPage = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await unSecuredAPI.get("/api/club/find/all");
        // console.log(response.data);
        setClubs(response.data);
      } catch (error) {
        console.error("클럽 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleCardClicked = (clubId) => {
    const userId = sessionStorage.getItem("userId");
  
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '클럽 상세 페이지는 로그인 후에 확인하실 수 있습니다.',
        confirmButtonText: '확인'
      });
      return;
    }
  
    navigate(`/clubs/${clubId}`);
  };
  const filteredClubs = clubs.filter((club) => {
    if (!searchKeyword.trim()) return true;
  
    const keyword = searchKeyword.toLowerCase();
    const nameMatch = club.clubName?.toLowerCase().includes(keyword);
    const tagMatch = [club.tagOne, club.tagTwo, club.tagThree]
      .some(tag => tag?.toLowerCase().includes(keyword));
  
    return nameMatch || tagMatch;
  });
  
  
  return (
    <PageContainer>
        <SearchContainer>
          <LogoIcon src={logoImage} />
          <SearchInput
            type="text"
            placeholder="클럽 명 또는 태그로 검색하기"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            
          />
        </SearchContainer>

      <ClubGrid>
      {filteredClubs.map((club, index) => (
          <ClubCard key={club.club_id} onClick={()=>handleCardClicked(club.club_id)}>
            <ClubBackground bgImage={club.clubBackgroundImageURL} index={index} />
            <ClubLogo src={club.clubLogoURL || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]} />
            <ClubInfo>
            <ClubName>{club.clubName}</ClubName>
            <ClubDescription>{club.clubDescription}</ClubDescription>
            <TagList>
              {[club.tagOne, club.tagTwo, club.tagThree].map((tag, i) =>
                tag ? <Tag key={i}>#{tag}</Tag> : null
              )}
            </TagList>
          </ClubInfo>
          </ClubCard>
        ))}
      </ClubGrid>

    </PageContainer>
  );
};

export default ClubListPage;
