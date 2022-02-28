import { css } from 'styled-components';

export const NavComp = css`
  .navbar__web {
    background-color: var(--nav-bg);
    padding: 13px;

    @media only screen and (max-width: 800px) {
      display: none;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }

    .header__brand {
      font-size: 0;
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

    &__item {
      padding: 8px;
      align-items: center;
      display: flex;
      color: var(--text-dark-high);
      transition: background-color 200ms ease;
      width: max-content;

      &:hover {
        background-color: var(--nav-bg-hover);
      }

      &--active {
        box-shadow: inset 0 -2px 0 0 #fff;
        font-weight: 500;

        @media (max-width: 800px) {
          box-shadow: inset 3px 0 0 0 #fff;
        }
      }
    }

    button {
      color: var(--text-dark-high);

      svg {
        fill: var(--text-dark-high);
        pointer-events: none;
      }

      & + ul {
        position: absolute;
        top: 160%;
        right: 0;
        background-color: var(--nav-submenu);
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
          border-bottom: 17px solid var(--nav-submenu);
          top: -10px;
          right: 5px;
        }

        li {
          margin-top: 4px;
          transition: background-color 200ms ease;
          border-radius: 4px;

          &:first-child {
            margin-top: 0;
          }

          &:hover {
            background-color: var(--nav-submenu-hover);
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
  }
`;

export default NavComp;
