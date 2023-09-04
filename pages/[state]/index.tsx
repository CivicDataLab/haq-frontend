import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumb } from 'components/actions';
import { fetchAPI } from 'lib/api';
import { Card, InfoCarousel } from 'components/pages/state';
import { Header, ListCard } from 'components/pages/state';
import * as data from 'data/statedata/statedata';
import Head from 'next/head';
import { capitalizeWords } from 'utils/data';
import { Banner } from 'components/shared';

type Props = {
  pathName: string;
  foundState: string;
  stateData:any
};

const State: React.FC<Props> = ({ foundState, pathName, stateData: [stateData] }) => {
  const breadcrumbArray = ['Home', foundState];
  const { Header: stateHeader, linkcard, listcard, carousel } = stateData;

  return (
    <>
      <Head>
        <title> {foundState} | HAQ</title>
      </Head>
      <Wrapper foundState={foundState}>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
          <Header header={stateHeader} schemeList={data.obj} />
        </main>
      </Wrapper>
      <Card state={pathName} dataset={linkcard} />
      <ListCard data={listcard[0]} />
      <div className='container'>
        <Banner details={data.banner}/> 
      </div>
      {listcard[1] && <ListCard data={listcard[1]} />}
      <InfoCarousel carousel={carousel} />
    </>
  );
};

const Wrapper = styled.div<{ foundState: string }>`
  background-color: #EFD7F5;
  background-image: url('/assets/Hero${props => props.foundState}.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @media(max-width:720px){
    background-image: url('/assets/MobileHero${props => props.foundState}.svg');
    background-size: cover;
    background-position: 20% 20%;
  }

  > div {
    max-width: 1280px;
  }
`;

const normalizeStateName = (state) => {
  return state.replace(/\s+/g, '-').toLowerCase();
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: data.stateArray.map((obj) => ({
      params: {
        state: normalizeStateName(obj),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { state }: any = params;
  const foundState = capitalizeWords(state);

  const stateData = await fetchAPI(`/statepages?filters[slug]=${state}`);
  return {
    props: {
      pathName: state,
      foundState,
      stateData: stateData.data
    },
    revalidate: 1,
  };
};

export default State;
