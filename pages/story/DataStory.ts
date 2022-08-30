import { Content, Footer, Wrapper } from 'components/pages/story/StoryCard/StoryCard';
import styled from 'styled-components';

const DataStory = styled.main`

  .heading-w-line {
    max-width: max-content;
    font-size: 1.5rem;
    border-bottom: 1px solid #adadad;
    width: 120%;
    font-weight:400;
  }

  .header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .team {
    margin-top: 2.5rem;
    a {
        margin-right: 0;
        max-width: 100%;
        width: 100%;
        display: block;
      }

      img {
        max-height: 219px;
        width: 100%;
        border-radius: 6px 6px 0 0;
      }

      h3 {
        margin-top: 1.25rem;
      }

      p {
        -webkit-line-clamp: 3;
        line-clamp: 3;
      }
  }
  .story-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 20px;

    ${Wrapper}{
      padding: 0;
      flex-direction: column;
      justify-content: flex-start;
    }

    ${Content} {
      padding: 1rem;
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    ${Footer} {
      align-self: flex-start; 
    }
  }

  a {
    text-decoration: none;
  }
`;

export default DataStory;