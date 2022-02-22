import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import { Tags } from 'components/data';
import { categoryIcon, categoryTag } from 'utils/explorer';

const ExplorerHeader = ({ data, meta }) => {
  return (
    <Wrapper>
      <div className="container">
        <Share title={data.title} />
      </div>

      <section className="container">
        <HeaderContent>
          <figure>{categoryIcon(data.tags)}</figure>
          <div>
            <h2>{data.title}</h2>
            <Tags data={data.tags} />
          </div>
        </HeaderContent>
        <HeaderText>{data.notes}</HeaderText>
        <HeaderMeta>
          {meta['Type of Scheme'] && <span>{meta['Type of Scheme']}</span>}
          {<span>{categoryTag(data.tags)}</span>}
        </HeaderMeta>
      </section>
    </Wrapper>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  background-color: #fff;
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  gap: 1.5rem;

  figure {
    background-color: #fff;
    max-width: 72px;
    max-height: 72px;
    display: grid;
    place-content: center;
    padding: 22px;
    border-radius: 16px;
    border: 1px solid #cdd1d1;
  }

  svg {
    width: 29px;
    height: 29px;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 130%;
  }
`;

const HeaderText = styled.p`
  font-weight: 500;
  line-height: 175%;
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  span {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
    color: hsla(0, 0%, 0%, 0.6);
    background-color: hsla(0, 0%, 0%, 0.08);
    padding: 4px 6px;
  }

  strong {
    color: #02838b;
    font-weight: bold;
  }
`;
