// ✅ 수정 목적: Chart.js 차트 3개 (Pie, Bar, Bar) 정상 렌더링 + 콘솔 무한 경고 해결 + 로딩 메시지 복구 + Bar 두께 조절 + 카테고리 영역 간격 축소

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

const MemberReportPage = () => {
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
        setHowManyMembers(data.howManyMembers);
        setHowManyMembersBetweenOneMonth(data.howManyMembersBetweenOneMonth);
        setHowManyAccumulatedGuests(data.howManyAccumulatedGuests);
        setHowManyGuestsBetweenOneMonth(data.howManyGuestsBetweenOneMonth);
        setHowManyEventsBetweenOneMonth(data.howManyEventsBetweenOneMonth);
        setMaleMembers(data.maleMembers);
        setFemaleMembers(data.femaleMembers);
        setGptMarkDown(gptRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClubReports();
  }, [clubId]);

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

      <CardWrapper>
        <ChartTitle>💡 GPT 인사이트 보고서</ChartTitle>
        <MarkdownBox>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{gptMarkDown}</ReactMarkdown>
        </MarkdownBox>
      </CardWrapper>
    </PageWrapper>
  );
};

export default MemberReportPage;
