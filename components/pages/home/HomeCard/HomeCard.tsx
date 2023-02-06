import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from 'lib/media';

const HomeCard = ({dataset}) => {
  return (
    <Wrapper>
      <div className="container">
        <CardWrapper>
          <Link href={`/${dataset[0].link}`} passHref>
            <Card>
              <div>
                <CardImage>
                  <Image
                    src={getStrapiMedia(dataset[0].src.url)}
                    alt=""
                    width={420}
                    height={155}
                  />
                </CardImage>
                <CardContent primary={true}>
                  <h4>{dataset[0].title}</h4>
                  <small>{dataset[0].content}</small>
                </CardContent>
              </div>
            </Card>
          </Link>
          <CardContainer>
            {dataset.slice(1).map((item, index) => {
              return (
                <li key={`dataCard-${index}`}>
                  <Link href={`/${item.link}`} passHref >
                    <DataCard>
                      <CardImage primary={true}>
                        <Image
                          src={getStrapiMedia(item.src.url)}
                          alt=""
                          width={99.64}
                          height={99.64}
                        />
                      </CardImage>
                      <CardContent>
                        <h4>{item.title}</h4>
                        <small>{item.content}</small>
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
  padding:17px;
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
  gap:28px;
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
 padding: ${props => props.primary ? '13px 0 0 0' : '0 0 0 10px'};
 h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    padding-bottom:3px;
  }
 small {
  font-weight: 300;
  font-size: 16px;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${props => props.primary ? 5 : 3} ;
 }
`;