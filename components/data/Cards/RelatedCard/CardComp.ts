import styled from 'styled-components';

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
