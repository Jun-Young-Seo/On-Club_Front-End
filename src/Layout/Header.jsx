import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import securedAPI from "../Axios/SecuredAPI";
import { NotificationContext } from "../User/Notification/NotificationContext";
import logo from "../assets/images/t.png";
import logoFont from "../assets/images/logo.svg";
import Swal from "sweetalert2";

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
  width: 40px;
  height: 40px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  // margin-right: 8px;
`;
const NavLinks = styled.nav`
  display: flex;
  flex-grow: 0.9;
  justify-content: center;
  gap: 5vw;

  a {
    position: relative;
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      // color: #3B82F6;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 2px;
      background-color: #2563EB;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
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
  background: ${(props) => (props.primary ? "transparent" : "#7C3AED")};
  color: ${(props) => (props.primary ? "black" : "white")};
  border: 3px solid #7C3AED;
  padding: 0.6rem 1.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;

  &:hover {
    background: ${(props) => (props.primary ? "#f5f3ff" : "#9F67FF")};
    color: ${(props) => (props.primary ? "#6B21A8" : "white")};
    border-color: #9F67FF;
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
  top: -0.01vh;
  right: -0.7vw;
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
  width: 30vw;
  max-height : 30vh;
  overflow-y : auto;
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

const LogoFont = styled.img`
  height: 22px;
  margin-left: 8px;
  object-fit: contain;
  vertical-align: middle;
`;

const StyledNavLink = styled.span`
  position: relative;
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover::after {
    transform: scaleX(1);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background-color: #2563EB;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

// ─── Component ───
const Header = () => {
  const { unreadNotifications, fetchNotifications, loading } = useContext(NotificationContext);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [showNoti, setShowNoti] = useState(false);
  const dropdownRef = useRef(null);
  

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
      <LogoContainer onClick={() => navigate("/")}>
        <LogoIcon />
        <LogoFont src={logoFont}/>
        </LogoContainer>
        {/* <ImageNavButton onClick={() => navigate("/")}>
  <img src={featuresImg} alt="Features" />
</ImageNavButton> */}

      <NavLinks>
        <Link to="/">기능 둘러보기</Link>
        <StyledNavLink
          onClick={() => {
            if (!userId) {
              Swal.fire({
                icon: 'warning',
                title: '로그인이 필요합니다',
                text: '클럽 만들기는 로그인한 사용자만 이용할 수 있습니다.',
                confirmButtonText: '확인'
              });
            } else {
              navigate("/new/club");
            }
          }}
        >
          클럽 만들기
      </StyledNavLink>
        <Link to="/clubs">클럽 찾기</Link>
        {/* <Link to="/gallery">Gallery</Link>
        <Link to="/team">Team</Link> */}
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
            <AuthButton primary onClick={() => navigate("/login")}>로그인</AuthButton>
            <AuthButton onClick={() => navigate("/signup")}>회원가입</AuthButton>
          </>
        )}
      </AuthContainer>
    </HeaderContainer>
  );
};

export default Header;
