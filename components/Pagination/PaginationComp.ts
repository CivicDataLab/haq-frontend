import styled from 'styled-components';
import { NativeSelect } from 'components/Dropdown/DropdownComp';

export const PaginationComp = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #f2eff2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr repeat(3, max-content);

    @media (max-width: 720px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  ${NativeSelect} {
    max-width: 120px;
  }
`;

export const PaginationJump = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 20px;

  @media (max-width: 720px) {
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

export const PaginationButtons = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    grid-row: 2/3;
    grid-column: 1/3;
    justify-self: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }

  button {
    border-radius: 4px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  span {
    line-height: 140%;
    font-weight: 500;
    color: hsla(0, 0%, 0%, 0.6);

    @media (max-width: 720px) {
      margin: 0 5px;
    }
  }

  .pagination__back {
    background-color: rgba(0, 0, 0, 0.078);
    margin-left: 1rem;

    &:active {
      transform: scale(0.9);
      background-color: rgba(0, 0, 0, 0.2);
    }

    svg {
      transform: rotate(180deg);
      fill: #545454;
      margin-bottom: -2px;
    }
  }

  .pagination__next {
    margin-left: 0.5rem;
    background-color: #076775;

    &:active {
      transform: scale(0.9);
      background-color: #044953;
    }

    svg {
      fill: white;
    }
  }
`;

export default PaginationComp;
