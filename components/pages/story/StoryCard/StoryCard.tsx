import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMediumBanner,getDate } from 'utils/explorer';
import styled from 'styled-components';

function getReadTime(text: string):number {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

function truncateString(str:string, length:number):string {
    if (str.length <= length) return str;
    return `${str.substring(0, length)} ...`;
}

const StoriesCard: React.FC<{ data: any; length: number }> = ({
  data,
  length,
}) => {

  return (
    <Wrapper>
      <Link href={data.link}>
        <a>
          <img src={getMediumBanner(data['content:encoded'])} alt="" />
        </a>
      </Link>

      <Content>
        <Link href={data.link}>
          <a>
            <h3>{data.title}</h3>
            <p>
              {truncateString(data['content:encodedSnippet'],length )}
            </p>
          </a>
        </Link>

        <Footer>
          <div>
            <small className="author">{data.creator}</small>
            <small>
              {`${getDate(data.isoDate)} . 
                  ${getReadTime(data['content:encodedSnippet'])} mins read`}
            </small>
          </div>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default StoriesCard;

export const Wrapper = styled.article`
  background-color: var(--color-background-lighter);
  border-radius: 6px;
  box-shadow: var(--border-1);
  padding: 2rem;
  margin-top: 1.75rem;
  text-decoration: none;
  display: block;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media(max-width:840px){
    flex-direction:column;
  }

  a {
    margin-right: 2rem;
  }

  img {
    max-width: 100%;
    object-fit: cover;
    max-height: 400px;
  }
`;

export const Content = styled.div`
    display: grid;
    width: 100%;

    h3 {
      font-weight: 500;
      line-height: 156%;
      
    }

    p {
      color: var(--color-grey-200);
      margin-top: 1rem;
      line-height: 156%;
      font-size:16px;
      font-weight: 300;
    }

    small {
      display: block;

      &:last-child {
        margin-top: 4px;
        color: var(--color-grey-200);
      }
    }
`;

export const Footer = styled.div`
  align-self: flex-end;
  .author {
    font-size: 1rem;
    margin-top: 2rem;
  }
`;