import styled from 'styled-components';

export const IndicatorComp = styled.div`
  scrollbar-width: thin;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
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

export const IndicatorMobileComp = styled.div`
  padding: 1rem 1.5rem;
  background-color: $bg-lightest;
  border-radius: 8px;
  filter: $drop-shadow;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include media.widerThan('sprout') {
    display: none;
  }

  .indicator-mobile__text {
    line-height: 130%;
    font-size: 1.25rem;
    font-weight: 500;

    @include media.narrowerThan('seedling') {
      font-size: 1rem;
    }
  }

  .indicator-mobile__buttons {
    button {
      border: 2px solid $color-sapphire;
      border-radius: 4px;
      color: $color-sapphire;
      font-weight: 500;
      vertical-align: middle;
      display: inline-flex;

      padding: 8px 16px;
      font-size: 0.8rem;
      line-height: 1.8;

      &:last-child {
        margin-left: 12px;
      }

      @include media.narrowerThan('seed') {
        font-size: 0;
        border: none;
        padding: 8px 8px;
      }
    }
  }

  .indicator-mobile__svg {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }

  .indicator-mobile__filter {
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
        background-color: $grey-6;
        line-height: 137%;

        &[aria-selected='true'] {
          background-color: $bg-lightest;
          font-weight: 500;
        }
      }

      @include media.narrowerThan('seed') {
        width: 144px;
      }
    }
  }
  .indicator-mobile__footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 1rem;
    margin-top: 1rem;

    button {
      width: 49%;
    }
  }
`;
