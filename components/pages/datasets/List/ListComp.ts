import styled from 'styled-components';

export const DatasetListComp = styled.ul`
  padding-bottom: 1.5rem;
  border-bottom: 2px solid hsla(300, 4%, 81%, 0.5);
  padding-left: 0;

  .list__item {
    margin-top: 1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    background: var( --color-white);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px 1px 1px 4px;
    border-radius: 8px;
  }
`;
