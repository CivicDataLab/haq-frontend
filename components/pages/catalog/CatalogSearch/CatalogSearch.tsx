import React from 'react';
import styled from 'styled-components';
import Search from 'components/data/Search';
import { Button } from 'components/actions';
import Image from 'next/image';
const CatalogSearch = () => {
  const [search, setSearch] = React.useState('');

  function SearchChange(val: any) {
    setSearch(val.value);
  }

  return (
    <Wrapper>
      <WrapperContent>
        <h4> Looking for something else ? </h4>
        <p> Check all datasets in one go. </p>
        <ButtonComp>
          <Button kind="secondary" size="sm">
            Explore All Datasets
          </Button>
        </ButtonComp>
        <LineBreak data-content="Or" />
        <SearchComp>
          <Search text={'Keyword |'} newSearch={SearchChange} />
        </SearchComp>
      </WrapperContent>
      <ImageComp>
        <Image width={350} height={280} alt="" src="/assets/girl.svg" />
      </ImageComp>
    </Wrapper>
  );
};

export default CatalogSearch;

const Wrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 50px;
  border: var(--border-1);
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  background: #fff0e0;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  padding: 49px 104px 0;

  @media (max-width: 1024px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const LineBreak = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: left;
  height: 1.5em;
  opacity: 0.5;

  &:before {
    content: '';
    background: var(--color-grey-500);
    position: absolute;
    left: 25px;
    top: 50%;
    width: 90%;
    height: 1px;
  }

  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    line-height: 1.5em;
    color: var(--text-light-light);
  }
`;

const ButtonComp = styled.div`
  margin-top: 18px;
  margin-bottom: 16px;
`;

const SearchComp = styled.div`
  margin-top: 20px;
`;

const WrapperContent = styled.div`
  padding-bottom: 49px;
  flex-grow: 1;

  h4 {
    font-size: 24px;
    color: var(--text-light-high);
    font-weight: var(--font-weight-medium);
  }

  p {
    font-size: 16px;
    color: var(--text-light-medium);
    margin-top: 8px;
  }
`;

const ImageComp = styled.div`
  line-height: 0;
  flex-basis: 50%;
text-align: right;

  @media (max-width: 786px) {
    display: none;
  }
`;
