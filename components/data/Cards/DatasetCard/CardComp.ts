import styled from 'styled-components';

type ColorProps = {
  index : number;
}

const colors = ['var(--color-honey)' , 'var(--color-amazon)', 'var(--color-violet)']

function pickColor (index:number){
  return colors[index % colors.length]
}

export const DatasetCardComp = styled.a<ColorProps>`
  text-decoration: none;
  padding: 1.5rem;
  display: block;
  border-radius: 6px;
  transition: transform 200ms ease;
  display: flex;
  border-left: solid;
  border-left-color: ${(props:any) => pickColor(props.index)} ;

  > figure {
    margin-right: 1rem;
  }

  .card__image {
    width: 60px;
    width: 60px;
  }

  .card__group {
    display : inline;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    padding-right: 6px;
    color : ${(props:any) => pickColor(props.index)} ;
  }

  .card__heading {
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text);
    padding-top : 4px;
  }

  .card__date {
    font-size: 10px;
    line-height: 25px;
    color: $grey-2;
    margin-bottom: 10px;
    display: block;
  }

  .card__content {
    display: flex;
    flex-wrap: wrap;
    color: rgba(0, 0, 0, 0.87);

    p {
      font-size: 16px;
      line-height: 140%;
    }
  }

  .card__id {
    margin-right: 3rem;
  }

  .card__name {
    margin-top: 1.25rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    .card__value {
      width: 100%;
      margin-top: 1.25rem;
    }
  }

  .card__title {
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 135%;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .card__details {
    margin-top: 1rem;
    line-height: 140%;
    font-size: 1rem;
    overflow: hidden;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;

    @media (max-width: 480px) {
      -webkit-line-clamp: 4;
      line-clamp: 4;
    }
  }
`;
