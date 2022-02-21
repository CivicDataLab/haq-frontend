import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SelectComp,
  SelectLabel,
  NativeSelect,
} from './SelectComp';
interface Props {
  /**
   * Options to display in the select
   */
  options: {
    value: string;
    title: string;
  }[];

  /**
   * Heading for the select
   */
  heading: string;

  /**
   * return prop
   */
  handleChange: (event: string) => void;
}

const selectID = uuidv4();

const Select = ({ heading, options, handleChange }: Props) => (
  <SelectComp className="select">
    {heading && (
      <SelectLabel id={selectID}>{heading}&nbsp;&nbsp;</SelectLabel>
    )}
    <NativeSelect
      aria-labelledby={selectID}
      onChange={(e) => handleChange(e.target.value)}
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
