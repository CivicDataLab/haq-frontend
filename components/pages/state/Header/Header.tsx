import React from 'react';
import styled from 'styled-components';
import SchemeSelector from './SchemeSelector';
import MobileSelector from './MobileSelector';
import { Heading } from 'components/layouts/Heading';
import { useWindowSize } from 'utils/hooks';

const Header = ({ header, schemeList }) => {
  const { main, sub } = header;
  const { width } = useWindowSize();

  return (
    <Wrapper>
      {header.state && (
        <>
          {main && (
            <Heading as="h1" variant="h1l" color="var(--color-flamingo-5)" textAlign="center" pt='24px'>
              {main}
            </Heading>
          )}
          {sub && (
            <Heading as="h2" variant="h2l" color="var(--color-flamingo-4)" textAlign="center" mt='20px'>
              {sub}
            </Heading>
          )}
        </>
      )}
      {width > 768 ? (
        <SchemeSelector state={header.state} schemeList={schemeList} />
        ) : (
        <MobileSelector state={header.state} schemeList={schemeList} />
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  max-width: 802px;
  margin: 0 auto;
  padding-bottom: 36px;
`;