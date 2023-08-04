import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'components/icons';

const SearchBar = (props) => {
  useEffect(() => {
    const form = document.querySelector('.search__form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    return () => {
      form.removeEventListener('submit', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  return (
    <form className="search__form" autoComplete="off" role="search">
      <SearchContainer>
        <label className="search__label" htmlFor="search">
          <span className="search__text screen-reader-text">Search here</span>
          <input
            id="search"
            type="search"
            autoComplete="off"
            inputMode="search"
            className="search-input"
            placeholder="Search here"
            onChange={props.handleChangeSearchTerm}
          />
          <SearchIcon fill="#0D1018" fillOpacity={0.4} className="search-icon" />
        </label>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  border-radius: 4px;
  border: 1px solid var(--black-12, rgba(0, 0, 0, 0.12));
  background: var(--background-lightest, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08) inset;
  position: relative;

  .screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
    color: #222222;
    background-color: #dddddd;
  }

  .search-input {
    padding: 8px;
    font-size: 1rem;
    background: $bg-color;
    border: 1px solid transparent !important;
    border-radius: 4px;
    width: 100%;
    width: -moz-available; /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
    width: 100%;
    outline: none;
  }

//   .search-input:focus {
//     background: #ffffff;
//     border: 1px solid #4b4797 !important;
//   }

  .search-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 16px;
    top: 8px;
  }
`;
