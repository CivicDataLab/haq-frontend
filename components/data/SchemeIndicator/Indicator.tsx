import Radio from 'components/layouts/Radio';
import { RadioItem } from 'components/layouts/Radio/Radio';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { generateSlug, applyFilters } from 'utils/data';
import SearchBar from './SearchBar';
import { SchemeFilter } from 'components/data/SchemeFilter';
import * as filters from 'data/searchfilter/searchfilter';

const Indicator = ({ selectedIndicator, schemeData, currentSlug }) => {

  const indicators = Object.keys(schemeData);

  // const indicators = [
  //   ...new Set(schemeData.map((item) => item.Scheme || null)),
  // ];

  const isBrowser = typeof window !== 'undefined';

  const initialDatsetsFilters = isBrowser
    ? sessionStorage.getItem('datsetsFilters') || ''
    : '';

  const [searchTerm, setSearchTerm] = useState('');
  const [searchedData, setSearchedData] = useState(indicators);
  const [datsetsFilters, setDatasetsFilters] = useState<string>(
    initialDatsetsFilters
  );

  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem('datsetsFilters', datsetsFilters);
    }
  }, [datsetsFilters, isBrowser]);

  function handleDatasetsChange(val: any) {
    setDatasetsFilters(val.value);
  }

  useEffect(() => {
    const filteredData = indicators.filter((indicator) => {
        const name = indicator.toLowerCase();
        const schemeName = schemeData[name].Scheme.toLowerCase();
        return schemeName.includes(searchTerm.toLowerCase());
      })
      .filter((indicatorName: string) => {
        if (!datsetsFilters) {
          return true;
        }
        const obj = schemeData[indicatorName];
        const mode = obj?.Scheme_mode?.toLowerCase();
        const type = obj?.Scheme_type?.toLowerCase();
        return applyFilters(mode, type, datsetsFilters);
      });
    setSearchedData(filteredData);
  }, [searchTerm, datsetsFilters, schemeData]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // useEffect(() => {
  //   const filteredData = indicators
  //     .filter((indicator: string) => {
  //       const name = indicator.toLowerCase();
  //       return name.includes(searchTerm);
  //     })
  //     .filter((indicatorName: string) => {
  //       console.log(indicatorName)
  //       if (!datsetsFilters) {
  //         return true;
  //       }
  //       const obj = schemeDataObject[indicatorName];
  //       const mode = obj?.Scheme_mode?.toLowerCase();/ Make sure to provide a unique key for each element in the array
  //       const type = obj?.Scheme_type?.toLowerCase();
  //       return applyFilters(mode, type, datsetsFilters);
  //     });
  //   setSearchedData(filteredData);
  // }, [searchTerm, datsetsFilters, schemeData]);



  // const schemeDataObject = schemeData.reduce((acc, item) => {
  //   acc[item.Scheme] = item;
  //   return acc;
  // }, {});

  // console.log(schemeDataObject)

  return (
    <IndicatorWrapper className="indicator">
      <h3>Schemes</h3>

      <Filters>
        <SearchBar handleChangeSearchTerm={handleChangeSearchTerm} />
        <SchemeFilter
          data={filters.facets}
          newData={handleDatasetsChange}
          fq={datsetsFilters}
        />
      </Filters>

      <fieldset>
        <legend className="sr-only">Choose Indicator:</legend>
        {searchedData.map((indicatorName: any) => {
          const obj = schemeData[indicatorName];
          //const obj = schemeDataObject[indicatorName];
          if (obj) {
            return (
              <Link
                key={obj.Scheme}
                href={{
                  pathname: `/${currentSlug}/budget/`,
                  query: {
                    scheme: `${obj.Scheme_code}`,
                  },
                }}
                scroll={false}
                passHref
              >
                <label className="indicator__label" htmlFor={obj.Scheme}>
                  {obj.Scheme}
                  <input
                    type="radio"
                    data-selected={
                      selectedIndicator == obj.Scheme_code ? 'true' : 'false'
                    }
                    id={obj.Scheme}
                    name="indicator-group"
                    className="indicator__radio"
                    checked={selectedIndicator === obj.Scheme_code}
                    readOnly
                  />
                  <span className="indicator__span" />
                </label>
              </Link>
            );
          } else {
            return null;
          }
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
    max-height: 620px;
    scrollbar-width: thin;
    margin-top: 16px;

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

  // @media (max-width: 980px) {
  //   display: none;
  // }

  .indicator__label {
    display: block;
		position: relative;
		padding-left: 2.2rem;
		margin-bottom: 1.2rem;
		cursor: pointer;
		font-size: 1rem;
		user-select: none;

    input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			padding: 0;
			overflow: visible;
			margin: 0;

			&:checked ~ .indicator__span {
				background-color: var(--color-violet-1);

				&::after {
					display: block;
				}
			}
		}
  }

  .indicator__span {
    position: absolute;
		top: 0;
		left: 0;
		height: 1.4rem;
		width: 1.4rem;
		background-color: #eee;
		border-radius: 50%;

		&::after {
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			background: white;
			content: '';
			position: absolute;
			display: none;
			top: 0.46rem;
			left: 0.46rem;
		}
  }
`;
