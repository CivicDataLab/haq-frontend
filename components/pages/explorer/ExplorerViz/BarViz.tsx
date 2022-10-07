import React, {
  useEffect,
  useState,
} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';

const BarViz = ({ meta, data, consList }) => {
  const [state, setState] = useState({
    value: [],
    stateOptions: null,
  });

  const [barData, setBarData] = useState([]);

  const handleSelectChange = (value) => {
    if (value === null) {
      setState({ ...state, value: [] });
    } else {
      setState({ ...state, value });
    }
  };

  const disableOptions = () => (
    state.value.length == 2 ? true : false
  );

  useEffect(() => {
    let statesData = [];
    statesData = Object.keys(consList).map((state) => {
      const temp: any = {};
      temp.value = consList[state][0]?.constCode;
      temp.label = state;
      return temp;
    });

    setState({
      ...state,
      stateOptions: statesData,
    });
  }, []);

  let items =
    state.value &&
    state.value.map((value, index) => ({
      title: value.label,
      consCode: value.value,
    }));

  useEffect(() => {
    if (state.value.length > 0 && Object.keys(data).length) {
      // for compare section
      if (state.value.length > 1) {
        
        const headerArr = ['Fiscal Years']
        items.forEach((item) => {
            headerArr.push(item.title)
        });

        const barValuesArr = [];
        
        Object.keys(data).forEach((year) => {
            const barValues = [year];
            items.forEach((item) => {
                barValues.push(data[year][item.consCode])
                barValuesArr.push(barValues)
            });
        })
        
        const barArray = [headerArr, ...barValuesArr]
        
        setBarData(barArray);
      } else {
        const barValues1 = [items[0].title];
        const headerArr = ['Constituency'];
        Object.keys(data).map((year) => {
          headerArr.push(year);
          barValues1.push(data[year][items[0].consCode]);
        });
        const barValues = [headerArr, barValues1];
        setBarData(barValues);
      }
    }
  }, [state.value, data]);

  return (
    <Wrapper>
      <Select
        inputId="selectInput"
        isMulti
        placeholder="Select any two disricts for comparison"
        value={state.value}
        options={state.stateOptions}
        onChange={handleSelectChange}
        isOptionDisabled={disableOptions}
        className="styles"
      />

      {items.length > 0 && barData.length > 0 && (
        <GroupBarChart
          yAxisLabel={`Value (in ${meta.unit})`}
          xAxisLabel={items.length == 1 ? "Constituency" : "Fiscal Years"}
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={barData}
          stack={false}
          Title=""
          subTitle=""
          left="70vw"
          type="bar"
          smooth={true}
        />
      )}
    </Wrapper>
  );
};

export default BarViz;

export const Wrapper = styled.section`
  .styles {
    input:focus-visible {
      outline : 0px !important;
    }
  }
`;