import styled from 'styled-components';

export const FilterComp = styled.div`
  scrollbar-width: thin;
  background-color: var(--color-background-lighter);
  filter: drop-shadow(var(--box-shadow-1));
  border: var(--border-2);
  border-radius: 12px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  overflow-y: auto;

  .heading {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    color: rgba(0, 0, 0, 0.87);
    border-bottom: var(--separator-6);
    padding-bottom: 18px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  [aria-pressed='true'] {
    background-color: #ebf0ff;

    &:hover {
      background-color: #f2eff2;
    }
  }
`;

export const FilterHeading = styled.h4`
  margin-top: 16px;
  border-radius: 4px;

  button {
    background-color: var(--color-grey-500);
    text-transform: capitalize;
    padding: 12px;
    font-weight: 500;
    line-height: 137%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid var(--color-grey-500);
    color: var(--text-light-high);
    border-radius: 4px;
  }

  svg {
    margin-left: 0.5em;
    transition: transform 150ms ease;
    fill: var(--color-grey-300);
  }

  [aria-expanded='true'] svg {
    transform: rotate(-180deg);
  }
`;

export const FilterContent = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 5px;
  }
`;

export const FilterSearch = styled.input`
  width: 100%;
  padding: 8px;
  border-block: 1px solid #d1cdd1;
`;

export const FilterSelected = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 8px;

  button {
    border-radius: 18px;
    background-color: #076775;
    color: hsl(0, 33%, 99%);
    font-weight: 500;
    font-size: 12px;
    text-align: left;
    line-height: 20px;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: capitalize;

    svg {
      fill: #fefdfd;
      pointer-events: none;
    }
  }
`;

export const FilterButton = styled.button`
  background-color: var(--color-background-lighter);
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px;
  border: var(--border-1);
  border-top: none;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: #f1eef1;
  }

  &:last-child {
    border-radius: 0px 0px 4px 4px;
  }
`;
