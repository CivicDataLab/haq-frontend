import styled from 'styled-components';
import { Tag, TagsComp } from 'components/data/Tags/TagsComp';

export const DatasetCardComp = styled.a`
  text-decoration: none;
  padding: 1.5rem;
  border-radius: 6px;
  transition: transform 200ms ease;
  display: flex;
  cursor: pointer;

  .card__group {
    display: inline;
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
  }

  ul {
    margin-top: 14px;
  }

  ${TagsComp} {
    margin-top: 14px;
    margin-bottom: 0;
  }

  ${Tag} {
    border-radius: 4px;
    color: #1c523b;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    background-color: ' var(--text-light-disabled)';
  }

  ${Tag}:nth-child(1) {
    background: var(--color-amazon-0);
    color: #1c523b;
  }

  ${Tag}:nth-child(2) {
    background: var(--color-honey-0);
    color: var(--color-honey-3);
  }

  .card__content {
    margin-top: 12px;
    line-height: 137%;
  }
`;
