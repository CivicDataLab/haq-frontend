import React from 'react';
import styled from 'styled-components';
import { Share } from 'components/actions';
import Link from 'next/link';
import { Link as LinkIcon } from 'components/icons';
import { Heading } from 'components/layouts/Heading';
import { useWindowSize } from 'utils/hooks';

interface TypeProps {
  data: any;
  summary: any;
  primary: boolean;
}

const ExplorerHeader = ({ data, summary, primary }: TypeProps) => {
  const { width } = useWindowSize();

  let englishTitle: string, hindiTitle: string;

  if (!primary) {
    const parts = data.title.split('|');
    englishTitle = parts[0]?.trim();
    hindiTitle = parts[1]?.trim();
  }

  return (
    <Wrapper>
      <HeaderContent primary={primary}>
        <div>
          {primary ? (
            <div>
              <Heading as="h1" variant="h1">
                {summary.title}
              </Heading>
              <Heading as="h2" variant="h2" mt='16px'>
              {summary.description}
              </Heading>
            </div>
          ) : (
            <>
              <Title>
                <Heading as="h2" variant="h2l">
                  {englishTitle}
                </Heading>
                {width > 600 ? <Share title={data.title} /> : null}
              </Title>
              <Heading as="h3" variant="h3l" color="#9D423F">
                {hindiTitle}
              </Heading>
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
        {width < 600 ? <Share title={data.title} /> : null}
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
  padding: ${(props) => (props.primary ? 'none' : '24px')};

  > div > button {
    width: 100%;
    justify-content: center;
    margin-top: 16px;
  }

  @media(max-width:600px) {
    h3 {
      margin-top:12px;
    }
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
  flex-wrap: wrap;
`;

const LinkStyled = styled.a`
  color: #2c59b1;
  text-decoration: underline;
  display: flex;
  align-items: center;
  gap: 2px;
`;
