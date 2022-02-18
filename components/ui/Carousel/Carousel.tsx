import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CarouselComp from './CarouselComp';

const Carousel = ({ data }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!document.querySelector('.carousel__item--current'))
      document
        .querySelector('#carousel-0')
        .classList.add('carousel__item--current');

    if (!document.querySelector('.carousel__nav [aria-pressed="true"]'))
      document
        .querySelector('.carousel__nav button')
        .setAttribute('aria-pressed', 'true');
  }, []);

  useEffect(() => {
    // changing position of carousel nav
    const navButton = document.querySelector(`[data-number="${position}"]`);
    if (navButton.getAttribute('aria-pressed') == 'false') {
      document
        .querySelector('.carousel__nav [aria-pressed="true"]')
        .setAttribute('aria-pressed', 'false');
      navButton.setAttribute('aria-pressed', 'true');

      document
        .querySelector(`.carousel__item--current`)
        .classList.remove('carousel__item--current');
      document
        .querySelector(`#carousel-${position}`)
        .classList.add('carousel__item--current');
    }

    // changing the slide
    document
      .querySelector(`.carousel__item--current`)
      .classList.remove('carousel__item--current');
    document
      .querySelector(`#carousel-${position}`)
      .classList.add('carousel__item--current');
  }, [position]);

  function updateCarousel(n: number) {
    if (n == -1 && position == 0) setPosition(data.length - 1);
    else if (n == 1 && position == data.length - 1) setPosition(0);
    else setPosition(position + n);
  }

  function handleCarouselNav(e: any) {
    const navButton = e.target as HTMLInputElement;
    const newSlide = navButton.getAttribute('data-number');
    setPosition(parseInt(newSlide));
  }

  return (
    <CarouselComp className="carousel">
      <div className="container">
        <button
          className="carousel__prev"
          onClick={() => updateCarousel(-1)}
          type="button"
        >
          <span className="sr-only">Previous Slide</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="none"
            viewBox="0 0 56 56"
          >
            <path
              fill="#F65940"
              d="M56 28c0 15.464-12.536 28-28 28S0 43.464 0 28 12.536 0 28 0s28 12.536 28 28Z"
              opacity=".63"
            />
            <path
              fill="#EFF2F2"
              d="M21 29h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L32.17 27H21c-.55 0-1 .45-1 1s.45 1 1 1Z"
            />
          </svg>
        </button>
        <ul className="carousel__content" aria-live="polite">
          {data.map((item, index) => {
            return (
              <li
                key={`carousel-${index}`}
                id={`carousel-${index}`}
                className="carousel__item"
              >
                {/* <figure>
                  <Image src={item.image} alt="" width={176} height={176} />
                </figure> */}
                <div>
                  <p>{item.text}</p>
                  <a className="btn-primary" href={item.link}>
                    Read More
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className="carousel__next"
          onClick={() => updateCarousel(1)}
          type="button"
        >
          <span className="sr-only">Previous Slide</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="none"
            viewBox="0 0 56 56"
          >
            <path
              fill="#F65940"
              d="M56 28c0 15.464-12.536 28-28 28S0 43.464 0 28 12.536 0 28 0s28 12.536 28 28Z"
              opacity=".63"
            />
            <path
              fill="#EFF2F2"
              d="M21 29h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L32.17 27H21c-.55 0-1 .45-1 1s.45 1 1 1Z"
            />
          </svg>
        </button>
        <ul className="carousel__nav">
          {data.map((item, index) => {
            return (
              <li key={`carouselNav-${index}`}>
                <button
                  aria-pressed="false"
                  onClick={handleCarouselNav}
                  data-number={index}
                >
                  <span className="sr-only">Slide:</span> {index + 1}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </CarouselComp>
  );
};

export default Carousel;
