import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SchemeIndicator, Tags } from 'components/data';
import styled from 'styled-components';
import { Tag } from 'components/data/Tags/TagsComp';
import { Globe, TableIcon } from 'components/icons';
import { tabbedInterface } from 'utils/explorer';

import DownloadViz from './DownloadViz';
import { IndicatorWrapper } from 'components/data';
import { Heading } from 'components/layouts/Heading';

const BudgetGraph = dynamic(() => import('./BudgetGraph'), {
  ssr: false,
});

const BudgetTable = dynamic(() => import('./BudgetTable'), {
  ssr: false,
});

const Viz = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeIndicator, setActiveIndicator] = useState('');
  const [currentViz, setCurrentViz] = useState('#barView');
  const [tableData, setTableData] = useState<any>({});

  const mapRef = useRef(null);

  const vizToggle = [
    {
      name: 'Bar View',
      id: '#barView',
      icon: <Globe />,
    },
    {
      name: 'Table View',
      id: '#tableView',
      icon: <TableIcon />,
    },
  ];

  const vizItems = [
    {
      id: 'barView',
      graph: data[activeIndicator] ? (
        <BudgetGraph
          data={data[activeIndicator]}
          scheme_code={activeIndicator}
        />
      ) : (
        <span>Loading....</span>
      ),
      ref: mapRef,
    },
    {
      id: 'tableView',
      graph: data[activeIndicator] ? (
        <BudgetTable
          data={data[activeIndicator]}
          tableData={tableData}
          setTableData={setTableData}
        />
      ) : (
        <span>Loading....</span>
      ),
    },
  ];

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    tabbedInterface(tablist, panels);
  }, []);

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
      <Wrapper>
        <SchemeIndicator
          selectedIndicator={activeIndicator}
          schemeData={data}
          currentSlug={router.query.state}
        />
        <VizWrapper>
          <div>
            <Heading as="h2" variant="h2l">
              {data[activeIndicator]?.Scheme}
            </Heading>
            {data[activeIndicator]?.Scheme_hindi && (
              <Heading as="h3" variant="h3l" mt="8px">
                {data[activeIndicator]?.Scheme_hindi}
              </Heading>
            )}
            <Tags
              data={[
                data[activeIndicator]?.Scheme_mode,
                data[activeIndicator]?.Scheme_type,
              ]}
            />
          </div>
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
          <DownloadButton>
            <DownloadViz
              viz={currentViz}
              data={data[activeIndicator]}
              tableData={tableData}
            />
          </DownloadButton>
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

  @media (max-width: 910px) {
    display: block;
    margin-top: 1.5rem;
    ${IndicatorWrapper} {
      height: 540px;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      fieldset {
        max-height: 380px;
      }
    }
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  padding: 24px;
  padding-bottom: 30px;

  ${Tag} {
    border-radius: 4px;
    color: #1c523b;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    background-color: var(--text-light-disabled);
  }

  ${Tag}:nth-child(1) {
    background: var(--color-amazon-0);
    color: #1c523b;
  }

  ${Tag}:nth-child(2) {
    background: var(--color-honey-0);
    color: var(--color-honey-3);
  }

  @media (max-width: 910px) {
    padding: 20px;
    border-radius: 8px;
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
      color: var(--color-violet-1);
      border-bottom: 2px solid var(--color-violet-1);

      svg {
        fill: var(--color-violet-1);

        &.svg-stroke {
          stroke: var(--color-violet-1);
        }
      }
    }
  }
`;

export const VizGraph = styled.div`
  margin: 8px 24px 0;
  height: 580px;
  overflow-y: auto;

  &#tableView {
    @media (max-width: 640px) {
      height: 750px;
    }
  }

  // @media (max-width: 480px) {
  //   margin: 0 4px 32px;
  // }
`;

const DownloadButton = styled.div`
  display: flex;
  padding: 1.5rem;
  padding-bottom: 0;
  justify-content: flex-end;

  @media (max-width: 600px) {
    > button {
      flex-grow: 1;
      justify-content: center;
    }
  }
`;
