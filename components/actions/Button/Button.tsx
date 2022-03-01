import React, { MutableRefObject, ReactElement } from 'react';
import ButtonComp from './ButtonComp';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Is this primary button or secondary?
   */
  kind?:
    | 'primary'
    | 'secondary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'custom';
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md';
  /**
   * overwrite background color
   */
  bg?: string;

  /**
   * use it to pass ref from useRef hook
   */
  passRef?: MutableRefObject<any>;

  /**
   * whether to take full width
   */
  fluid?: boolean;
}

type LinkProps =
  | { href?: false; rel?: never; target?: never }
  | { href?: string; rel?: 'noreferrer'; target?: '_blank'; onClick?: never };

type IconProps =
  | { icon?: false; iconSide?: never }
  | {
      icon?: ReactElement;
      iconSide?: 'left' | 'right';
      children?: React.ReactNode;
    };

type IconOnlyProps =
  | { iconOnly?: false }
  | {
      iconOnly?: true;
      icon: ReactElement;
      iconSide?: never;
    };

type Props = ButtonProps & IconProps & LinkProps & IconOnlyProps;

const Button = ({
  kind = 'primary',
  size = 'md',
  children,
  icon,
  iconOnly,
  bg,
  href,
  passRef,
  iconSide = icon ? 'right' : null,
  fluid = false,
  ...props
}: Props) => {
  return (
    <ButtonComp
      as={href ? 'a' : null}
      href={href ? href : null}
      bg={bg}
      iconSide={iconSide}
      iconOnly={iconOnly}
      buttonType={kind}
      size={size}
      ref={passRef ? passRef : null}
      fluid={fluid}
      {...props}
    >
      {icon && iconSide == 'left' && icon}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      {icon && iconSide == 'right' && icon}
    </ButtonComp>
  );
};

export default Button;
