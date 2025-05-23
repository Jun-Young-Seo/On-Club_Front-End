import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import logoImage from "../../assets/images/cute_logo_2.svg";

import { COLOR_PALETTE, LOADING_BUDGET_MESSAGES } from "../../Constants/Default";
import securedAPI from "../../Axios/SecuredAPI";
import MemberReportPage from "./MemberReportPage";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
  font-family: "Segoe UI", sans-serif;
`;

const LogoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem 2.5rem;
  background-color: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  margin: 0 auto 4rem;
`;


const LogoImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 1rem;
`;

const LogoText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  font-family: "Segoe UI", "Pretendard", "Noto Sans KR", sans-serif;
  text-align: center;
  padding : 0.2rem;
`;


const TabBar = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0 2rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  background-color: ${(props) => (props.active ? "#4f46e5" : "#e5e7eb")};
  color: ${(props) => (props.active ? "#fff" : "#1f2937")};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
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

const ChartEmoji = styled.div`
  font-size: 2.2rem;
  line-height: 1;
//   margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReportBox = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 1rem;
  color: #374151;
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

    h2 {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    h2 + ul {
      margin-top: 0 !important;
    }
`;

const BudgetReportPage = () => {
  const [activeTab, setActiveTab] = useState("budget");
  const {clubId} = useParams();
  const [incomeExpenseData, setIncomeExpenseData] = useState({ income: 0, expense: 0 });
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState([]);
  const [gptReport, setGptReport] = useState("");
  const [isLoading, setIsLoading] = useState(true);
//   const [dotCount, setDotCount] = useState(0);
  const [yearMonthText, setYearMonthText] = useState("");
  const [message, setMessage] = useState(LOADING_BUDGET_MESSAGES[0]);

useEffect(() => {
  const fetchClubReports = async () => {
    setIsLoading(true);
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    setYearMonthText(`${year}년 ${month-1}월 보고서입니다`);

    try {
      const budgetPromise = securedAPI.get(`/api/report/budget/data?clubId=${clubId}&year=${year}&month=${month}`);
      const gptPromise = securedAPI.get(`/api/report/budget/analyze?clubId=${clubId}&year=${year}&month=${month}`);
        
      const [budgetRes, gptRes] = await Promise.all([budgetPromise, gptPromise]);

      const { totalIncome, totalExpense, categorySummaries } = budgetRes.data;
      const incomes = categorySummaries.filter(c => c.amount > 0);
      const expenses = categorySummaries.filter(c => c.amount < 0);

      setIncomeExpenseData({
        income: totalIncome,
        expense: Math.abs(totalExpense),
      });

      setIncomeCategories(incomes.map(c => ({ label: c.category, value: c.amount })));
      setCategoryBudgets(expenses.map(c => ({ label: c.category, value: Math.abs(c.amount) })));

      setGptReport(gptRes.data);

    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchClubReports();
}, [clubId]);

useEffect(() => {
  const messageTimer = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * LOADING_BUDGET_MESSAGES.length);
    setMessage(LOADING_BUDGET_MESSAGES[randomIndex]); 
  }, 1500);


  return () => {
    clearInterval(messageTimer);
  };
}, []);


const getBarChartData = () => ({
  labels: ["수입", "지출"],
  datasets: [
    {
      label: "금액(원)",
      data: [incomeExpenseData.income, incomeExpenseData.expense],
      backgroundColor: ["#4f46e5", "#f87171"],
    }
  ]
});

const getPieChartData = (categories, palette) => {
  const colors = categories.map((_, i) => palette[i % palette.length]);
  return {
    labels: categories.map(c => c.label),
    datasets: [{
      data: categories.map(c => c.value),
      backgroundColor: colors,
    }]
  };
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
      beginAtZero: true,
    },
  },
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
      <TabBar>
        <TabButton active={activeTab === "budget"} onClick={() => setActiveTab("budget")}>예산 보고서</TabButton>
        <TabButton active={activeTab === "member"} onClick={() => setActiveTab("member")}>회원 보고서</TabButton>
      </TabBar>
        <LogoHeader>
            <LogoImage src={logoImage} alt="클럽 로고" />
            <LogoText>{yearMonthText}</LogoText>
            <LogoText>지난 달의 데이터를 모아 정리했어요!</LogoText>
        </LogoHeader>


      {activeTab === "budget" ? (
        <>
          <Grid>
            <CardWrapper>
                <ChartTitle>
                    <ChartEmoji>📊</ChartEmoji>
                     수입과 지출
                     </ChartTitle>
                <Card>
                    <Bar data={getBarChartData()} options={barOptions} />
                </Card>
                </CardWrapper>

                <CardWrapper>
                <ChartTitle>
                    <ChartEmoji>💰</ChartEmoji>
                    수입 분석
                     </ChartTitle>
                <Card>
                    <Pie data={getPieChartData(incomeCategories, COLOR_PALETTE.slice(0, incomeCategories.length))} />
                </Card>
                </CardWrapper>

                <CardWrapper>
                <ChartTitle>
                    <ChartEmoji>💸</ChartEmoji>
                    지출 분석
                </ChartTitle>
                <Card>
                    <Pie data={getPieChartData(categoryBudgets, COLOR_PALETTE.slice(0, incomeCategories.length))} />
                </Card>
                </CardWrapper>
          </Grid>

                <CardWrapper>
                <ChartTitle>
                    <ChartEmoji>💡</ChartEmoji>
                    GPT 인사이트 보고서
                </ChartTitle>
                <ReportBox>
                    <MarkdownBox>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {gptReport}
                    </ReactMarkdown>
                    </MarkdownBox>
                </ReportBox>
                </CardWrapper>

        </>
      ) : (
            <MemberReportPage activeTab={activeTab}/>
        )}
    </PageWrapper>
  );
};

export default BudgetReportPage;
