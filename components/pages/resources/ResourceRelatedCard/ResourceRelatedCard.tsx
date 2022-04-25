import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ResourceRelatedCard: React.FC<{ data: any; key: string; }> = ({ data, key }) => {
  return (
      <Card key={`card__${key}`}>
        <CardImage>
          <Image
            src={data.svg}
            width={100}
            height={80}>
          </Image>
        </CardImage>
        <CardContent >
          <p>
            {data.title}
          </p>
          <small>
            {data.content}
          </small>
        </CardContent>
      </Card>
  )
};

export default ResourceRelatedCard;

const Card = styled.div`
  display:flex;
  border: var(--border-1);
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  background:#fff;
  flex-basis:48.5%;
  
  @media(max-width:1116px){
      flex-basis:47%;
  }
  @media(max-width:680px){
    flex-basis:100%;
}
`;

const CardImage = styled.div`
  padding:23px 20px 18px 24px;
  border-right: var(--border-2);
`;

const CardContent = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding-left:24px;

  p {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    color:var( --text-light-high);
  }

  small {
    font-weight: var(--font-weight-light);
    font-size: 16px;
    line-height: 22px;
    color:var( --text-light-high);
 
  }
`;
