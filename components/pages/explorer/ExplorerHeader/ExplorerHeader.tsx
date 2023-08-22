import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import Link from 'next/link';
import { Link as LinkIcon } from 'components/icons';

interface TypeProps {
  data: any;
  summary: any;
  primary: boolean;
}

const ExplorerHeader = ({ data, summary, primary }: TypeProps) => {
  let englishTitle: string, hindiTitle: string;

  if (!primary) {
    const parts = data.title.split('|');
    englishTitle = parts[0]?.trim();
    hindiTitle = parts[1]?.trim();
  }

  return (
    <Wrapper className="container">
      <HeaderContent primary={primary}>
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

const HeaderContent = styled.div<{ primary: boolean }>`
  gap: 1.5rem;
  background-color: ${(props) => (props.primary ? 'none' : 'white')};
  padding:  ${(props) => (props.primary ? 'none' : '24px')};

  h2 {
    color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
    font-size: ${(props) => (props.primary ? '40px' : '24px')};
    font-weight: 400;
    line-height: 32px;
  }
  
  h3 {
    color: ${(props) => (props.primary ? 'rgba(0, 0, 0, 0.60)' : 'var(--carrot-04, #9d423f)')};

    font-size: ${(props) => (props.primary ? '20px' : '24px')};
    font-weight: 500;
    line-height: 38px;
    margin-top: ${(props) => (props.primary ? '16px' : '0')};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
