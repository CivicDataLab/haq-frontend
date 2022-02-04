import React from 'react';
import ButtonComp from './ButtonComp';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Is this primary button or secondary?
   */
  kind?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'custom';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md';
  /**
   * overwrite background color
   */
  bg?: string;
  /**
   * change component type
   */
  as?: any;
  /**
   * href for `a` tag
   */
  href?: string;
  /**
   * no referrer for `a` tag
   */
   rel?: 'noreferrer';
   /**
   * target = blank in case, `a` tag is used
   */
  target?: '_blank';
}

const Button = ({
  kind = 'primary',
  size = 'md',
  children,
  bg,
  as,
  ...props
}: ButtonProps) => {
  const buttonType = kind ? kind : 'primary';

  return (
    <ButtonComp
      as={as ? as : null}
      bg={bg}
      buttonType={buttonType}
      size={size}
      {...props}
    >
      {children}
    </ButtonComp>
  );
};

export default Button;
