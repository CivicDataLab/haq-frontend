import StyledHeading from './Heading.styles';
import { TypographyProps, SpaceProps, ColorProps } from 'styled-system';

interface Props extends SpaceProps, ColorProps, TypographyProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'display'
    | 'h1b'
    | 'h4b'
    | 'h1l'
    | 'h2l'
    | 'h3l'
    | 'h4l'
    | 'h5l'
    | 'h6l'
    | 'displayl'
    | string[];
}

type HeadingProps = React.ComponentProps<typeof StyledHeading> & Props;

const Heading = ({
  as = 'h2',
  variant = 'h2',
  children,
  ...props
}: HeadingProps) => {
  return (
    <StyledHeading as={as} variant={variant} {...props}>
      {children}
    </StyledHeading>
  );
};

export { Heading };
