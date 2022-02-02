import styled from 'styled-components';

interface ButtonProps {
  readonly buttonType: string;
  readonly size: string;
  readonly className: string;
}

function bgColor(type: string) {
  if (type == 'primary') return 'palevioletred';
  else if (type == 'secondary') return 'teal';
  else return 'palevioletred';
}

function buttonSize(size: string) {
  if (size == 'sm') return '8px 12px';
  else return '12px 24px';
}

function buttonFont(size: string) {
  if (size == 'sm') return '12px';
  else return '1rem';
}

const ButtonComp = styled.button<ButtonProps>`
  padding: ${(props: any) => buttonSize(props.size)};
  font-size :${(props: any) => buttonFont(props.size)};
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;

  background-color: ${(props: any) => bgColor(props.buttonType)};
  border: none;
  color: white;
`;

export default ButtonComp;
