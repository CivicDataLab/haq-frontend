import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { cards } from 'data/cardsdata/cardlist';

const HomeCard = () => {
  return (
    <Wrapper>
      <div className="container">
        <CardWrapper>
          <Link href="/dataset" passHref>
            <Card>
              <div>
                <CardImage>
                  <Image
                    src="/assets/DataCatalogue.svg"
                    alt=""
                    width={580}
                    height={280}
                  />
                </CardImage>
                <CardContent primary={true}>
                  <h4>All Datasets</h4>
                  <small>It is a long established fact that a reader will be distracted by the readable
                    content of a page when looking at its layout. The point of using Lorem Ipsum is that
                    it has a more-or-less normal distribution of letters.
                  </small>
                </CardContent>
              </div>
            </Card>
          </Link>
          <CardContainer>
            {cards.map((item, index) => {
              return (
                <li key={`dataCard-${index}`}>
                  <Link href={`/${item.link}`} passHref >
                    <DataCard>
                      <CardImage primary={true}>
                        <Image
                          src={item.src}
                          alt=""
                          width={79.64}
                          height={79.64}
                        />
                      </CardImage>
                      <CardContent>
                        <h4>{item.title}</h4>
                        <small>{item.content.substring(0,80)}</small>
                      </CardContent>
                    </DataCard>
                  </Link>
                </li>
              )
            })}
          </CardContainer>
        </CardWrapper>
      </div>
    </Wrapper>
  );
};

export default HomeCard;

type Props = {
  primary?: boolean;
}

const Wrapper = styled.div`
  padding-top:100px;
`

const Card = styled.a`
  display:flex;
  align-items:stretch; 
  background-color: #fff;
  padding: 1.5rem !important;
  border-radius: 12px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  border: 1px solid #f1eef1;
  text-decoration:none;
 `;

const DataCard = styled.a`
  border: 1px solid #F2EFF2;
  box-sizing: border-box;
  border-radius: 12px; 
  background : #fff;
  padding:16px;
  display:flex;
  text-decoration:none;
`;

const CardImage = styled.div<Props>`
  display:flex;
  align-items:center;
  justify-content:center;
  background: #FFDDDB;
  border-radius: 6px;
  height:${props => props.primary ? '112px' : null};
  min-width:${props => props.primary ? '112px' : null};
`;

const CardContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap:24px;
  list-style: none;
`;

const CardWrapper = styled.div`
  display:flex;
  gap:32px; 
  flex-wrap:wrap;

  > * {
    flex-basis:100%;
    flex:300px;
  }
`;

const CardContent = styled.div<Props>`
 padding:${props => props.primary ? '16px 0 0 0' : '0 0 0 10px'};
 h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    padding-bottom:6px;
  }
 small {
  font-weight: 300;
  font-size: 16px;
 }
`;