import styled from 'styled-components';

export const DatasetsPage = styled.main`
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

  .contractsComp__sortRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }

  @media (max-width: 980px) {
    display: block;
  }
`;

export default DatasetsComp;
