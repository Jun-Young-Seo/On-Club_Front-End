import React from "react";
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
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// 하드코딩된 샘플 데이터
const mockData = {
  howManyMembers: 21,
  howManyMembersBetweenOneMonth: 22,
  howManyAccumulatedGuests: 4,
  howManyGuestsBetweenOneMonth: 0,
  maleMembers: 9,
  femaleMembers: 13,
  mostAttendantMember: {
    userName: "ABCD12543",
    userTel: "010-1234-56738",
    region: "서울특별시",
    gender: "FEMALE",
    birthDate: "2000-01-01",
    career: 1
  },
  mostManyGamesMember: {
    userName: "ABCD124",
    userTel: "010-1235-5678",
    region: "서울특별시",
    gender: "FEMALE",
    birthDate: "2000-01-01",
    career: 1
  }
};

const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
  font-family: "Segoe UI", sans-serif;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemberCard = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  font-family: "Segoe UI", "Pretendard", "Noto Sans KR", sans-serif;
`;

const Label = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
  white-space: nowrap;
`;

const Value = styled.div`
  color: #4b5563;
  font-size: 0.95rem;
  text-align: right;
  flex: 1;
  word-break: break-word;
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

const MemberReportPage = () => {
  const {
    howManyMembers,
    howManyMembersBetweenOneMonth,
    howManyAccumulatedGuests,
    howManyGuestsBetweenOneMonth,
    maleMembers,
    femaleMembers,
    mostAttendantMember,
    mostManyGamesMember
  } = mockData;

  const genderPieData = {
    labels: ["남성 회원", "여성 회원"],
    datasets: [
      {
        data: [maleMembers, femaleMembers],
        backgroundColor: ["#60a5fa", "#f472b6"]
      }
    ]
  };

  const memberBarData = {
    labels: ["누적 회원", "1개월간 신규 회원"],
    datasets: [
      {
        label: "회원 수",
        data: [howManyMembers, howManyMembersBetweenOneMonth],
        backgroundColor: ["#4f46e5", "#a78bfa"]
      }
    ]
  };

  const guestBarData = {
    labels: ["누적 게스트", "1개월간 게스트"],
    datasets: [
      {
        label: "게스트 수",
        data: [howManyAccumulatedGuests, howManyGuestsBetweenOneMonth],
        backgroundColor: ["#10b981", "#6ee7b7"]
      }
    ]
  };

  const gptMemberReport = `
## 👥 회원 활동 분석

- 현재 클럽의 **총 정회원 수는 21명**이며, 지난 한 달 동안 **신규 가입자는 22명**, **게스트 방문은 0명**이었습니다.
- 전체 회원 중 **여성 회원이 13명**, **남성 회원이 9명**으로 **여성 비율이 더 높습니다**.
- 이달의 **최다 이벤트 참석자**는 \`ABCD12543\`님이며, **게임 최다 참가자**는 \`ABCD124\`님입니다.

## 📌 운영 인사이트

- 최근 한 달간 회원 수가 급격히 증가하였으나, 게스트 유입이 없었습니다. **초대 기반의 게스트 활동을 활성화**하면 신규 가입 전환율을 높일 수 있습니다.
- 성비 불균형은 향후 **혼성 게임 또는 팀 구성에 영향을 줄 수** 있으므로, 이를 고려한 매칭 시스템 개선이 필요합니다.
- 활동성이 높은 핵심 회원을 중심으로 **서브 리더 또는 소그룹 리더 제도 도입**을 검토해 보세요.

## ✅ 다음 달 운영 제안

- **게스트 초청 이벤트 개최**를 통해 외부 유입을 늘리고, 정회원으로의 전환을 유도해 보세요.
- 활동 데이터 기반으로 **비활동 회원 리마인드 메시지 전송**을 통해 출석률을 높일 수 있습니다.
`;

