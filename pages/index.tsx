import Head from 'next/head';
import {
  HomeHeader,
  HomeCard,
  HomeCarousel,
  HomeRelatedCard,
} from 'components/pages/home';
import { fetchAPI } from 'lib/api';

export default function Home({homepage}) {
  const {heading,searchlink,dataset,carousel,datastory} = homepage
  return (
    <>
      <Head>
        <title>HAQ</title>
      </Head>
      <HomeHeader heading={heading} links={searchlink} />
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