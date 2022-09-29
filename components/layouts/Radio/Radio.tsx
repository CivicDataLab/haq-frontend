import React from 'react';
import styled from 'styled-components';

const Radio = ({
  id,
  text,
  name,
  color = 'var(--color-grey-200)',
  ...props
}) => {
  return (
    <RadioItem id={id} color={color} {...props}>
      <input type="radio" name={name} value={id} />
      {text}
    </RadioItem>
  );
};

export default Radio;

export const RadioItem = styled.label`
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  color: var(--text-light-medium);

  input {
    /* Remove native radio style */
    appearance: none;
    background-color: #fff;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid  ${(props) => (props.color ? props.color : 'currentColor')};;
    border-radius: 50%;
    transform: translateY(0.2em);

    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em
        ${(props) => (props.color ? props.color : 'var(--color-grey-200)')};

      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus-visible {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
  }
`;
