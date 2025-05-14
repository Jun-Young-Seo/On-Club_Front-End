// LandingPage.jsx
import React from 'react';
import styled from 'styled-components';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
const AppWrapper = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
`;

const LandingPage = () => {
  return (
    <AppWrapper>
      <SectionOne id="section-1" />
      <SectionTwo id="section-2"  />
      <SectionThree id="section-3" />
    </AppWrapper>
  );
};

export default LandingPage;
