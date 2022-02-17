import styled from 'styled-components';

export const HomePage = styled.main`
  .component {
    border-bottom: 1px solid grey;
    padding-bottom: 2rem;

    h1 {
      text-align: center;
    }

    > h2 {
      padding: 2rem 0;
      font-weight: bold;
      font-size: 1.3rem;
    }

    &.buttons {
      button {
        margin-right: 1rem;
      }

      > div {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
  }
`;
