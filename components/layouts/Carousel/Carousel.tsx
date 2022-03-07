import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { isArray } from 'lodash';

interface Props {
  /**
   * content for the carousel
   */
  children: any;

  /**
   * previous button content (icon or text)
   */
  prevBtn: React.ReactNode;

  /**
   * next button content (icon or text)
   */
  nextBtn: React.ReactNode;

  /**
   * label for the carousel (a11y)
   */
  label: string;
}

const Carousel = ({ children, prevBtn, nextBtn, label }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const carouselRef = useRef(null);

  // check if children prop is wrapped in a fragment container
  let carouselItems = children;
  if (children.type == React.Fragment) {
    carouselItems = children.props.children;
  }
  // if it's a single element, put it in a array
  carouselItems = !isArray(carouselItems) ? [carouselItems] : carouselItems;

  function handleArrowKeys(e) {
    if (e.key == 'ArrowRight') {
      instanceRef.current?.next();
      carouselRef.current.querySelector('.carouselNextBtn').focus();
    } else if (e.key == 'ArrowLeft') {
      instanceRef.current?.prev();
      carouselRef.current.querySelector('.carouselPrevBtn').focus();
    }
  }
  useEffect(() => {
    carouselRef.current.addEventListener('keydown', handleArrowKeys);
  }, []);

  const [refCallback, instanceRef] = useKeenSlider({
    // carousel methods
    rubberband: false,
    dragSpeed: 0.1,
    defaultAnimation: {
      duration: 800,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      var slidys = carouselRef.current.querySelectorAll('.keen-slider__slide');
      slidys.forEach(function (slidy, idx) {
        if (idx === slider.track.details.rel) {
          slidy.setAttribute('data-hidden', 'false');
          slidy.setAttribute('tabindex', '0');
        } else {
          slidy.setAttribute('data-hidden', 'true');
          slidy.removeAttribute('tabindex');
        }
      });
    },
    created() {
      setLoaded(true);
      setTimeout(() => {
        var slide = carouselRef.current.querySelector('.keen-slider__slide');
        slide.setAttribute('data-hidden', 'false');
        slide.setAttribute('tabindex', '0');
      }, 10);
    },
  });

  return (
    <CarouselWrapper
      ref={carouselRef}
      role="group"
      aria-roledescription="slider"
      aria-label={label}
    >
      <span className="sr-only" aria-live="polite">{`Showing slide ${
        currentSlide + 1
      } of ${carouselItems.length}`}</span>
      <div className="keen-slider" ref={refCallback}>
        {carouselItems.map((item, index) =>
          React.cloneElement(item, {
            key: `carouselItem-${index}`,
            className: 'keen-slider__slide',
            'data-hidden': 'true',
            'aria-roledescription': 'slide',
            role: 'group',
          })
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="carouselBtnWrapper">
          <button
            className="carouselPrevBtn"
            aria-label="Previous Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            aria-disabled={currentSlide === 0 ? 'true' : undefined}
            tabIndex={currentSlide === 0 ? -1 : undefined}
          >
            {prevBtn}
          </button>
          <button
            className="carouselNextBtn"
            aria-label="Next Slide"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            aria-disabled={
              currentSlide === carouselItems.length - 1 ? 'true' : undefined
            }
            tabIndex={
              currentSlide === carouselItems.length - 1 ? -1 : undefined
            }
          >
            {nextBtn}
          </button>
        </div>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;

export const CarouselWrapper = styled.div`
  position: relative;

  .keen-slider__slide {
    --t: opacity 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57),
      visibility 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57);
    transition: var(--t);

    &[data-hidden='true'] {
      visibility: hidden;
      opacity: 0;
    }

    *[data-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: var(--t);
    }
  }
`;
