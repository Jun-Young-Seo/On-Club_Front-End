import React, { useState, useContext } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import securedAPI from "../../Axios/SecuredAPI";
import Swal from "sweetalert2";
import NotificationModalFactory from "./NotificationModalFactory";
import { NotificationContext } from "./NotificationContext";

const PageContainer = styled.div`
  padding: 80px 10%;
`;

const PageTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

const RefreshButton = styled.button`
  font-size: 1.3rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #3498db;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const NotificationCard = styled.div`
  background-color: ${(props) => (props.read ? "#f7f7f7" : "white")};
  border: 1px solid #ddd;
  border-left: 4px solid ${(props) => (props.read ? "#ccc" : "#5fbd7b")};
  padding: 1rem 1.2rem;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.03);
  position: relative;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Emoji = styled.span`
  font-size: 1.6rem;
`;

const Message = styled.div`
  margin-top: 0.3rem;
  font-size: 0.95rem;
  color: #444;
`;

const MetaInfo = styled.div`
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: #888;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 12px;
  right: 10px;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;
const EmptyState = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  border-radius: 12px;
  background: #f9f9f9;
  border: 1px dashed #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const EmptyEmoji = styled.div`
  font-size: 2.5rem;
`;
const NotificationPage = () => {
  const { notifications, fetchNotifications, markAsRead, deleteNotification } = useContext(NotificationContext);

  const [selectedNotification, setSelectedNotification] = useState(null);
  
  const handleNotificationClick = async (noti) => {
    try {
      await markAsRead(noti.notificationId);
      setSelectedNotification(noti);
    } catch (err) {
      Swal.fire("읽기 실패", "알림을 읽는 중 문제가 발생했습니다.", "error");
    }
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };
    

  const handleDeleteButtonClick = async (id) => {
    try {
      await deleteNotification(id);
      Swal.fire("삭제 완료", "알림이 삭제되었습니다.", "success");
    } catch (err) {
      Swal.fire("삭제 실패", "알림을 삭제하는 데 실패했습니다.", "error");
    }
  };

  const handleApprove = async (noti) => {
    try {
      if (noti.type === "JOIN_REQUEST") {
        await securedAPI.post(`/api/membership/join/approve`, {
          userId: noti.referenceId,
          clubId: noti.targetId
        });
        Swal.fire("가입 승인 완료!", "해당 유저가 가입되었습니다.", "success");
  
      } else if (noti.type === "GUEST_REQUEST") {
        await securedAPI.post(`/api/guest/attend/approve`, {
          userId: noti.referenceId,
          eventId: noti.targetId
        });
        Swal.fire("게스트 승인 완료!", "참석 요청을 승인했습니다.", "success");
      }
  
      await deleteNotification(noti.notificationId);
      setSelectedNotification(null);
  
    } catch (err) {
      Swal.fire("에러 발생", "승인 처리 중 문제가 발생했습니다.", "error");
    }
  };
  
  const handleReject = async (noti) => {
    try {
      if (noti.type === "JOIN_REQUEST") {
        await securedAPI.post(`/api/membership/join/reject`, {
          userId: noti.referenceId,
          clubId: noti.targetId
        });
        Swal.fire("가입 거절", "가입 요청을 거절했습니다.", "info");
  
      } else if (noti.type === "GUEST_REQUEST") {
        await securedAPI.post(`/api/guest/attend/reject`, {
          userId: noti.referenceId,
          eventId: noti.targetId
        });
        Swal.fire("게스트 거절", "참석 요청을 거절했습니다.", "info");
      }
  
      await deleteNotification(noti.notificationId);
      setSelectedNotification(null);
  
    } catch (err) {
      Swal.fire("에러 발생", "거절 처리 중 문제가 발생했습니다.", "error");
    }
  };
  


  
  const getEmojiByType = (type) => {
    const map = {
      JOIN_REQUEST: "🙋🏻",
      APPROVED: "✅",
      REJECTED: "❌",
      KICKED: "🚫",
      EVENT_ATTENDANCE: "📅",
      COMMENT_REQUEST: "📝",
      NOTICE: "🔔",
      SYSTEM: "💻",
    };
    return map[type] || "ℹ️";
  };
 
 
  return (
    <PageContainer>
      <PageTitle>
        전체 알림
        <RefreshButton onClick={fetchNotifications}>🔄 새로고침</RefreshButton>
      </PageTitle>
        <NotificationList>
          {notifications.length === 0 ? (
              <EmptyState>
              <EmptyEmoji>📭</EmptyEmoji>
              도착한 쪽지가 없습니다.
            </EmptyState>
          ) : (
            notifications.map((noti) => (
              <NotificationCard key={noti.notificationId} read={noti.read} onClick={() => handleNotificationClick(noti)}>
              <CloseButton onClick={(e) => {
                 e.stopPropagation();
                 handleDeleteButtonClick(noti.notificationId)
                 }} />
                <TitleRow>
                  <Emoji>{getEmojiByType(noti.type)}</Emoji>
                  {noti.title}
                </TitleRow>
                <Message>{noti.message}</Message>
                <MetaInfo>{noti.sender} · {new Date(noti.createdAt).toLocaleString()}</MetaInfo>
              </NotificationCard>
            ))
          )}
        </NotificationList>
          {selectedNotification && (
          <NotificationModalFactory
            notification={selectedNotification}
            onClose={closeModal}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}


    </PageContainer>
  );
};

export default NotificationPage;
