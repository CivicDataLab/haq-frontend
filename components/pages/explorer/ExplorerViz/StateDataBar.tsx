import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';
import { twoDecimals } from 'utils/data';

function changeString(str) {
  let newStr = str.replace(/-/g, '_');
  return newStr;
}

const StateDataBar = ({ stateData, indicator, value }) => {
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
          let data = indicatorData[year];
          if (value === 'crore' && indicator_value !== 'scheme_utilisation')
            data = twoDecimals(data / 100);

          barValues.push(data);
          barValuesArr.push(barValues);
        });

      const barArray = [headerArr, ...barValuesArr];
      setBarData(barArray);
    }
  }, [indicator, value]);

  return (
    <Wrapper>
      {bardata.length > 0 && (
        <section className="barViz">
          <GroupBarChart
            yAxisLabel={`Units: ${indicator === 'scheme-utilisation' ? '%' 
            : (value.includes('lakh') ? '₹ in lakhs' : (value.includes('crore') ? '₹ in crore' : ''))}`}
            xAxisLabel="Fiscal Years"
            theme={['#4965B2', '#ED8686', '#69BC99']}
            dataset={bardata}
            stack={false}
            Title=""
            subTitle=""
            left="70vw"
            type="bar"
            smooth={true}
            endValue={4}
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
