import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from 'lib/media';
import { Heading } from 'components/layouts/Heading';
import { useWindowSize } from 'utils/hooks';

const Card = ({ state, dataset }) => {
  const { width } = useWindowSize();
  return (
    <Wrapper className="container">
      {dataset.map((item, index) => {
        return (
          <Link key={`dataCard-${index}`} href={`/${state}/${item.link}`} passHref>
            <CardItem>
              <figure>
                <Image
                  src={getStrapiMedia(item.src.url)}
                  alt=""
                  width={width > 720 ? 90 :60}
                  height={width > 720 ? 90 :60}
                />
              </figure>
              <CardContent>
                <Tag type={item.type}>{item.tag}</Tag>
                <Heading as='h5' variant='h5l' mt='16px'>{item.title}</Heading>
              </CardContent>
            </CardItem>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  margin-top: 56px;
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

const CardItem = styled.a`
  border: 1px solid #f2eff2;
  border-radius: 12px;
  background: #fff;
  padding: 17px;
  display: flex;
  text-decoration: none;

  figure {
    display: grid;
    place-items: center;
    background: #ffdddb;
    border-radius: 6px;
    height: 112px;
    min-width: 112px;
    @media(max-width:720px){
      height: 72px;
      min-width: 72px;
    }
  }
  
`;

const CardContent = styled.div`
  padding-left: 16px;

  @media(max-width:720px){
     h5 {
      margin-top: 8px;
     }
  }
`;

const Tag = styled.div<{type:string}>`
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0px 0px 12px 0px;
  background: ${(props) =>
    props.type === "budget" ? 'var(--color-sapphire-2)' : 'var(--color-flamingo-2)'};
  color: var(--text-dark-bg-high-emphasis, #fff);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
`;