import React from 'react';
import styled from 'styled-components';

const Header = ({ header }) => {
  const { main, sub } = header;
  return (
    <Wrapper>
      {header.state && (
        <>
          {main && <MainHeading>{main}</MainHeading>}
          {sub && <SubHeading>{sub}</SubHeading>}
          <DataSorce>data source:</DataSorce>
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
  margin-top: 16px;
`;
