import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ResourceRelatedCard = () => {

  const data = [
    {
      svg: '/assets/dataset.svg',
      title: 'Wiki',
      content: 'Subtitle text - Placeholder'
    },
    {
      svg: '/assets/dataset.svg',
      title: 'All Datasets',
      content: 'Subtitle text - Placeholder'
    },
  ]

  return (
    <div>
      <RelatedCardHeading>
        <div className="heading__text">
          <hr />
          <h4>Other info.</h4>
        </div>
        <div className="heading__content">
          All other information is available here
        </div>
      </RelatedCardHeading>
      <CardWrapper>
        {data.map((item, key) => {
          return (
            <Card key={`card__${key}`}>
              <CardImage>
                <Image
                  src={item.svg}
                  width={100}
                  height={80}
                  alt=""
                  >
                </Image>
              </CardImage>
              <CardContent >
                <p>
                  {item.title}
                </p>
                <small>
                  {item.content}
                </small>
              </CardContent>
            </Card>
          )
        })}
      </CardWrapper>
    </div>
  );
};

export default ResourceRelatedCard;

const CardWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:32px;
`;

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

const RelatedCardHeading = styled.div`
  padding: 65px 0 40px 0;
  .heading__text{
   display:flex;
   h4 {
    color: var(--text-light-light);
    font-style: normal;
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    }

   hr {
    width: 56px; 
    background: var( --color-secondary); 
    border-radius: 1px; 
    margin: 15px;
  }
 }

.heading__content {
    font-weight: normal;
    font-size: 40px;
    padding:10px 0;
    line-height:1;
  }
`;