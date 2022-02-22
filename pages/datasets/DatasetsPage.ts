import styled from 'styled-components';

export const DatasetsPage = styled.main`
background-color: #E5E5E5;
  .heading {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .containBox {
    border: 2px solid;
    padding: 1rem;
    margin-top: 2rem;
  }
`;

export const DatasetsComp = styled.div`
  display: grid;
  grid-template-columns: 312px 1fr;
  gap: 2rem;
  margin-top: 2.5rem;

  .contractsColumn {
    grid-column: 2/3;
  }

  .contractsComp__search {
    display:flex;
    justify-content:space-between;
    background-color : var(--color-white);
    padding : 12px;
    border: 1px solid var(--color-grey-600);
    box-sizing: border-box;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 12px;  
  }
  
  .contractsComp__totalCount {
    margin-top: 2rem;
  }

  @media (max-width: 980px) {
    display: block;
  }
`;

export default DatasetsComp;
