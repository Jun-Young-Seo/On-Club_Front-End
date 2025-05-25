// MyPageCalendar.jsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;

  .react-calendar {
    width: 100%;
    height: 100%;
    font-family: 'Pretendard', sans-serif;
    border: none;
    border-radius: 1.5vh;
    box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08);
    padding: 1.5vh 1.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .react-calendar__viewContainer {
    flex: 1;
  }

  .react-calendar__tile {
    height: 7vh;
    font-size: 1.6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .react-calendar__tile--now {
    background: #fef9c3;
    border-radius: 10px;
  }

  .react-calendar__tile--active {
    background: #c7e508;
    color: white;
    border-radius: 10px;
  }
`;

const MyPageCalendar = () => {
  return (
    <CalendarWrapper>
      <Calendar locale="ko-KR" />
    </CalendarWrapper>
  );
};

export default MyPageCalendar;