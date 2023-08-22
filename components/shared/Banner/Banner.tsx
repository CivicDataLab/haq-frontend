import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from 'components/actions';

const Banner = ({ details }) => {
  return (
    <Wrapper
      className="container"
      style={{ marginTop: '40px' }}
    >
      <BannerComp style={{ backgroundColor: details.bgColor }}>
        <Content>
          <h3>{details.main}</h3>
          <h4>{details.sub}</h4>
          <Button
            href={details.btnLink}
            size="sm"
            bg={details.bgBtn}
            className="button"
          >
            {details.button}
          </Button>
        </Content>
        <figure>
          <Image
            src={details.imgSrc}
            alt={details.main}
            layout="fixed"
            height={180}
            width={230}
          />
        </figure>
      </BannerComp>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div``;

const BannerComp = styled.section`
  display: flex;
  padding: 40px 104px 0 104px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px;
    padding-bottom: 0;
  }

  figure {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;

const Content = styled.div`
  padding-right: 40px;
  width: clamp(250px, 100%, 700px);

  h3 {
    font-size: 22px;
    font-weight: 500;
  }

  h4 {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-light-bg-medium-emphasis, rgba(0, 0, 0, 0.6));
  }

  .button {
    margin-top: 24px;
    display: inline-flex;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 20px;
  }
`;
