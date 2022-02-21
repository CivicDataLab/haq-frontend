import styled from 'styled-components';

const BannerComp = styled.section`
  isolation: isolate;
  padding: 4rem 3rem;
  color: hsl(0, 33%, 99%);
  border-radius: 40px;
  position: relative;

  figure {
    mix-blend-mode: multiply;
   
    img {
      border-radius: 8px;
    }
  }

  .banner__content {
    width: clamp(250px, 100%, 700px);
    z-index: 10;

    h2 {
      line-height: 130%;
      font-weight: 900;
      font-size: 2.5rem;
    }

    > a {
      margin-top: 14px;
      display: block;
    }
  }

  figure {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;

    @media (max-width: 720px) {
      display: none;
    }
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    font-weight: 500;
  }

  a {
    text-decoration: none;
    font-weight: 600;
  }
`;

export default BannerComp;
