import styled from 'styled-components';

const DatasetsComp = styled.div`
   margin-top :1rem;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: 1fr;
   grid-column-gap: 20px;

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
