import Head from 'next/head';
import { HomeHeader, HomeRelatedCard, HomeStates } from 'components/pages/home';
import { fetchAPI } from 'lib/api';
import { SummaryCarousel } from 'components/layouts';
import styled from 'styled-components';
import * as data from 'data/home'

export default function Home({ homepage }) {
 
  const { hero_section_heading, hero_section_subheading, datastory } = homepage;
  return (
    <>
      <Head>
        <title>HAQ</title>
      </Head>
      <HomeHeader
        heading={hero_section_heading}
        subheading={hero_section_subheading}
      />
      <HomeStates />
      <SummaryCarousel cards={data.summaryCards} displayLength={3} /> 
      <HomeRelatedCard datastory={datastory} />
    </>
  );
}

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');
  return {
    props: {
      homepage: homepage.data,
    },
    revalidate: 1,
  };
}

