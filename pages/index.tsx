import Head from 'next/head';
import { HomeHeader, HomeRelatedCard, HomeStates } from 'components/pages/home';
import { fetchAPI } from 'lib/api';
import { SummaryCarousel } from 'components/layouts';
import styled from 'styled-components';
import * as data from 'data/home';

import { fetchJSON } from 'utils/data';

export default function Home({ homepage, schemeList }) {
  const { hero_section_heading, hero_section_subheading, datastory } = homepage || {};
  return (
    <>
      <Head>
        <title>HAQ</title>
      </Head>
      <HomeHeader
        heading={hero_section_heading}
        subheading={hero_section_subheading}
        schemeList={schemeList}
      />
      <HomeStates />
      <SummaryCarousel cards={data.summaryCards} displayLength={3} />
      <HomeRelatedCard datastory={datastory} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const [homepageResponse, schemeList] = await Promise.all([
      fetchAPI('/homepage'),
      fetchJSON('all-schemes'),
    ]);

    const homepage = homepageResponse.data;
    return {
      props: {
        homepage,
        schemeList,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        homepage: {},
        schemeList: [],
      },
    };
  }
}
