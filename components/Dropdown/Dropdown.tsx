import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SelectComp,
  SelectLabel,
  NativeSelect,
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

const selectID = uuidv4();

const Select = ({ heading, options, handleChange, value }: Props) => (
  <SelectComp className="Select">
    {heading && (
      <SelectLabel id={selectID}>{`${heading}:`}&nbsp;&nbsp;</SelectLabel>
    )}
    <NativeSelect
      aria-labelledby={selectID}
      className="Select__selector"
      onChange={(e) => handleChange(e.target.value)}
      value={value}
    >
      {options.map((option: any, index: any) => (
        <option value={option.value} key={`selectNative-${index}`}>
          {option.title}
        </option>
      ))}
    </NativeSelect>
  </SelectComp>
);

export default Select;
