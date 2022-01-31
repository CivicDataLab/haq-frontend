import React from 'react';
import ButtonComp from './ButtonComp';

interface ButtonProps {
  /**
   * Is this primary button or secondary?
   */
  kind?: 'primary' | 'secondary';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const Button = ({
  kind = 'primary',
  size = 'md',
  label,
  ...props
}: ButtonProps) => {
  const buttonType = kind ? kind : 'primary';

  return (
    <ButtonComp buttonType={buttonType} size={size} {...props}>
      {label}
    </ButtonComp>
  );
};

export default Button;
