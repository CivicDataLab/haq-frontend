import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from 'lib/media';

const HomeCard = ({ dataset }) => {
  return (
    <CardWrapper className="container">
      {dataset.map((item, index) => {
        return (
          <Link key={`dataCard-${index}`} href={`/${item.link}`} passHref>
            <Card>
              <ImageContainer>
                <Image
                  src={getStrapiMedia(item.src.url)}
                  alt=""
                  width={99.64}
                  height={99.64}
                />
              </ImageContainer>
              <CardContent>
                <Tag>{item.tag}</Tag>
                <h4>{item.title}</h4>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </CardWrapper>
  );
};

export default HomeCard;

const CardWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  & > * {
    flex-basis: calc(50% - 24px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > * {
      flex-basis: calc(100% - 12px);
    }
    gap: 12px;
  }
`;

const Card = styled.a`
  border: 1px solid #f2eff2;
  border-radius: 12px;
  background: #fff;
  padding: 17px;
  display: flex;
  text-decoration: none;

  @media (max-width: 600px) {
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  place-items: center;
  background: #ffdddb;
  border-radius: 6px;
  height: 112px;
  min-width: 112px;
`;

const CardContent = styled.div`
  padding-left: 16px;
  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    margin-top: 16px;
  }
`;

const Tag = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0px 0px 12px 0px;
  background: var(--flamingo-03, #bb4561);
  color: var(--text-dark-bg-high-emphasis, #fff);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
`;