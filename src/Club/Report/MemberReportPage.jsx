import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import securedAPI from "../../Axios/SecuredAPI";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LOADING_MEMBER_MESSAGES } from "../../Constants/Default";
import Swal from "sweetalert2";
import goldImage from "../../assets/images/Gold.svg";
import silverImage from "../../assets/images/Silver.svg";
import bronzeImage from "../../assets/images/Bronze.svg";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MemberCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  width: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  margin-bottom : 1.2rem;
  &:hover {
    background-color: #f9fafb;
  }
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Medal = styled.div`
  font-size: 1.5rem;
`;

const Name = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
`;

const SubInfo = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ChartTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  background-color: #f1f5f9;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1.5px solid #cbd5e1;
  margin-bottom: 1.5rem;
  font-family: "Segoe UI", "Pretendard", "Noto Sans KR", sans-serif;
`;
const ChartEmoji = styled.div`
  font-size: 2.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
`;
const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 360px;
//   width: 100%;
//   max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.8); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const MarkdownBox = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
`;

const MemberReportPage = ({activeTab}) => {
  const { clubId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [gptMarkDown, setGptMarkDown] = useState("");
  const [message, setMessage] = useState(LOADING_MEMBER_MESSAGES[0]);

  const [howManyMembers, setHowManyMembers] = useState(0);
  const [howManyMembersBetweenOneMonth, setHowManyMembersBetweenOneMonth] = useState(0);
  const [howManyAccumulatedGuests, setHowManyAccumulatedGuests] = useState(0);
  const [howManyGuestsBetweenOneMonth, setHowManyGuestsBetweenOneMonth] = useState(0);
  const [howManyEventsBetweenOneMonth, setHowManyEventsBetweenOneMonth] = useState(0);
  const [maleMembers, setMaleMembers] = useState(0);
  const [femaleMembers, setFemaleMembers] = useState(0);
  const [mostAttendantMember, setMostAttendantMember] = useState([]);
  const [mostManyGamesMember, setMostManyGamesMember] = useState([]);
  const [mostWinnerMember, setMostWinnerMember] = useState([]);
  useEffect(() => {

  const messageTimer = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_MEMBER_MESSAGES.length);
    setMessage(LOADING_MEMBER_MESSAGES[randomIndex]); 
  }, 1500);

    return () => {
      clearInterval(messageTimer);
    };
  }, []);

useEffect(() => {
  if (activeTab !== 'member') return;

  const fetchClubReports = async () => {
    setIsLoading(true);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    try {
      const [memberRes, gptRes] = await Promise.all([
        securedAPI.get(`/api/report/member/data?clubId=${clubId}&year=${year}&month=${month}`),
        securedAPI.get(`/api/report/member/analyze?clubId=${clubId}&year=${year}&month=${month}`)
      ]);
      const data = memberRes.data;
      console.log(data);
      setHowManyMembers(data.howManyMembers);
      setHowManyMembersBetweenOneMonth(data.howManyMembersBetweenOneMonth);
      setHowManyAccumulatedGuests(data.howManyAccumulatedGuests);
      setHowManyGuestsBetweenOneMonth(data.howManyGuestsBetweenOneMonth);
      setHowManyEventsBetweenOneMonth(data.howManyEventsBetweenOneMonth);
      setMaleMembers(data.maleMembers);
      setFemaleMembers(data.femaleMembers);
      setMostAttendantMember(data.mostAttendantMember || []);
      setMostManyGamesMember(data.mostManyGamesMember || []);
      setMostWinnerMember(data.mostWinnerMember || []);
      setGptMarkDown(gptRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchClubReports();
}, [activeTab, clubId]); 

  const genderPieData = {
    labels: ["남성 회원", "여성 회원"],
    datasets: [{
      data: [maleMembers, femaleMembers],
      backgroundColor: ["#60a5fa", "#f472b6"]
    }]
  };

  const memberBarData = {
    labels: ["누적 회원", "월간 신규 회원", "월간 모임 수"],
    datasets: [{
      label: "회원/모임",
      data: [howManyMembers, howManyMembersBetweenOneMonth, howManyEventsBetweenOneMonth],
      backgroundColor: ["#10b981", "#6ee7b7", "#34d399"]
    }]
  };

  const guestBarData = {
    labels: ["누적 게스트", "월간 게스트", "월간 모임 수"],
    datasets: [{
      label: "게스트 수",
      data: [howManyAccumulatedGuests, howManyGuestsBetweenOneMonth, howManyEventsBetweenOneMonth],
      backgroundColor: ["#fbbf24", "#fcd34d", "#fde68a"]
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.4,
    barPercentage: 0.6,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
const medalEmojis = ["🥇", "🥈", "🥉"];

const getMedalImage = (index) => {
  if (index === 0) return goldImage;
  if (index === 1) return silverImage;
  if (index === 2) return bronzeImage;
  return null;
};

const injectSwalStyleOnce = () => {
  if (document.getElementById("swal-style")) return;

  const style = document.createElement("style");
  style.id = "swal-style";
  style.textContent = `
    .swal2-popup {
      border-radius: 20px;
      border: 2.5px solid #4b5563;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
      padding: 2.4rem;
      background-color: #ffffff;
    }

    .swal2-title {
      font-size: 1.7rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1.2rem;
    }

    .swal2-confirm {
      background: linear-gradient(to right, #3b82f6, #2563eb) !important;
      color: white !important;
      font-weight: 600;
      border-radius: 8px;
      padding: 0.7rem 1.6rem;
      font-size: 1rem;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
      transition: all 0.3s ease;
    }

    .swal2-confirm:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.5);
    }

    .custom-swal-content {
      font-size: 1.2rem;
      color: #374151;
      line-height: 1.8;
      text-align: center;
    }

    .swal2-image {
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
    }
  `;
  document.head.appendChild(style);
};

const handleCardClick = (member, category, index) => {
  injectSwalStyleOnce(); // 항상 먼저 실행

  const rank = index + 1;
  let extraInfo = "";
  let titleText = `${member.userName}님의 정보`;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

if (category === "event") {
  titleText = `
    <div style="font-size: 1.3rem; color: #374151; font-weight: 500; margin-bottom: 0.2rem;">
      ${month}월 모임 참석왕 ${rank}위
    </div>
    <div style="font-size: 1.8rem; font-weight: 700; color: #1f2937;">
      ${member.userName}
    </div>
  `;
  extraInfo = `✅ 참석: ${member.attendanceCount}회`;

} else if (category === "game") {
  titleText = `
    <div style="font-size: 1.3rem; color: #374151; font-weight: 500; margin-bottom: 0.2rem;">
      ${month}월 게임 참가왕 ${rank}위
    </div>
    <div style="font-size: 1.8rem; font-weight: 700; color: #1f2937;">
      ${member.userName}
    </div>
  `;
  extraInfo = `🎮 게임: ${member.totalGames}회`;

} else if (category === "score") {
  titleText = `
    <div style="font-size: 1.3rem; color: #374151; font-weight: 500; margin-bottom: 0.2rem;">
      ${month}월 득점왕 ${rank}위
    </div>
    <div style="font-size: 1.8rem; font-weight: 700; color: #1f2937;">
      ${member.userName}
    </div>
  `;
  extraInfo = `🔥 득점: ${member.totalScore}점`;
}

  Swal.fire({
    title: titleText,
    html: `
      <div class="custom-swal-content">
        ${extraInfo}<br/>
        📞 ${member.userTel}<br/>
        🚻 ${member.gender === "FEMALE" ? "여성" : "남성"} / 🎾 ${member.career}년
      </div>
    `,
    imageUrl: getMedalImage(index),
    imageWidth: 120,
    imageHeight: 120,
    confirmButtonText: "닫기",
  });
};

  return (
    <PageWrapper>
      {isLoading && (
            <SpinnerOverlay>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                <HashLoader color="#c9f529" size={60} />
                <div
                style={{
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "#FFF",
                    fontFamily: "'Segoe UI', 'Pretendard', 'Noto Sans KR', sans-serif",
                    transition: "opacity 0.3s ease",
                    letterSpacing: "0.3px",
                    textAlign: "center"
                }}
                >
                {message}
                </div>
            </div>
            </SpinnerOverlay>
      )}
      <Grid>
        <CardWrapper>
          <ChartTitle>👤 성비 통계</ChartTitle>
          <Card><Pie data={genderPieData} /></Card>
        </CardWrapper>

        <CardWrapper>
          <ChartTitle>👥 회원 통계</ChartTitle>
          <Card>
            <Bar data={memberBarData} options={barOptions} />
          </Card>
        </CardWrapper>

        <CardWrapper>
          <ChartTitle>🧾 게스트 통계</ChartTitle>
          <Card>
            <Bar data={guestBarData} options={barOptions} />
          </Card>
        </CardWrapper>
      </Grid>

      <Grid>
        <CardWrapper>
        <ChartTitle>
            <ChartEmoji>🏆</ChartEmoji>
            이벤트 최다 참석자
        </ChartTitle>
        {mostAttendantMember.map((member, index) => (
            <MemberCard key={index} onClick={() => handleCardClick(member, "event", index)}>
            <NameRow>
                <Medal>{medalEmojis[index]}</Medal>
                <Name>{member.userName}</Name>
            </NameRow>
            <SubInfo>{member.attendanceCount}회</SubInfo>
            </MemberCard>
        ))}
        </CardWrapper>
        <CardWrapper>
        <ChartTitle>
            <ChartEmoji>🥎</ChartEmoji>
            게임 최다 참가자
        </ChartTitle>
        {mostManyGamesMember.map((member, index) => (
            <MemberCard key={index} onClick={() => handleCardClick(member, "game", index)}>
            <NameRow>
                <Medal>{medalEmojis[index]}</Medal>
                <Name>{member.userName}</Name>
            </NameRow>
            <SubInfo>{member.totalGames}회</SubInfo>
            </MemberCard>
        ))}
        </CardWrapper>

        <CardWrapper>
        <ChartTitle>
            <ChartEmoji>🥎</ChartEmoji>
            득점왕
        </ChartTitle>
        {mostWinnerMember.map((member, index) => (
            <MemberCard key={index} onClick={() => handleCardClick(member, "score", index)}>
            <NameRow>
                <Medal>{medalEmojis[index]}</Medal>
                <Name>{member.userName}</Name>
            </NameRow>
            <SubInfo>{member.totalScore}점</SubInfo>
            </MemberCard>
        ))}
        </CardWrapper>
    </Grid>
      <CardWrapper>
        <ChartTitle>💡 AI 회원관리 보고서</ChartTitle>
        <MarkdownBox>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{gptMarkDown}</ReactMarkdown>
        </MarkdownBox>
      </CardWrapper>
    </PageWrapper>
  );
};

export default MemberReportPage;
