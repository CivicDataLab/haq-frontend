import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from 'components/actions';
import { Heading } from 'components/layouts/Heading';
import { useWindowSize } from 'utils/hooks';

const Banner = ({ details }) => {
  const { width } = useWindowSize();

  return (
    <div style={{ marginTop: '40px' }}>
      <BannerComp style={{ backgroundColor: details.bgColor }}>
        <Content>
          <Heading as="h2" variant="banner">
            {details.main}
          </Heading>
          <Heading as="h5" variant="h5" mt="8px">
            {details.sub}
          </Heading>
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
            height={width > 600 ? 180 :131}
            width={width > 600 ? 230 : 138}
          />
        </figure>
      </BannerComp>
    </div>
  );
};

export default Banner;

const Wrapper = styled.div``;

const BannerComp = styled.section`
  display: flex;
  padding: 40px 80px 0 80px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08); 
  
  @media (max-width: 768px) {
    padding: 16px 0 0 16px;
  }

  figure {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const Content = styled.div`
  padding-right: 40px;
  width: clamp(250px, 100%, 700px);

  .button {
    margin-top: 16px;
    display: inline-flex;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 8px;
  }
`;
