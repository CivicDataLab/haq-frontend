import styled from 'styled-components';

export const PaginationComp = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  border: var(--border-2);
  align-items: center;
  gap: 1rem;
  font-weight: var(--font-weight-medium);

  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr repeat(2, max-content);

    @media (max-width: 620px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  @media (max-width: 370px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const PaginationJump = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 20px;
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);

  @media (max-width: 620px) {
    border-right: none;
    justify-self: flex-end;
    padding-right: 0;
  }

  input {
    width: 56px;
    height: 40px;
    border-radius: 4px;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.12);
    text-align: center;
  }
`;

export const ButtonsLabel = styled.span`
  color: var(--text-light-light);
  font-weight: normal;
  line-height: 140%;

  span {
    font-weight: 500;

    @media (max-width: 620px) {
      margin: 0 5px;
    }
  }
`;

export const PaginationButtons = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
  }

  @media (max-width: 620px) {
    grid-row: 2/3;
    grid-column: 1/3;
    justify-self: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }

  button {
    border-radius: 4px;
    padding: 4px;
    line-height: 0;
  }

  .pagination__back {
    background-color: var(--text-light-disabled);
    margin-left: 1rem;

    &:active {
      transform: scale(0.9);
      background-color: rgba(0, 0, 0, 0.2);
    }

    svg {
      transform: rotate(90deg);
      fill: #545454;
    }
  }

  .pagination__next {
    margin-left: 8px;
    background-color: var(--color-primary);

    &:active {
      transform: scale(0.9);
      background-color: #044953;
    }

    svg {
      transform: rotate(-90deg);
      fill: white;
    }
  }
`;

export default PaginationComp;
