import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';

function changeString(str) {
  let newStr = str.replace(/-/g, '_');
  return newStr;
}

const StateDataBar = ({ stateData, indicator }) => {
  const [bardata, setBarData] = useState([]);

  useEffect(() => {
    if (indicator) {
      const indicator_value = changeString(indicator);
      const indicatorData = stateData[indicator_value];
      const headerArr = ['Fiscal Years', ''];
      const barValuesArr = [];

      indicatorData &&
        Object.keys(indicatorData).forEach((year) => {
          const barValues = [year];
          barValues.push(indicatorData[year]);
          barValuesArr.push(barValues);
        });

      const barArray = [headerArr, ...barValuesArr];
      setBarData(barArray);
    }
  }, [indicator]);

  return (
    <Wrapper>
      {bardata.length > 0 && (
        <section className="barViz">
          <GroupBarChart
            yAxisLabel={`Value in ${indicator == 'scheme-utilisation' ? '%' : 'lakhs'} `}
            xAxisLabel="Fiscal Years"
            theme={['var(--color-sapphire)', 'var(--color-carrot)', 'var(--color-amazon)']}
            dataset={bardata}
            stack={false}
            Title=""
            subTitle=""
            left="70vw"
            type="bar"
            smooth={true}
          />
        </section>
      )}
    </Wrapper>
  );
};

export default StateDataBar;

export const Wrapper = styled.section`
  .styles {
    input:focus-visible {
      outline: 0px !important;
    }
  }
`;
