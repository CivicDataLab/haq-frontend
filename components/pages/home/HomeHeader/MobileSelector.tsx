import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';
import { SearchIcon } from 'components/icons';
import { Flex } from 'components/layouts/FlexWrapper';
import { Tag, Label, Text } from './SchemeSelector';

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
          placeholder="Select a scheme"
          isDisabled={isLoading}
          onChange={(e: any) => {
            if (e) {
              setSelectedScheme({
                state: e.state,
                code: e.value,
                tag: e.tag,
              });
            } else {
              setSelectedScheme(null);
            }
          }}
          noOptionsMessage={() => 'No results found!'}
          isSecondCombobox
          mobileView
          formatOptionLabel={(option: any) => (
            <Label>
              <Text>{option.label}</Text>
              <Tag className={`${option.tag.toLowerCase().trim()}`}>
                {option.tag}
              </Tag>
            </Label>
          )}
          isGrouped={true}
          id="mobileSelector"
        />
        <Button
          bg="#fff"
          size="sm"
          href={
            selectedScheme
              ? selectedScheme.tag === 'budget'
                ? `/${selectedScheme.state}/budget?scheme=${selectedScheme.code}`
                : `/${selectedScheme.state}/datasets/${selectedScheme.code}`
              : null
          }
          onClick={!selectedScheme ? () => alert('Select a scheme') : null}
          className="button"
          icon={<SearchIcon />}
        ></Button>
      </ConsMenu>
    </Wrapper>
  );
};

export default MobileSelector;

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ConsMenu = styled.div`
  display: flex;
  align-items: center;
  border-right: none;
  #mobileSelector {
    flex-grow: 1;
  }
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
