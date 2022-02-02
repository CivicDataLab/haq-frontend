import styled from 'styled-components';

const SearchComp = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  position: relative;
  flex-grow: 1;

  .search__clear {
    position: absolute;
    right: 12rem;
    top: 0;
    display: none;
    padding: 13px;
    margin-top: -3px;
    color: grey;

    button {
      cursor: pointer;
    }
  }

  .search__buttons {
    position: relative;
  } 

  .search__submit {
    padding: 9px 60px;
    transform: translateX(-5px);
    line-height: 135%;

    @media (max-width: 720px) {
      padding: 9px 24px;
    }
  }

  .search__input {
    border: 1px solid #2c592c;
    border-radius: 4px;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
    padding: 0.5rem 0 0.5rem 2.5rem;
    background-color: #fff;
    transition: background-color 150ms ease;
    width: 100%;
    line-height: 130%;

    background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z' stroke='%23075E54'/%3E%3C/svg%3E%0A");
    background-position: left 1rem top 50%, 0 0;
    background-repeat: no-repeat, repeat;

    &:not([value='']) {
      + .search__buttons .search__clear {
        display: block;
      }
    }
  }
`;

export default SearchComp;
