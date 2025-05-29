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
import refreshImage from "../assets/images/refresh.png";

// ─── Styled Components ───
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 2vh 5vw;
  background: white;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 3vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8vh;
  font-weight: bold;
  color: black;
  cursor: pointer;
  flex-shrink: 0;
  min-width: 15vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


const LogoIcon = styled.div`
  width: 5vh;
  height: 5vh;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  border-radius: 0.5vh;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-grow: 0.85;
  justify-content: center;
  gap: 5vw;

  a {
    position: relative;
    text-decoration: none;
    color: black;
    font-size: 2.0vh;
    font-weight: 600;
    transition: color 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5vh;
      width: 100%;
      height: 0.2vh;
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
  gap: 1.5vw;
  min-width: 16vw;
  position: relative;
`;

const AuthButton = styled.button`
  background: ${(props) => (props.primary ? "transparent" : "#7C3AED")};
  color: ${(props) => (props.primary ? "black" : "white")};
  border: 0.3vh solid #7C3AED;
  padding: 1vh 2.5vh;
  border-radius: 50vh;
  font-size: 1.6vh;
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
  font-size: 3vh;
  cursor: pointer;
  color: #333;
`;

const Badge = styled.div`
  position: absolute;
  top: -0.5vh;
  right: -0.7vw;
  background: red;
  color: white;
  font-size: 1.2vh;
  padding: 0.3vh 0.6vh;
  border-radius: 50%;
  font-weight: bold;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 4vh;
  right: 0;
  width: 30vw;
  max-height: 30vh;
  overflow-y: auto;
  background: white;
  border: 0.1vh solid #ddd;
  border-radius: 1vh;
  box-shadow: 0 0.4vh 1vh rgba(0, 0, 0, 0.1);
  z-index: 200;
  padding: 1vh 2vh;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh 2vh;
  font-weight: bold;
  align-items : center;
  border-bottom: 0.1vh solid #eee;
`;
const RefreshButton = styled.button`
  background: rgba(0, 0, 0, 0.03);
  border: none;
  border-radius: 6px;
  padding: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s;

  img {
    width: 1.5vw;
    height: 1.5vw;
    transition: transform 0.4s ease;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);

    img {
      transform: rotate(90deg); /* 회전 애니메이션 */
    }
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;

    img {
      transform: none;
    }
  }
`;


const NotificationItem = styled.div`
  padding: 1vh 0;
  border-bottom: 0.1vh solid #eee;
  font-size: 1.4vh;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.8vh;
  font-size: 1.6vh;
`;

const NotificationMessage = styled.div`
  font-size: 1.4vh;
  color: #444;
`;

const NotificationMeta = styled.div`
  font-size: 1.2vh;
  color: #888;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 0.6vh;
  right: 0.4vh;
  font-size: 1.8vh;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #e74c3c;
  }
`;

const ViewAllButton = styled.button`
  margin-top: 1vh;
  width: 100%;
  padding: 1vh 0;
  border: none;
  background-color: #f5f5f5;
  border-radius: 1vh;
  font-weight: bold;
  font-size: 1.4vh;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const EmojiIcon = styled.span`
  font-size: 2vh;
`;

const LogoFont = styled.img`
  height: 2vh;
  margin-left: 1vh;
  object-fit: contain;
  vertical-align: middle;
`;

const StyledNavLink = styled.span`
  position: relative;
  text-decoration: none;
  color: black;
  font-size: 1.8vh;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover::after {
    transform: scaleX(1);
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.3vh;
    width: 100%;
    height: 0.2vh;
    background-color: #2563EB;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

const MyPageLink = styled(StyledNavLink)`
  display: inline-flex;
  align-items: center;

  &::after {
    bottom: 0.4vh;
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
      <NavLinks>
        <Link to="/tour">기능 둘러보기</Link>
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
      </NavLinks>

      <AuthContainer>
        {userId && (
          <>
              <MyPageLink onClick={() => navigate(`/mypage/${userId}`)}>마이페이지</MyPageLink>

          <NotificationWrapper>
            <BellIcon onClick={() => setShowNoti(!showNoti)} />
            {unreadNotifications.length > 0 && <Badge>{unreadNotifications.length}</Badge>}

            {showNoti && (
              <NotificationDropdown ref={dropdownRef}>
                <DropdownHeader>
                    <div>알림</div>
                  <RefreshButton onClick={fetchNotifications} disabled={loading}>
                    <img src={refreshImage} alt="새로고침" width="20" height="20" />
                  </RefreshButton>
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
          </>
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
