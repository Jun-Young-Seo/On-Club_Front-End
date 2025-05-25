import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

// 🎨 Styled Components
const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 600px;
    border: none;
    border-radius: 8px;
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
    border-radius: 8px;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* 🟡 선택된 날짜의 글씨가 흰색으로 안 보일 때 대비 */
  .react-calendar__tile--active {
    background-color: #4caf50 !important;
    color: white !important;
  }

  /* 일정 타입별 배경색 */
  .react-calendar__tile.has-event-membership {
    background-color: rgba(76, 175, 80, 0.15); /* 연초록 */
  }

  .react-calendar__tile.has-event-guest {
    background-color: rgba(33, 150, 243, 0.15); /* 연파랑 */
  }

  .react-calendar__tile.has-event-both {
    background-color: rgba(255, 152, 0, 0.2); /* 오렌지 계열 */
  }

  /* Hover 효과 */
  .react-calendar__tile.has-event-membership:hover,
  .react-calendar__tile.has-event-guest:hover,
  .react-calendar__tile.has-event-both:hover {
    filter: brightness(1.05);
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3) inset;
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .color-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .membership {
    background-color: rgba(76, 175, 80, 0.6); /* 초록 */
  }

  .guest {
    background-color: rgba(33, 150, 243, 0.6); /* 파랑 */
  }

  .both {
    background-color: rgba(255, 152, 0, 0.8); /* 오렌지 */
  }
`;

const MyPageCalendar = ({ events }) => {
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const getEventsByDate = (date) => {
    return events.filter((event) => {
      const start = new Date(event.eventStartTime);
      const end = new Date(event.eventEndTime);
      const check = new Date(date);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      check.setHours(0, 0, 0, 0);
      return check >= start && check <= end;
    });
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDateClick = (date) => {
    const eventsOnDate = getEventsByDate(date);
    if (eventsOnDate.length === 0) return;

    setSelectedDateEvents(eventsOnDate);

    const htmlContent = eventsOnDate
      .map(
        (e) => `
        <div style="padding: 1rem 0; border-bottom: 1px solid #eee;">
          <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 0.3rem;">
            ${e.clubName}
          </div>
          <div style="font-size: 15px; color: #555; margin-bottom: 0.5rem;">
            📝 ${e.eventDescription}
          </div>
          <div style="font-size: 14px; color: #777;">
            ⏰ ${formatDateTime(e.eventStartTime)} ~ ${formatDateTime(e.eventEndTime)}
          </div>
        </div>
      `
      )
      .join("");

    Swal.fire({
      icon: "info",
      html: htmlContent,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "확인",
      confirmButtonColor: "#4CAF50",
      background: "#fefefe",
      width: 520,
      padding: "2rem 2rem 1rem",
      customClass: {
        popup: "calendar-swal-popup",
      },
    });
  };

  return (
    <CalendarWrapper>
      <Legend>
        <div className="legend-item">
          <div className="color-box membership" /> 정회원 일정
        </div>
        <div className="legend-item">
          <div className="color-box guest" /> 게스트 일정
        </div>
        <div className="legend-item">
          <div className="color-box both" /> 둘 다 있음
        </div>
      </Legend>

      <Calendar
        locale="ko-KR"
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          const eventsForDate = getEventsByDate(date);
          if (eventsForDate.length === 0) return null;

          const hasGuest = eventsForDate.some((e) => e.type === "guest");
          const hasMembership = eventsForDate.some((e) => e.type === "membership");

          if (hasGuest && hasMembership) return "has-event-both";
          if (hasGuest) return "has-event-guest";
          if (hasMembership) return "has-event-membership";
          return null;
        }}
      />
    </CalendarWrapper>
  );
};

export default MyPageCalendar;
