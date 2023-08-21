import React from 'react';
import styled from 'styled-components';
import SchemeSelector from './SchemeSelector';
import * as data from 'data/statedata/statedata';
import Image from 'next/image';

const HomeHeader = ({ heading, subheading }) => {
  return (
    <Wrapper>
      <HeaderContent className="container">
        <HeaderText>
          <h1> {heading} </h1>
          <h2> {subheading} </h2>
          <SchemeSelector schemeList={data.obj} />
        </HeaderText>
        <BackgroundIllustration>
          <Image
            src="/assets/illustration.svg"
            width={650}
            height={526}
            alt=""
          />
        </BackgroundIllustration>
      </HeaderContent>
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.div`
  background: var(--violet-01-base, #b881c7);
  background-image: url('/assets/bg_illustration.svg');
  background-size: cover;

  > div {
    max-width: 1280px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  min-height: 580px;
  position: relative;
`;

const flexBasisBreakpoints = {
  laptopAndUp: '70%',
  tabletAndUp: '80%',
  mobile: '100%',
};

const HeaderText = styled.div`
  z-index: 1;
  flex-basis: ${flexBasisBreakpoints.laptopAndUp};
  
  @media (min-width: 1100px) and (max-width: 1500px) {
    flex-basis: ${flexBasisBreakpoints.tabletAndUp};
  }
  @media (min-width: 550px) and (max-width: 1100px) {
    flex-basis: ${flexBasisBreakpoints.mobile};
  }

  h1 {
    color: var(--text-dark-bg-high-emphasis, #fff);
    font-size: 40px;
    font-weight: 500;
    line-height: 52px;
  }

  h2 {
    color: var(--text-dark-bg-medium-emphasis, rgba(255, 255, 255, 0.72));
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    margin-top: 24px;
  }
`;

const BackgroundIllustration = styled.div`
  align-self: flex-end;
  position: absolute;
  right: 0;
  bottom: -96px;
`;
