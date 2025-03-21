import React from "react";
import styled from "styled-components";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 80px;
  height: 100vh;
  background: #2c2f36;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const IconWrapper = styled.div`
  color: #fff;
  font-size: 24px;
  margin: 20px 0;
  cursor: pointer;
  &:hover {
    color: #8271FF;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <IconWrapper><FaHome /></IconWrapper>
      <IconWrapper><FaUsers /></IconWrapper>
      <IconWrapper><FaCog /></IconWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
