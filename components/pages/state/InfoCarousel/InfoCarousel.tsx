import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/layouts';
import Image from 'next/image';
import { Button } from 'components/actions';
import {
  CarouselWrapper,
  CarouselBtnWrapper,
} from 'components/layouts/Carousel/Carousel';
import { getStrapiMedia } from 'lib/media';
import ButtonComp from 'components/actions/Button/ButtonComp';
import { Heading } from 'components/layouts/Heading';
import { CarouselIcon } from 'components/icons';

const InfoCarousel = ({ carousel }) => {
  return (
    <Wrapper>
      <div className="container">
        <CarouselHeading>
          <div style={{ display: 'flex' }}>
            <hr />
            <Heading as="h5" variant="h5l" color="var(--text-light-light)">
              handpicked dataset
            </Heading>
          </div>
          <Heading as="h1" variant="h1l" color="var(--text-light-high)">
            Did You Know ?
          </Heading>
        </CarouselHeading>
        <Carousel
          label="handpicked datasets"
          nextBtn={<CarouselIcon/>}
          prevBtn={<CarouselIcon/>}
        >
          {carousel.map((item, index) => (
            <div key={`carousel-${index}`}>
              <div className="carousel__content">
                <Heading as="h2" variant="h2l" color="var(--text-light-high)">
                  {item.title}
                </Heading>
                <Heading as="p" variant="carousel" color="rgba(0, 0, 0, 0.60)" mt="16px" mb="24px">
                  {item.content}
                </Heading>
                <Button
                  href={item.link}
                  kind="secondary"
                  size="md"
                  bg="var(--color-violet-2)"
                  style={{ textDecoration: 'none' }}
                >
                  {' '}
                  Explore More{' '}
                </Button>
              </div>
              <figure>
                <Image
                  alt=""
                  className="placeholder"
                  src={getStrapiMedia(item.src.url)}
                  height={350}
                  width={650}
                />
              </figure>
            </div>
          ))}
        </Carousel>
      </div>
    </Wrapper>
  );
};

export default InfoCarousel;

const Wrapper = styled.div`
  .carousel__content {
    max-width: clamp(0px, 100%, 500px);
  }

  figure {
    flex-grow: 1;
    @media (max-width: 935px) {
      display: none;
    }
  }

  ${ButtonComp} {
    display: inline-flex;
  }

  ${CarouselBtnWrapper} {
    margin-top: -60px;

    .carouselPrevBtn {
      svg {
        transform: rotate(180deg);
        filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
        margin-right: 10px;
      }
    }
    .carouselNextBtn {
      filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
    }

    @media (max-width: 1160px) {
      margin-top: 30px;
      display: block;
    }
  }

  ${CarouselWrapper} {
    background: var(--color-violet-0);
    padding: 32px;
    border: 1px solid #d1cdd1;
    box-sizing: border-box;
    border-radius: 12px;

    @media (max-width: 768px) {
      padding: 20px;
    }

    .keen-slider__slide {
      display: flex;
      flex-basis: 50%;
      gap: 24px;
    }
  }
`;

const CarouselHeading = styled.div`
  margin: 40px 0 40px 0;
  hr {
    width: 56px;
    background: var(--color-sapphire);
    border-radius: 1px;
    margin: 15px;
  }
`;
