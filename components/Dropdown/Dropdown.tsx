import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SelectComp,
  SelectLabel,
  NativeSelect,
  CustomSelect,
  CustomSelectContent,
} from './DropdownComp';
import Widget from 'components/Widget/Widget';

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

const Dropdown = ({ heading, options, handleChange, value }: Props) => (
  <SelectComp className="dropdown">
    {heading && (
      <SelectLabel id={selectID}>{`${heading}:`}&nbsp;&nbsp;</SelectLabel>
    )}

    <CustomSelect aria-hidden="true">
      <Widget
        buttonContent={value}
        title="share menu"
        buttonStyle="custom"
        buttonClass="select__button"
      >
        <CustomSelectContent role="list">
          {options.map((option: any, index: any) => (
            <li role="listitem" key={`select-${index}`}>
              <button
                value={option.value}
                onClick={(e: any) => handleChange(e.target.value)}
              >
                {option.title}
              </button>
            </li>
          ))}
        </CustomSelectContent>
      </Widget>
    </CustomSelect>

    <NativeSelect
      aria-labelledby={selectID}
      className="dropdown__selector"
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

export default Dropdown;
