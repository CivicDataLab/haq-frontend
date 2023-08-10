import styled from 'styled-components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumb } from 'components/actions';
import { fetchAPI } from 'lib/api';
import { HomeCard, HomeCarousel } from 'components/pages/home';
import { Header, ListCard, Banner } from 'components/pages/state';
import * as data from 'data/statedata/statedata';
import Head from 'next/head';

type Props = {
  pathName: string;
  foundState: any;
  homepage: any;
};

const State: React.FC<Props> = ({ foundState, pathName, homepage }) => {
  const { dataset,carousel } = homepage;
  const breadcrumbArray = ['Home', foundState.State];
  return (
    <>
      <Head>
        <title> {foundState.State} | HAQ</title>
      </Head>
      <Wrapper>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
          <Header header={data.header} schemeList={data.obj} />
        </main>
      </Wrapper>
      <HomeCard dataset={dataset} />
      <ListCard data={data.listCard[0]} />
      <Banner />
      <ListCard data={data.listCard[1]} />
      <HomeCarousel carousel={carousel} />
    </>
  );
};

const Wrapper = styled.div`
  background-color: rgb(250, 93, 130, 0.4);
  background-image: url('/assets/bg_illustration.svg');
  background-size: cover;

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
        state: normalizeStateName(obj.State),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { state }: any = params;
  const foundState = data.stateArray.find(
    (item) => normalizeStateName(item.State) == state
  );
  const homepage = await fetchAPI('/homepage');
  return {
    props: {
      pathName: state,
      foundState,
      homepage: homepage.data,
    },
    revalidate: 1,
  };
};

export default State;
