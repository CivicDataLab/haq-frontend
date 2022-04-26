import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ResourceCard, ResourceRelatedCard } from 'components/pages/resources';
import { Search } from 'components/data';
import { SearchInput } from 'components/data/Search/SearchComp';
import { Button } from 'components/actions';
import styled from 'styled-components';
import * as resource from 'data/resourcedata/resourcelist';

const Resources = () => {

  const [search, setSearch] = useState('');
  const [cardsToShow, setCardsToShow] = useState(1);
  const [cards, setCards] = useState(resource.data);

  const [visibleCards, setVisibleCards] = useState([]);

  const keys = ["title", "content"];

  useEffect(() => {
    if (search)
      setCards(resource.data.filter(item => { return keys.some(key => item[key].toLowerCase().includes(search.toLowerCase())) }))
    else if (search.length == 0)
      setCards(resource.data)
  }, [search])

  useEffect(() => {
    setVisibleCards(cards.slice(0, cardsToShow));
  }, [cards, cardsToShow]);

  function SearchChange(val: any) {
    setSearch(val.value);
  }

  const startIndex = 0;

  const lastIndex = () => {
    if (startIndex + cardsToShow < cards.length)
      return startIndex + cardsToShow;
    else return cards.length;
  };

  const loading = () => {
    if (cards.length === cardsToShow) return;
    setCardsToShow(prevValue => prevValue + 1);
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

        {visibleCards.length > 0 ?
          visibleCards.map((item: any, key: any) => (
            <ResourceCard key={`card__${key}`} data={item} />
          ))
          :
          <div>No Data Found</div>
        }

        <hr className="hr_card" />
        <CardList>
          <div className="cardlist__count">
            Showing {lastIndex()} of {cards.length} entries
          </div>
          <div>
            <Button onClick={loading}> Load More </Button>
          </div>
        </CardList>
        <RelatedCardHeading>
          <div className="heading__text">
            <hr />
            <h4>Other info.</h4>
          </div>
          <div className="heading__content">
            All other information is available here
          </div>
        </RelatedCardHeading>
        <RelatedCardWrapper>
          {
            resource.relatedCardData.map((item: any, key: any) => (
              <ResourceRelatedCard key={`card__${key}`} data={item} />
            ))
          }
        </RelatedCardWrapper>
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

const RelatedCardHeading = styled.div`
  padding: 65px 0 40px 0;
  .heading__text{
   display:flex;
   h4 {
    color: var(--text-light-light);
    font-style: normal;
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    }

   hr {
    width: 56px; 
    background: var( --color-secondary); 
    border-radius: 1px; 
    margin: 15px;
  }
 }

.heading__content {
    font-weight: normal;
    font-size: 40px;
    padding:10px 0;
    line-height:1;
  }
`;

const RelatedCardWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:32px;
`;