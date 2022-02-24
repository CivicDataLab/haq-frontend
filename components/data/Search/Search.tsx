import { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchComp, SearchInput, SearchClear, Wrapper, ButtonsWrapper } from './SearchComp';
import { Button } from 'components/actions';
import { Cross, SearchIcon } from 'components/icons';
import Arrow from 'components/icons/Arrow';

const Search: React.FC<{ text?: string; newSearch: any }> = ({
  text,
  newSearch,
}) => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q || '');

  const handleChange = (value) => {
    setQ(value);
  };

  function handleClear() {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    input.value = '';
    input.focus();
    setQ('');
    newSearch('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    newSearch({
      query: 'q',
      value: q,
    });
  };
  return (
    <SearchComp onSubmit={handleSubmit} className="search">
      <Wrapper>
        <SearchInput
          type="search"
          name="q"
          value={q}
          id="searchInput"
          onChange={(e) => handleChange(e.target.value)}
          placeholder={text ? text : 'Try COVID, Hospital, Construction'}
          aria-label="Search"
        />
        <ButtonsWrapper>
          <SearchClear
            type="button"
            title="Clear search field"
            onClick={handleClear}
            className="search__clear"
          >
            <span className="sr-only">Clear search field</span>
            <Cross fill="#6C666E" />
          </SearchClear>

          <Button
            onClick={handleSubmit}
            className="search__submit"
            icon={<Arrow />}
            iconOnly={true}
          >
            Submit search
          </Button>
        </ButtonsWrapper>
      </Wrapper>
      {/* {q.length > 0 ? 
         <Button onClick={handleSubmit} className="search__submit" icon={<Arrow />} iconOnly={true}>
            Submit search
         </Button>
       :null
      } */}
    </SearchComp>
  );
};

export default Search;
