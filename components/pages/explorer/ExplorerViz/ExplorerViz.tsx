import React, { useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { tabbedInterface } from 'utils/explorer';

import { DownloadViz, Indicator, Table } from 'components/data';
import {
  GraphBar,
  Globe,
  TableIcon,
  Info,
  Hamburger,
  Compare,
} from 'components/icons';
import { Button, Menu } from 'components/actions';
import dynamic from 'next/dynamic';
import { useWindowSize } from 'utils/hooks';
import { twoDecimals } from 'utils/data';

const ExplorerMap = dynamic(() => import('./ExplorerMap'), {
  ssr: false,
});

const BarViz = dynamic(() => import('./BarViz'), {
  ssr: false,
});

const StateDataBar = dynamic(() => import('./StateDataBar'), {
  ssr: false,
});

import { MenuButton } from 'components/actions/Menu/MenuComp';

const ExplorerViz = ({ schemeRaw, dispatch, meta, stateData }) => {
  const [tableData, setTableData] = useState<any>({});

  const [financialYears, setFinancialYears] = useState(undefined);
  const [filtered, setFiltered] = useState<{
    [year: string]: { [key: string]: string | number };
  }>({});

  const [currentViz, setCurrentViz] = useState('#mapView');
  const items = [
    {
      value: 'lakh',
      label: 'Lakhs',
    },
    {
      value: 'crore',
      label: 'Crores',
    },
  ];

  const [value, setValue] = useState(items[0].value);

  const mapRef = useRef(null);

  const { indicator, year } = meta;

  const { width } = useWindowSize();

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    tabbedInterface(tablist, panels);
  }, []);

  const vizToggle = [
    {
      name: 'Map View',
      id: '#mapView',
      icon: <Globe />,
    },
    {
      name: 'Compare View',
      id: '#barView',
      icon: <Compare />,
    },
    {
      name: 'Table View',
      id: '#tableView',
      icon: <TableIcon />,
    },
    {
      name: 'State',
      id: '#stateView',
      icon: <GraphBar />,
    },
  ];


  // Table View
  useEffect(() => {
    if (financialYears) {
      // setting tabular data
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];
      if (financialYears) {
        let reverseFinancialYears = [...financialYears];
        reverseFinancialYears.reverse().forEach((element) =>
          tableHeader.push({
            Header: `${element.title}`,
            accessor: `${indicator}-${element.title}`,
          })
        );
      }

      const a = Object.keys(schemeRaw.metadata.consList);
      const rowData = [];
      if (filtered[meta.year]) {
        a.forEach((item, index) => {
          const tempObj = {
            [tableHeader[0].accessor]:
              schemeRaw.metadata.consList[a[index]][0]?.constName,
          };

          Object.keys(filtered).map((item1, index1) => {
            const value =
              filtered[tableHeader[index1 + 1].Header][
                schemeRaw.metadata.consList[a[index]][0]?.constCode
              ];
            tempObj[tableHeader[index1 + 1].accessor] =
              value !== undefined && value !== '' ? value : 'NA';
          });
          rowData.push(tempObj);
        });
      }

      const tableData = {
        header: tableHeader,
        rows: rowData,
      };
      setTableData(tableData);
    }
  }, [filtered]);

  useEffect(() => {
    // fill up available financial years for state+sabha
    if (schemeRaw.data && filtered) {
      const years = Object.keys(schemeRaw.data['indicator_01'].data).map(
        (item) => ({
          value: item,
          title: item,
        })
      );
      setFinancialYears(years); // all years

      let defaultYear =
        years && years.find((year) => year.value === '2021-2022');
      dispatch({
        year: defaultYear ? '2021-2022' : years[years.length - 1].value,
        unit: 'lakh',
      });

      if (indicator) {
        const indicatorID = Object.keys(schemeRaw.data).find(
          (item) => schemeRaw.data[item].slug === indicator
        );

        const filtered = schemeRaw.data[indicatorID].data;
        setFiltered(filtered);
      }
    }
  }, []);

  useEffect(() => {
    handleNewIndicator(indicator || schemeRaw.metadata?.indicators[0]);
  }, [schemeRaw]);

  function handleNewIndicator(val: any) {
    if (val) {
      // filter based on selected indicator for state + sabha
      if (schemeRaw.data) {
        const indicatorID = Object.keys(schemeRaw.data).find(
          (item) => schemeRaw.data[item].slug === val
        );
        const filtered = schemeRaw.data[indicatorID].data;
        dispatch({
          unit: schemeRaw.data[indicatorID].unit,
        });
        setFiltered(filtered);
      }

      dispatch({
        indicator: val,
      });
    }
  }

  const toggleUnit = (itemValue, value) => {
    setValue(itemValue);
    dispatch({
      unit: itemValue
    })
  };

  const vizItems = [
    {
      id: 'mapView',
      graph: filtered ? (
        <ExplorerMap
          meta={meta}
          schemeData={filtered[year]}
          dispatch={dispatch}
          value={value}
        />
      ) : (
        <span>Loading....</span>
      ),
      ref: mapRef,
    },
    {
      id: 'barView',
      graph: filtered ? (
        <BarViz
          meta={meta}
          data={filtered}
          consList={schemeRaw.metadata.consList}
          value={value}
        />
      ) : (
        <span>Loading....</span>
      ),
    },
    {
      id: 'tableView',
      graph: tableData.rows ? (
        <Table
          header={
            tableData.header ? tableData.header : ['table not available']
          }
          rows={tableData.rows ? tableData.rows : []}
        />
      ) : (
        <></>
      ),
    },
    {
      id: 'stateView',
      graph:
        Object.keys(stateData).length > 0 ? (
          <StateDataBar
            stateData={stateData}
            indicator={indicator}
            value={value}
          />
        ) : (
          <span>Loading....</span>
        ),
    },
  ];

  const indicatorList = useMemo(() => {
    if (schemeRaw.data) {
      return Object.keys(schemeRaw.data).map((key) => ({
        value: schemeRaw.data[key].slug,
        title: schemeRaw.data[key].name,
      }));
    } else {
      return [];
    }
  }, [schemeRaw.data]);

  return (
    <>
      <Tablist>
        <div className="tabs-list">
          Unit :
          {items.map(({ label, value: itemValue }) => {
            const isActiveValue = itemValue === value;

            return (
              <button
                key={itemValue}
                type="button"
                className={[
                  'tabs-list-item',
                  isActiveValue && 'tabs-list-item--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  itemValue !== value ? toggleUnit(itemValue, value) : null;
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Tablist>
      <Wrapper>
        <VizWrapper>
          <VizHeader data-html2canvas-ignore>
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
            <VizHeaderMenu>
              {financialYears && currentViz == '#mapView' && (
                <VizMenu className="fill">
                  <Menu
                    value={meta.year}
                    options={financialYears}
                    heading="Financial Year"
                    handleChange={(e) =>
                      dispatch({
                        year: e,
                      })
                    }
                  />
                </VizMenu>
              )}
              {width < 980 ? (
                <VizMenu className="fill">
                  <Menu
                    value={indicator}
                    options={indicatorList}
                    heading="Scheme Indicator"
                    handleChange={(e) => handleNewIndicator(e)}
                    className="indicator_selector"
                  />
                </VizMenu>
              ) : null}
            </VizHeaderMenu>
          </VizHeader>
          <Indicator
            newIndicator={(e) => handleNewIndicator(e)}
            selectedIndicator={indicator}
            schemeData={schemeRaw}
          />
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
              tableData={tableData}
              schemeRaw={currentViz == '#stateView' ? stateData : schemeRaw}
              meta={meta}
            />
          </DownloadButton>
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default ExplorerViz;

export const Wrapper = styled.section`
  gap: 2rem;

  ${MenuButton} {
    font-size: 14px;
  }
  h3 {
    font-weight: 800;
    font-size: 18px;
    line-height: 156%;
    border-bottom: 1px solid #eff2f2;
    padding-bottom: 1rem;
  }

  @media (max-width: 980px) {
    display: block;
    margin-top: 1.5rem;
  }
`;

export const Tablist = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
  gap: 8px;

  .tabs-list {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .tabs-list-item {
    --active-color: var(--color-secondary);

    background: none;
    border: 1px solid #000;
    border-radius: 4px;
    cursor: pointer;
    padding: 6px 10px;
  }

  .tabs-list-item:hover {
    border-color: var(--active-color);
    color: var(--active-color);
  }

  .tabs-list-item--active,
  .tabs-list-item--active:hover {
    border-color: var(--active-color);
    background-color: var(--active-color);
    color: #fff;
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  padding-bottom: 30px;
`;

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  padding-bottom: 0;
  gap: 1.5rem;
  flex-direction: column;
`;

export const VizTabs = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 720px) {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    max-width: 100%;
    scrollbar-width: thin;
    padding-bottom: 2px;
  }

  li {
    // min-width: 100px;
    margin-right: 10px;
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
    //  border-bottom: 2px solid transparent;
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

export const VizHeaderMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
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

export const ExplorerSource = styled.div`
  border-top: 1px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 0;
  margin: 0 1.5rem;

  button,
  a {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;

export const SourceText = styled.div`
  flex-basis: 35%;
  flex-grow: 1;
  font-size: 14px;

  p {
    color: var(--text-light-medium);
    font-weight: var(--font-weight-medium);
    display: inline;
  }
`;

export const SourceButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const VizMenu = styled.div`
  // &.fill {
  //   max-width: 305px;
  // }

  [class^='MenuComp__MenuButton'] {
    text-align: left;
  }

  @media (max-width: 980px) {
    width: 100%;

    > div > span {
      width: 70px;
    }
    [class^='MenuComp__Wrapper'] {
      flex-grow: 1;
    }

    [class^='MenuComp__MenuButton'] {
      width: 100%;
      justify-content: space-between;
    }
  }

  .indicator_selector > div > button {
    text-transform: capitalize;
  }
`;

const Title = styled.div`
  border-radius: 2px;
  background-color: var(--color-background-light);
  margin-bottom: 8px;
  margin-inline: 24px;

  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.7;
  padding: 8px 16px;
  text-transform: capitalize;

  &#mapVizInfo {
    font-weight: 400;
    margin: 8px 24px 0;
    text-transform: initial;
    margin-bottom: -8px;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      min-width: 24px;
    }
  }

  @media (max-width: 480px) {
    margin-inline: 4px;
    padding: 6px 12px;

    &#mapVizInfo {
      margin-inline: 4px;
    }
  }
`;

const SchemeNotes = styled.div`
  padding: 24px;
  max-height: 592px;
  overflow-y: auto;

  > p {
    border-left: 4px solid var(--color-amazon);
    padding-left: 18px;
    border-radius: 4px;
  }
`;

const NotesInidicator = styled.section`
  margin-top: 16px;
  background-color: var(--color-background-light);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    display: inline-block;
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-light-high);
  }
`;

const NotesTitle = styled.span`
  font-weight: 400;
  color: var(--text-light-medium);
`;
const IndicatorNotes = styled.span`
  font-size: 0.75rem;
  line-height: 1.7;
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
