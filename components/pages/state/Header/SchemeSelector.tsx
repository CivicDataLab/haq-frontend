import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';

const SchemeSelector: React.FC<{
  schemeList: any;
  isLoading?: boolean;
  state: string;
}> = ({ schemeList, isLoading, state }) => {

  const [selectedData, setSelectedData] = useState('all datasets');
  const [selectedScheme, setSelectedScheme] = useState(null);

  //   const states = React.useMemo(() => {
  //     if (consData) {
  //       let count = 0;
  //       const stateArr = Object.keys(consData).map((state) => {
  //         count += consData[state].length;
  //         return {
  //           value: state,
  //           label: capitalize(state.replaceAll('-', ' ')),
  //         };
  //       });
  //       SetConsCount(count);
  //       return stateArr;
  //     }
  //   }, [consData]);

  const data = [
    {
      value: 'all datasets',
      label: 'All Datasets',
    },
    {
      value: 'spending data',
      label: 'Spending Data',
    },

    {
      value: 'budget data',
      label: 'Budget Data',
    },
  ];

  const schemeLists = React.useMemo(() => {
    if (selectedData)
      return Object.values(schemeList[state][selectedData])
        .map((item: any) => ({
          value: item.scheme_code,
          label: item.scheme,
          tag: item.tag,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
  }, [selectedData]);

  return (
    <Wrapper>
      <ConsMenu>
        <Combobox
          options={data}
          isSearchable={false}
          isClearable
          placeholder="Select a type"
          isLoading={isLoading}
          isDisabled={isLoading}
          onChange={(e: any) => {
            setSelectedData(e?.value);
            setSelectedScheme(null);
          }}
          defaultValue={data[0]}
        />
        <Combobox
          key={JSON.stringify(schemeLists)}
          options={schemeLists}
          isClearable
          isDisabled={isLoading}
          onChange={(e: any) => setSelectedScheme(e?.value)}
          noOptionsMessage={() => 'Please select a type'}
          isSecondCombobox
          formatOptionLabel={(option: any) => (
            <Label>
              <Text> {option.label}</Text>
              <Tag> {option.tag}</Tag>
            </Label>
          )}
        />

        <Button
          kind="primary"
          size="sm"
          href={
            selectedScheme
              ? `/${state}/${selectedData}/${selectedScheme}`
              : null
          }
          onClick={!selectedScheme ? () => alert('Select a scheme') : null}
          className="button"
        >
          Explore Scheme
        </Button>
      </ConsMenu>
    </Wrapper>
  );
};

export default SchemeSelector;

export const Wrapper = styled.div`
  border-radius: 4px;
  margin-top: 32px;
`;

export const ConsMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1px;

  .button {
    height: 40px;
    text-decoration: none;
    margin-left: 10px;
    padding: 12px 24px;
    background: var(--grey-04, #AFABB0);  
  }
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tag = styled.div`
  border-radius: 12px;
  background: var(--color-flamingo-1);
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
`;

const Text = styled.span`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;