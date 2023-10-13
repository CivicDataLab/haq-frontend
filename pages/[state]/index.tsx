import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumb } from 'components/actions';
import { fetchAPI } from 'lib/api';
import { Card, InfoCarousel } from 'components/pages/state';
import { Header, ListCard } from 'components/pages/state';
import * as data from 'data/statedata/statedata';
import Head from 'next/head';
import { capitalizeWords, fetchJSON } from 'utils/data';
import { Banner } from 'components/shared';

type Props = {
  pathName: string;
  foundState: string;
  stateData:any;
  schemeList: any;
};

const State: React.FC<Props> = ({ foundState, pathName, stateData: [stateData], schemeList }) => {
  const breadcrumbArray = ['Home', foundState];
  const { Header: stateHeader, linkcard, listcard, carousel } = stateData;

  let updateStateHeader = { ...stateHeader, state: pathName };

  return (
    <>
      <Head>
        <title> {foundState} | HAQ</title>
      </Head>
      <Wrapper pathName={pathName}>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
          <Header header={updateStateHeader} schemeList={schemeList} />
        </main>
      </Wrapper>
      <Card state={pathName} dataset={linkcard} />
       <ListCard data={listcard[0]} state={pathName}/>
      <div className='container'>
        <Banner details={data.banner}/> 
      </div>
      {listcard[1] && <ListCard data={listcard[1]} state={pathName}/>}
      <InfoCarousel carousel={carousel} />
    </>
  );
};

const Wrapper = styled.div<{ pathName: string }>`
  background-color: var(--color-violet-0);
  background-image: url('/assets/hero-${props => props.pathName}.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @media(max-width:720px){
    background-image: url('/assets/mobilehero-${props => props.pathName}.svg');
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

  const [stateData,schemeList] = await Promise.all([
    fetchAPI(`/statepages?filters[slug]=${state}`),
    fetchJSON('all-schemes', state),
  ]);

  return {
    props: {
      pathName: state,
      foundState,
      stateData: stateData.data,
      schemeList
    },
    revalidate: 1,
  };
};

export default State;
