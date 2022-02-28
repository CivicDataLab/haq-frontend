import { css } from 'styled-components';

export const MobileNavComp = css`
  .m-header {
    display: none;
    align-items: center;
    background-color: var(--nav-bg);

    @media (max-width: 800px) {
      display: flex;
    }

    .container {
      display: flex;
      padding-block: 16px;
      justify-content: flex-start;
    }

    .header__brand {
      font-size: 0;
    }

    .brand_logo {
      object-fit: contain;
    }

    &__button {
      margin-right: 1rem;
    }

    &__link {
      justify-self: flex-end;

      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  .m-navbar {
    background-color: var(--nav-mobile);
    color: var(--text-dark-high);

    a {
      text-decoration: none;
    }

    button {
      color: var(--text-dark-high);
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--nav-bg);
      height: 4rem;
      padding-left: 1.5rem;

      button {
        height: 100%;
        width: 4rem;
        font-size: 1.5rem;
      }
    }

    .navbar__item {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 2rem;

      &[type='button'] {
        &::after {
          border-bottom: 2px solid #0b0c0c;
          border-bottom-color: rgb(11, 12, 12);
          border-right: 2px solid #0b0c0c;
          border-right-color: rgb(11, 12, 12);
          content: ' ';
          display: inline-block;
          height: 8px;
          margin: 0 2px 0 1rem;
          transform: translateY(-35%) rotate(45deg);
          vertical-align: middle;
          width: 8px;
          border-color: var(--color-white);
          transition: transform 300ms ease;
        }
      }

      &[aria-expanded='true'] {
        background-color: var(--nav-bg-hover);

        &::after {
          transform: rotate(-135deg);
        }

        & + ul {
          background-color: var(--nav-bg-hover);
          padding-bottom: 1rem;
        }
      }
    }

    &__nested {
      width: 100%;

      a {
        padding: 1rem 1.5rem;
        display: block;
        padding-left: 2rem;
        display: flex;
        justify-content: space-between;
      }

      svg {
        fill: var(--text-dark-high);
      }
    }

    @media (max-width: 480px) {
      min-width: 248px;
    }
  }
`;

export default MobileNavComp;
