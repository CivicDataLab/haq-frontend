import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { RelatedCard } from 'components/data';

const ExplorerRelated = ({ data }) => {
  return (
    <Wrapper>
      <div className="container">
        <h3 className="heading">Explore other Budget Datasets</h3>
        <p className="home__sub-head">
          Search for other relevant dataset using the Select Another Scheme
          button from above or view all datasets on the{' '}
          <Link href={'/datasets'}>
            <a className="text-link">datasets listing</a>
          </Link>{' '}
          page.
        </p>

        <RelatedWrapper>
          {data.relatedSchemes &&
            data.relatedSchemes.map((item, index) => {
              return (
                <React.Fragment key={`relavant-${index}`}>
                  <RelatedCard data={item} index={index} />
                </React.Fragment>
              );
            })}
        </RelatedWrapper>
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
`;

const RelatedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 2.5rem;
`;
