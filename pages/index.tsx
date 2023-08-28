import Head from 'next/head';
import {
  HomeHeader,
  HomeCard,
  HomeCarousel,
  HomeRelatedCard,
} from 'components/pages/home';
import { fetchAPI } from 'lib/api';

export default function Home({homepage}) {
  const {hero_section_heading,hero_section_subheading,searchlink,dataset,carousel,datastory} = homepage
  return (
    <>
      <Head>
        <title>Welcome - Girl Education Spending Tracker</title>
      </Head>
      <HomeHeader heading={hero_section_heading} subheading={hero_section_subheading} links={searchlink} />
      <HomeCard dataset={dataset} />
      <HomeCarousel carousel={carousel}/>
      <HomeRelatedCard datastory={datastory}/>
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