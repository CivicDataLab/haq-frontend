import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from 'components/actions';

const Banner = () => {
  return (
    <Wrapper className="container">
      <Content>
        <h3>Want to learn more about budget data?</h3>
        <h4>Check out Budget Basics on OBI</h4>
        <Button size="sm" className="button">
          Budget Basics!
        </Button>
      </Content>
      <Illustration>
        <Image
          src="/assets/girl.svg"
          alt="budget basics"
          layout="fixed"
          height={180}
          width={230}
        />
      </Illustration>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  background: var(--sapphire-00, #ebf0ff);
  margin-top: 40px;
  display: flex;
  padding: 40px 104px 0 104px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px;
    padding-bottom: 0;
  }
`;

const Content = styled.div`
  padding-right: 40px;
  h3 {
    font-size: 22px;
    font-weight: 500;
  }

  h4 {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-light-bg-medium-emphasis, rgba(0, 0, 0, 0.6));
  }

  .button {
    margin-top: 24px;
  }

  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 20px;
  }
`;

const Illustration = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;


