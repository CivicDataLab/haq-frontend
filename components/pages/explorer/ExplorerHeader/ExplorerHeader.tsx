import React from 'react';
import styled from 'styled-components';
import { Share, Button } from 'components/actions';
import { Tags } from 'components/data';
import { categoryIcon, categoryTag } from 'utils/explorer';
import { Download } from 'components/icons';
import { ButtonComp } from 'components/actions/Button';

const ExplorerHeader = ({ data, summary, primary }) => {
  // const item = [
  //   {
  //     text: 'Total Receipts',
  //     value: '₹ 4,20,672 Cr.',
  //   },
  //   {
  //     text: 'Total Expenditure',
  //     value: '₹ 5,50,271 Cr.',
  //   },
  //   {
  //     text: 'Fiscal Deficit',
  //     value: '₹ 21,73,990 Cr.',
  //   },
  //   {
  //     text: 'GSDP',
  //     value: '₹ 21,73,990 Cr.',
  //   },
  // ]

  return (  
    <Wrapper>
      <div className="container flex">
        <Share title={data.title} />
        <Button href={data.resUrls[0]} kind = "secondary-outline" size='md' icon={<Download />} >
            Dataset
        </Button>
      </div>

      <section className="container">
        <HeaderContent>
          <figure>{categoryIcon(data.tags)}</figure>
          <div>
            {primary ? 
            <div>
               <h2>{summary.title}</h2>
               <h3>{summary.description}</h3>
            </div>
            : <h2>{data.title}</h2>}
            
           {data.tags && <Tags data={data.tags} />}
          </div>
        </HeaderContent>
        {/* <HeaderText>{data.notes}</HeaderText> */}
        {/* <HeaderMeta>
          {meta['Type of Scheme'] && <span>{meta['Type of Scheme']}</span>}
          {<span>{categoryTag(data.tags)}</span>}
        </HeaderMeta> */}
        {/* <SummaryCard>
          {item.map((itemCard, index) => (
            <li key={`summary-${index}`}>
              <strong>{itemCard.value}</strong>
              <span>{itemCard.text}</span>
            </li>
          ))}
        </SummaryCard> */}
      </section>
    </Wrapper>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }

  .flex {
    display:flex;
    justify-content: space-between;
  }

  ${ButtonComp} {
    text-decoration: none !important;
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
    font-weight: 600;
    line-height: 1.55;
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

const SummaryCard = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  li {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color: var(--color-background-lighter);
    padding: 20px 16px;
    border: var(--border-1);
    border-radius: 8px;
    filter: drop-shadow(var(--box-shadow-1));
    flex-basis: 214px;
    flex-grow: 1;
    height:128px;
    position: relative;
    border-left : 4px solid #FBB670;
  }
  strong {
    font-weight: 700;
    font-size: 24px;
  }
  span {
    display: block;
    font-weight: 400;
    font-size: 16px;
    color: var(--text-light-medium);
    line-height: 1.7;
    margin-top: 4px;
  }
`;
