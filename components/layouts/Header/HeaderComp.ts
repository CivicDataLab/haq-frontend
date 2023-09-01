import styled from 'styled-components';

const HeaderComp = styled.div`
  margin-top: 2.5rem;

  @media (max-width: 480px) {
    margin-top: 1.5rem;
  }

  h4 {
    max-width: min(720px,100%);
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;

    &:first-of-type {
      padding-top: 1rem;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }

  @media (min-width: 768px) {
    p {
      width: 70%;
    }
  }

  @media (max-width: 980px) {
    figure {
      padding: 24px;

      svg {
        width: 120px;
      }
    }
  }

  @media (max-width: 480px) {
    p {
      grid-column: 1/3;
    }
  }
`;

export default HeaderComp;
