import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components/actions';
import { Combobox } from 'components/actions';
import { SearchIcon } from 'components/icons';
import { Tag, Label, Text } from './SchemeSelector';

const MobileSelector: React.FC<{
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

  const schemeLists = React.useMemo(() => {
    if (selectedData)
      return Object.values(schemeList[selectedData])
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
          key={JSON.stringify(schemeLists)}
          options={schemeLists}
          isClearable
          isDisabled={isLoading}
          onChange={(e: any) => setSelectedScheme(e?.value)}
          noOptionsMessage={() => 'Please select a type'}
          isSecondCombobox
          mobileView
          formatOptionLabel={(option: any) => (
            <Label>
              <Text> {option.label}</Text>
              <Tag className={`${option.tag.toLowerCase().trim()}`}>
                {option.tag}
              </Tag>
            </Label>
          )}
          id='mobileSelector'
        />

        <Button
          bg="#fff"
          size="sm"
          href={
            selectedScheme
              ? `/${state}/${selectedData}/${selectedScheme}`
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