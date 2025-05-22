import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import securedAPI from "../Axios/SecuredAPI";
import Swal from "sweetalert2";
//React-icons
import { FiHome } from "react-icons/fi";
import { PiMoney } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TiCloudStorageOutline } from "react-icons/ti";
import { TbReport } from "react-icons/tb";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { MdOutlineEmojiEvents } from "react-icons/md";


const SidebarContainer = styled.div`
  width: 10vw; 
  height: 100%;
  background: #fafafa;
  padding: 3vh;
  margin-top:3vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3vh;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);

  padding-top:100px;
`;

const Menu = styled.ul`
  padding:0;
  width: 100%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1.5vh 1vw;
  width: 80%;
  margin: 12px 0;  
  font-size: 0.9vw;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background: ${(props) => (props.active ? "#DDF45B" : "transparent")};
  color: ${(props) => (props.active ? "#000" : "#A3A3A3")};
  border-radius: 1vw;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#DDF45B" : "#e5e7eb")};
  }

`;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [myClubRole, setMyClubRole] = useState("");
  const navigate = useNavigate();
  const {clubId} = useParams();

  const handleNavigation = (menu, path, allowedRoles = null) => {
    if (allowedRoles && !allowedRoles.includes(myClubRole)) {
      Swal.fire({
        icon: "warning",
        title: "접근 권한 없음",
        text: "이 기능은 운영진만 이용할 수 있습니다.",
        confirmButtonColor: "#e74c3c",
      });
      return;
    }
  
    setActiveItem(menu);
    navigate(path);
  };
  
  useEffect(() => {
    const fetchMyRoleInClub = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId || !clubId) return;
  
      try {
        const res = await securedAPI.get(`/api/membership/my-role?userId=${userId}&clubId=${clubId}`);
        console.log(res);
        setMyClubRole(res.data); 
      } catch (err) {
        console.error("내 클럽 권한 조회 실패", err);
      }
    };

    fetchMyRoleInClub();
  }, [clubId]);
  

  return (
    <SidebarContainer>
      <Menu>
        <MenuItem active={activeItem === "home"} onClick={() => handleNavigation("home",`/clubs/${clubId}`)}>
          <FiHome size="1.5vw" />
          홈
        </MenuItem>

        <MenuItem active={activeItem === "budget"} onClick={() => handleNavigation("budget",`/clubs/${clubId}/budget_dashboard`,["MANAGER", "LEADER"])}>
          <PiMoney size="1.5vw" />
          예산관리
        </MenuItem>

        <MenuItem active={activeItem === "members"} onClick={() => handleNavigation("members", `/clubs/${clubId}/membership_detail`,["MANAGER", "LEADER"])}>
          <FaPeopleGroup size="1.5vw" />
          회원관리
        </MenuItem>

        <MenuItem active ={activeItem === 'event'} onClick={() => handleNavigation("event",`/clubs/${clubId}/event`,["MANAGER", "LEADER"])}>
        <MdOutlineEmojiEvents size="1.5vw"/>
          모임관리
        </MenuItem>
        
        {/* <MenuItem active={activeItem === "storage"} onClick={() => setActiveItem("storage")}>
          <TiCloudStorageOutline size="1.5vw" />
          파일 저장소
        </MenuItem> */}

        <MenuItem active={activeItem === "report"} onClick={() => handleNavigation("report",`/clubs/${clubId}/report/budget`,["MANAGER","LEADER"])}>
          <TbReport size="1.5vw" />
          보고서 보기
        </MenuItem>

        {/* <MenuItem active={activeItem === "conference"} onClick={() => setActiveItem("conference")}>
          <MdOutlineRecordVoiceOver size="1.5vw" />
          회의 요약하기
        </MenuItem> */}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
