import React, { useState } from 'react';
import Head from 'next/head';
import { ResourceCard, ResourceRelatedCard } from 'components/pages/resources';
import { Search } from 'components/data';
import { SearchInput } from 'components/data/Search/SearchComp';
import { Button } from 'components/actions';
import styled from 'styled-components';

const Resources = () => {
    const [search, setSearch] = useState('');

    function SearchChange(val: any) {
        setSearch(val.value);
    }

    return (
        <Wrapper>
            <Head>
                <title> Resources</title>
            </Head>
            <div className="container">
                <Header>
                    Glossary
                </Header>
                <SearchContainer>
                    <Search text={"Search here"} newSearch={SearchChange} />
                </SearchContainer>
                <div className="bucket__name">
                    BUCKET NAME - PLACEHOLDER
                    <hr />
                </div>
                <ResourceCard />
                <hr className="hr_card" />
                <CardList>
                    <div className="cardlist__count">
                        Showing 35 of 60 entries
                    </div>
                    <div>
                        <Button> Load More </Button>
                    </div>
                </CardList>
                <ResourceRelatedCard />
            </div>
        </Wrapper>
    );
};

export default Resources;

const Wrapper = styled.div`
  .bucket__name {
    margin-top:24px;
    color: var(--color-secondary );
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 22px;
  }

  hr {
    border: var(--border-1);
    opacity:0.5;
    margin-top:10px;
  }

  .hr_card {
    margin-top:24px ;
  }
`;
const Header = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: 40px;
  color: var(text_light_high);
  line-height: 52px;
  margin-top:50px;
  margin-bottom:32px;
`;

const SearchContainer = styled.div`
  padding:12px;
  background: var(--color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 12px;
  ${SearchInput} {
    border: 1px solid rgba(0, 0, 0, 0.12);
    &:focus-visible {
        outline: 2px solid rgba(0, 0, 0, 0.12) !important;
      }
  }
`;

const CardList = styled.div`
  margin-top:16px;
  display:flex;
  background-color:white;
  justify-content:space-between;
  padding:24px;
  border: var(--border-2);
  border-radius: 12px;
  .cardlist__count{
     display:flex;
     align-items:center;
  }
`;