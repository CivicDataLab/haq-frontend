import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { states } from 'data/home';
import { Tags } from 'components/data';
import { Button } from 'components/actions';
import { ButtonComp } from 'components/actions/Button';
import { Heading } from 'components/layouts/Heading';

const HomeStates = () => {
  return (
    <Wrapper>
      <div className="container">
        <Heading
          as="h1"
          variant="h1"
          fontWeight="var(--font-weight-light)"
          pt="48px"
        >
          Explore data from your region..
        </Heading>
        <StateList>
          {states.map((item, index) => (
            <Card key={`state-${index}`}>
              <Heading as='h2' variant='h2l'>{item.title}</Heading>
              <Tags data={item.tags} />
              <figure>
                <Image
                  src={item.img}
                  width={221}
                  height={221}
                  alt=""
                  className="img-cover"
                />
              </figure>
              <BtnCont>
                <Button
                  kind="secondary-outline"
                  size="md"
                  className="explore_state"
                  href={`/${item.link}`}
                >
                  Explore Now
                </Button>
              </BtnCont>
            </Card>
          ))}
        </StateList>
      </div>
    </Wrapper>
  );
};

export default HomeStates;

const Wrapper = styled.section`
  background: var(--color-violet-0);
  padding-bottom: 120px;
`;

const StateList = styled.ul`
  margin-top: 40px;

  figure {
    display: flex;
    justify-content: center;
    border-radius: 8px;
    background: var(--background-light, #f0ebf0);
    padding: 15px;
  }

  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(min(310px, 100%), 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  }

  /* overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; */
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top:12px;
  
  ${ButtonComp} {
    text-decoration: none;
   }
`;

const Card = styled.li`
  border-radius: 12px;
  background: var(--hot-pink-100, #fff);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
  padding: 12px 16px 16px 16px;
`;
