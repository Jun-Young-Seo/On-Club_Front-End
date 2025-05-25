import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import clubImage from "../assets/images/club.jpg";
import calendarImage from "../assets/images/calendar.svg";
import tennisImage from "../assets/images/login_bg.jpg";
import MyPageCalendar from "./MyPageCalendar";
import securedAPI from "../Axios/SecuredAPI";
import defaultMaleImg from "../assets/images/default_male.png";
import defaultFemaleImage from "../assets/images/default_female.png";
import { DEFAULT_BACKGROUND_COLORS } from "../Constants/Default";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 10vh 5vw;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  background-color: #f9fafb;
`;

const TopSection = styled.div`
  display: flex;
  gap: 2.2vw;
  align-items: stretch;
  background-color: #fff;

  border: 0.3vh solid #e5e7eb;             
  border-radius: 2vh;
  box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08); 

  padding: 3vh 2vw;
`;


const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2vh;
  width: 20vw;
  border-right: 0.3vh solid #eee;
    padding-right: 5vw; 

`;

const ProfileImg = styled.img`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  object-fit: cover;
  border: 0.4vh solid #e0e7ff;
  background-color: #f9fafe;
  box-shadow: 0 0.5vh 1.2vh rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.15);
  }
`;

const InfoText = styled.div`
  font-size: 1.6vh;
  margin-bottom : 1vh;
`;

const StatBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 4vh;
  font-weight: bold;
  margin-bottom : 1.5vh;
`;

const StatLabel = styled.div`
  font-size: 2vh;
  color: #666;
`;


const ClubAndCalendarSection = styled.div`
  display: flex;
  gap: 3vw;
  height: 60vh;
`;

const ClubCardsWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  width : 100%;
  border: 0.3vh solid #e5e7eb;
  border-radius: 2vh;
  background: white;
  box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08);

  &::-webkit-scrollbar {
    display: none;
  }
`;


const ClubCard = styled.div`
  flex: 0 0 100%;          
  min-width: 100%;     
  scroll-snap-align: start;
  box-sizing: border-box;
  padding: 2vh 2vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #fff;

  border: 0.3vh solid #e5e7eb;             
  border-radius: 2vh;
  box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08); 

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 0.8vh 2vh rgba(0, 0, 0, 0.12);
  }
`;



const CalendarArea = styled.div`
  flex: 1;
  background-color: #fff;
  border: 0.3vh solid #e5e7eb;
  border-radius: 2vh;
  box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08);

  padding: 2vh 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const StatIcon = styled.img`
  width: 13vh;
  height: 13vh;
  object-fit: contain;
  border-radius: 2vh; 
  border: 0.4vh solid #e0e7ff; 
  background-color: #f9fafe;
  box-shadow: 0 0.5vh 1.2vh rgba(0, 0, 0, 0.08); 
  padding: 1vh;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 5vh;

`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  margin-top: 2vh;
  width: 80%;
  margin-left: 0.6vw;
  margin-right: auto;
  padding: 2vh 2vw;

  border: 0.3vh solid #e5e7eb;             
  border-radius: 2vh;
  background-color: #fff;                
  box-shadow: 0 0.6vh 1.5vh rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0.8vh 2vh rgba(0, 0, 0, 0.12);
  }
`;


const InfoRow = styled.div`
  display: flex;
  gap: 1vw;
  align-items: center;
  font-size: 1.6vh;
  padding-bottom: 1vh;                
  border-bottom: 1px solid #e5e7eb;   
    &:last-child {
    border-bottom: none;
  }

`;

const InfoLabel = styled.div`
  font-weight: 600;
  min-width: 7vw;
  display: flex;
  align-items: center;
  gap: 0.5vh;
  color: #333;
`;

const InfoValue = styled.div`
  flex: 1;
  font-weight : 600;
  color: #555;
  text-align:right;
`;


const ClubBackground = styled.div`
  position: relative;
  height: 60%;
  width : 100%;
  background: ${({ bgImage, index }) =>
    bgImage
      ? `url(${bgImage})`
      : DEFAULT_BACKGROUND_COLORS[index % DEFAULT_BACKGROUND_COLORS.length]};
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid #ccc;

`;

const ClubLogo = styled.img`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(120px, 20vw, 160px); 
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 5px solid #fff;
  background: #fff;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const ClubName = styled.div`
  margin-top: 3.7rem; 
  font-weight: 800;
  font-size: 3vh;
  text-align: center;
