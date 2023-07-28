import React from 'react';
import styled from 'styled-components';
import { Triangle } from 'components/icons';
import Image from 'next/image';
import { Button } from 'components/actions';

const ListCard = ({ data }) => {
  return (
    <>
      <CardContainer>
        <TagContainer>
          {' '}
          <Triangle /> {data.tag}
        </TagContainer>
        <div className="container">
          <h4>{data.question}</h4>
          <h1>{data.main}</h1>
          <h4>{data.sub}</h4>
        </div>
      </CardContainer>
      <ImageBg>
        <ImageContainer className="container">
          <Image
            src={data.imgSrc}
            alt={data.imgAltText}
            layout="fixed"
            height={424}
            width={1218}
          />
          <Button size="md" className="button">
            {data.buttonText}
          </Button>
        </ImageContainer>
      </ImageBg>
    </>
  );
};

export default ListCard;

const CardContainer = styled.div`
  background: var(--sapphire-05, #212d50);
  color: white;
  padding: 40px 0 48px 0;
  margin-top: 56px;
  position: relative;
  h4 {
    color: var(--text-dark-bg-medium-emphasis, rgba(255, 255, 255, 0.72));
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  h1 {
    font-weight: 400;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

const TagContainer = styled.div`
  border: 1px solid white;
  border-radius: 0px 0px 12px 12px;
  background: var(--sapphire-00, #ebf0ff);
  display: inline-flex;
  height: 42px;
  padding: 4px 8px;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
  position: absolute;
  right: 250px;

  @media (max-width: 1084px) {
    right: 100px;
  }

  top: -8px;
  color: var(--sapphire-05, #212d50);
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  text-transform: uppercase;

  > svg {
    position: absolute;
    top: 0;
    right: -9px;
  }
`;

const ImageBg = styled.div`
  background: var(--sapphire-00, #ebf0ff);
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  .button {
    position: absolute;
    bottom: 40px;
    right: 56px;
  }
`;
