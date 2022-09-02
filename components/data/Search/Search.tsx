import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  SearchComp,
  SearchInput,
  SearchClear,
  Wrapper,
  ButtonsWrapper,
} from './SearchComp';
import { Button } from 'components/actions';
import { Cross } from 'components/icons';
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
          placeholder={text ? text : 'Try Hostel, Scholarship, Mid Day Meal'}
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
            <Cross width={24} height={24} fill="#6C666E" />
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
    </SearchComp>
  );
};

export default Search;
