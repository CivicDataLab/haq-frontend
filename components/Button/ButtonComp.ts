import styled from 'styled-components';

interface ButtonProps {
  readonly buttonType: string;
}

function bgColor(type: string) {
  if (type == 'primary') return 'palevioletred';
  else if (type == 'secondary') return 'teal';
  else return 'palevioletred'
}

const ButtonComp = styled.button<ButtonProps>`
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;

  background-color: ${(props: any) => bgColor(props.buttonType)};
  border: none;
  color: white;
`;

export default ButtonComp;
