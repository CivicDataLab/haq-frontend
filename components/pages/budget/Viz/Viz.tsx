import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SchemeIndicator } from 'components/data';
import styled from 'styled-components';
import { Globe } from 'components/icons';

import BudgetGraph from './BudgetGraph';

const Viz = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeIndicator, setActiveIndicator] = useState('');
  const [currentViz, setCurrentViz] = useState('#graphView');

  const mapRef = useRef(null);

  const data = {
    mdm_bh: {
      Scheme: 'YSR Intrest free loans to farmers',
      Scheme_code: 'mdm_bh',
      Scheme_mode: 'Payments & Awards',
      Scheme_type: 'Benefits boy students exclusively',
      indicator_01: {
        '2022-23': 21,
        '2021-22': 34,
      },
      indicator_02: {
        '2022-23': 21,
        '2021-22': 34,
      },
      indicator_03: {
        '2022-23': 21,
        '2021-22': 34,
      },
    },
    mdms_bh: {
      Scheme: 'Dummy schemre',
      Scheme_code: 'mdms_bh',
      Scheme_mode: 'Payments & Awards',
      Scheme_type: 'Benefits girl students exclusively',
      indicator_01: {
        '2022-23': 21,
        '2021-22': 34,
      },
      indicator_02: {
        '2022-23': 21,
        '2021-22': 34,
      },
      indicator_03: {
        '2022-23': 21,
        '2021-22': 34,
      },
    },
  };

  const vizToggle = [
    {
      name: 'Map View',
      id: '#mapView',
      icon: <Globe />,
    },
  ];

  const vizItems = [
    {
      id: 'mapView',
      graph: data[activeIndicator] ? (
        <BudgetGraph />
      ) : (
        <span>Loading....</span>
      ),
      ref: mapRef,
    },
  ];

  useEffect(() => {
    // generate indicators
    const indicators = Object.keys(data) || null;
    // Setting current indicator
    let currentIndicator = indicators.find(
      (indicator) => indicator === router.query.scheme
    );
    if (currentIndicator === undefined) currentIndicator = indicators[0];
    setActiveIndicator(currentIndicator);
    setLoading(false);
  }, [router]);

  // useEffect(() => {
  //   // generate indicators
  //   const indicators = [...new Set(data.map((item) => item.Scheme || null))];
  //   // Setting current indicator
  //   let currentIndicator = indicators.find(
  //     (indicator) => generateSlug(indicator) === router.query.scheme
  //   );
  //   if (currentIndicator === undefined) currentIndicator = indicators[0];
  //   setActiveIndicator(currentIndicator);
  //   setLoading(false);
  // }, [router]);

  return (
    <>
      <Wrapper className="container">
        <SchemeIndicator
          selectedIndicator={activeIndicator}
          schemeData={data}
          currentSlug={router.query.state}
        />
        <VizWrapper>
          <HeaderDetails>
            <h2>{data[activeIndicator]?.Scheme}</h2>
            <h3>First Published July 2023</h3>
          </HeaderDetails>
          <VizTabs className="viz__tabs">
            {vizToggle.map((item, index) => (
              <li key={`toggleItem-${index}`}>
                <button onClick={() => setCurrentViz(item.id)}>
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ))}
          </VizTabs>
          {vizItems.map((item, index) => (
            <VizGraph
              className="viz__graph"
              key={`vizItem-${index}`}
              id={item.id}
            >
              {item.graph}
            </VizGraph>
          ))}
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default Viz;

export const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;

  @media (max-width: 980px) {
    display: block;
    margin-top: 1.5rem;
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  padding: 24px;
  padding-bottom: 30px;
`;

const HeaderDetails = styled.div`
  h2 {
    color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
    font-family: Rubik;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
  }

  h3 {
    color: var(--text-light-bg-medium-emphasis, rgba(0, 0, 0, 0.6));
    font-family: Rubik;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    padding-top: 8px;
  }

  h4 {
    color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
`;

export const VizTabs = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  li {
    min-width: 0;
  }

  button {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    padding-bottom: 12px;
    min-width: 120%;
    display: block;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-weight: bold;
    color: hsla(0, 0%, 0%, 0.32);

    svg {
      margin-bottom: -3px;
      margin-right: 5px;
      fill: hsla(0, 0%, 0%, 0.32);
      pointer-events: none;

      &.svg-stroke {
        stroke: hsla(0, 0%, 0%, 0.32);
      }
    }

    &[aria-selected='true'] {
      color: #de4b33;
      border-bottom: 2px solid #de4b33;

      svg {
        fill: #de4b33;

        &.svg-stroke {
          stroke: #de4b33;
        }
      }
    }
  }
`;

export const VizGraph = styled.div`
  margin: 0 24px 0;
  height: 580px;
  overflow-y: auto;

  &#tableView {
    @media (max-width: 640px) {
      height: 750px;
    }
  }

  @media (max-width: 480px) {
    margin: 0 4px 32px;
  }
`;
