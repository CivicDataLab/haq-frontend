import styled from 'styled-components';

type ColorProps = {
  index: number;
};

const colors = [
  'var(--color-honey)',
  'var(--color-amazon)',
  'var(--color-violet)',
];
const colorsMeta = ['#C18547', '#43876A', '#865194'];

function pickColor(index: number, type?: string) {
  if (type && type == 'meta') return colorsMeta[index % colors.length];
  else return colors[index % colors.length];
}

export const DatasetCardComp = styled.a<ColorProps>`
  text-decoration: none;
  padding: 1.5rem;
  border-radius: 6px;
  transition: transform 200ms ease;
  display: flex;
  border-left: solid;
  border-left-color: ${(props: any) => pickColor(props.index)};

  .card__group {
    display: inline;
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
    color: ${(props: any) => pickColor(props.index, 'meta')};
  }

  .card__heading {
    font-size: 20px;
    line-height: 137%;
    font-weight: var(--font-weight-medium);
    margin-top: 4px;
  }

  ul {
    margin-top: 16px;
  }

  .card__content {
    margin-top: 12px;
    line-height: 137%;
  }
`;
