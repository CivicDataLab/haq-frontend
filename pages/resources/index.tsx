import React, { useState,useEffect } from 'react';
import Head from 'next/head';
import { ResourceCard, ResourceRelatedCard } from 'components/pages/resources';
import { Search } from 'components/data';
import { SearchInput } from 'components/data/Search/SearchComp';
import { Button } from 'components/actions';
import styled from 'styled-components';

const Resources = () => {

  const data = [
    {
      title: 'Lorem ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Et lobortis',
      content: 'Turpis tellus orci pharetra turpis. Tortor enim duis in sapien venenatis dolor vel tempor cras. Diam ullamcorper nisl, purus fames lacus, eget integer. Consectetur nulla pellentesque nec vulputate viverra sapien sagittis, risus massa. Gravida nibh enim arcu condimentum enim lectus purus convallis sem. Pharetra, interdum sit amet, tellus sed id fames non.'
    },
    {
      title: 'Lorem ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Et Lobortis',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Lorem1 ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  ]

  const [search, setSearch] = useState('');
  const [cardsToShow,setCardsToShow] =useState(1);
  const [cards, setCards] = useState(data);

  const [visibleCards, setVisibleCards] = useState([]);

  const keys = ["title", "content"];

  useEffect(() => {
    if(search)
      setCards(data.filter(item => { return keys.some(key => item[key].toLowerCase().includes(search.toLowerCase()))}))
    else if(search.length==0)
      setCards(data)
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
    if(cards.length === cardsToShow) return;
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

        { visibleCards.length > 0 ?
           visibleCards.map((item:any, key:any) => (
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