import styled from 'styled-components';

type ColorProps = {
  index?: number;
};

const tagColor = ['lightblue', 'lightpink']

function tag(index: number){
  return tagColor[index % tagColor.length]
}

export const TagsComp = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  gap: 0.5rem;
`

export const Tag = styled.li<ColorProps>`
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
    color: var(--text-light-medium);
    background-color:  ${props => (props.index !== undefined ? tag(props.index) : ' var(--text-light-disabled)')};
    padding: 4px 8px;
`;
