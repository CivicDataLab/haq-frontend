import styled from 'styled-components';

export const DatasetListComp = styled.ul`
  padding-bottom: 1.5rem;
  border-bottom: 2px solid hsla(300, 4%, 81%, 0.5);
  padding-left: 0;
  margin-top: 24px;

  > li {
    margin-top: 1rem;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-1);
    border: var(--border-1);
    border-radius: 8px;
  }
`;
