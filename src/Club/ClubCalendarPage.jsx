import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../Axios/SecuredAPI";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 16px;
  border: none;
  background: #4CAF50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }

  .event-icon {
    position: absolute;
    top: 5px;  /* 🔹 테니스 공을 날짜보다 위로 배치 */
    font-size: 18px;
  }
`;

const EventDetails = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
  }

  strong {
    color: #222;
  }
`;

const AttendButton = styled.button`
  padding: 10px 15px;
  margin-top: 15px;
  font-size: 16px;
  border: none;
  background: #C7E508;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ClubCalendarPage = () => {
  const { clubId } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        const response = await securedAPI.get(`/api/event/get-event/club_id?clubId=${clubId}`);
        setEvents(response.data);
      } catch (error) {
        console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchClubEvents();
  }, [clubId]);

  // 📌 날짜를 YYYY-MM-DD 형식으로 변환하는 함수

  // 📌 특정 날짜가 이벤트 기간 내에 포함되는지 확인하는 함수
  const isWithinEventPeriod = (date, event) => {
    const eventStart = new Date(event.eventStartTime);
    const eventEnd = new Date(event.eventEndTime);
    const checkDate = new Date(date);

    // 🔹 시간 정보 제거 → 날짜만 비교
    eventStart.setHours(0, 0, 0, 0);
    eventEnd.setHours(23, 59, 59, 999);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate >= eventStart && checkDate <= eventEnd;
  };

  // 📌 날짜 클릭 시 해당 이벤트 찾기
  const handleDateClick = (date) => {
    const event = events.find((e) => isWithinEventPeriod(date, e));
    setSelectedDate(date);
    setSelectedEvent(event || null);
  };

  // 📌 날짜를 "2025년 03월 19일" 형식으로 변환
  const formatDateToKorean = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 📌 시간을 "HH:mm" 형식으로 변환 (연, 월, 일 제거)
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleAttendEvent = async () => {
    if (!selectedEvent) return;
  
    try {
      await securedAPI.post("/api/guest/attend/request", {
        userId: sessionStorage.getItem("userId"),
        eventId: selectedEvent.eventId,
      });
  
      Swal.fire({
        icon: "success",
        title: "참석 신청이 완료됐습니다.",
        text: "최대한 빨리 답변드릴게요! ☺️",
        confirmButtonColor: "#5fbd7b",
      });
  
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "이미 참석 신청됨",
          text: "이미 참석 신청을 하셨습니다. 곧 연락드릴게요 😊",
          confirmButtonColor: "#5fbd7b",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "참석 실패",
          text: error.response?.data || "알 수 없는 오류가 발생했습니다.",
          confirmButtonColor: "#e74c3c",
        });
      }
    }
  };
  
  

  return (
    <Container>
      <BackButton onClick={() => window.history.back()}>⬅ 돌아가기</BackButton>
      <h2>📅 클럽 일정</h2>

      <CalendarWrapper>
        <Calendar
          onClickDay={handleDateClick}
          tileContent={({ date }) => {
            const hasEvent = events.some((e) => isWithinEventPeriod(date, e));
            return hasEvent ? <div className="event-icon">🎾</div> : null;
          }}
        />
      </CalendarWrapper>

      {/* 📌 선택한 날짜의 이벤트 상세 내용 */}
      <EventDetails>
        {selectedEvent ? (
          <>
            <h3>📅 {formatDateToKorean(selectedEvent.eventStartTime)} ~ {formatDateToKorean(selectedEvent.eventEndTime)} 일정</h3>
            <p><strong>📝 내용:</strong> {selectedEvent.eventDescription}</p>
            <p><strong>⏰ 시작 시간:</strong> {formatTime(selectedEvent.eventStartTime)}</p>
            <p><strong>⏳ 종료 시간:</strong> {formatTime(selectedEvent.eventEndTime)}</p>
            <AttendButton onClick={handleAttendEvent}>🎟 게스트로 참석하기</AttendButton>
          </>
        ) : (
          <p>📭 {selectedDate ? "아무 일정이 없어요." : "날짜를 선택해 주세요."}</p>
        )}
      </EventDetails>
    </Container>
  );
};

export default ClubCalendarPage;
