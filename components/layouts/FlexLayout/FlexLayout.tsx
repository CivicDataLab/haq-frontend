import React from 'react';
import styled from 'styled-components';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  basis: string;
}

interface FlexProps {
  readonly left: React.ReactNode;
  readonly right: React.ReactNode;
  readonly basis: string;
}

const FlexLayout = ({ left, right, basis }: Props) => {
  return (
    <Wrapper basis={basis}>
      <div className="sidebar">{left}</div>

      <div className="not-sidebar">{right}</div>
    </Wrapper>
  );
};

export default FlexLayout;

const Wrapper = styled.div<FlexProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .sidebar {
    flex-grow: 1;
    flex-basis: ${(props) => (props.basis ? props.basis : '312px')};
  }

  .not-sidebar {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
  }
`;
