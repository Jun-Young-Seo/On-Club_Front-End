import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Header</Title>
    </HeaderContainer>
  );
};

export default Header;
