import React, { useState } from 'react';
import ButtonComp from './ButtonComp';

export type ButtonComponentProps = {
  children?: HTMLCollection | string;
  onClick: (e?: React.MouseEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, children, ...data }: ButtonComponentProps) => {
  const buttonType = data.type ? data.type.toLowerCase() : 'primary';

  return (
    <ButtonComp onClick={onClick} buttonType={buttonType}>
      {children}
    </ButtonComp>
  );
};

export default Button;
