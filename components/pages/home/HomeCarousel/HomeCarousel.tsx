import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/layouts';
import Image from 'next/image';
import CarouselComp from 'components/layouts/Carousel/CarouselComp';
const HomeCarousel = () => {
  const data = [
    {
      text: 'Beti Bachao Beti Padhao',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      link: 'k',
      image: '/assets/images/placeholder.jpg',
    },
    {
      text: 'Beti Bachao ',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      link: 'k',
      image: '/assets/images/placeholder.jpg',
    },
  ];
  return (
    <Wrapper>
      <div className="container">
        <CarouselHeading>
          <div className="heading__text">
            <hr />
            <h4>handpicked dataset</h4>
          </div>
          <div className="heading__content">Did You Know ?</div>
        </CarouselHeading>
        <Carousel data={data} />
      </div>
    </Wrapper>
  );
};

export default HomeCarousel;

const Wrapper = styled.div`
  ${CarouselComp} {
    .container {
      border: 1px solid #d1cdd1;
      box-sizing: border-box;
      border-radius: 12px;
      background-color: #ebf0ff;
    }

    .carousel__content {
      display: flex;
      flex-basis: 60%;
      flex-grow: 1;
      padding: 32px 48px;
      text-align: unset;

      @media (max-width: 980px) {
        width: 90%;
      }
    }

    ul {
      padding-bottom: 20px;
    }

    p {
      font-weight: 500;
      font-size: 24px;
      color: #06464a;
      margin-top: 0;
    }

    small {
      padding-top: 16px;
      padding-bottom: 24px;
      font-size: 16px;
      font-weight: 400;
    }

    .btn {
      padding-bottom: 15px;
    }

    .btn-primary {
      background-color: #4965b2;
      border-radius: 4px;
      padding: 8px 12px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
    }

    .carousel__prev,
    .carousel__next {
      top: 5rem;
    }

    .carousel__prev {
      left: -1rem;
    }

    .carousel__next {
      right: -1rem;
    }

    .carousel__item {
      > div {
        display: flex;
        flex-direction: column;
        align-items: start;
      }
    }
  }
`;

const CarouselHeading = styled.div`
  padding: 100px 0 40px 0;
  .heading__text {
    display: flex;
    h4 {
      color: rgba(0, 0, 0, 0.32);
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
    }
    hr {
      width: 56px;
      background: #4965b2;
      border-radius: 1px;
      margin: 15px;
    }
  }

  .heading__content {
    font-weight: normal;
    font-size: 40px;
    padding: 10px 0;
    line-height: 1;
  }
`;
