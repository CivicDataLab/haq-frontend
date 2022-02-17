import styled from 'styled-components';

export const DatasetCardComp = styled.a`
  text-decoration: none;
  padding: 1.5rem;
  display: block;
  border-radius: 6px;
  transition: transform 200ms ease;
  display: flex;

  > figure {
    margin-right: 1rem;
  }

  .card__image {
    width: 60px;
    width: 60px;
  }

  .card__group {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 4px;
  }

  .card__heading {
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text);
  }

  .card__date {
    font-size: 10px;
    line-height: 25px;
    color: $grey-2;
    margin-bottom: 10px;
    display: block;
  }

  .card__content {
    padding-top: 0.5rem;
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

export const RelatedCardComp = styled.a`
  display: grid;
  background-color: #fff;
  color: hsla(0, 0%, 0%, 0.87);
  border-radius: 12px;
  padding: 1.5rem 3rem;
  border: 1px solid #cdd1d1;
  transition: box-shadow 0.2s ease-out, border-color 0.2s ease-out;
  text-decoration: none;

  flex-basis: 48%;
  flex-grow: 1;

  &:hover,
  &:focus-within {
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.16);
    border-color: #eff2f2;
  }

  img {
    border-radius: 8px;
    width: 100%;
    object-fit: cover;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 1.5rem 0;
    gap: 1rem;

    li {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 12px;
      line-height: 130%;
      color: hsla(0, 0%, 0%, 0.6);
      background-color: hsla(0, 0%, 0%, 0.08);
      padding: 4px 6px;
    }
  }

  h3 {
    font-weight: 800;
    font-size: 1.25rem;
    line-height: 1.3;

    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
  }

  p {
    font-weight: 500;
    line-height: 1.7;
    margin-top: 0.5rem;

    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
  }
`;
