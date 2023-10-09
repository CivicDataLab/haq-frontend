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
  padding: 11px 12px 11px 11px;
  background-color: #fff;
  transition: background-color 150ms ease;
  width: 100%;
  height: 100%;
  line-height: 1.5;

  border-radius: 4px;
  border: 1px solid var(--black-12, rgba(0, 0, 0, 0.12));
  background: var(--background-lightest, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08) inset;

  &:not([value='']) {
    + ${ButtonsWrapper} {
      display: flex;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-sapphire) !important;
  }
`;
