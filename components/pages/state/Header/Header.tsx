import React from 'react';
import styled from 'styled-components';
import SchemeSelector from './SchemeSelector';

const Header = ({ header, schemeList }) => {
  const { main, sub } = header;
  return (
    <Wrapper>
      {header.state && (
        <>
          {main && <MainHeading>{main}</MainHeading>}
          {sub && <SubHeading>{sub}</SubHeading>}
        </>
      )}
      <SchemeSelector state={header.state} schemeList={schemeList} />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  max-width: 802px;
  margin: 0 auto;
  padding-bottom: 36px;
`;

const MainHeading = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  line-height: 52px;
  color: var(--flamingo-06, #5c2230);
`;

const SubHeading = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-top: 20px;
  color: var(--flamingo-04, #9b3950);
`;
