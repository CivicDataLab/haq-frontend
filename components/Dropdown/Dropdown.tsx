import React from 'react';
import {
  DropdownComp,
  DropdownLabel,
  DropdownOption,
  DropdownSelect,
} from './DropdownComp';

interface Props {
  /**
   * Options to display in the dropdown
   */
  options: {
    value: string;
    title: string;
  }[];

  /**
   * current value of dropdown
   */
  value?: string;

  /**
   * Heading for the dropdown
   */
  heading?: string;

  /**
   * return prop
   */
  handleChange?: (event: string) => void;
}

const Dropdown = ({ heading, options, handleChange, value }: Props) => (
  <DropdownComp className="dropdown">
    {heading && (
      <DropdownLabel htmlFor="dropdown-select">{`${heading}:`}&nbsp;&nbsp;</DropdownLabel>
    )}

    <DropdownSelect
      id="dropdown-select"
      className="dropdown__selector"
      onChange={e => handleChange(e.target.value)}
      value={value}
    >
      {options.map((option: any, index: any) => (
        <DropdownOption value={option.value} key={`dropdown-${index}`}>
          {option.title}
        </DropdownOption>
      ))}
    </DropdownSelect>
  </DropdownComp>
);

export default Dropdown;
