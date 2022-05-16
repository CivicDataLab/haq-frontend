import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { cards } from 'data/cardsdata/cardlist';

const CatalogCard = () => {
  return (
    <Wrapper>
      {cards.map((card, index) => {
        return (
          <CardContainer key={`cardcatalog-${index}`}>
            <Link href={`/${card.link}`} passHref>
              <div>
                <CardImage>
                  <Image src={card.src} alt="" width={114} height={114} />
                </CardImage>
                <CardContent>
                  <h4>{card.title}</h4>
                  <small>{card.content}</small>
                </CardContent>
              </div>
            </Link>
          </CardContainer>
        );
      })}
    </Wrapper>
  );
};

export default CatalogCard;

const Wrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 32px;
`;

const CardContainer = styled.div`
  background-color: white;
  min-height: 408px;
  border-radius: 12px;
  border-radius: 1px solid #f7fdf9;
  padding: 16px;
  border: var(--border-1);
  cursor: pointer;

  @media screen and (max-width: 719px) {
    width: 100%;
  }
`;

const CardImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffdddb;
  border-radius: 6px;
  height: 200px;
`;

const CardContent = styled.div`
  padding-top: 16px;
  h4 {
    font-style: normal;
    font-weight: var(--font-weight-medium);
    font-size: 18px;
    padding-bottom: 6px;
  }
  small {
    font-weight: 300;
    font-size: 16px;
  }
`;
