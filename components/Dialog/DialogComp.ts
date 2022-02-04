import styled from 'styled-components';

const DialogComp = styled.div`
  position: relative;
  height: 100%;

  button {
    &[aria-expanded='true'] {
      background-color: #ebfeff;
    }
  }

  > div {
    position: absolute;
    top: 4rem;
    right: 0;
  }
`;

export default DialogComp;
