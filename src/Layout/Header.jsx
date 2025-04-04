import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import securedAPI from "../Axios/SecuredAPI";

// ─── Styled Components ───
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 2vh 5%;
  background: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  flex-shrink: 0;
  min-width: 150px;
`;

const LogoIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #ff3d00, #ff9100, #ffeb3b);
  border-radius: 4px;
  margin-right: 8px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-grow: 0.9;
  justify-content: center;
  gap: 3vw;

  a {
    text-decoration: none;
    color: black;
    font-size: 16px;

    &:hover {
      color: #3498db;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 1vw;
  min-width: 160px;
  position: relative;
`;

const AuthButton = styled.button`
  background: ${(props) => (props.primary ? "transparent" : "#3498db")};
  color: ${(props) => (props.primary ? "black" : "white")};
  border: ${(props) => (props.primary ? "none" : "2px solid #3498db")};
  padding: 0.8vh 2vw;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.primary ? "#f2f2f2" : "#2980b9")};
  }
`;

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const BellIcon = styled(FiBell)`
  font-size: 30px;
  cursor: pointer;
  color: #333;
`;

const Badge = styled.div`
  position: absolute;
  top: -7px;
  right: -13px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: bold;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  width: 280px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  z-index: 200;
  padding: 0.8rem 1rem;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;

const NotificationItem = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
`;

const NotificationMessage = styled.div`
  font-size: 0.88rem;
  color: #444;
`;

const NotificationMeta = styled.div`
  font-size: 0.75rem;
  color: #888;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 6px;
  right: 4px;
  font-size: 18px;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;

const ViewAllButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.6rem 0;
  border: none;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const EmojiIcon = styled.span`
  font-size: 1.7rem;
`;

// ─── Component ───
const Header = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [notifications, setNotifications] = useState([]);
  const [showNoti, setShowNoti] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const unreadNotifications = notifications.filter(n => !n.read);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowNoti(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await securedAPI.get(`/api/notification/all?userId=${userId}`);
      const notis = Array.isArray(res.data) ? res.data : [];
      setNotifications(notis);
    } catch (err) {
      console.error("🔔 알림 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await securedAPI.patch(`/api/notification/read?notificationId=${notificationId}`);
      fetchNotifications();
    } catch (err) {
      console.error("알림 읽음 처리 실패", err);
    }
  };

  const getEmojiByType = (type) => {
    const emojiMap = {
      JOIN_REQUEST: "🙋🏻",
      APPROVED: "✅",
      REJECTED: "❌",
      KICKED: "🚫",
      EVENT_ATTENDANCE: "📅",
      COMMENT_REQUEST: "📝",
      NOTICE: "🔔",
      SYSTEM: "💻",
    };
    return <EmojiIcon>{emojiMap[type] || "ℹ️"}</EmojiIcon>;
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => navigate("/clubs")}>
        <LogoIcon />
        On<strong>-Club</strong>
      </LogoContainer>

      <NavLinks>
        <Link to="/about">menu1</Link>
        <Link to="/">Features</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/team">Team</Link>
      </NavLinks>

      <AuthContainer>
        {userId && (
          <NotificationWrapper>
            <BellIcon onClick={() => setShowNoti(!showNoti)} />
            {unreadNotifications.length > 0 && <Badge>{unreadNotifications.length}</Badge>}

            {showNoti && (
              <NotificationDropdown ref={dropdownRef}>
                <DropdownHeader>
                  <span>알림</span>
                  <RefreshButton onClick={fetchNotifications} disabled={loading}>🔄</RefreshButton>
                </DropdownHeader>

                {loading ? (
                  <div style={{ padding: "1rem" }}>불러오는 중...</div>
                ) : unreadNotifications.length === 0 ? (
                  <div style={{ padding: "1rem" }}>알림이 없습니다.</div>
                ) : (
                  <>
                    {unreadNotifications.map((noti) => (
                      <NotificationItem key={noti.notificationId}>
                        <CloseButton onClick={() => handleMarkAsRead(noti.notificationId)} />
                        <NotificationTitle>
                          {getEmojiByType(noti.type)} {noti.title}
                        </NotificationTitle>
                        <NotificationMessage>{noti.message}</NotificationMessage>
                        <NotificationMeta>
                          {noti.sender} · {new Date(noti.createdAt).toLocaleString()}
                        </NotificationMeta>
                      </NotificationItem>
                    ))}
                  </>
                )}
                  <ViewAllButton onClick={() => navigate("/notifications")}>🔎 전체보기</ViewAllButton>
              </NotificationDropdown>
            )}
          </NotificationWrapper>
        )}

        {userId ? (
          <AuthButton onClick={() => {
            sessionStorage.removeItem("userId");
            navigate("/");
          }}>로그아웃</AuthButton>
        ) : (
          <>
            <AuthButton primary onClick={() => navigate("/login")}>Sign In</AuthButton>
            <AuthButton onClick={() => navigate("/signup")}>Register</AuthButton>
          </>
        )}
      </AuthContainer>
    </HeaderContainer>
  );
};

export default Header;