`;

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 1.2vh;
  height: 1.2vh;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#6b21a8" : "#e5e7eb")};
  transition: background-color 0.3s ease;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width : 0;
  min-width : 0;
  flex: 1;
  justify-content: space-between;
`;


const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [countMemberships, setCountMemberships] = useState(0);
    const [countThisMonth, setCountThisMonth] = useState(0);
    const [countTotalParticipates, setCountTotalParticipates] = useState(0);
    const [clubList, setClubList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [events, setEvents] = useState([]);

    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
    const fetchUserInfo = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()+1;
      try {
        const userInfores = await securedAPI.get(`/api/user/info?userId=${userId}`);
        setUserInfo(userInfores.data);

        const userInfoMyPageRes = await securedAPI.get(`/api/user/info/mypage?userId=${userId}&year=${year}&month=${month}`)
        const data = userInfoMyPageRes.data;
        setCountMemberships(data.countMemberships);
        setCountThisMonth(data.countParticipantThisMonth );
        setCountTotalParticipates(data.countAccumulateParticipant);
        
        const clubRes = await securedAPI.get(`/api/club/find/by-user_id?userId=${userId}`);
        setClubList(clubRes.data);

        const response = await securedAPI.get(`/api/event/mypage?userId=${userId}`);
        setEvents(response.data);
        console.log(response.data);

      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    fetchUserInfo();
  }, [userId]);

useEffect(() => {
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const wrapper = carouselRef.current;
  if (wrapper) {
    wrapper.addEventListener("scroll", handleScroll);
  }

  return () => {
    if (wrapper) {
      wrapper.removeEventListener("scroll", handleScroll);
    }
  };
}, []);

  const getProfileImage = () => {
  if (userInfo?.profileImageUrl) return userInfo.profileImageUrl;
  return userInfo?.gender === "FEMALE" ? defaultFemaleImage : defaultMaleImg;
};

  return (
    <Container>
      <TopSection>
        <ProfileBox>
                <ProfileImg src={getProfileImage()} alt="profile" />
          <InfoWrapper>
            <InfoRow>
              <InfoLabel>👤 이름</InfoLabel>
             <InfoValue>{userInfo?.userName} </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>🎂 생년월일</InfoLabel>
              <InfoValue>{userInfo?.birthDate}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>🚻 성별</InfoLabel>
                    <InfoValue>
                        {userInfo?.gender === "MALE" && "남성"}
                        {userInfo?.gender === "FEMALE" && "여성"}
                    </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>🎾 구력</InfoLabel>
              <InfoValue>{userInfo?.career}년</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>📍 활동지역</InfoLabel>
              <InfoValue>{userInfo?.region}</InfoValue>
            </InfoRow>
          </InfoWrapper>
        </ProfileBox>
            <StatBox>
            <StatItem>
                <StatIcon src={clubImage}/>
                <StatValue>{countMemberships}</StatValue>
                <StatLabel>가입한 클럽</StatLabel>
            </StatItem>
            <StatItem>
                <StatIcon src={calendarImage}/>
                <StatValue>{countThisMonth}</StatValue>
                <StatLabel>이번 달 일정</StatLabel>
            </StatItem>
            <StatItem>
                <StatIcon src={tennisImage}/>
                <StatValue>{countTotalParticipates}</StatValue>
                <StatLabel>전체 출석</StatLabel>
            </StatItem>
            </StatBox>
      </TopSection>
                <ClubAndCalendarSection>
                <LeftColumn>
                    <ClubCardsWrapper ref={carouselRef}>
                    {clubList.map((club, index) => (
                      <ClubCard key={club.club_id} onClick={() => navigate(`/clubs/${club.club_id}`)}>
                        <ClubBackground bgImage={club.clubBackgroundImageURL} index={index}>
                            <ClubLogo src={club.clubLogoURL} alt="Club Logo" />
                        </ClubBackground>
                        <ClubName>{club.clubName}</ClubName>

                        </ClubCard>
                    ))}
                    </ClubCardsWrapper>

                    <IndicatorWrapper>
                    {clubList.map((_, idx) => (
                        <Dot key={idx} active={idx === activeIndex} />
                    ))}
                    </IndicatorWrapper>
                </LeftColumn>

                <CalendarArea>
                    <MyPageCalendar events={events} />
                </CalendarArea>
                </ClubAndCalendarSection>

    </Container>
  );
};

export default MyPage;
