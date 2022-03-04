import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const Carousel = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [refCallback, instanceRef] = useKeenSlider({
    rubberband: false,
    dragSpeed: 0.1,
    defaultAnimation: {
      duration: 1000,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      var slidys = document.querySelectorAll('.keen-slider__slide');
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
      var slide = document.querySelectorAll('.keen-slider__slide')[0];
      slide.setAttribute('data-hidden', 'false');
      slide.setAttribute('tabindex', '0');
    },
  });

  return (
    <Wrapper className="embla">
      <div>
        <ul className="keen-slider" ref={refCallback}>
          {data.map((item, index) => {
            return (
              <li
                key={`carousel-${index}`}
                id={`carousel-${index}`}
                className="keen-slider__slide"
                data-hidden="true"
                aria-roledescription="Slide"
                role="group"
              >
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
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            className="embla__prev"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          >
            Prev
          </button>
          <button
            className="embla__next"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          >
            Next
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled.div`
  .keen-slider__slide {
    transition: opacity 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57),
      visibility 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57);

    &[data-hidden='true'] {
      visibility: hidden;
      opacity: 0;
    }

    *[data-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57),
        visibility 0.5s cubic-bezier(0.39, 0.03, 0.56, 0.57);
    }
  }
`;
