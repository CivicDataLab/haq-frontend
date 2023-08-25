import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';
import { SearchIcon } from 'components/icons';
import { Flex } from 'components/layouts/FlexWrapper';

const MobileSelector: React.FC<{
  schemeList: any;
  isLoading?: boolean;
}> = ({ schemeList, isLoading }) => {
  const [selectedData, setSelectedData] = useState('all datasets');
  const [selectedScheme, setSelectedScheme] = useState(null);

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
          mobileView
          formatOptionLabel={(option: any) => (
            <Label>
              {option.label.length > 18
                ? `${option.label.substring(0, 18)}...`
                : option.label}
              <Tag> {option.tag}</Tag>
            </Label>
          )}
          isGrouped={true}
          
        />
        <Button
          bg="#fff"
          size="sm"
          href={
            selectedScheme
              ? `/${selectedScheme.state}/${selectedData}/${selectedScheme.code}`
              : null
          }
          onClick={!selectedScheme ? () => alert('Select a scheme') : null}
          className="button"
          icon={<SearchIcon/>}
        >
        </Button>
      </ConsMenu>
    </Wrapper>
  );
};

export default MobileSelector;

export const Wrapper = styled.div`
   margin-top: 32px;
`;

export const ConsMenu = styled.div`
  display: flex;
  align-items: center;
  border-right: none;
  .button {
    height: 44px;
    padding: 6px;
    svg {
      margin: 0.1rem;
    }
    border: var(--border-1);
    border-left: none;
    border-radius: 0;
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
