import styled from 'styled-components';

const TagsComp = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li {
    text-transform: uppercase;
    font-size: 12px;
    line-height: 130%;
    color: var(--text-light-medium);
    background-color: var(--text-light-disabled);;
    padding: 4px 8px;
    border-radius: 4px;
  }
`;

export default TagsComp;
