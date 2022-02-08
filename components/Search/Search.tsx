import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchComp from './SearchComp';
import Button from 'components/Button/Button';

const Search: React.FC<{ text?: string; newSearch: any }> = ({
  text,
  newSearch,
}) => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q || '');

  const handleChange = (value) => {
    setQ(value);
    newSearch(value);
  };

  function handleClear() {
    const input = document.querySelector('.search__input') as HTMLInputElement;
    input.value = '';
    input.focus();
    setQ('');
    newSearch('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    newSearch(q);
  };
  return (
    <SearchComp onSubmit={handleSubmit} className="search">
      <input
        type="search"
        name="q"
        value={q}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={text ? text : 'Try COVID, Hospital, Construction'}
        aria-label="Search"
        className="search__input"
      />
      <div className="search__buttons">
        <button
          className="search__clear"
          type="button"
          title="Clear search field"
          onClick={handleClear}
        >
          <span className="sr-only">Clear search field</span>
          &#x2715;
        </button>
        <Button className="search__submit">Submit</Button>
      </div>
    </SearchComp>
  );
};

export default Search;
