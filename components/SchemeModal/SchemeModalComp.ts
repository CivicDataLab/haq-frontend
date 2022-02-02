import styled from 'styled-components';

export const SchemeModalComp = styled.div`
  max-width: 1216px;
  width: 90vw;
  height: 80vh;
  max-height: 716px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;

  .schemeModal__header {
    height: max-content;

    > div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eff2f2;

      h2 {
        font-size: 1.75rem;
        line-height: 130%;
        font-weight: 800;
        color: hsla(0, 0%, 0%, 0.6);
      }

      button {
        color: #c6250c;
        font-weight: 600;
        line-height: 175%;
        font-size: 1rem;
        text-decoration: underline;
      }
    }

    .search {
      margin-top: 12px;
      margin-right: 0;
      &__input {
        background-color: #ebfeff;
      }
    }
  }

  .schemeModal__body {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: minmax(0, 256px) 1fr;
    height: 567px;
    max-height: 61vh;
  }

  .schemeModal__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .listing__indicators {
    margin-right: 1rem;
    border: 1px solid #cdd1d1;
    border-radius: 6px;
    background-color: #eff2f2;
    padding: 8px;

    h3,
    li {
      font-weight: 500;
      font-size: 12px;
      line-height: 133%;
    }

    h3 {
      border-bottom: 1px solid #cdd1d1;
      padding-bottom: 8px;
    }

    ul {
      display: block;
    }

    li {
      display: block;
      margin-top: 12px;
    }

    svg {
      margin-bottom: -2px;
    }
  }

  .schemeModal__tabs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
      color: hsla(0, 0%, 0%, 0.6);
      line-height: 175%;
      font-weight: bold;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      border-radius: 4px 0px 0px 4px;

      svg {
        fill: hsla(0, 0%, 0%, 0.6);
        text-align: end;
      }

      &[aria-selected='true'] {
        color: hsla(0, 0%, 0%, 0.87);
        background-color: #eff2f2;

        span {
          position: relative;

          &::before {
            content: '\00a0';
            background-color: #046e76;
            width: 8px;
            height: 8px;
            display: inline-block;
            border-radius: 50%;
            position: absolute;
            right: 300%;
            top: 53%;
            transform: translate(-50%, -50%);
          }
        }

        svg {
          fill: hsla(0, 0%, 0%, 0.87);
        }
      }
    }
  }

  .schemeModal__content {
    background-color: #eff2f2;
    padding: 20px 24px;
    border-radius: 4px;
    overflow-y: auto;

    ul {
      display: grid;
      gap: 1rem;

      @supports (width: min(250px, 100%)) {
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
      }
    }

    a {
      font-weight: 500;
      line-height: 175%;
      text-decoration-color: transparent;
      transition: text-decoration-color 0.2s ease, color 0.2s ease;
      display: flex;
      align-items: center;
      color: hsla(0, 0%, 0%, 0.87);

      span {
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
      }

      svg {
        min-width: 28px;
        margin-right: 8px;
      }

      &:hover {
        color: #046e76;
        text-decoration-color: #046e76;
      }
    }
  }
`;

export const ModalOverlayComp = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;
`;

export default SchemeModalComp;
