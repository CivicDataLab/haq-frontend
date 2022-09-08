import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { RelatedCard } from 'components/shared';
import { RelatedCardComp } from 'components/shared/RelatedCard/CardComp';
import { Tags } from 'components/data';
import DownloadCard from './DownloadCard';

const ExplorerRelated = ({ data }) => {
  console.log(data.resUrls);
  // const topic = [
  //   { topic: "Topic1", description: 'Description' },
  //   { topic: "Topic2", description: 'Description' },
  //   { topic: "Topic3", description: 'Description' },
  //   { topic: "Topic4", description: 'Description' },
  //   { topic: "Topic5", description: 'Description' },
  // ];

  return (
    <Wrapper>
      <div className="container">
        {/* <Heading>
          <div className="heading__text">
            <hr />
            <h4>Data Stories</h4>
          </div>
          <div className="heading__content">
            Curated data stories around major datasets
          </div>
        </Heading> */}

        {/* <RelatedWrapper>
          {data.relatedSchemes &&
            data.relatedSchemes.map((item, index) => {
              return (
                <React.Fragment key={`relavant-${index}`}>
                  <RelatedCard data={item} index={index} />
                </React.Fragment>
              );
            })}
        </RelatedWrapper> */}

        <Heading>
          <div className="heading__text">
            <hr />
            <h4>Meta Data</h4>
          </div>
          <div className="heading__content">Everything you need to know</div>
        </Heading>

        <DataWrapper>
          <h4> Data description </h4>
          <p> {data.notes} </p>
          <hr className="hr" />
          <h4> Keywords </h4>
          <Tags data={data.tags} />
          <hr className="hr" />
          <h4> Data and Resources </h4>

          <CardWrapper>
            {data.resUrls.map((item) => {
              return <DownloadCard data={item} />;
            })}
          </CardWrapper>

          {/* <hr className="hr" />
          <h4> Additional Information </h4>

          <dl className="dlist">
            {
              topic.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={
                      item.description && typeof item.description != 'string'
                        ? 'dlist__multiple'
                        : ''
                    }
                  >
                    <dt className="dlist__title">
                      <span>{item.topic}</span>

                    </dt>
                    <dd className="dlist__desc">{item.description}</dd>
                  </div>
                )
              })
            }
          </dl> */}
        </DataWrapper>
      </div>
    </Wrapper>
  );
};

export default ExplorerRelated;

const Wrapper = styled.section`
  padding-top: 4rem;
  margin-top: 2.5rem;
  padding-bottom: 9rem;
  background-color: #fff;

  dt {
    max-width: 25rem;
  }

  .dlist {
    border-radius: 4px;
  }
  .dlist > div {
    display: flex;
    align-items: center;
    background: #F2EFF2;
    border:4px solid white;
  }
  @media screen and (max-width: 479px) {
    .dlist > div {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .dlist__multiple div {
    display: grid;
    grid-template-columns: 250px repeat(4, 1fr);
    justify-content: space-between;
    width: 100%;
  }
  .dlist__multiple div .dlist__desc {
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
  @media screen and (max-width: 979px) {
    .dlist__multiple div {
      display: block;
    }
    .dlist__multiple div dd {
      margin-bottom: 0.5rem;
    }
  }
  @media screen and (max-width: 1199px) {
    .dlist__multiple {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }
  .dlist__title {
    font-weight: 500;
    width: 100%;
    padding: 13px;
  }

  .dlist__title span {
    display: inline-block;
    vertical-align: middle;
  }

  .dlist__desc {
    text-align: left;
    width: 100%;
    overflow-x: auto;
    align-self: center;
    padding: 13.5px;
  }
`;

const RelatedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 2.5rem;

  ${RelatedCardComp} {
    padding: 24px;
    h3 {
      font-weight: 500;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.87);
      line-height: 1.3;
    }
    p {
      font-weight: 400;
      font-size: 16px;
    }
  }
`;

const DataWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background-color: #fff;
  padding: 24px;

  h4 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .hr {
    margin-top: 18px;
    margin-bottom: 20px;
    border: var(--border-2);
  }
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns : 1fr 1fr;
  @media(max-width:912px){
    grid-template-columns : 1fr;
  }
`;

const Heading = styled.div`
  margin: 65px 0 40px 0;
  .heading__text {
    display: flex;
    h4 {
      color: var(--text-light-light);
      font-style: normal;
      font-weight: var(--font-weight-medium);
      font-size: 20px;
    }
    hr {
      width: 56px;
      background: var(--color-secondary);
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
