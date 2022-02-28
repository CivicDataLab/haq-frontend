import { css } from 'styled-components';

export const NavComp = css`
  .navbar__web {
    background-color: var(--color-background-dark);
    padding: 13px;

    @media only screen and (max-width: 980px) {
      display: none;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }

    .header__brand {
      font-size: 1.4rem;
      font-weight: 500;
    }

    .brand_logo {
      object-fit: contain;
    }
  }

  a {
    text-decoration: none;
  }

  .navbar {
    position: relative;

    &__container {
      display: flex;
      gap: 1rem;
    }

    .has-submenu {
      position: relative;

      &.open {
        ul {
          display: block;
        }
      }
    }

    button {
      color: var(--text-dark-high);

      svg {
        fill: var(--text-dark-high);
      }

      & + ul {
        position: absolute;
        top: 160%;
        background-color: var(--color-carrot-3);
        padding: 8px;
        width: max-content;
        border-radius: 4px;
        min-width: 210px;
        display: none;

        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-bottom: 17px solid var(--color-carrot-3);
          top: -10px;
          left: 10%;
        }

        li {
          margin-top: 4px;
          transition: background-color 200ms ease;
          border-radius: 4px;

          &:first-child {
            margin-top: 0;
          }

          &:hover {
            background-color: var(--color-carrot);
          }
        }

        a {
          text-decoration: underline;
          line-height: 1.5;
          padding: 4px 8px 4px 12px;
          color: var(--text-dark-high);
          fill: var(--text-dark-high);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    &__item {
      padding: 8px;
      align-items: center;
      display: flex;
      color: var(--text-dark-high);
      transition: background-color 200ms ease;

      &:hover {
        background-color: var(--background-dark-hover);
      }

      &--active {
        box-shadow: inset 0 -2px 0 0 #fff;
        font-weight: 500;

        @media (max-width: 720px) {
          box-shadow: inset 3px 0 0 0 #fff;
        }
      }
    }
  }
`;

export default NavComp;
