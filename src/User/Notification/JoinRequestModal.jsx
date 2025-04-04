import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import securedAPI from "../../Axios/SecuredAPI";

// ─── Styled Components ───
const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  width: 500px;
  max-width: 95%;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.8rem;
  text-align: center;
`;

const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #555;
`;

const Value = styled.div`
  font-size: 1rem;
  color: #222;
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  font-weight: bold;
  font-size: 0.95rem;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.type === "approve"
      ? "#5fbd7b"
      : props.type === "reject"
      ? "#e74c3c"
      : "#999"};

  &:hover {
    opacity: 0.9;
  }
`;

// ─── Emoji Components ───
const TitleEmoji = styled.span`
  font-size: 1.9rem;
  margin-right: 8px;
`;

const Emoji = styled.span`
  font-size: 1.4rem;
  margin-right: 6px;
`;

// ─── Component ───
const JoinRequestModal = ({ notification, onApprove, onReject, onClose }) => {
  const userId = notification.referenceId;
//   const clubId = notification.targetId;

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await securedAPI.get(`/api/user/info?userId=${userId}`);
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ 유저 정보 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleApprove = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "가입 요청 승인",
      text: `${userInfo.userName} 님을 승인하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      confirmButtonColor: "#5fbd7b",
      cancelButtonColor: "#aaa",
    });

    if (result.isConfirmed) {
      onApprove(notification);
    }
  };

  const handleReject = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "가입 요청 거절",
      text: `${userInfo.userName} 님의 요청을 거절하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "거절",
      cancelButtonText: "취소",
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#aaa",
    });

    if (result.isConfirmed) {
      onReject(notification);
    }
  };

  const genderEmoji = userInfo?.gender === "FEMALE" ? "👩🏻" : "👨🏻";

  if (loading || !userInfo) {
    return (
      <ModalBackground>
        <ModalContainer>
          <Title>불러오는 중...</Title>
        </ModalContainer>
      </ModalBackground>
    );
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>
          <TitleEmoji>🙋🏻</TitleEmoji>
          가입 요청
        </Title>
        <Subtitle>아래 정보를 확인하고 가입 요청을 처리해주세요.</Subtitle>

        <InfoTable>
          <InfoRow>
            <Label><Emoji>👤</Emoji>이름</Label>
            <Value>{userInfo.userName}</Value>
          </InfoRow>
          <InfoRow>
            <Label><Emoji>📞</Emoji>전화번호</Label>
            <Value>{userInfo.userTel}</Value>
          </InfoRow>
          <InfoRow>
            <Label><Emoji>🚻</Emoji>성별</Label>
            <Value>{genderEmoji} {userInfo.gender === "FEMALE" ? "여자" : "남자"}</Value>
          </InfoRow>
          <InfoRow>
            <Label><Emoji>🎾</Emoji>구력</Label>
            <Value>{userInfo.career}년차</Value>
          </InfoRow>
          <InfoRow>
            <Label><Emoji>📍</Emoji>지역</Label>
            <Value>{userInfo.region}</Value>
          </InfoRow>
        </InfoTable>

        <ButtonRow>
          <ActionButton type="reject" onClick={handleReject}>거절</ActionButton>
          <ActionButton type="close" onClick={onClose}>닫기</ActionButton>
          <ActionButton type="approve" onClick={handleApprove}>승인</ActionButton>
        </ButtonRow>
      </ModalContainer>
    </ModalBackground>
  );
};

export default JoinRequestModal;
