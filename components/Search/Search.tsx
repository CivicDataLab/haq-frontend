import { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchComp, SearchInput, SearchClear, Wrapper } from './SearchComp';
import Button from 'components/Button';
import { Cross } from 'icons/Shared';

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
        <SearchClear
          type="button"
          title="Clear search field"
          onClick={handleClear}
          className="search__clear"
        >
          <span className="sr-only">Clear search field</span>
          <Cross fill="#076775" />
        </SearchClear>
      </Wrapper>
      <Button onClick={handleSubmit} className="search__submit">
        Submit <span className="sr-only">search</span>
      </Button>
    </SearchComp>
  );
};

export default Search;
