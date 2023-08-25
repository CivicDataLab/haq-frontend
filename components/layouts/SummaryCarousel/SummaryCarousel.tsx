import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'components/layouts';
import { Button } from 'components/actions';
import { CarouselBtnWrapper } from '../Carousel/Carousel';
import { Heading as StyledText } from 'components/layouts/Heading';

type Props = {
  title?: React.ReactNode;
  cards: {
    value: string;
    text: string;
  }[];

  titleAs?: 'h2' | 'h3' | 'h4' | 'span' | 'p';
  displayLength: number;
};

const SummaryCarousel = ({
  title,
  cards,
  titleAs = 'h3',
  displayLength,
}: Props) => {
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [childrenLength, setChildrenLength] = React.useState(1);
  console.log(childrenLength);

  function current(data: number, length: number) {
    setCurrentSlide(data);
    setChildrenLength(length);
  }

  function chunk(items, size) {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) {
      chunks.push(items.splice(0, size));
    }

    return chunks;
  }

  const variableNames = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const chunks = chunk(cards, displayLength);
  const chunkedVariables = {};

  for (let i = 0; i < chunks.length && i < variableNames.length; i++) {
    chunkedVariables[variableNames[i]] = chunks[i];
  }

  console.log(chunkedVariables);
  const svgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      fill="none"
      viewBox="0 0 56 56"
      className="x"
    >
      <path
        fill="#FFF"
        d="M56 28c0 15.464-12.536 28-28 28S0 43.464 0 28 12.536 0 28 0s28 12.536 28 28Z"
        opacity=".63"
      />
      <path
        fill="#000"
        d="M21 29h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L32.17 27H21c-.55 0-1 .45-1 1s.45 1 1 1Z"
      />
    </svg>
  );

  return Object.keys(chunkedVariables).length > 0 ? (
    <Wrapper>
      <div className="container carousel-wrapper">
        <Heading>
          {title && typeof title === 'string' ? (
            <Title as={titleAs}>{title}</Title>
          ) : (
            title
          )}
        </Heading>

        <Carousel
          label=" "
          nextBtn={svgIcon}
          prevBtn={svgIcon}
          current={current}
        >
          {Object.keys(chunkedVariables).map((variableName) => (
            <div key={`carouselItem-${variableName}`}>
              <div className="carousel-header">
                <StyledText
                  color="var(--text-light-medium)"
                  as="h2"
                  variant="h2l"
                >
                  Uttar Pradesh - Treasury Data
                </StyledText>
                <Button size="sm" bg="#D26F6E">
                  View Treasury Schemes
                </Button>
              </div>
              <ul key={`list-${variableName}`}>
                {chunkedVariables[variableName]?.map((item, index) => (
                  <li key={`summary-${variableName}-${index}`}>
                    <div></div>
                    <strong>{item.value}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Carousel>
      </div>
    </Wrapper>
  ) : null;
};

export default SummaryCarousel;


const Wrapper = styled.div`
  background: var(--honey-00, #fff0e0);
  padding-top: 40px;
  padding-bottom: 120px;

  .carousel-wrapper {
    margin-top: 24px;
    border-bottom: var(--separator-6);
    border-radius: 8px;
    border: 1px solid var(--grey-05, #d1cdd1);
    background: var(--grey-00, #fff);
    padding: 32px 40px 40px 40px;

    @media (max-width: 768px) {
      padding: 24px;
    }

    > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    ul {
      margin-top: 20px;
      gap: 14px;
      flex-wrap: wrap;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

      li {
        text-align: center;
        background-color: var(--color-background-lighter);
        padding: 20px 16px;
        border: var(--border-1);
        border-radius: 4px;
        filter: drop-shadow(var(--box-shadow-1));
        flex-basis: 214px;
        flex-grow: 1;
        position: relative;
        height: 111px;

        > div {
          width: 4px;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: var(--honey-01-base, #fbb670);
        }
      }

      strong {
        font-weight: 900;
      }

      span {
        display: block;
        font-size: 0.75rem;
        color: var(--text-light-medium);
        line-height: 1.7;
        margin-top: 4px;
      }
    }

    .carousel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      flex-wrap: wrap;
      gap: 16px;
    }

    ${CarouselBtnWrapper} {
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      bottom: -120px;

      .carouselPrevBtn {
        svg {
          transform: rotate(180deg);
          height: 48px;
          width: 48px;
        }
      }
      .carouselNextBtn {
        svg {
          height: 48px;
          width: 48px;
        }
      }
    }
  }
`;

const Title = styled.h3`
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;
