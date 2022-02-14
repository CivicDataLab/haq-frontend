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
   grid-template-rows: max-content 1fr;
   grid-column-gap: 2rem;
   margin-top: 2.5rem;

  .contractsComp__filter {
    grid-area: 1 / 1 / 2 / 2;
  }

  .contractsColumn {
    grid-area: 1 / 2 / 2 / 5;
  } 

  .contractsComp__sortRow {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 1px;
    margin-top : 1rem;
  }
    
    .contractsComp__total { 
        grid-area: 1 / 1 / 2 / 5;
        position:relative;
        top:20%; 
    }
    
    .contractsComp__dropdown { 
        grid-area: 1 / 5 / 2 / 6; 
    } 
 `
 ;

export default DatasetsComp;
