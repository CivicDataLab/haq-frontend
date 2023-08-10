import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Link as LinkIcon } from 'components/icons';

const Header = ({ header }) => {
  const { main, sub, dataSrc, datasetLink } = header;
  return (
    <Wrapper>
      {header.state && (
        <>
          {main && <MainHeading>{main}</MainHeading>}
          {sub && <SubHeading>{sub}</SubHeading>}
          <DataSorce>
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
          </DataSorce>
        </>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 36px;
`;

const MainHeading = styled.div`
  color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
  font-size: 40px;
  font-weight: 400;
  line-height: 52px;
  margin-top: 40px;
`;

const SubHeading = styled.div`
  color: var(--text-light-bg, rgba(0, 0, 0, 0.87));
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-top: 16px;
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
