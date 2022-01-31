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
   * Id
   */
  id?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const Button = ({
  kind = 'primary',
  size = 'md',
  label,
  id,
  ...props
}: ButtonProps) => {
  const buttonType = kind ? kind : 'primary';

  return (
    <ButtonComp
      id={id ? id : null}
      buttonType={buttonType}
      size={size}
      {...props}
    >
      {label}
    </ButtonComp>
  );
};

export default Button;
