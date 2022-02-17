import styled from 'styled-components';

export const ExplorerPage = styled.main`
  .indicator-mobile {
    margin-top: 2rem;

    @media (min-width: 980px) {
      display: none;
    }
  }

  .heading {
    margin-bottom: 0.5rem;
    font-weight: 900;
    font-size: 2.5rem;
  }
`;

export const ExplorerHeader = styled.div`
  background-color: #fff;
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;

  section {
    margin-top: 2.5rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  gap: 1.5rem;

  figure {
    background-color: #fff;
    max-width: 72px;
    max-height: 72px;
    display: grid;
    place-content: center;
    padding: 22px;
    border-radius: 16px;
    border: 1px solid #cdd1d1;
  }

  svg {
    width: 29px;
    height: 29px;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 130%;
  }
`;

export const HeaderText = styled.p`
  font-weight: 500;
  line-height: 175%;
`;

export const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  span {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    line-height: 130%;
    color: hsla(0, 0%, 0%, 0.6);
    background-color: hsla(0, 0%, 0%, 0.08);
    padding: 4px 6px;
  }

  strong {
    color: #02838b;
    font-weight: bold;
  }
`;

export const ExplorerViz = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 312px minmax(0, 1fr);
  margin-top: 2.5rem;

  h3 {
    font-weight: 800;
    font-size: 18px;
    line-height: 156%;
    border-bottom: 1px solid #eff2f2;
    padding-bottom: 1rem;
  }

  @media (max-width: 980px) {
    display: block;
    margin-top: 1.5rem;
  }
`;

export const VizWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #f7fdf9;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
`;

export const VizHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 1.5rem;
`;

export const VizTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  li {
    min-width: 0;
  }

  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    padding-bottom: 12px;
    min-width: 120%;
    display: block;
    text-align: center;
    border-bottom: 2px solid transparent;
    font-weight: bold;
    color: hsla(0, 0%, 0%, 0.32);

    svg {
      margin-bottom: -3px;
      margin-right: 5px;
      fill: hsla(0, 0%, 0%, 0.32);

      &.svg-stroke {
        stroke: hsla(0, 0%, 0%, 0.32);
      }
    }

    &[aria-selected='true'] {
      color: #de4b33;
      border-bottom: 2px solid #de4b33;

      svg {
        fill: #de4b33;

        &.svg-stroke {
          stroke: #de4b33;
        }
      }
    }
  }
`;

export const VizGraph = styled.div`
  margin: 0 2rem 2rem;
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
`;

export const ExplorerSource = styled.div`
  border-top: 1px solid #cdd1d1;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 0;
  margin: 0 1.5rem;

  button,
  a {
    svg {
      width: 10px;
      margin-left: 8px;
    }
  }
`;

export const SourceText = styled.div`
  flex-basis: 35%;
  flex-grow: 1;
  font-size: 14px;

  p {
    color: var(--text-light-medium);
    font-weight: var(--font-weight-medium);
    display: inline;
  }
`;

export const SourceButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ExplorerRelated = styled.section`
  padding-top: 4rem;
  margin-top: 2.5rem;
  padding-bottom: 9rem;
  background-color: #fff;
`;

export const RelatedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 2.5rem;
`;

export default ExplorerPage;
