import React from 'react';
import styled from 'styled-components';
import SchemeSelector from './SchemeSelector';
import * as data from 'data/statedata/statedata';
import Image from 'next/image';
import { useWindowSize } from 'utils/hooks';
import MobileSelector from './MobileSelector';
import { Heading } from 'components/layouts/Heading';

const HomeHeader = ({ heading, subheading }) => {
  const { width } = useWindowSize();

  return (
    <Wrapper>
      <HeaderContent className="container">
        <HeaderText>
          <Heading as='h1' variant="h1l" color="#fff">
            {heading}
          </Heading>
          <Heading as='h2' variant="h2l" color="#ffffffb8" mt="24px">
            {subheading}
          </Heading>
          {width > 768 ? (
            <SchemeSelector schemeList={data.obj} />
          ) : (
            <MobileSelector schemeList={data.obj} />
          )}
        </HeaderText>
        <figure>
          <Image
            src="/assets/illustration.svg"
            width={width > 1024 ? 650 : 340}
            height={width > 1024 ? 526 : 426}
            alt=""
          />
        </figure>
      </HeaderContent>
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.div`
  background: var(--color-violet);
  background-image: url('/assets/heroBg.svg');
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 40px;
  }

  figure {
    align-self: flex-end;
    position: absolute;
    right: 0;
    bottom: -96px;
    @media (max-width: 1024px) {
      bottom: -128px;
      transform: translateX(-20%);
    }
  }
`;

const HeaderText = styled.div`
  z-index:1;
  max-width: min(875px,100%)
`;
