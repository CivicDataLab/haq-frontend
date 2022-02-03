import styled from 'styled-components';

const AboutComp = styled.div`
  width :1100px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

.partners__heading {
    margin-top : 1.5rem;
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
}


li {
    width: 48%;
    }
    
li  > div {
    display: grid;
    height: 100%;
    grid-template-rows: max-content 1fr max-content;
  }
`;

export default AboutComp;