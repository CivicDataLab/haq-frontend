import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SchemeIndicator, Tags } from 'components/data';
import styled from 'styled-components';
import { Tag } from 'components/data/Tags/TagsComp';
import { Globe, TableIcon } from 'components/icons';
import { tabbedInterface } from 'utils/explorer';

import BudgetGraph from './BudgetGraph';
import BudgetTable from './BudgetTable';
import DownloadViz from './DownloadViz';

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
      <Wrapper className="container">
        <SchemeIndicator
          selectedIndicator={activeIndicator}
          schemeData={data}
          currentSlug={router.query.state}
        />
        <VizWrapper>
          <HeaderDetails>
            <h2>{data[activeIndicator]?.Scheme}</h2>
            <Tags
              data={[
                data[activeIndicator]?.Scheme_mode,
                data[activeIndicator]?.Scheme_type,
              ]}
            />
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
 
  ${Tag} {
    border-radius: 4px;
    color: #1c523b;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    background-color:' var(--text-light-disabled)';
  }

  ${Tag}:nth-child(1) {
    background: var(--amazon-00, #E1F5ED); 
    color: #1C523B;
  }
  
  ${Tag}:nth-child(2) {
    background: var(--honey-00, #FFF0E0); 
    color: var(--honey-05, #88541E); 
  }
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
      color: #9E68AD;
      border-bottom: 2px solid #9E68AD;

      svg {
        fill: #9E68AD;

        &.svg-stroke {
          stroke: #9E68AD;
        }
      }
    }
  }
`;

export const VizGraph = styled.div`
  margin: 12px 24px 0;
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

const DownloadButton = styled.div`
  display: flex;
  padding: 1.5rem;
  padding-bottom: 0;
  justify-content: flex-end;
`;
