import styled from 'styled-components';

const CarouselComp = styled.div`
  padding: 75px 0 10rem;

  .container {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 15rem;
  }

  .carousel__content {
    display: flex;
    width: 80%;
    text-align: center;
    margin-inline: auto;

    figure {
      @media (max-width: 720px) {
        display: none;
      }
    }

    @media (min-width: 720px) {
      figure {
        display: grid;
        align-items: center;
        padding-right: 0;
      }

      article {
        width: 90%;
      }
    }
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
  }

  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    color: #06464a;
    margin-top: 2.5rem;
  }

 .carousel__prev,
 .carousel__next {
    min-width: 44px;
    height: 44px;
    position: absolute;
    top: 8rem;
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  }

 .carousel__prev {
    /* margin-right: 3rem; */
    left: 1rem;

    svg {
      transform: rotate(180deg);
    }
  }

 .carousel__next {
    right: 1rem;
  }

 .carousel__item {
    display: none;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &--current {
      display: flex;
    }
  }

  .carousel__nav {
    position: absolute;
    bottom: -8rem;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
    display: flex;

    li {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;
      width: 100%;
    }

    button {
      font-size: 0;
      line-height: 0;
      display: block;
      width: 20px;
      height: 20px;
      padding: 5px;
      cursor: pointer;
      color: transparent;
      border: 0;
      /* outline: none; */
      background: transparent;

      &::before {
        font-size: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 1rem;
        height: 1rem;
        content: ' ';
        text-align: center;
        color: #00abb7;
        border: 1px solid #00abb7;
        border-radius: 50%;
      }

      &[aria-pressed='true'] {
        &::before {
          background-color: #06464a;
          border-color: #06464a;
        }
      }

      &:focus-visible {
        &::before {
          outline-width: 5px;
          outline-color: #78aeda;
          outline-style: solid;
        }
      }
    }
  }

  @media (max-width: 720px) {
    figure {
      display: none;
    }

    p {
      font-size: 1rem;
    }

    .carousel__prev {
      margin-right: 2rem;
    }

    .carousel__next {
      margin-left: 2rem;
    }
  }
`;

export default CarouselComp;
