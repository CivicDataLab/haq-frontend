import Radio from 'components/layouts/Radio';
import { RadioItem } from 'components/layouts/Radio/Radio';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { generateSlug } from 'utils/data';

const Indicator = ({ selectedIndicator, schemeData, currentSlug }) => {
  return (
    <IndicatorWrapper className="indicator">
      <h3>Schemes</h3>
      <fieldset>
        <legend className="sr-only">Choose Indicator:</legend>
        {schemeData.map((item: any) => {
          return (
            <Link
              key={item.Scheme} // Make sure to provide a unique key for each element in the array
              href={{
                pathname: `/${currentSlug}/budget/`,
                query: {
                  scheme: `${generateSlug(item.Scheme)}`,
                },
              }}
              scroll={false}
              passHref
            >
              <Radio
                color="var(--color-amazon)"
                data-selected={
                  selectedIndicator === item.Scheme ? 'true' : 'false'
                }
                checked={selectedIndicator === item.Scheme}
                data-type={item.Scheme}
                id={item.Scheme}
                text={<>{item.Scheme}</>}
                name="indicators"
              />
            </Link>
          );
        })}
      </fieldset>
    </IndicatorWrapper>
  );
};

export default Indicator;

const Filters = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Info = styled.div`
  display: none;
  font-weight: 400;
  line-height: 1.7;
  font-size: 0.75rem;
  color: var(--text-light-medium);
  grid-column: 2/3;
  pointer-events: none;
`;

export const IndicatorWrapper = styled.div`
  background-color: var(--color-background-lighter);
  filter: drop-shadow(var(--box-shadow-1));
  border: var(--border-2);
  border-radius: 4px;
  height: max-content;
  padding: 24px;
  height: 100%;

  fieldset {
    overflow-y: auto;
    max-height: 616px;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 5px;
    }
  }

  h3 {
    color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
  }

  ${RadioItem} {
    line-height: 1.7;
    margin-top: 8px;
    color: var(--text-light-high);
    letter-spacing: 0.01em;
    padding: 8px;
    cursor: pointer;

    input {
      pointer-events: none;
    }

    input:checked {
      + ${Info} {
        display: block;
      }
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;