const MarkdownBox = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &.markdown-body {
    font-size: 1rem;
    line-height: 1.6;

    h2 {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    h2 + ul {
      margin-top: 0 !important;
    }
}
`;
  return (
    <PageWrapper>
      <Grid>
        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>👤</ChartEmoji>
            성비 통계
          </ChartTitle>
          <Card>
            <Pie data={genderPieData} options={{ responsive: true }} />
          </Card>
        </CardWrapper>

        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>👥</ChartEmoji>
            회원 통계
          </ChartTitle>
          <Card>
            <Bar
              data={memberBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </Card>
        </CardWrapper>

        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>🧾</ChartEmoji>
            게스트 통계
          </ChartTitle>
          <Card>
            <Bar
              data={guestBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </Card>
        </CardWrapper>
      </Grid>

      <Grid>
        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>🏆</ChartEmoji>
            이벤트 최다 참석자
          </ChartTitle>
          <MemberCard>
                <InfoRow>
                    <Label>👤 이름</Label>
                    <Value>{mostManyGamesMember.userName}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>📞 전화번호</Label>
                    <Value>{mostManyGamesMember.userTel}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>📍 지역</Label>
                    <Value>{mostManyGamesMember.region}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🚻 성별</Label>
                    <Value>{mostManyGamesMember.gender === "FEMALE" ? "여성" : "남성"}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🎂 생년월일</Label>
                    <Value>{mostManyGamesMember.birthDate}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🎾 구력</Label>
                    <Value>{mostManyGamesMember.career}년</Value>
                </InfoRow>
            </MemberCard>

          
        </CardWrapper>

        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>🥇</ChartEmoji>
            게임 최다 참가자
          </ChartTitle>
            <MemberCard>
            <InfoRow>
                <Label>👤 이름</Label>
                <Value>{mostManyGamesMember.userName}</Value>
            </InfoRow>
            <InfoRow>
                <Label>📞 전화번호</Label>
                <Value>{mostManyGamesMember.userTel}</Value>
            </InfoRow>
            <InfoRow>
                <Label>📍 지역</Label>
                <Value>{mostManyGamesMember.region}</Value>
            </InfoRow>
            <InfoRow>
                <Label>🚻 성별</Label>
                <Value>{mostManyGamesMember.gender === "FEMALE" ? "여성" : "남성"}</Value>
            </InfoRow>
            <InfoRow>
                <Label>🎂 생년월일</Label>
                <Value>{mostManyGamesMember.birthDate}</Value>
            </InfoRow>
            <InfoRow>
                <Label>🎾 구력</Label>
                <Value>{mostManyGamesMember.career}년</Value>
            </InfoRow>
            </MemberCard>

        </CardWrapper>
        <CardWrapper>
          <ChartTitle>
            <ChartEmoji>🏆</ChartEmoji>
            이 달의 득점왕
          </ChartTitle>
          <MemberCard>
                <InfoRow>
                    <Label>👤 이름</Label>
                    <Value>{mostManyGamesMember.userName}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>📞 전화번호</Label>
                    <Value>{mostManyGamesMember.userTel}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>📍 지역</Label>
                    <Value>{mostManyGamesMember.region}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🚻 성별</Label>
                    <Value>{mostManyGamesMember.gender === "FEMALE" ? "여성" : "남성"}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🎂 생년월일</Label>
                    <Value>{mostManyGamesMember.birthDate}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>🎾 구력</Label>
                    <Value>{mostManyGamesMember.career}년</Value>
                </InfoRow>
            </MemberCard>
        </CardWrapper>
              </Grid>
                <CardWrapper>
                <ChartTitle>
                    <ChartEmoji>💡</ChartEmoji>
                    GPT 인사이트 보고서
                </ChartTitle>
                <ReportBox>
                    <MarkdownBox className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {gptMemberReport}
                    </ReactMarkdown>
                    </MarkdownBox>
                </ReportBox>
                </CardWrapper>
        </PageWrapper>
  );
};

export default MemberReportPage;
