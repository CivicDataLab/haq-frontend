import styled from 'styled-components';

const HeaderComp = styled.div`
  background-color: #E5E5E5;
  color: var(--text-light-high);

  .container {
    padding-top: 3.5rem;
    display: flex;
    align-items: flex-start;
  }
 
  .logo {
    display:flex;
    justify-content:space-around;
    align-items:center;
    min-width: 208px;
    min-height: 208px;
    background-color : #fff;
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
    border-radius: 12px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.6rem;
    grid-column: 2/3;
    grid-row: 1/2;
    word-break: break-all;
  }

  .header__content {
    padding-left : 2rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    grid-column: 2/3;
    grid-row: 2/3;

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }
`;
export default HeaderComp;
