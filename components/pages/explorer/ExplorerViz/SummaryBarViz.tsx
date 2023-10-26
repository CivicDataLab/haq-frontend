import React, {
    useEffect,
    useState,
} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { GroupBarChart } from 'components/viz';
import { twoDecimals } from 'utils/data';

const SummaryBarViz = ({ meta, schemeRaw, consList, indicator, years, unitVal }) => {

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

    const { schemeType, schemeMode } = meta;

    const yearArr = ["2016-2017", "2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022", "2022-2023", "Total"]

    const filteredVal = (indicatorID, year, item) =>
        year == "Total"
            ? schemeRaw.data[indicatorID]['grant_name'][year][item.consCode]
            : schemeType == "Total"
                ? schemeRaw.data[indicatorID]['grant_name'][year][schemeType][item.consCode]
                : schemeRaw.data[indicatorID]['grant_name'][year][schemeType][schemeMode] == undefined
                    ? ""
                    : schemeRaw.data[indicatorID]['grant_name'][year][schemeType][schemeMode][item.consCode]

    const reversedYearArr = yearArr.slice(0, yearArr.length - 1).reverse().concat("Total");

    useEffect(() => {
        if (state.value.length > 0 && Object.keys(schemeRaw).length && indicator) {
            const indicatorID = Object.keys(schemeRaw.data).find(
                (item) => schemeRaw.data[item].slug === indicator)
            // for compare section
            if (state.value.length > 0) {
                const headerArr = ['Fiscal Years']
                items.forEach((item) => {
                    headerArr.push(item.title)
                });

                const barValuesArr = [];

                reversedYearArr.forEach((year) => {
                    const barValues = [year];
                    items.forEach((item) => {
                        let val = filteredVal(indicatorID, year, item)
                        if(unitVal === 'crore' || meta.indicator === 'scheme-utilisation')
                            val = twoDecimals(val/100)
                        barValues.push(val)
                        barValuesArr.push(barValues)
                    });
                })

                const barArray = [headerArr, ...barValuesArr]

                setBarData(barArray);
            }
        }
    }, [state.value, meta, indicator, unitVal]);

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
                <section className="barViz">
                    <GroupBarChart
                        yAxisLabel={`Units : ${meta.indicator === 'scheme-utilisation' ? '%' 
                        : (meta.unit.includes('lakh') ? '₹ in lakhs' : (meta.unit.includes('crore') ? '₹ in crore' : ''))}`}
                        xAxisLabel="Fiscal Years"
                        theme={['#4965B2','#ED8686','#69BC99']}
                        dataset={barData}
                        stack={false}
                        Title=""
                        subTitle=""
                        left="70vw"
                        type="bar"
                        smooth={true}
                        endValue={2}
                    />
                </section>
            )}
        </Wrapper>
    );
};

export default SummaryBarViz;

export const Wrapper = styled.section`
    .styles {
      input:focus-visible {
        outline : 0px !important;
      }
    }
  `;