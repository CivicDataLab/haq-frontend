import styled from 'styled-components';

const FilterComp = styled.div`
  scrollbar-width: thin;
  background-color: #ffffff;
  margin-right: 2rem;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border: 1px solid hsl(300, 10%, 94%);
  border-radius: 4px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  overflow-y: auto;

  .filters {
    &::-webkit-scrollbar {
      width: 5px;
    }

    @media (max-width: 980px) {
      display: none;
    }

    &__heading {
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
    }

    &__content {
      max-height: 20rem;
      overflow-y: auto;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 5px;
      }
    }

    &__button {
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
    }

    [aria-pressed='true'] {
      background-color: #c6d3fc;

      &:hover {
        background-color: #ebf0ff;
      }
    }
  }
`;

export default FilterComp;
