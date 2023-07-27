import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';

const SchemeSelector: React.FC<{
  obj: any;
  isLoading?: boolean;
  state: string;
}> = ({ obj, isLoading, state }) => {

  const [selectedData, setSelectedData] = useState(null);
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
      return Object.values(obj[state][selectedData])
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
              <div> {option.label}</div>
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
  padding: 16px;
`;

export const ConsMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1px;

  .button {
    height: 40px;
    text-decoration: none;
    margin-left: 12px;
  }
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tag = styled.div`
  border-radius: 12px;
  background: #ffebef;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
`;