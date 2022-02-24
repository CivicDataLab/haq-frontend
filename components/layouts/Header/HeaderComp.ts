import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 2.5rem;
  display: grid;
  align-items: flex-start;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;

  @media (max-width: 480px) {
   margin-top: 1.5rem;
  }
`;

const HeaderComp = styled.div`
  background-color: var(--color-background-light);
  color: var(--text-light-high);

  figure {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
    background-color: var(--color-background-lighter);
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
    border-radius: 12px;

    svg {
      width: 148px;
    }

    grid-column: 1/2;
    grid-row: 1/3;
    margin-right: 2rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.6rem;

    grid-column: 2/3;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    grid-column: 2/3;
    border-bottom: var(--separator-2);
    height: 100%;

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }

  @media (max-width: 980px) {
    figure {
      padding: 24px;

      svg {
        width: 120px;
      }
    }
  }

  @media (max-width: 480px) {
    figure {
      padding: 11px;

      svg {
        width: 66px;
      }
    }

    p {
      grid-column: 1/3;
    }
  }
`;

export default HeaderComp;
