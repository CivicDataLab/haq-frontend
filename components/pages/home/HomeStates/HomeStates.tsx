import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { states } from 'data/home';
import { Tags } from 'components/data';
import { Button } from 'components/actions';
import { ButtonComp } from 'components/actions/Button';

const HomeStates = () => {
  return (
    <Wrapper>
      <div className="container">
        <Heading>Explore data from your region...</Heading>
        <StateList>
          {states.map((item, index) => (
            <Card key={`state-${index}`}>
              <StateTitle>{item.title}</StateTitle>
              <Tags data={item.tags} />
              <ImgCont>
                <Image
                  src={item.img}
                  width={221}
                  height={221}
                  alt=""
                  className="img-cover"
                />
              </ImgCont>
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
  background: var(--violet-00, #EFD7F5); 
`;

const Heading = styled.p`
  color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
  font-family: Rubik;
  font-size: 40px;
  font-weight: 400;
  line-height: 52px;
  padding-top: 48px;
`;

const StateList = styled.ul`
  margin-top: 40px;
  padding-bottom: 16px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(310px, 100%), 1fr));

  @media (max-width: 768px) { 
    grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  }
  
  gap: 24px;

  /* overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; */

  h3 {
    text-align: center;
    font-weight: 700;
  }
  padding-bottom: 120px;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  ${ButtonComp} {
    display: inline-flex;
    margin-top: 12px;
    text-decoration: none;
  }
`;

const Card = styled.li`
  border-radius: 12px;
  background: var(--hot-pink-100, #fff);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
  padding: 12px 16px 16px 16px;
`;

const StateTitle = styled.h1`
  color: var(--text-light-bg-high-emphasis, rgba(0, 0, 0, 0.87));
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  align-self: stretch;
`;
const ImgCont = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background: var(--background-light, #f0ebf0);
  padding: 15px;
`;
