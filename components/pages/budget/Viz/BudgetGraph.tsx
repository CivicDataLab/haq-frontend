import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';

const BudgetGraph = ({ data, scheme_code }) => {
  
  const [bardata, setBarData] = useState([]);

  useEffect(() => {
  if (scheme_code) {
    const indicatorNames = ['indicator_01', 'indicator_02', 'indicator_03'];
    const headerArr = ['Fiscal Years', 'Budget Estimates', 'Revised Estimate', 'Actuals'];
    const barValuesArr = [];

    const fiscalYears = Object.keys(data[indicatorNames[0]]);

    fiscalYears.forEach((year) => {
      const barValues = [year];
      indicatorNames.forEach((indicatorName) => {
        barValues.push(data[indicatorName][year]);
      });
      barValuesArr.push(barValues);
    });

    const barArray = [headerArr, ...barValuesArr];
    setBarData(barArray);
  }
}, [scheme_code]);

return (
    <Wrapper>
      {bardata.length > 0 && (
        <section className="barViz">
          <GroupBarChart
            yAxisLabel={`Value in lakhs `}
            xAxisLabel="Financial Years"
            theme={['#4965B2', '#4965B2', '#ED8686','#69BC99']}
            dataset={bardata}
            stack={false}
            Title=""
            subTitle=""
            left="70vw"
            type="bar"
            smooth={true}
            endValue={1}
          />
        </section>
      )}
    </Wrapper>
  );
};

export default BudgetGraph;

export const Wrapper = styled.section`
  .styles {
    input:focus-visible {
      outline: 0px !important;
    }
  }
`;
