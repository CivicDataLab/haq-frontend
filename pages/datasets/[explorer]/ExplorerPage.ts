import styled from 'styled-components';

const ExplorerPage = styled.main`
  .explorer {
    &__header {
      background-color: #fff;
      padding-bottom: 2.5rem;
      padding-top: 2.5rem;
    }

    &__breadcrumb {
      a {
        color: #888f8f;
        font-weight: bold;
      }

      svg {
        margin-left: 8px;
        fill: hsla(0, 0%, 0%, 0.6);
      }
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 2rem;

      button,
      a {
        font-weight: bold;
        border-width: 2px;
      }

      svg {
        margin-left: 8px;
        margin-right: 0;
        pointer-events: none;
      }
    }

    &__scheme-change {
      a,
      button {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
      }
      a {
        display: none;
      }

      @media (max-width: 980px) {
        a {
          display: block;
        }

        button {
          display: none;
        }
      }
    }

    &__heading {
      margin-top: 2.5rem;

      figure {
        background-color: #fff;
        max-width: 72px;
        max-height: 72px;
        display: grid;
        place-content: center;
        padding: 22px;
        border-radius: 16px;
        border: 1px solid #cdd1d1;
      }

      svg {
        width: 29px;
        height: 29px;
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 800;
        line-height: 130%;
      }

      p {
        font-weight: 500;
        line-height: 175%;
      }
    }

    &__content {
      display: flex;
      gap: 1.5rem;
    }

    &__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;

      span {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 12px;
        line-height: 130%;
        color: hsla(0, 0%, 0%, 0.6);
        background-color: hsla(0, 0%, 0%, 0.08);
        padding: 4px 6px;
      }

      strong {
        color: #02838b;
        font-weight: bold;
      }
    }

    &__summary {
      margin-top: 2.5rem;

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: space-between;
      }

      li {
        background-color: #fff;
        padding: 1.5rem 3rem;
        text-align: center;
        border-radius: 12px;
        border: 1px solid #cdd1d1;
        flex-grow: 1;
        border-left-color: #fed349;
        border-left-width: 4px;
        filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
      }

      strong {
        font-weight: 800;
        line-height: 145%;
        font-size: 22px;
      }

      span {
        display: block;
        font-weight: 500;
        line-height: 175%;
        margin-top: 4px;
        color: hsla(0, 0%, 0%, 0.6);
      }
    }

    &__viz {
      display: grid;
      gap: 2rem;
      grid-template-columns: 312px minmax(0, 1fr);
      margin-top: 2.5rem;

      h3 {
        font-weight: 800;
        font-size: 18px;
        line-height: 156%;
        border-bottom: 1px solid #eff2f2;
        padding-bottom: 1rem;
      }

      @media (max-width: 980px) {
        grid-template-columns: 1fr;
        display: block;
        margin-top: 1.5rem;
      }
    }

    .indicator-mobile {
      margin-top: 2rem;

      @media (min-width: 980px) {
        display: none;
      }
    }

    .heading {
      margin-bottom: 0.5rem;
      font-weight: 900;
      font-size: 2.5rem;
    }

    .viz {
      background-color: #fff;
      border: 1px solid #f7fdf9;
      border-radius: 6px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);

      &__header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1.5rem;
        gap: 1.5rem;
      }

      .dropdown {
        max-height: 2rem;
        margin-top: -6px;
        flex-basis: 17rem;

        display: flex;
        align-items: center;
        gap: 0.5rem;

        label {
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: hsla(0, 0%, 0%, 0.6);
        }
      }

      &__tabs {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem;

        li {
          min-width: 0;
        }

        a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: none;
          padding-bottom: 12px;
          min-width: 120%;
          display: block;
          text-align: center;
          border-bottom: 2px solid transparent;
          font-weight: bold;
          color: hsla(0, 0%, 0%, 0.32);

          svg {
            margin-bottom: -3px;
            margin-right: 5px;
            fill: hsla(0, 0%, 0%, 0.32);

            &.svg-stroke {
              stroke: hsla(0, 0%, 0%, 0.32);
            }
          }

          &[aria-selected='true'] {
            color: #de4b33;
            border-bottom: 2px solid #de4b33;

            svg {
              fill: #de4b33;

              &.svg-stroke {
                stroke: #de4b33;
              }
            }
          }
        }
      }

      &__graph {
        margin: 0 2rem 2rem;
        height: 500px;
        overflow-y: auto;
        overflow-x: auto;
      }
    }

    &__source {
      border-top: 1px solid #cdd1d1;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 1rem 0;
      margin: 0 1.5rem;

      strong {
        font-weight: bold;
        flex-basis: 8rem;
      }

      &--text {
        flex-basis: 35%;
        flex-grow: 1;
        font-size: 14px;
      }

      &--buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      p {
        color: hsla(0, 0%, 0%, 0.6);
        font-weight: 500;
        line-height: 133%;
        display: inline;
      }

      button,
      a {
        svg {
          width: 10px;
          margin-left: 8px;
        }
      }
    }

    .banner {
      margin-bottom: -10rem;
      margin-top: 4rem;

      &__content {
        p {
          margin-top: 0;
          font-weight: 500;
        }

        > div {
          display: flex;
          flex-wrap: wrap;
          margin-top: 1rem;
          gap: 1rem;
        }

        a {
          svg {
            margin: -4px 0 0 8px;
          }
        }

        button {
          svg {
            margin: 0 0 -4px 8px;
          }
        }

        .banner__notice {
          font-weight: bold;
          font-size: 12px;
          line-height: 139%;
          margin-top: 0.5rem;
          vertical-align: middle;

          svg {
            margin-right: 0.5rem;
            // width: 1.5em;
            vertical-align: middle;
          }
        }
      }
    }

    &__schemes {
      padding-top: 4rem;
      margin-top: 2.5rem;
      padding-bottom: 9rem;
      background-color: #fff;

      &--split {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: space-between;
        margin-top: 2.5rem;

        a {
          display: grid;
          background-color: #fff;
          color: hsla(0, 0%, 0%, 0.87);
          border-radius: 12px;
          padding: 1.5rem 3rem;
          border: 1px solid #cdd1d1;
          transition: box-shadow 0.2s ease-out, border-color 0.2s ease-out;
          text-decoration: none;

          flex-basis: 48%;
          flex-grow: 1;

          &:hover,
          &:focus-within {
            box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.16);
            border-color: #eff2f2;
          }

          img {
            border-radius: 8px;
            width: 100%;
            object-fit: cover;
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            margin: 1.5rem 0;
            gap: 1rem;

            li {
              text-transform: uppercase;
              font-weight: 600;
              font-size: 12px;
              line-height: 130%;
              color: hsla(0, 0%, 0%, 0.6);
              background-color: hsla(0, 0%, 0%, 0.08);
              padding: 4px 6px;
            }
          }

          h3 {
            font-weight: 800;
            font-size: 1.25rem;
            line-height: 1.3;

            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
          }

          p {
            font-weight: 500;
            line-height: 1.7;
            margin-top: 0.5rem;

            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
          }
        }
      }
    }

    &__pagination {
      font-size: 1.5em;
      background-color: #cceef1;
      margin-bottom: -5rem;
      padding: 4rem 0 5rem;

      ul {
        overflow: hidden;
      }

      li {
        margin-top: 1rem;

        &.prev {
          float: left;

          svg {
            margin-right: 2rem;
            fill: #02838b;
          }
        }

        &.next {
          float: right;
          text-align: right;
          text-align: -moz-right;

          svg {
            margin-left: 2rem;
            fill: #02838b;
          }
        }
      }

      a {
        display: block;
        border-radius: 4px;
        width: max-content;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        line-height: 175%;
      }

      strong {
        font-weight: 800;
        color: #00abb7;
        text-decoration-color: transparent;
        font-size: 18px;
      }

      span {
        text-decoration: underline;
      }
    }
  }
`;

export default ExplorerPage;
