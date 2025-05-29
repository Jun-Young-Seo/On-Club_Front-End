import React, { createContext, useState, useEffect, useCallback } from "react";
import securedAPI from "../../Axios/SecuredAPI";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(() => sessionStorage.getItem("userId"));
  const [pollingIntervalId, setPollingIntervalId] = useState(null);

  //  sessionStorage에서 userId가 설정되면 감지하는 로직
  useEffect(() => {
    const interval = setInterval(() => {
      const id = sessionStorage.getItem("userId");
      if (id && id !== userId) {
        setUserId(id);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [userId]);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await securedAPI.get(`/api/notification/all?userId=${userId}`);
      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        setNotifications([]); // 빈 배열 fallback
      }
    } catch (err) {
      console.error("알림 로딩 실패:", err);
    }
  }, [userId]);

  // userId가 설정된 후에만 알림 로딩 + polling 시작
  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    // 폴링 시작
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 10000); // 10초마다

    setPollingIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [userId, fetchNotifications]);

  const markAsRead = async (notificationId) => {
    try {
      await securedAPI.patch(`/api/notification/read?notificationId=${notificationId}`);
      fetchNotifications();
    } catch (err) {
      console.error("읽음 처리 실패", err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await securedAPI.delete(`/api/notification?notificationId=${notificationId}`);
      setNotifications(prev => prev.filter(n => n.notificationId !== notificationId));
      fetchNotifications();
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifications: Array.isArray(notifications) ? notifications.filter(n => !n.read) : [],
        loading,
        fetchNotifications,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
