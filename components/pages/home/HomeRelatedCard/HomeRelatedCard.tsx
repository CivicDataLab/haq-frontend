import React from 'react';
import styled from 'styled-components';
import { RelatedCard } from 'components/data';
import { RelatedCardComp } from 'components/data/Cards/RelatedCard/CardComp';
import { Heading } from 'components/layouts/Heading';

const HomeRelatedCard = ({ datastory }) => {
  return (
    <div>
      <div className="container">
        <RelatedCardHeading>
          <div className="heading__text">
            <hr />
            <Heading as="h5" variant="h5l" color='var(--text-light-light)'>
              data stories
            </Heading>
          </div>
          <Heading as="h1" variant="h1l">
            Curated data stories around major datasets
          </Heading>
        </RelatedCardHeading>
        <RelatedCardContainer>
          {datastory.map((item, index) => {
            return (
              <li key={`dataCard-${index}`}>
                <RelatedCard data={item} index={index} />
              </li>
            );
          })}
        </RelatedCardContainer>
      </div>
    </div>
  );
};

export default HomeRelatedCard;

const RelatedCardHeading = styled.div`
  padding: 100px 0 40px 0;
  .heading__text {
    display: flex;
    h4 {
      color: rgba(0, 0, 0, 0.32);
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
    }
    hr {
      width: 56px;
      background: #4965b2;
      border-radius: 1px;
      margin: 15px;
    }
  }

  .heading__content {
    font-weight: normal;
    font-size: 40px;
    padding: 10px 0;
    line-height: 1;
  }
`;

const RelatedCardContainer = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  list-style: none;

  > * {
    flex: 300px;
  }

  ${RelatedCardComp} {
    border: 1px solid #d1cdd1;
    box-sizing: border-box;
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
    padding: 0;

    ul {
      margin: 0.8rem 0;
    }

    img {
      border-radius: 12px 12px 0px 0px;
    }

    article {
      padding: 16px 24px 16px 24px;
    }

    h3 {
      font-weight: 500;
      line-height: 1.1;
    }

    p {
      font-weight: 400;
      margin-top: 0.2rem;
      font-style: 16px;
    }
  }
`;
