import styled from 'styled-components';

const ShareComp = styled.ul`
  background-color: #fff;
  border: 1px solid #cdd1d1;
  box-shadow: 1px solid #eff2f2;

  a,
  button {
    font-weight: 500 !important;
    color: hsla(0, 0%, 0%, 0.87);
    line-height: 175%;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration-color: transparent;

    svg {
      margin-right: 12px;
      flex-basis: 1.5rem;
      width: 1.5rem;
      pointer-events: none;
    }

    &:hover {
      text-decoration-color: currentColor;
      background-color: #eee;
    }
  }
`;

export default ShareComp;
