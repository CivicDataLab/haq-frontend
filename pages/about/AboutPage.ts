import styled from 'styled-components';

const AboutPage = styled.main`

  .partners__heading {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 130%;
    color: #000;
  }

  .partners {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: space-between;
    align-items: stretch;
    gap:30px;

    li {
      flex-basis: 48%;
      flex-grow:1;

      > div {
        display: grid;
        height: 100%;
        grid-template-rows: max-content 1fr max-content;
      }
    }
  }
  .about__team {
    margin-top: 4rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 130%;
      color: rgba(0, 0, 0, 0.32);

      span {
        background: #4965b2;
        border-radius: 2px;
        width: 3rem;
        display: inline-block;
        height: 3px;
        margin-right: 0.5rem;
      }
    }

    p {
      font-size: 2.5rem;
      line-height: 130%;
      margin-top: 10px;
    }

    ul {
      margin-top: 3rem;
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #f1eef1;
      padding: 0 6rem 5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;      

      @media(max-width:1145px){
        padding: 0;
        gap:35px;
       }
      }

    li {
      display: flex;
      flex-basis:33.3%;
      @media(max-width:720px){
        flex-basis:38%;  
       }
      justify-content: center;
    }
  }
`;

export default AboutPage;
