import styled from 'styled-components';

export const SearchComp = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  flex-grow: 0.95;
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  .search__submit {
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }
`;

export const SearchClear = styled.button`
  width: 24px;
  height: 24px;
  margin-right: 8px;

  button {
    cursor: pointer;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid #fa5d82;
  border-radius: 4px;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
  padding: 11px 12px 11px 2.5rem;
  background-color: #fff;
  transition: background-color 150ms ease;
  width: 100%;
  height: 100%;
  line-height: 1.5;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'%3E%3Cpath fill='%236C666E' d='M12.4996 11h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.58995-5.34-4.23-.52-7.790001 3.04-7.270001 7.27.34 2.8 2.560001 5.12 5.340001 5.59 2.03.34 3.94-.28 5.33995-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49l-4.24-4.26Zm-5.99995 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.49995 2.01 4.49995 4.5S8.98965 11 6.49965 11Z'/%3E%3C/svg%3E");
  background-position: left 1rem top 50%, 0 0;
  background-repeat: no-repeat, repeat;

  &:not([value='']) {
    + ${ButtonsWrapper} {
      display: flex;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary) !important;
  }
`;
