import React from 'react';
import styled from 'styled-components';
import { Triangle } from 'components/icons';
import Image from 'next/image';
import { Button } from 'components/actions';
import { getStrapiMedia } from 'lib/media';
import { Heading } from 'components/layouts/Heading';

const ListCard = ({ data }) => {
  return (
    <>
      <CardContainer type={data.type}>
        <TagContainer type={data.type}>
          {' '}
          <Triangle /> <Heading as='h5' variant='h5l'> {data.tag}</Heading> 
        </TagContainer>
        <div className="container">
          <Heading as='h4' variant='h4l' color='rgba(255, 255, 255, 0.72)' mt='24px'>
            {data.question}
          </Heading>
          <Heading as='h1' variant='h1' color='#fff' mt='24px' mb='24px'>
            {data.main}
          </Heading>
          <Heading as='h4' variant='h4' color='rgba(255, 255, 255, 0.72)' mt='24px' 
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',              
              hyphens: 'auto'
            }}>
            {data.sub}
          </Heading>
        </div>
      </CardContainer>
      <ImageBg type={data.type}>
        <figure className="container">
          <Image
            src={getStrapiMedia(data.imgSrc.url)}
            alt={data.imgAltText}
            layout="fixed"
            height={424}
            width={1218}
          />
          <Button size="md" className="button">
            {data.buttonText}
          </Button>
        </figure>
      </ImageBg>
    </>
  );
};

export default ListCard;

const Styles = {
  budget: {
    bgContainer: 'var(--color-sapphire-3)',
    bgTag:'var(--color-sapphire-0)',
    colorTag:'var(--color-sapphire-3)',
    bgImg:'var(--color-sapphire-0)',
    bgBtn:'var(--color-sapphire-2)'
  },
  spending: {
    bgContainer: 'var(--color-flamingo-3)',
    bgTag:'var(--color-flamingo-0)',
    colorTag:'var(--color-flamingo-3)',
    bgImg:'var(--color-flamingo-0)',
    bgBtn:'var(--color-flamingo-2)'
  },
};

const CardContainer = styled.div<{type:string}>`
  background: ${(props) => Styles[props.type]?.bgContainer || 'inherit'};
  color: white;
  padding: 40px 0 48px 0;
  margin-top: 56px;
  position: relative;
`;

const TagContainer = styled.div<{type:string}>`
  border: 1px solid white;
  border-radius: 0px 0px 12px 12px;
  background: ${(props) => Styles[props.type]?.bgTag || 'inherit'};
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
    right: 70px;
  }

  top: -8px;
  color: ${(props) => Styles[props.type]?.colorTag || 'inherit'};
  text-transform: uppercase;

  > svg {
    position: absolute;
    top: 0;
    right: -9px;
  }
`;

const ImageBg = styled.div<{type:string}>`
  background: ${(props) => Styles[props.type]?.bgImg || 'inherit'};

  figure {
    position: relative;
    display: flex;
    align-items: flex-end;
    .button {
      position: absolute;
      bottom: 40px;
      right: 56px;
      background: ${(props) => Styles[props.type]?.bgBtn || 'inherit'};
    }
  }
`;