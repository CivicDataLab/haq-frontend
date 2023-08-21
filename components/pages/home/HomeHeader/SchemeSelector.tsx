import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';

const SchemeSelector: React.FC<{
  schemeList: any;
  isLoading?: boolean;
}> = ({ schemeList, isLoading }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

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

  const groupedOpt = React.useMemo(() => {
    return Object.entries(schemeList).map(([state, data]: any) => {
      return {
        label: state.charAt(0).toUpperCase() + state.slice(1),
        options:
          selectedData in data
            ? data[selectedData].map((item) => ({
                value: item.scheme_code,
                label: item.scheme,
                tag: item.tag,
                state,
              }))
            : [],
      };
    });
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
          key={JSON.stringify(groupedOpt)}
          options={groupedOpt}
          isClearable
          isDisabled={isLoading}
          onChange={(e: any) => {
            if (e) {
              setSelectedScheme({
                state: e.state,
                code: e.value,
              });
            } else {
              setSelectedScheme(null);
            }
          }}
          noOptionsMessage={() => <div>Please select a type</div>}
          isSecondCombobox
          formatOptionLabel={(option: any) => (
            <Label>
              {option.label.length > 35
                ? `${option.label.substring(0, 35)}...`
                : option.label}
              <Tag> {option.tag}</Tag>
            </Label>
          )}
          isGrouped={true}
        />
        <Button
          kind="primary"
          size="sm"
          href={
            selectedScheme
              ? `/${selectedScheme.state}/${selectedData}/${selectedScheme.code}`
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
    background: var(--grey-04, #afabb0);
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