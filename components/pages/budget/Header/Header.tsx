import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Link as LinkIcon } from 'components/icons';
import { Heading } from 'components/layouts/Heading';
import { Share } from 'components/actions';

const Header = ({ header }) => {
  const { main, sub, dataSrc, datasetLink } = header;
  return (
    <Wrapper>
      {header.state && (
        <>
          {main && <Heading as='h1' variant='h1'>{main}</Heading>}
          {sub && <Heading as='h4' variant='h4' mt='16px'>{sub}</Heading>}
          <DataSource>
            <Content>
              <p>Data Source :</p>
              <span> {dataSrc} |</span>
              <Link href={datasetLink} passHref>
                <LinkStyled target="_blank">
                  <span>Link to the Dataset</span>
                  <LinkIcon /> 
                </LinkStyled>
              </Link>
            </Content>
            <Share title={main} />
          </DataSource>
        </>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 36px;
`;

const DataSource = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
  font-size: 14px;

  p {
    font-weight: 500;
  }

  @media (max-width: 600px) {
    & > div:last-child {
      flex-grow: 1;
      > button {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap:wrap;
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
