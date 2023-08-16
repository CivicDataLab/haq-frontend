import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import Link from 'next/link';
import { Link as LinkIcon } from 'components/icons';

const ExplorerHeader = ({ data, summary, primary }) => {
  function separateTitles(data) {
    const parts = data.title.split('|');
    const englishTitle = parts[0]?.trim();
    const hindiTitle = parts[1]?.trim();

    return { englishTitle, hindiTitle };
  }

  const { englishTitle, hindiTitle } = separateTitles(data);

  return (
    <Wrapper className="container">

      <HeaderContent>
        <div>
          {primary ? (
            <div>
              <h2>{summary.title}</h2>
              <h3>{summary.description}</h3>
            </div>
          ) : (
            <>
              <Title>
                <h2>{englishTitle}</h2>
                <Share title={data.title} />
              </Title>
              <h3>{hindiTitle}</h3>
            </>
          )}
        </div>

        {!primary && (
          <DataSorce>
            <Content>
              <p>Data Source :</p>
              <span> {data.source} |</span>
              <Link href={data.resUrls[0]} passHref>
                <LinkStyled target="_blank">
                  <span>Link to the Dataset</span>
                  <LinkIcon />
                </LinkStyled>
              </Link>
            </Content>
          </DataSorce>
        )}
      </HeaderContent>
    </Wrapper>
  );
};

export default ExplorerHeader;

const Wrapper = styled.div`
  padding-bottom: 2.5rem;
  padding-top: 2rem;
`;

const HeaderContent = styled.div`
  gap: 1.5rem;
  background-color: white;
  padding: 24px;

  h2 {
    color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
  }

  h3 {
    color: var(--carrot-04, #9d423f);
    font-family: Mukta;
    font-size: 24px;
    font-weight: 500;
    line-height: 38px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`

const DataSorce = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;

  p {
    font-weight: 500;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const LinkStyled = styled.a`
  color: #2c59b1;
  text-decoration: underline;
  display: flex;
  align-items: center;
  gap: 2px;
`;
