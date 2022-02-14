import styled from 'styled-components';

const HeaderComp = styled.div`
  background-color: #076775;
  color: #fdfcfc;

  .container {
    padding-top: 1rem;
    display: block;
  }

  h2 {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.6rem;
    grid-column: 2/3;
    grid-row: 1/2;
    word-break: break-all;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    grid-column: 2/3;
    grid-row: 2/3;

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }
`;
export default HeaderComp;
