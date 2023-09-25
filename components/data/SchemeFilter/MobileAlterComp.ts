import styled from 'styled-components';
import { ButtonComp } from 'components/actions/Button';

export const MobileAlterComp = styled.div`

  .data-alter {
    background-color: var(--color-background-lighter);
    border-radius: 8px;
    border: var(--border-2);
    display: flex;
    justify-content: space-between;
    align-items: center;


    ${ButtonComp} {
      padding: 6px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08) inset;
      > svg {
        display: flex;
        justify-content: center;
        margin: 0;
        color: white;
      }
    }
    &__text {
      line-height: 130%;
      font-size: 1.25rem;
      font-weight: 500;

      @media (max-width: 720px) {
        font-size: 1rem;
      }
    }

    &__buttons {
      display: flex;
      gap: 12px;

      .alter__small {
        display: none;
        border: none;
      }

      @media (max-width: 540px) {
        button {
          display: none;
        }
        .alter__small {
          display: block;
        }
      }
    }
  }

  @media (max-width: 540px) {
    fieldset {
      padding-inline: 16px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-600);
  border-radius: 12px 12px 0px 0px;
  padding-inline: 24px;
  padding-block: 24px 20px;
  border-bottom: var(--separator-5-2);

  @media (max-width: 540px) {
    padding-inline: 16px;
  }

  h1 {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    line-height: 26px;
    margin: 0;
  }

  button {
    color: var(--color-secondary);
    text-decoration-line: underline;
    text-transform: capitalize;
  }
`;

export const Wrapper = styled.div`
  padding-inline: 24px;
  background-color: var(--color-background-lighter);
  border-radius: 0px 0px 12px 12px;

  @media (max-width: 540px) {
    padding-inline: 16px;
  }
`;

export const FilterAlter = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  margin-top: 0.5rem;

  ul {
    width: 200px;
    margin-right: 1.25rem;

    li {
      margin-top: 0.5rem;

      &:first-of-type {
        margin-top: 1rem;
      }
    }

    a {
      width: 100%;
      padding: 9px 8px;
      display: block;
      text-decoration: none;
      text-transform: capitalize;
      border-radius: 4px;
      background-color: var(--color-background-lighter);
      line-height: 137%;

      &[aria-selected='true'] {
        background-color: var(--color-amazon-0);
        font-weight: 500;
      }
    }

    @media (max-width: 480px) {
      width: 144px;
    }
  }
`;

export const Fieldset = styled.fieldset`
  padding-top: 0;
  height: 40vh;
  padding: 0;

  input {
    margin-right: 12px;
    accent-color: var(--color-primary);

    &[type='radio'] {
      padding: 6px 0;
      transform: scale(1.5);
    }
  }

  &#modalSort {
    overflow-y: auto;

    label {
      padding-left: 3px;
    }
  }

  [role='tabpanel'] {
    overflow-y: auto;
    max-height: 39vh;
  }

  label {
    display: flex;
    margin-top: 20px;
    margin-left: 8px;
    align-items: center;
    font-weight: 500;
    line-height: 140%;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-top: var(--separator-5-2);

  button {
    width: 100%;
  }

  @media (max-width: 540px) {
    padding: 8px 0;
  }
`;
