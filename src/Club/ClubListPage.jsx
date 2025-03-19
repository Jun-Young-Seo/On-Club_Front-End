import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "https://via.placeholder.com/150"; // 기본 이미지

const PageContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: ${(props) => (props.active ? "#4947FF" : "#e0e0e0")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  &:hover {
    background: #4947ff;
    color: white;
  }
`;

const ClubCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ClubImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 15px;
`;

const ClubInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClubName = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const ClubDescription = styled.p`
  font-size: 14px;
  color: gray;
  margin: 5px 0 0;
`;

const ClubListPage = () => {
  const [clubs, setClubs] = useState([]);
  const [category, setCategory] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://43.201.191.12:8080/api/club/find/all")
      .then((response) => {
        console.log("📌 데이터 로드:", response.data);
        setClubs(response.data);
      })
      .catch((error) => {
        console.error("❌ 데이터 로드 실패:", error);
      });
  }, []);

  const categories = ["전체", "운동/스포츠", "인문학/책", "외국어"];

  const filteredClubs = category === "전체"
    ? clubs
    : clubs.filter((club) => club.category === category);

  return (
    <PageContainer>
      <h2>소모임</h2>

      {/* 🔹 카테고리 필터 */}
      <CategoryFilter>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryFilter>

      {/* 🔹 동호회 리스트 */}
      {filteredClubs.map((club) => (
        <ClubCard key={club.clubId} onClick={() => navigate(`/club/${club.clubId}`)}>
          <ClubImage src={club.clubLogoURL || DEFAULT_IMAGE} alt="club-logo" />
          <ClubInfo>
            <ClubName>{club.clubName}</ClubName>
            <ClubDescription>{club.clubDescription}</ClubDescription>
          </ClubInfo>
        </ClubCard>
      ))}
    </PageContainer>
  );
};

export default ClubListPage;
