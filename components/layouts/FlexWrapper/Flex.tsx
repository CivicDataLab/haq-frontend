import React from 'react';
import styled from 'styled-components';
import {
  flexbox,
  FlexboxProps,
  space,
  layout,
  SpaceProps,
  LayoutProps,
} from 'styled-system';

interface Props extends FlexboxProps, SpaceProps, LayoutProps {
  children: React.ReactNode;
  gap?: string;
}

const Flex = ({ children, gap, ...props }: Props) => {
  return (
    <Wrapper gap={gap} {...props}>
      {children}
    </Wrapper>
  );
};

export default Flex;

const Wrapper = styled.div<Props>`
  display: flex;
  gap: ${(props) => props.gap};

  ${flexbox};
  ${space};
  ${layout};
`;
