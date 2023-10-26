import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { tabbedInterface } from 'utils/explorer';

import { DownloadViz, Indicator, Table } from 'components/data';
import { ExternalLink, Globe, TableIcon, Compare } from 'components/icons';
import { Button, Menu } from 'components/actions';
import dynamic from 'next/dynamic';
import { MenuButton } from 'components/actions/Menu/MenuComp';
import { useWindowSize } from 'utils/hooks';
import { twoDecimals } from 'utils/data';

const ExplorerMap = dynamic(() => import('./ExplorerMap'), {
  ssr: false,
});

const SummaryBarViz = dynamic(() => import('./SummaryBarViz'), {
  ssr: false,
});

const SummaryExplorerViz = ({ schemeRaw, dispatch, meta }) => {
  
  const [isTable, setIsTable] = useState(false);
  const [tableData, setTableData] = useState<any>({});

  const [filtered, setFiltered] = useState([]);

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

  const { width } = useWindowSize();

  const mapRef = useRef(null);

  const { indicator, schemeYear, grantName, schemeType, schemeMode } = meta;

  const schemeTypeOpt = [
    {
      value: 'Benefits both boy and girl students directly',
      title: 'Benefits both boy and girl students directly',
    },
    {
      value: 'Benefits both boy and girl students indirectly',
      title: 'Benefits both boy and girl students indirectly',
    },
    {
      value: 'Benefits boy students exclusively',
      title: 'Benefits boy students exclusively',
    },
    {
      value: 'Benefits girl students exclusively',
      title: 'Benefits girl students exclusively',
    },
    { value: 'Total', title: 'Total' },
  ];

  const yearOpt = [
    { value: '2016-2017', title: '2016-2017' },
    { value: '2017-2018', title: '2017-2018' },
    { value: '2018-2019', title: '2018-2019' },
    { value: '2019-2020', title: '2019-2020' },
    { value: '2020-2021', title: '2020-2021' },
    { value: '2021-2022', title: '2021-2022' },
    { value: '2022-2023', title: '2022-2023' },
    { value: 'Total', title: 'Total' },
  ];

  const schemeModeOpt = [
    {
      value: 'Direct Cash Transfer to students',
      title: 'Direct Cash Transfer to students',
    },
    { value: 'In-kind service delivery', title: 'In-kind service delivery' },
    { value: 'Infrastructure', title: 'Infrastructure' },
    { value: 'Institutional Grants', title: 'Institutional Grants' },
    { value: 'Others', title: 'Others' },
    { value: 'Payments & Awards', title: 'Payments & Awards' },
    { value: 'Total', title: 'Total' },
  ];
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
  ];

  // Table View

  useEffect(() => {
    if (yearOpt) {
      // setting tabular data
      const tableHeader = [
        { Header: 'Constituency', accessor: 'constHeader' },
      ];
      const reversedYear = [
        ...yearOpt.slice(0, yearOpt.length - 1).reverse(),
        yearOpt[yearOpt.length - 1],
      ];

      if (reversedYear) {
        reversedYear.forEach((element) =>
          tableHeader.push({
            Header: `${element.title}`,
            accessor: `${indicator}-${element.title}`,
          })
        );
      }

      if (indicator) {
        const indicatorID = Object.keys(schemeRaw.data).find(
          (item) => schemeRaw.data[item].slug === indicator
        );

        const a = Object.keys(schemeRaw.metadata.consList);
        const rowData = [];

        a.forEach((item, index) => {
          const tempObj = {
            [tableHeader[0].accessor]:
              schemeRaw.metadata.consList[a[index]][0]?.constName,
          };

          reversedYear.map(
            (item1, index1) =>
              (tempObj[tableHeader[index1 + 1].accessor] =
                item1.value == 'Total'
                  ? ( value === 'lakh' || meta.indicator === 'scheme-utilisation'? schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeRaw.metadata.consList[a[index]][0]?.constCode] : twoDecimals(schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeRaw.metadata.consList[a[index]][0]?.constCode]/100))
                  : schemeType == 'Total'
                  ? ( value === 'lakh' || meta.indicator === 'scheme-utilisation' ? schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeType][schemeRaw.metadata.consList[a[index]][0]?.constCode] : twoDecimals(schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeType][schemeRaw.metadata.consList[a[index]][0]?.constCode]/100))
                  : schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeType][schemeMode] == undefined
                  ? ' '
                  : ( value === 'lakh' || meta.indicator === 'scheme-utilisation' ? schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeType][schemeMode][schemeRaw.metadata.consList[a[index]][0]?.constCode] : twoDecimals(schemeRaw.data[indicatorID]['grant_name'][item1.value][schemeType][schemeMode][schemeRaw.metadata.consList[a[index]][0]?.constCode]/100)))
          );

          rowData.push(tempObj);
        });

        const tableData = {
          header: tableHeader,
          rows: rowData,
        };
        setTableData(tableData);
      }
    }
  }, [meta,value]);

  const filteredVal = (indicatorID) =>
    schemeYear == 'Total'
      ? schemeRaw.data[indicatorID]['grant_name'][schemeYear]
      : schemeType == 'Total'
      ? schemeRaw.data[indicatorID]['grant_name'][schemeYear][schemeType]
      : schemeRaw.data[indicatorID]['grant_name'][schemeYear][schemeType][
          schemeMode
        ];

  useEffect(() => {
    if (indicator) {
      const indicatorID = Object.keys(schemeRaw.data).find(
        (item) => schemeRaw.data[item].slug === indicator
      );
      const filtered = filteredVal(indicatorID);
      setFiltered(filtered);
    }
  }, [indicator, meta]);

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
        const filtered = filteredVal(indicatorID);
        setFiltered(filtered);
        dispatch({
          unit: value,
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
        <ExplorerMap meta={meta} schemeData={filtered} dispatch={dispatch} value={value}/>
      ) : filtered == undefined ? (
        <span>
          {' '}
          We do not have any district value for this respective year, scheme
          type and scheme mode....
        </span>
      ) : (
        <span>Loading....</span>
      ),
      ref: mapRef,
    },
    {
      id: 'barView',
      graph: filtered ? (
        <SummaryBarViz
          meta={meta}
          schemeRaw={schemeRaw}
          consList={schemeRaw.metadata.consList}
          years={yearOpt}
          indicator={indicator}
          unitVal = {value}
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
  ];

  const indicatorList =
    schemeRaw.data &&
    Object.keys(schemeRaw.data).map((key) => ({
      value: schemeRaw.data[key].slug,
      title: schemeRaw.data[key].name,
    }));

  const toggleUnit = (itemValue, value) => {
    setValue(itemValue);
    dispatch({
      unit: itemValue,
    });
  };

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
            <VizHeaderMenu currentViz={currentViz}>
              {currentViz == '#mapView' && (
                <VizMenu>
                  <Menu
                    className="fill"
                    value={meta.schemeYear}
                    options={yearOpt}
                    heading="Financial Year"
                    handleChange={(e) =>
                      dispatch({
                        schemeYear: e,
                      })
                    }
                  />
                </VizMenu>
              )}

              <VizMenu>
                <Menu
                  className="fill"
                  value={meta.schemeType}
                  options={schemeTypeOpt}
                  heading="Scheme type"
                  handleChange={(e) =>
                    dispatch({
                      schemeType: e,
                    })
                  }
                />
              </VizMenu>

              <VizMenu>
                <Menu
                  className="fill"
                  value={meta.schemeMode}
                  options={schemeModeOpt}
                  heading="Scheme Mode"
                  handleChange={(e) =>
                    dispatch({
                      schemeMode: e,
                    })
                  }
                />
              </VizMenu>
              {width < 980 ? (
                <VizMenu>
                  <Menu
                    value={indicator}
                    options={indicatorList}
                    heading="Scheme Indicator"
                    handleChange={(e) => handleNewIndicator(e)}
                    className="fill indicator_selector"
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
              schemeRaw={schemeRaw}
              meta={meta}
            />
          </DownloadButton>
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default SummaryExplorerViz;

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

export const Wrapper = styled.section`
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

export const VizHeaderMenu = styled.div<{ currentViz: string }>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;

  ${({ currentViz }) =>
    currentViz !== '#mapView' && ` justify-content: space-between;`}

  @media (min-width: 980px) {
    ${({ currentViz }) =>
      currentViz === '#mapView' &&
      `
    > div:nth-child(1) {
      flex-basis: 21%;
    }
    > div:nth-child(2) {
      flex-basis: 40%;
    }
    > div:nth-child(3) {
      flex-basis: 33%;
    }
  `}
  }
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
  .fill > div > button {
    text-align: left;
    padding: 4px 8px;
    width: 100%;
    justify-content: space-between;

    > svg {
      margin-left: 4px;
    }
  }

  .fill > div {
    width: 100%;
  }

  @media (max-width: 980px) {
    width: 100%;

    > div > span {
      width: 92px;
    }
  }

  @media (max-width: 480px) {
    .fill > div > ul {
      width: 100%;
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
