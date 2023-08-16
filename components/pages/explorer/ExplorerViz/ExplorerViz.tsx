import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import {
  tabbedInterface,
  filter_data_indicator,
  filter_data_budgettype,
} from 'utils/explorer';

import { barLineTransformer, SimpleBarLineChartViz } from 'components/viz';

import {
  DownloadViz,
  Indicator,
  IndicatorMobile,
  Table,
} from 'components/data';
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
  // const [selectedIndicator, setSelectedIndicator] =
  //   useState('Budget Estimates');
  // const [indicatorFiltered, setIndicatorFiltered] = useState([]);
  // const [finalFiltered, setFinalFiltered] = useState([]);
  // const [budgetTypes, setBudgetTypes] = useState([]);
  // const [selectedBudgetType, setSelectedBudgetType] = useState('');
  const [isTable, setIsTable] = useState(false);
  const [tableData, setTableData] = useState<any>({});

  const [financialYears, setFinancialYears] = useState(undefined);
  const [grant, setGrant] = useState(undefined);

  const [filtered, setFiltered] = useState([]);

  const [currentViz, setCurrentViz] = useState('#mapView');

  // const barRef = useRef(null);
  // const lineRef = useRef(null);

  const mapRef = useRef(null);

  const { indicator, year, grantName } = meta;

  // todo: make it dynamic lie scheme dashboard
  // const IndicatorDesc = [
  //   meta['Indicator 1 - Description'],
  //   meta['Indicator 2 - Description'],
  //   meta['Indicator 3 - Description'],
  //   meta['Indicator 4 - Description'],
  //   meta['Indicator 5 - Description'],
  // ];

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

  // const crData = [
  //   'Budget Estimates',
  //   'Revised Estimates',
  //   'Actual Expenditure',
  // ];

  // useEffect(() => {
  //   // ceating tabbed interface for viz selector
  //   const tablist = document.querySelector('.viz__tabs');
  //   const panels = document.querySelectorAll('.viz__graph');
  //   tabbedInterface(tablist, panels);

  //   handleNewVizData('Budget Estimates');
  // }, [fileData]);

  // Run whenever a new indicator is selected
  // useEffect(() => {
  //   const budgetType = [
  //     ...Array.from(new Set(indicatorFiltered.map((item) => item.budgetType))),
  //   ];

  //   if (budgetType.includes(selectedBudgetType))
  //     handleDropdownChange(selectedBudgetType);
  //   else if (selectedBudgetType == '') handleDropdownChange('Total');
  //   else if (selectedBudgetType == 'NA' && budgetType.length > 1)
  //     handleDropdownChange('Total');
  //   else handleDropdownChange(budgetType[0]);
  // }, [indicatorFiltered]);

  // function hideMenu(e) {
  //   setCurrentViz(e.target.getAttribute('href'));
  //   if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
  //   else setIsTable(false);
  // }

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
  }, [financialYears, meta.year, grantName]);

  useEffect(() => {
    if (schemeRaw.data && filtered) {
      const grants = Object.keys(
        Object.values(schemeRaw.data)[0]['grant_name']
      ).map((item) => ({
        value: item,
        title: item,
      }));
      setGrant(grants);

      const years = Object.keys(
        Object.values(schemeRaw.data)[0]['grant_name'][grantName]
      ).map((item) => ({
        value: item,
        title: item,
      }));
      setFinancialYears(years); // all years

      let defaultYear =
        years && years.find((year) => year.value === '2021-2022');

      dispatch({
        year: year
          ? year
          : defaultYear
          ? '2021-2022'
          : years[years.length - 1].value,
        grantName: grantName ? grantName : grants[0].value,
      });
    }
  }, [filtered]);

  useEffect(() => {
    // fill up available financial years for state+sabha
    if (grantName) {
      const years = Object.keys(
        Object.values(schemeRaw.data)[0]['grant_name'][grantName]
      ).map((item) => ({
        value: item,
        title: item,
      }));
      setFinancialYears(years); // all years

      let defaultYear =
        years && years.find((year) => year.value === '2021-2022');
      dispatch({
        year: defaultYear ? '2021-2022' : years[years.length - 1].value,
        grantName: grantName ? grantName : grant[0].value,
      });

      if (indicator) {
        const indicatorID = Object.keys(schemeRaw.data).find(
          (item) => schemeRaw.data[item].slug === indicator
        );
        const filtered = schemeRaw.data[indicatorID]['grant_name'][grantName];
        setFiltered(filtered);
      }
    }
  }, [grantName]);

  function hideMenu(e) {
    setCurrentViz(e.target.getAttribute('href'));
    if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
    else setIsTable(false);
  }

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
        const filtered = schemeRaw.data[indicatorID]['grant_name'][grantName];
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
  // function handleNewVizData(val: any) {
  //   if (val) {
  //     const filtered = filter_data_indicator(fileData, val);
  //     const budgetType = [
  //       ...Array.from(new Set(filtered.map((item) => item.budgetType))),
  //     ];

  //     const budgetTypeArray = budgetType.map((item) => {
  //       return { title: item, value: item };
  //     });

  //     setSelectedIndicator(val);
  //     setIndicatorFiltered(filtered);
  //     setBudgetTypes(budgetTypeArray);
  //   }
  // }

  // function handleDropdownChange(val: any) {
  //   const finalFiltered = filter_data_budgettype(indicatorFiltered, val);
  //   setSelectedBudgetType(val);
  //   setFinalFiltered(finalFiltered);
  // }

  const vizItems = [
    {
      id: 'mapView',
      graph: filtered ? (
        <ExplorerMap
          meta={meta}
          schemeData={filtered[year]}
          dispatch={dispatch}
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
          <StateDataBar stateData={stateData} indicator={indicator} />
        ) : (
          <span>Loading....</span>
        ),
    },
  ];

  return (
    <>
      <Wrapper className="container">
        <IndicatorMobile
          indicators={schemeRaw.data}
          newIndicator={(e) => handleNewIndicator(e)}
          selectedIndicator={indicator}
        />
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
                    heading="Financial Year:"
                    handleChange={(e) =>
                      dispatch({
                        year: e,
                      })
                    }
                  />
                </VizMenu>
              )}
              {grant && currentViz !== '#stateView' && (
                <VizMenu className="fill">
                  <Menu
                    value={meta.grantName}
                    options={grant}
                    heading="Grant : "
                    handleChange={(e) =>
                      dispatch({
                        grantName: e,
                      })
                    }
                  />
                </VizMenu>
              )}
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

          {/* <Title id="mapVizInfo" data-html2canvas-ignore>
            <Info fill="#D7AA3B" />
            Select any constituency to do the comparision and report card
            generation.
          </Title> */}

          {/* {vizItems.map((item, index) => (
            <VizGraph
              className="viz__graph"
              key={`vizItem-${index}`}
              id={item.id}
            >
              {item.graph}
            </VizGraph>
          ))} */}

          {/* <ExplorerSource>
            <SourceText>
              <strong>Data Source: </strong>
              <p>
                Union Budget documents (2016-17 to 2021-22) sourced from{' '}
                <a
                  href="https://openbudgetsindia.org/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Budgets India
                  <span className="sr-only"> :opens in new window</span>
                </a>
              </p>
            </SourceText>

            <SourceButtons>
              <Button
                href="https://docs.google.com/document/d/1PlnurMmjyzKdIZ5ktHbQZxYmI0XWKdd0NAW1OHtvhe8/preview"
                rel="noreferrer"
                target="_blank"
                size="sm"
                kind="secondary-outline"
                icon={<ExternalLink fill="#076775" />}
              >
                Data Guidebook
                <span className="sr-only"> :opens in new window</span>
              </Button>
              <DownloadViz
                viz={currentViz}
                type={selectedBudgetType}
                indicator={
                  indicatorFiltered[0]
                    ? indicatorFiltered[0]['indicators']
                    : 'Budget Estimates'
                }
                name={data.title}
              />
            </SourceButtons>
          </ExplorerSource> */}
          {/* <VizHeader data-html2canvas-ignore>
            <VizTabs className="viz__tabs">
              {vizToggle.map((item, index) => (
                <li key={`toggleItem-${index}`}>
                  <div>
                    {item.icon}
                    {item.name}
                  </div>
                </li>
              ))}
            </VizTabs>
            {financialYears && !isTable && (
              <VizMenu className="fill">
                <Menu
                  value={meta.year}
                  options={financialYears}
                  heading="Financial Year:"
                  handleChange={(e) =>
                    dispatch({
                      year: e,
                    })
                  }
                />
              </VizMenu>
            )}
          </VizHeader> */}
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
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  li {
    min-width: 0;
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

export const VizHeaderMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  width: 100%;
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
  &.fill {
    max-width: 305px;
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
`;
