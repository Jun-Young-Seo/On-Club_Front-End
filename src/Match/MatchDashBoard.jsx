import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import securedAPI from "../Axios/SecuredAPI";
import Swal from "sweetalert2";

const PageWrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  min-height: 100vh;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
`;

const LeftColumn = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: 2rem;
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; /* 세로 간격 넓힘 */
`;

const ListCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9fbfd;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.025);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const TimeBlock = styled.div`
  flex: 1;
  font-size: 0.95rem;
  color: #333;
  text-align: center;
`;

const DescriptionBlock = styled.div`
  flex: 2;
  font-weight: 500;
  font-size: 1rem;
  color: #000;
  text-align: center;
`;

const DetailButton = styled.button`
  flex: 0;
  padding: 0.5rem 1.2rem;
  background-color: #5fbd7b;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 1rem;
  white-space: nowrap;
`;

const RightColumn = styled.div`
  width: 320px;
  background: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  height: 70vh;
  position: sticky;
  top: 0;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.25rem;
  display: block;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  font-size: 0.95rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ButtonMain = styled.button`
  background-color: #d3f255;
  color: #000;
  border: none;
  padding: 0.9rem;
  width: 100%;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 11rem;
  cursor: pointer;
`;
const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
  padding-bottom : 0.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  padding-left:0.5rem;
  flex-direction: column;
`;


const MatchDashBoard = () => {
  const {clubId} = useParams();
  const [eventList, setEventList] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  const navigate = useNavigate();

  const fetchClubDetails = useCallback(async () => {
    if (!clubId) return;

    try {
      const response = await securedAPI.get(`/api/event/get-event/club_id?clubId=${clubId}`);
      setEventList(response.data);
    } catch (error) {
      console.error("클럽 상세 정보를 불러오는 중 오류 발생:", error);
    }
  }, [clubId]);

  useEffect(() => {
    fetchClubDetails();
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  
    setFilterStartDate(firstDay.toISOString().slice(0, 10)); // yyyy-mm-dd
    setFilterEndDate(today.toISOString().slice(0, 10));
  
  }, [fetchClubDetails]);

const handleEventSubmit = async () => {
  try {
    const response = await securedAPI.post(
      `/api/event/add-event`,
      {
        clubId: clubId,
        eventStartTime: startTime,
        eventEndTime: endTime,
        eventDescription: eventDescription
      }
    );

    console.log("이벤트 등록 성공:", response.data);

    await Swal.fire({
      icon: "success",
      title: "등록 완료",
      text: "이벤트가 성공적으로 추가되었습니다",
      confirmButtonColor: "#3085d6"
    });

    setStartTime("");
    setEndTime("");
    setEventDescription("");

    fetchClubDetails();
  } catch (error) {
    console.error("이벤트 등록 실패", error);

    await Swal.fire({
      icon: "error",
      title: "등록 실패",
      text: "이벤트 추가 중 오류가 발생했습니다.",
      confirmButtonColor: "#d33"
    });
  }
};


  const filteredEvents = eventList.filter((event) => {
    const eventDate = new Date(event.eventStartTime).toISOString().slice(0, 10);
    return (
      (!filterStartDate || eventDate >= filterStartDate) &&
      (!filterEndDate || eventDate <= filterEndDate) &&
      (!filterKeyword || event.eventDescription.includes(filterKeyword))
    );
  });
  
  return (
    <PageWrapper>
      {/* 좌측 카드 목록 */}
      <LeftColumn>
        <FilterBar>
            <FilterGroup>
            <FilterLabel>시작일</FilterLabel>
            <FilterInput
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
            />
            </FilterGroup>

            <FilterGroup>
            <FilterLabel>종료일</FilterLabel>
            <FilterInput
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
            />
            </FilterGroup>

            <FilterGroup>
            <FilterLabel>검색</FilterLabel>
            <FilterInput
                type="text"
                placeholder="모임 내용"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
            />
            </FilterGroup>
        </FilterBar>

        <CardGrid>
            {filteredEvents.map((event) => (
            <ListCard key={event.eventId}>
                <TimeBlock>
                {new Date(event.eventStartTime).toLocaleString("ko-KR")}
                </TimeBlock>
                <TimeBlock>
                {new Date(event.eventEndTime).toLocaleString("ko-KR")}
                </TimeBlock>
                <DescriptionBlock>{event.eventDescription}</DescriptionBlock>
                <DetailButton onClick={() => navigate(`/clubs/${clubId}/event/${event.eventId}`)}>
                자세히 보기
                </DetailButton>
            </ListCard>
            ))}
        </CardGrid>
        </LeftColumn>


        <RightColumn>
        <Title>모임 일정 추가하기</Title>

        <Label>시작 시간</Label>
        <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
        />

        <Label>끝나는 시간</Label>
        <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
        />

        <Label>모임 설명</Label>
        <Input
            type="text"
            placeholder="2025년 2차 정기 클럽 모임"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
        />

        <ButtonMain onClick={handleEventSubmit}>이벤트 등록</ButtonMain>
        </RightColumn>

    </PageWrapper>
  );
};

export default MatchDashBoard;
