import * as echarts from 'echarts/core';
import { Button } from 'components/actions';
import { Cross } from 'components/icons';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce, swrFetch } from 'utils/helper';
import MapViz from 'components/viz/MapViz';

const ExplorerMap = ({ meta, schemeData, dispatch, value }) => {
  const [mapValues, setMapvalues] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCode, setSelectedCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [mapIndicator, setMapIndicator] = useState(undefined);

  function transformData(inputData) {
    const transformedData = {};
    for (const key in inputData) {
      if (inputData.hasOwnProperty(key)) {
        const originalValue = parseFloat(inputData[key]);
        const transformedValue = twoDecimals(originalValue / 100);
        transformedData[key] = transformedValue;
      }
    }
    return transformedData;
  }

  const { data, isLoading } = swrFetch(
    `/assets/maps/Uttar Pradesh.json`
  );

  const twoDecimals = (num) => {
    return Number(num.toString().match(/^-?\d+(?:\.\d{0,2})?/));
  };

  // preparing data for echarts component  
  useEffect(() => {

    if (data && schemeData) {

      let stateData = Object.values(schemeData).map(Number);

      if (value === 'crore' && meta.indicator!=='scheme-utilisation') {

        const updatedData = transformData(schemeData);

        const tempData = Object.keys(updatedData).map((item: any) => ({
          name: item,
          value: updatedData[item] || 0,
          mapName: data.features.filter((obj) => {
            return obj?.properties['dtcode11'] === item;
          })[0]?.properties['dtname'],
        }));
        setMapvalues(tempData);

        stateData = stateData.map((number) => twoDecimals(number / 100));
      }
       
      else {

        const tempData = Object.keys(schemeData).map((item: any) => ({
          name: item,
          value: schemeData[item] || 0,
          mapName: data.features.filter((obj) => {
            return obj?.properties['dtcode11'] === item;
          })[0]?.properties['dtname'],
        }));
        setMapvalues(tempData);
      }

      stateData.sort(function (a, b) {
        return a - b;
      });

      const uniq = [...new Set(stateData)];
      const length = uniq.length;

      if (length > 4) {
        const a = uniq[0];
        const e = uniq[length - 1];

        const diff = e - a;

        let div = diff / 4;
        let b = twoDecimals(a + div);
        let c = twoDecimals(b + div);
        let d = twoDecimals(c + div);

        let binLength = Math.floor(uniq.length / 4);
        const vizIndicators = binLength
          ? [
              {
                min: a,
                max: b,
                label: `upto to ${b}`,
                color: '#4ABEBE',
              },
              {
                min: b,
                max: c,
                label: `${b} to ${c}`,
                color: '#41A8A8',
              },
              {
                min: c,
                max: d,
                label: `${c} to ${d}`,
                color: '#368B8B',
              },
              {
                min: d,
                max: e,
                label: `${d} and above`,
                color: '#286767',
              },
            ]
          : [
              {
                value: -9999999999,
                label: `Data Not Found`,
                color: '#494D44',
              },
            ];
        setMapIndicator(vizIndicators);
      } else {
        const vizIndicators = [];
        for (let i = 0; i < uniq.length; i++) {
          vizIndicators.push({
            min: uniq[i],
            max: uniq[i],
            label: `${uniq[i]}`,
            color:
              i === 0
                ? '#4ABEBE'
                : i === 1
                ? '#368B8B'
                : i === 2
                ? '#286767'
                : '#173B3B',
          });
        }
        setMapIndicator(vizIndicators);
      }
    }
  }, [schemeData, data, value]);
  
  function handleSearch(query, obj) {
    let newObj = [];
    setSearchQuery(query);
    if (query.length > 0) {
      Object.keys(obj).forEach(() => {
        newObj = obj.filter((item) =>
          JSON.stringify(item, ['mapName'])
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
    }
    setSearchItems(newObj);
  }

  const newMapItem = useCallback((e) => {
    if (e) {
      setSelectedItem(e.mapName);
      setSelectedCode(e.name);
      setSearchItems([]);
      setSearchQuery('');
      (document.getElementById('searchInput') as HTMLInputElement).value = '';

      // overriding map highlight on constituency selection
      const myChart = echarts.getInstanceByDom(
        document.querySelector('#mapView .echarts-for-react')
      );
      if (myChart) {
        myChart.dispatchAction({
          type: 'select',
          name: e.name,
        });
      }
    }
  }, []);

  function handlePanelClose() {
    setSelectedItem(undefined);
    const myChart = echarts.getInstanceByDom(
      document.querySelector('#mapView .echarts-for-react')
    );
    myChart.dispatchAction({
      type: 'select',
      name: '',
    });
  }

  return (
    <Wrapper>
      <SearchWrapper data-html2canvas-ignore>
        <input
          id="searchInput"
          type="text"
          placeholder="Search here for district"
          onChange={(e) => debounce(handleSearch(e.target.value, mapValues))}
        />
        {searchItems.length > 0 && (
          <SearchResult>
            {searchItems.map((items, index) => (
              <li key={`searchItems-${index}`}>
                <button
                  id={items.name}
                  data-name={items.mapName}
                  onClick={(e: any) =>
                    newMapItem({
                      name: e.target.id,
                      mapName: e.target.dataset.name,
                    })
                  }
                >
                  {items.mapName}
                </button>
              </li>
            ))}
          </SearchResult>
        )}
        {selectedItem && searchQuery.length == 0 && (
          <>
            <SelectedCons>
              <div>
                <h3>{selectedItem.toLowerCase()}</h3>
                <Button
                  icon={<Cross fill="#888F8B" />}
                  iconOnly={true}
                  kind="custom"
                  onClick={handlePanelClose}
                >
                  close
                </Button>
              </div>
            </SelectedCons>
          </>
        )}
      </SearchWrapper>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        mapIndicator && (
          <MapViz
            mapFile={data}
            data={mapValues}
            vizIndicators={mapIndicator}
            newMapItem={newMapItem}
            meta={meta}
          />
        )
      )}
    </Wrapper>
  );
};

export default ExplorerMap;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchWrapper = styled.div`
  position: absolute;
  right: 16px;

  top: 16px;
  isolation: isolate;
  z-index: 10;
  width: 100%;
  max-width: 276px;

  @media (max-width: 480px) {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  > input {
    padding: 8px 8px 8px 36px;
    font-size: 0.875rem;
    color: var(--text-light-medium);
    border: var(--border-1);
    width: 100%;

    background-image: url("data:image/svg+xml,%0A%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9162 9.6667H10.2579L10.0245 9.4417C11.0245 8.27503 11.5412 6.68337 11.2579 4.9917C10.8662 2.67503 8.93288 0.825033 6.59954 0.5417C3.07454 0.108366 0.107878 3.07503 0.541211 6.60003C0.824545 8.93337 2.67454 10.8667 4.99121 11.2584C6.68288 11.5417 8.27454 11.025 9.44121 10.025L9.66621 10.2584V10.9167L13.2079 14.4584C13.5495 14.8 14.1079 14.8 14.4495 14.4584C14.7912 14.1167 14.7912 13.5584 14.4495 13.2167L10.9162 9.6667ZM5.91621 9.6667C3.84121 9.6667 2.16621 7.9917 2.16621 5.9167C2.16621 3.8417 3.84121 2.1667 5.91621 2.1667C7.99121 2.1667 9.66621 3.8417 9.66621 5.9167C9.66621 7.9917 7.99121 9.6667 5.91621 9.6667Z' fill='%23666E6A'/%3E%3C/svg%3E");
    background-position: left 8px top 50%, 0px 0px;
    background-repeat: no-repeat, repeat;
  }
`;

const SearchResult = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 0px 0px 4px 4px;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
  width: 100%;

  li {
    line-height: 22px;
    border-radius: 4px;

    button {
      padding: 8px;
      width: 100%;
      text-align: start;
      height: 100%;
      transition: background-color 150ms ease;

      &:hover {
        background-color: var(--color-grey-600);
      }
    }
  }
`;

const SelectedCons = styled.section`
  background-color: var(--color-background-lighter);
  padding: 16px;
  margin-top: 12px;
  filter: drop-shadow(var(--box-shadow-1));
  backdrop-filter: blur(4px);
  border-radius: 2px;
  border: var(--border-1);
  opacity: 0.92;

  div:first-of-type {
    button {
      position: absolute;
      right: 0;
      top: 4px;
    }
  }

  h3 {
    font-weight: 500;
    font-size: 1rem;
    max-width: 90%;
    text-transform: capitalize;
    border-bottom:0;
    padding-bottom:0;
  }

`;
