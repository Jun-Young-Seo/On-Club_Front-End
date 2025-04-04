import React, { useEffect, useState } from "react";
import styled from "styled-components";
import securedAPI from "../../Axios/SecuredAPI";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import MembershipEditModal from "./MembershipEditModal";
// ─── Styled Components ───
const Container = styled.div`
  width: 90%;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-size: 14px;
  color: #888;
  border-bottom: 1px solid #eee;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? "#f9f9f9" : "white")};
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const GenderEmoji = styled.span`
  font-size: 0.9rem;
`;

const RoleBadge = styled.div`
  background-color: ${({ $role }) => {
    switch ($role) {
      case "LEADER":
        return "#4682B4";
      case "MANAGER":
        return "#ffa94d";
      case "REGULAR":
        return "#5fbd7b";
      case "INACTIVE":
        return "#ccc";
      default:
        return "#999";
    }
  }};
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: inline-block;
  margin-top: 0.3rem;
`;


const EditButton = styled.button`
  background-color: #ffa502;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: #e67e22;
  }
`;


// ─── Component ───
const MembershipTable = () => {
  const { clubId } = useParams();
  const [memberships, setMemberships] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("joinedAt");

  //수정 모달
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await securedAPI.get(`/api/membership/all-members?clubId=${clubId}`);
        setMemberships(res.data || []);
      } catch (err) {
        console.error("❌ 멤버십 데이터를 불러오지 못했습니다", err);
      }
    };
    fetchMemberships();
  }, [clubId]);

  const filtered = memberships
    .filter(
      (m) =>
        m.userName.includes(searchText) || m.userTel.includes(searchText)
    )
    .sort((a, b) => {
      switch (sortKey) {
        case "joinedAt":
          return new Date(a.joinedAt) - new Date(b.joinedAt); // 빠른 날짜가 앞으로
        case "career":
          return b.career - a.career;
        case "gender":
          return a.gender.localeCompare(b.gender);
        case "role": {
            const rolePriority = {
              LEADER: 1,
              MANAGER: 2,
              REGULAR: 3,
              INACTIVE: 4
            };
            return rolePriority[a.role] - rolePriority[b.role];
          }
        case "attendanceRate":
          const aRate = a.eventCount > 0 ? a.attendanceCount / a.eventCount : 0;
          const bRate = b.eventCount > 0 ? b.attendanceCount / b.eventCount : 0;
          return bRate - aRate;
        default:
          return 0;
      }
    });

  return (
    <Container>
      <TopBar>
        <Title>클럽 회원 목록</Title>
        <Controls>
          <SearchInput
            placeholder="이름 또는 전화번호 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="joinedAt">가입일순</option>
            <option value="career">구력순</option>
            <option value="gender">성별순</option>
            <option value="role">역할순</option>
            <option value="attendanceRate">출석률순</option>
          </Select>
        </Controls>
      </TopBar>
      <Table>
  <thead>
    <tr>
      <TableHeader>이름</TableHeader>
      <TableHeader>역할</TableHeader>
      <TableHeader>성별</TableHeader>
      <TableHeader>경력</TableHeader>
      <TableHeader>가입일</TableHeader>
      <TableHeader>전화번호</TableHeader>
      <TableHeader>출석</TableHeader>
      <TableHeader>지역</TableHeader>
      <TableHeader>생년월일</TableHeader>
    </tr>
  </thead>
  <tbody>
    {filtered.map((member, idx) => (
      <TableRow key={member.membershipId} even={idx % 2 === 0}>
        <TableCell>
          <UserName>{member.userName}</UserName>
        </TableCell>
        <TableCell>
          <RoleBadge $role={member.role}>
            {{
              LEADER: "리더",
              MANAGER: "운영진",
              REGULAR: "정회원",
              INACTIVE: "휴회원",
            }[member.role] || member.role}
          </RoleBadge>
        </TableCell>
        <TableCell>
          <GenderEmoji>
            {member.gender === "FEMALE" ? "여성" : "남성"}
          </GenderEmoji>
        </TableCell>
        <TableCell>{member.career}년차</TableCell>
        <TableCell>{dayjs(member.joinedAt).format("YYYY-MM-DD")}</TableCell>
        <TableCell>{member.userTel}</TableCell>
        <TableCell>
          {member.attendanceCount} / {member.eventCount}
        </TableCell>
        <TableCell>{member.region}</TableCell>
        <TableCell>{dayjs(member.birthDate).format("YYYY-MM-DD")}</TableCell>
        <TableCell>
        <EditButton onClick={() => {
            setSelectedMember(member);
            setIsEditModalOpen(true);
            }}>
            수정
            </EditButton>
        </TableCell>

      </TableRow>
    ))}
  </tbody>
</Table>
{isEditModalOpen && selectedMember && (
  <MembershipEditModal
    member={selectedMember}
    onClose={() => {
      setIsEditModalOpen(false);
      setSelectedMember(null);
    }}
    onSave={() => {
      setIsEditModalOpen(false);
      setSelectedMember(null);
      // 목록 갱신
      securedAPI.get(`/api/membership/all-members?clubId=${clubId}`)
        .then(res => setMemberships(res.data))
        .catch(err => console.error("❌ 멤버십 데이터를 갱신하지 못했습니다", err));
    }}
    onDelete={async (membershipId) => {
      try {
        await securedAPI.delete(`/api/membership/withdraw?membershipId=${membershipId}`);
        Swal.fire({
          icon: "success",
          title: "탈퇴 완료",
          text: "회원이 성공적으로 탈퇴 처리되었습니다.",
          confirmButtonColor: "#5fbd7b"
        });

        setIsEditModalOpen(false);
        setSelectedMember(null);

        // 목록 갱신
        const res = await securedAPI.get(`/api/membership/all-members?clubId=${clubId}`);
        setMemberships(res.data);

      } catch (err) {
        console.error("❌ 탈퇴 실패", err);
        Swal.fire({
          icon: "error",
          title: "탈퇴 실패",
          text: "탈퇴 처리 중 오류가 발생했습니다.",
          confirmButtonColor: "#e74c3c"
        });
      }
    }}
  />
)}


    </Container>
  );
};

export default MembershipTable;
