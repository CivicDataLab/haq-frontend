import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import {
  tabbedInterface,
  filter_data_indicator,
  filter_data_budgettype,
} from 'utils/explorer';

import SimpleBarLineChartViz from 'visualizations/SimpleBarLineChart';
import { barLineTransformer } from 'visualizations/BarLineTransformer';

import {
  DownloadViz,
  Indicator,
  IndicatorMobile,
  Table,
} from 'components/data';
import { ExternalLink } from 'icons/ExplorerIcons';
import { Button, Menu } from 'components/actions';

const ExplorerViz = ({ data, meta, fileData }) => {
  const [selectedIndicator, setSelectedIndicator] =
    useState('Budget Estimates');
  const [indicatorFiltered, setIndicatorFiltered] = useState([]);
  const [finalFiltered, setFinalFiltered] = useState([]);
  const [budgetTypes, setBudgetTypes] = useState([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState('');
  const [isTable, setIsTable] = useState(false);
  const [currentViz, setCurrentViz] = useState('#barGraph');

  const barRef = useRef(null);
  const lineRef = useRef(null);

  // todo: make it dynamic lie scheme dashboard
  const IndicatorDesc = [
    meta['Indicator 1 - Description'],
    meta['Indicator 2 - Description'],
    meta['Indicator 3 - Description'],
    meta['Indicator 4 - Description'],
    meta['Indicator 5 - Description'],
  ];

  const vizToggle = [
    {
      name: 'Bar Graph',
      id: '#barGraph',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM5 14c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1Zm4 0c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1Zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1Z" />
        </svg>
      ),
    },
    {
      name: 'Line Chart',
      id: '#lineChart',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path d="M16 18c.5304 0 1.0391-.2107 1.4142-.5858S18 16.5304 18 16V2C18 .895431 17.1046 2e-7 16 4.4e-7l-1 2.2e-7L14 0s-.7976.0001147-1.328.00000143H2C1.46957.00000143.960859.210715.585786.585788.210714.960861 0 1.46957 0 2v14c0 .5304.210714 1.0391.585786 1.4142C.960859 17.7893 1.46957 18 2 18h14Zm-1.5-5c0 .1989-.079.3897-.2197.5303-.1406.1407-.3314.2197-.5303.2197H4c-.19891 0-.38968-.079-.53033-.2197C3.32902 13.3897 3.25 13.1989 3.25 13c0-.1989.07902-.3897.21967-.5303.14065-.1407.33142-.2197.53033-.2197h9.75c.1989 0 .3897.079.5303.2197.1407.1406.2197.3314.2197.5303ZM3.527 8.81l3.266-3.266c.15765-.15789.36357-.25851.585-.28588.22144-.02736.44566.02012.637.13488l1.663 1c.04734.02714.10223.03811.15636.03125.05414-.00686.10456-.03117.14364-.06925l2.5-2.5c.1876-.18857.4425-.29487.7085-.29553.266-.00066.5214.10439.71.29203.1886.18764.2949.44251.2955.70853.0007.26602-.1044.5214-.292.70997l-3.188 3.187c-.1577.15749-.3635.25779-.5847.28497-.22122.02717-.44517-.02033-.6363-.13497l-1.664-1c-.04719-.02742-.10206-.03866-.15623-.03197-.05416.00668-.10466.0309-.14377.06897l-2.586 2.58c-.1886.1822-.4412.283-.7034.2807-.2622-.0023-.51301-.1075-.69842-.2929-.18541-.1854-.29058-.4362-.29285-.6984-.00228-.26219.09851-.5148.28067-.7034Z" />
        </svg>
      ),
    },
    {
      name: 'Table View',
      id: '#tableView',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.50588C0 .978774 0 .71522.102582.513891.192816.336798.336798.192816.513891.102582.71522 0 .978774 0 1.50588 0H3.2c.52711 0 .79066 0 .99199.102582.17709.090234.32108.234216.41131.411309.10258.201329.10258.464883.10258.991989V3.2c0 .52711 0 .79066-.10258.99199-.09023.17709-.23422.32108-.41131.41131-.20133.10258-.46488.10258-.99199.10258H1.50588c-.527106 0-.79066 0-.991989-.10258-.177093-.09023-.321075-.23422-.411309-.41131C0 3.99066 0 3.72711 0 3.2V1.50588Zm0 5.64706c0-.52711 0-.79066.102582-.99199.090234-.17709.234216-.32108.411309-.41131.201329-.10258.464883-.10258.991989-.10258H3.2c.52711 0 .79066 0 .99199.10258.17709.09023.32108.23422.41131.41131.10258.20133.10258.46488.10258.99199v1.69412c0 .52711 0 .79066-.10258.99199-.09023.17705-.23422.32105-.41131.41135-.20133.1025-.46488.1025-.99199.1025H1.50588c-.527106 0-.79066 0-.991989-.1025-.177093-.0903-.321075-.2343-.411309-.41135C0 9.63772 0 9.37417 0 8.84706V7.15294ZM.102582 11.808C0 12.0093 0 12.2729 0 12.8v1.6941c0 .5271 0 .7907.102582.992.090234.1771.234216.3211.411309.4113C.71522 16 .978774 16 1.50588 16H3.2c.52711 0 .79066 0 .99199-.1026.17709-.0902.32108-.2342.41131-.4113.10258-.2013.10258-.4649.10258-.992V12.8c0-.5271 0-.7907-.10258-.992-.09023-.1771-.23422-.3211-.41131-.4113-.20133-.1026-.46488-.1026-.99199-.1026H1.50588c-.527106 0-.79066 0-.991989.1026-.177093.0902-.321075.2342-.411309.4113ZM5.64706 1.50588c0-.527106 0-.79066.10258-.991989.09023-.177093.23422-.321075.41131-.411309C6.36228 0 6.62583 0 7.15294 0h1.69412c.52711 0 .79066 0 .99199.102582.17705.090234.32105.234216.41135.411309.1025.201329.1025.464883.1025.991989V3.2c0 .52711 0 .79066-.1025.99199-.0903.17709-.2343.32108-.41135.41131-.20133.10258-.46488.10258-.99199.10258H7.15294c-.52711 0-.79066 0-.99199-.10258-.17709-.09023-.32108-.23422-.41131-.41131-.10258-.20133-.10258-.46488-.10258-.99199V1.50588Zm.10258 4.65507c-.10258.20133-.10258.46488-.10258.99199v1.69412c0 .52711 0 .79066.10258.99199.09023.17705.23422.32105.41131.41135.20133.1025.46488.1025.99199.1025h1.69412c.52711 0 .79066 0 .99199-.1025.17705-.0903.32105-.2343.41135-.41135.1025-.20133.1025-.46488.1025-.99199V7.15294c0-.52711 0-.79066-.1025-.99199-.0903-.17709-.2343-.32108-.41135-.41131-.20133-.10258-.46488-.10258-.99199-.10258H7.15294c-.52711 0-.79066 0-.99199.10258-.17709.09023-.32108.23422-.41131.41131ZM5.64706 12.8c0-.5271 0-.7907.10258-.992.09023-.1771.23422-.3211.41131-.4113.20133-.1026.46488-.1026.99199-.1026h1.69412c.52711 0 .79066 0 .99199.1026.17705.0902.32105.2342.41135.4113.1025.2013.1025.4649.1025.992v1.6941c0 .5271 0 .7907-.1025.992-.0903.1771-.2343.3211-.41135.4113C9.63772 16 9.37417 16 8.84706 16H7.15294c-.52711 0-.79066 0-.99199-.1026-.17709-.0902-.32108-.2342-.41131-.4113-.10258-.2013-.10258-.4649-.10258-.992V12.8ZM11.3967.513891c-.1026.201329-.1026.464883-.1026.991989V3.2c0 .52711 0 .79066.1026.99199.0902.17709.2342.32108.4113.41131.2013.10258.4649.10258.992.10258h1.6941c.5271 0 .7907 0 .992-.10258.1771-.09023.3211-.23422.4113-.41131C16 3.99066 16 3.72711 16 3.2V1.50588c0-.527106 0-.79066-.1026-.991989-.0902-.177093-.2342-.321075-.4113-.411309C15.2848 0 15.0212 0 14.4941 0H12.8c-.5271 0-.7907 0-.992.102582-.1771.090234-.3211.234216-.4113.411309Zm-.1026 6.639049c0-.52711 0-.79066.1026-.99199.0902-.17709.2342-.32108.4113-.41131.2013-.10258.4649-.10258.992-.10258h1.6941c.5271 0 .7907 0 .992.10258.1771.09023.3211.23422.4113.41131.1026.20133.1026.46488.1026.99199v1.69412c0 .52711 0 .79066-.1026.99199-.0902.17705-.2342.32105-.4113.41135-.2013.1025-.4649.1025-.992.1025H12.8c-.5271 0-.7907 0-.992-.1025-.1771-.0903-.3211-.2343-.4113-.41135-.1026-.20133-.1026-.46488-.1026-.99199V7.15294Zm.1026 4.65506c-.1026.2013-.1026.4649-.1026.992v1.6941c0 .5271 0 .7907.1026.992.0902.1771.2342.3211.4113.4113.2013.1026.4649.1026.992.1026h1.6941c.5271 0 .7907 0 .992-.1026.1771-.0902.3211-.2342.4113-.4113.1026-.2013.1026-.4649.1026-.992V12.8c0-.5271 0-.7907-.1026-.992-.0902-.1771-.2342-.3211-.4113-.4113-.2013-.1026-.4649-.1026-.992-.1026H12.8c-.5271 0-.7907 0-.992.1026-.1771.0902-.3211.2342-.4113.4113Z" />
        </svg>
      ),
    },
  ];

  const crData = [
    'Budget Estimates',
    'Revised Estimates',
    'Actual Expenditure',
  ];

  const vizItems = [
    {
      id: 'barGraph',
      graph: (
        <SimpleBarLineChartViz
          color={'#00ABB7'}
          dataset={barLineTransformer(finalFiltered, selectedIndicator)}
          type="bar"
          smooth={true}
          showSymbol={true}
          Title={
            selectedIndicator +
            (budgetTypes.length > 1 ? ' - ' + selectedBudgetType : '')
          }
          subTitle={data.title}
          unit={crData.includes(selectedIndicator) ? 'Cr' : '%'}
        />
      ),
      ref: barRef,
    },
    {
      id: 'lineChart',
      graph: (
        <SimpleBarLineChartViz
          color={'#00ABB7'}
          dataset={barLineTransformer(finalFiltered, selectedIndicator)}
          type="line"
          smooth={true}
          showSymbol={true}
          Title={
            selectedIndicator +
            (budgetTypes.length > 1 ? ' - ' + selectedBudgetType : '')
          }
          subTitle={data.title}
          unit={crData.includes(selectedIndicator) ? 'Cr' : '%'}
        />
      ),
      ref: lineRef,
    },
    {
      id: 'tableView',
      graph: (
        <Table
          headers={
            indicatorFiltered[0]
              ? Object.keys(indicatorFiltered[0])
              : ['header1']
          }
          rows={indicatorFiltered.map(Object.values)}
          caption="Table"
          sortable
        />
      ),
    },
  ];

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz__graph');
    tabbedInterface(tablist, panels);

    handleNewVizData('Budget Estimates');
  }, [fileData]);

  // Run whenever a new indicator is selected
  useEffect(() => {
    const budgetType = [
      ...Array.from(new Set(indicatorFiltered.map((item) => item.budgetType))),
    ];

    if (budgetType.includes(selectedBudgetType))
      handleDropdownChange(selectedBudgetType);
    else if (selectedBudgetType == '') handleDropdownChange('Total');
    else if (selectedBudgetType == 'NA' && budgetType.length > 1)
      handleDropdownChange('Total');
    else handleDropdownChange(budgetType[0]);
  }, [indicatorFiltered]);

  function hideMenu(e) {
    setCurrentViz(e.target.getAttribute('href'));
    if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
    else setIsTable(false);
  }

  function handleNewVizData(val: any) {
    if (val) {
      const filtered = filter_data_indicator(fileData, val);
      const budgetType = [
        ...Array.from(new Set(filtered.map((item) => item.budgetType))),
      ];

      const budgetTypeArray = budgetType.map((item) => {
        return { title: item, value: item };
      });

      setSelectedIndicator(val);
      setIndicatorFiltered(filtered);
      setBudgetTypes(budgetTypeArray);
    }
  }

  function handleDropdownChange(val: any) {
    const finalFiltered = filter_data_budgettype(indicatorFiltered, val);
    setSelectedBudgetType(val);
    setFinalFiltered(finalFiltered);
  }

  return (
    <>
      <div className="container">
        <IndicatorMobile
          indicators={data.indicators}
          newIndicator={handleNewVizData}
          meta={IndicatorDesc}
        />
      </div>
      <Wrapper className="container">
        <Indicator
          data={data.indicators}
          meta={IndicatorDesc}
          newIndicator={handleNewVizData}
        />
        <VizWrapper>
          <VizHeader>
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
            {budgetTypes.length > 1 && !isTable && (
              <Menu
                value={selectedBudgetType}
                options={budgetTypes}
                heading="Select Budget Type"
                handleChange={handleDropdownChange}
              />
            )}
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

          <ExplorerSource>
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
                as="a"
                href="https://docs.google.com/document/d/1PlnurMmjyzKdIZ5ktHbQZxYmI0XWKdd0NAW1OHtvhe8/preview"
                rel="noreferrer"
                target="_blank"
                size="sm"
                kind="secondary-outline"
              >
                Data Guidebook <ExternalLink fill="#076775" />
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
          </ExplorerSource>
        </VizWrapper>
      </Wrapper>
    </>
  );
};

export default ExplorerViz;

export const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;

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
  margin: 0 2rem 2rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
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
