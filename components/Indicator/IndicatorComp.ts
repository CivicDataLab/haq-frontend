import styled from 'styled-components';

export const IndicatorComp = styled.div`
  scrollbar-width: thin;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));;
  border: 1px solid hsl(300, 10%, 94%);
  border-radius: 4px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  height: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  fieldset {
    > div {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    input {
      transform: scale(1.5);
      accent-color: #666d6e;

      &:checked + label {
        font-weight: bold;
      }
    }

    label {
      font-weight: 500;
      line-height: 175%;
      margin-bottom: -3px;
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;
