import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import securedAPI from "../../Axios/SecuredAPI";
import Swal from "sweetalert2";
import NotificationModalFactory from "./NotificationModalFactory";

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
  font-size: 1rem;
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

const NotificationPage = () => {
  const userId = sessionStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  const handleNotificationClick = (noti) => {
    console.log("noti:",noti);
    setSelectedNotification(noti);
    console.log("selectedNotification", selectedNotification);

  };
  const closeModal = () => {
    setSelectedNotification(null);
  };
    
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await securedAPI.get(`/api/notification/all?userId=${userId}`);
      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.error("🔔 전체 알림 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id) => {
    try {
      await securedAPI.patch(`/api/notification/read?notificationId=${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("읽음 처리 실패", err);
    }
  };
  const handleApprove = async (noti) => {
    try {
      await securedAPI.post(`/api/membership/join/approve`, {
        userId: noti.referenceId,
        clubId: noti.targetId
      });
      Swal.fire("가입 승인 완료!", "해당 유저가 가입되었습니다.", "success");
      await deleteNoti(noti);
      setSelectedNotification(null);
    } catch (err) {
      Swal.fire("에러 발생", "가입 승인 중 문제가 발생했습니다.", "error");
    }
  };
  
  const handleReject = async (noti) => {
    try {
      await securedAPI.post(`/api/membership/join/reject`, {
        userId: noti.referenceId,
        clubId: noti.targetId
      });
      Swal.fire("가입 거절 처리됨", "해당 유저의 요청을 거절했습니다.", "info");
      await deleteNoti(noti);
      setSelectedNotification(null);
    } catch (err) {
      Swal.fire("에러 발생", "가입 거절 중 문제가 발생했습니다.", "error");
    }
  };
  
  const deleteNoti = async (noti) =>{
    try{
      await securedAPI.delete(`/api/notification?notificationId=${noti.notificationId}`);
      fetchNotifications();
    }
    catch(err){
      Swal.fire("에러 발생", "가입 거절 중 문제가 발생했습니다.", "error");
    }
  }
  
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

      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <NotificationList>
          {notifications.length === 0 ? (
            <div>알림이 없습니다.</div>
          ) : (
            notifications.map((noti) => (
              <NotificationCard key={noti.notificationId} read={noti.read} onClick={() => handleNotificationClick(noti)}>
              <CloseButton onClick={() => handleMarkAsRead(noti.notificationId)} />
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
      )}
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
