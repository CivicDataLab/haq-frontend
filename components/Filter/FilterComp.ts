import styled from 'styled-components';

export const FilterComp = styled.div`
  scrollbar-width: thin;
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border: 1px solid hsl(300, 10%, 94%);
  border-radius: 4px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  @media (max-width: 980px) {
    display: none;
  }

  [aria-pressed='true'] {
    background-color: #c6d3fc;

    &:hover {
      background-color: #ebf0ff;
    }
  }
`;

export const FilterHeading = styled.h4`
  margin-top: 1.75rem;
  border-radius: 4px;

  button {
    text-transform: capitalize;
    padding: 13px 12px;
    font-weight: 500;
    line-height: 140%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid #076775;
    color: #076775;
    border-radius: 4px;
  }

  svg {
    height: 7px;
    margin-left: 0.5em;
    transition: transform 150ms ease;
  }

  [aria-expanded='true'] svg {
    transform: rotate(-180deg);
  }

  [aria-expanded] path {
    fill: currentColor;
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
  background-color: #ffffff;
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px;
  border: 1px solid #d1cdd1;
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
