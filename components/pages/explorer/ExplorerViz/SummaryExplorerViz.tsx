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
import { ExternalLink, Globe, TableIcon } from 'components/icons';
import { Button, Menu } from 'components/actions';
import ExplorerMap from './ExplorerMap';
import BarViz from './BarViz';

import { MenuButton } from 'components/actions/Menu/MenuComp';

const SummaryExplorerViz = ({ schemeRaw, dispatch, meta }) => {
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




  const mapRef = useRef(null);

  const { indicator, schemeYear, grantName, schemeType, schemeMode } = meta;

  const schemeTypeOpt = [
    { value: "Benefits both boy and girl students directly", title: "Benefits both boy and girl students directly" },
    { value: "Benefits both boy and girl students indirectly", title: "Benefits both boy and girl students indirectly" },
    { value: "Benefits boy students exclusively", title: "Benefits boy students exclusively" },
    { value: "Benefits girl students exclusively", title: "Benefits girl students exclusively" },
    { value: "Total", title: "Total" },
  ]

  const yearOpt = [
    { value: "2016-2017", title: "2016-2017" },
    { value: "2017-2018", title: "2017-2018" },
    { value: "2018-2019", title: "2018-2019" },
    { value: "2019-2020", title: "2019-2020" },
    { value: "2020-2021", title: "2020-2021" },
    { value: "2021-2022", title: "2021-2022" },
    { value: "2022-2023", title: "2023-2023" },
    { value: "Total", title: "Total" },
  ]

  const schemeModeOpt = [
    { value: "Direct Cash Transfer to students", title: "Direct Cash Transfer to students" },
    { value: "In-kind service delivery" , title: "In-kind service delivery" },
    { value: "Infrastructure" , title: "Infrastructure"},
    { value: "Institutional Grants" , title : "Institutional Grants"},
    { value: "Others" , title: "Others"},
    { value: "Payments & Awards" , title : "Payments & Awards"},
    { value: "Total" , title : "Total"}
    ]
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
    // {
    //   name: 'Table View',
    //   id: '#tableView',
    //   icon: <TableIcon />,
    // },
    // {
    //   name: 'Bar View',
    //   id: '#barView',
    //   icon: <TableIcon />,
    // },
  ];

 
  // Table View

  useEffect(() => {
    if (financialYears) {
      // setting tabular data
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];
      if (financialYears) {
        financialYears.forEach((element) =>
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

          Object.keys(filtered).map(
            (item1, index1) =>
            (tempObj[tableHeader[index1 + 1].accessor] =
              filtered[item1][
              schemeRaw.metadata.consList[a[index]][0]?.constCode
              ])
          );
          rowData.push(tempObj);
        });
      }

      const tableData = {
        header: tableHeader,
        rows: rowData,
      };
      setTableData(tableData);
    }
  }, [financialYears, meta.schemeYear, grantName]);

  //  const found = array1.find(element => element > 10);


  //   useEffect(() => {
  //     if (schemeRaw.data && filtered) {
  //       const grants = Object.keys(
  //         Object.values(schemeRaw.data)[0]['grant_name']
  //       ).map((item) => ({
  //         value: item,
  //         title: item,
  //       }));
  //       setGrant(grants);

  //       const years = Object.keys(
  //         Object.values(schemeRaw.data)[0]['grant_name'][grantName]
  //       ).map((item) => ({
  //         value: item,
  //         title: item,
  //       }));
  //       setFinancialYears(years); // all years

  //       dispatch({
  //         year: year ? year : years[0].value,
  //         grantName: grantName ? grantName : grants[0].value,
  //       });
  //     }
  //   }, [filtered]);

  //   useEffect(() => {
  //     // fill up available financial years for state+sabha
  //     if (grantName) {
  //       const years = Object.keys(
  //         Object.values(schemeRaw.data)[0]['grant_name'][grantName]
  //       ).map((item) => ({
  //         value: item,
  //         title: item,
  //       }));
  //       setFinancialYears(years); // all years

  //       dispatch({
  //         year: years[0].value,
  //         grantName: grantName ? grantName : grant[0].value,
  //       });

  //       if (indicator) {
  //         const indicatorID = Object.keys(schemeRaw.data).find(
  //           (item) => schemeRaw.data[item].slug === indicator
  //         );
  //         const filtered = schemeRaw.data[indicatorID]['grant_name'][grantName];
  //         setFiltered(filtered);
  //       }
  //     }
  //   }, [grantName]);

  const filteredVal = (indicatorID) => 
    schemeYear == "Total" 
    ? schemeRaw.data[indicatorID]['grant_name'][schemeYear] 
    : schemeType == "Total" 
    ? schemeRaw.data[indicatorID]['grant_name'][schemeYear][schemeType]
    : schemeRaw.data[indicatorID]['grant_name'][schemeYear][schemeType][schemeMode];
  

  useEffect(() => {

        if (indicator) {
          const indicatorID = Object.keys(schemeRaw.data).find(
            (item) => schemeRaw.data[item].slug === indicator
          );
          const filtered = filteredVal(indicatorID)
          setFiltered(filtered);
        }
  }, [indicator,meta])

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
        const filtered = filteredVal(indicatorID)
        setFiltered(filtered);
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

  const vizItems = [
    {
      id: 'mapView',
      graph: filtered ? (
        <ExplorerMap
          meta={meta}
          schemeData={filtered}
          dispatch={dispatch}
        />
      ) : filtered == undefined 
        ? <span> We do not have any district value for this respective year, scheme type and scheme mode....</span>
        : (
        <span>Loading....</span>
      ),
      ref: mapRef,
    },
    // {
    //   id: 'tableView',
    //   graph: tableData.rows ? (
    //     <Table
    //       header={
    //         tableData.header ? tableData.header : ['table not available']
    //       }
    //       rows={tableData.rows ? tableData.rows : []}
    //     />
    //   ) : (
    //     <></>
    //   ),
    // },
    // {
    //   id: 'barView',
    //   graph: filtered ? (
    //     <BarViz
    //       meta={meta}
    //       data={filtered}
    //       consList={schemeRaw.metadata.consList}
    //     />
    //   ) : (
    //     <span>Loading....</span>
    //   ),
    // },
  ];

  return (
    <>
      <div className="container">
        {/* <IndicatorMobile
          indicators={schemeRaw}
          newIndicator={(e) => handleNewIndicator(e)}
          selectedIndicator={indicator}
        /> */}
        {/* <Indicator
          newIndicator={(e) => handleNewIndicator(e)}
          selectedIndicator={indicator}
          schemeData={schemeData}
        /> */}
      </div>
      <Wrapper className="container">
        <Indicator
          newIndicator={(e) => handleNewIndicator(e)}
          selectedIndicator={indicator}
          schemeData={schemeRaw}
        />
        <VizWrapper>
          <VizHeader data-html2canvas-ignore>
            <VizTabs className="viz__tabs">
              {vizToggle.map((item, index) => (
                <li key={`toggleItem-${index}`}>
                  <a href={item.id} onClick={(e) => hideMenu(e)}>
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </VizTabs>
            {currentViz == '#mapView' && (
              <VizMenu className="fill">
                <Menu
                  value={meta.schemeYear}
                  options={yearOpt}
                  heading="Financial Year:"
                  handleChange={(e) =>
                    dispatch({
                      schemeYear: e,
                    })
                  }
                />
              </VizMenu>
            )}
            
            <VizMenu className="fill">
              <Menu
                value={meta.schemeType}
                options={schemeTypeOpt}
                heading="Scheme type : "
                handleChange={(e) =>
                  dispatch({
                    schemeType: e,
                  })
                }
              />
            </VizMenu>

            <VizMenu className="fill">
              <Menu
                value={meta.schemeMode}
                options={schemeModeOpt}
                heading="Scheme Mode : "
                handleChange={(e) =>
                  dispatch({
                    schemeMode: e,
                  })
                }
              />
            </VizMenu>       
          </VizHeader>

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

export default SummaryExplorerViz;

export const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;
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
  gap: 1.5rem;
`;

export const VizTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  li {
    min-width: 0;
  }

  a {
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
    max-width: 280px;
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
