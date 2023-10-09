import React from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { IconDropdown } from 'components/icons';

const handleHeaderClick = (id) => {
  const node = document.querySelector(`#${id}`);
  const collapseNode = node.parentElement.nextElementSibling;

  const classesNode = node.classList;
  if (classesNode.contains('react-select__group-active')) {
    node.classList.remove('react-select__group-active');
  } else {
    node.classList.add('react-select__group-active');
  }

  const classes = collapseNode.classList;
  if (classes.contains('collapsed')) {
    collapseNode.classList.remove('collapsed');
  } else {
    collapseNode.classList.add('collapsed');
  }
};

const CustomGroupHeading = (props) => {
  return (
    <button
      className="group-heading-wrapper"
      onClick={() => handleHeaderClick(props.id)}
      tabIndex={0}
    >
      <components.GroupHeading {...props} />
    </button>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconDropdown width={28} fill="var(--color-grey-300)" />
    </components.DropdownIndicator>
  );
};

interface Props {
  isGrouped?: boolean;
  isLight?: boolean;
  isDark?: boolean;
  disableOptions?: boolean;
  isSecondCombobox?: boolean;
  mobileView?: boolean;
}
type ComboboxProps = React.ComponentProps<typeof Select> & Props;

const Combobox = ({
  isGrouped,
  disableOptions = false,
  ...props
}: ComboboxProps) => {
  //  Custom filter function to handle grouped options
  const groupedFilter = React.useCallback(({ label, value }, string) => {
    label = label.toLocaleLowerCase();
    string = string.toLocaleLowerCase();

    // default search
    if (label.includes(string) || String(value).includes(string)) return true;

    // check if a group as the filter string as label
    const groupOptions: any = props.options.filter((group: any) =>
      group.label.toLocaleLowerCase().includes(string)
    );

    if (groupOptions) {
      for (const groupOption of groupOptions) {
        // Check if current option is in group
        const option = groupOption.options?.find((opt) => opt.value === value);
        if (option) {
          return true;
        }
      }
    }
    return false;
  }, []);

  return (
    <ReactSelectElement
      classNamePrefix="react-select"
      isOptionDisabled={() => disableOptions}
      aria-label={`${props.placeholder}` || 'Select an element'}
      components={{
        GroupHeading: isGrouped ? CustomGroupHeading : null,
        DropdownIndicator,
      }}
      filterOption={groupedFilter}
      {...props}
    />
  );
};

export default Combobox;

const ReactSelectElement = styled(Select)<Props>`
  .react-select {
    &__menu {
      margin-top: 1px;

      &-list {
        padding: 12px;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }
    }

    &__control {
      width: ${(props) =>
        !props.mobileView && (props.isSecondCombobox ? '400px' : '205px')};
      flex-grow: 1;
      border-radius: 2px;
      border: var(--border-1);
      border-right: ${(props) => props.mobileView && 'none'};
      font-weight: 400;
      background-color: ${(props) =>
        props.isLight ? '#ebf0ee' : props.isDark ? '#cdd1cf' : 'white'};
      box-shadow: none;
    }

    &__value-container {
      gap: 8px;
      padding: 5px 12px;
      padding-right: ${(props) => props.mobileView && '0'};
      flex-wrap: nowrap;
    }

    &__single-value {
      grid-area: 1/1/2/2;
      font-weight: 400;
      padding-block: 4px;
      color: var(--text-light-high);
      .tag {
        display: none;
      }
    }

    &__input-container {
      input {
        outline: none !important;
      }
    }

    &__multi-value {
      background-color: var(--color-background-light);
      margin: 0;
      border-radius: 4px;

      &__label {
        font-weight: 400;
        letter-spacing: 0.01em;
        font-size: 1rem;
        padding: 4px;
        padding-left: 8px;
      }

      &__remove {
        border-radius: 0px 4px 4px 0px;
        background-color: var(--text-light-disabled);
        padding: 4px;
      }
    }

    &__placeholder {
      padding-block: 2px;
      margin: 2px;
      color: var(--text-light-medium);
    }

    &__dropdown-indicator {
      padding: ${(props) => (props.mobileView ? '0' : '3px')};
    }

    &__indicator-separator {
      display: none;
    }

    &__clear-indicator {
      display: none;
    }

    &__group {
      padding: 0;
      margin-bottom: 8px;

      &:not(:first-of-type) {
        border-top: var(--border-1) !important;
      }

      &-heading {
        padding: 8px;
        border-radius: 2px;
        transition: background-color 150ms ease;
        margin-bottom: 0;
        color: var(--grey-03, #8e888f);
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 0.48px;
        text-transform: uppercase;
      }

      .react-select__option {
        // &:last-of-type {
        //   border-bottom: var(--border-1);
        // }

        &--is-focused {
          background-color: #e5eae7;
        }
      }
    }

    &__option {
      transition: background-color 150ms ease;
      font-size: 0.875rem;
      line-height: 1.7;
      cursor: pointer;
      border-radius: 2px;

      &--is-focused {
        background-color: var(--color-grey-600);
      }

      &--is-selected {
        font-weight: 600;
        background-color: var(--color-grey-600);
        color: var(--text-light-high);

        &:hover {
          background-color: var(--color-grey-600);
        }
      }
    }
  }

  .group-heading-wrapper {
    width: 100%;
    text-align: start;
    padding: 0;
    cursor: pointer;
  }

  .collapsed {
    display: none;
  }
`;
