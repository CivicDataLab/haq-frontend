import Head from 'next/head';
import {
 HomeHeader,
 HomeCard,
 HomeCarousel,
 HomeRelatedCard
} from 'components/pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>OPub</title>
      </Head>
      <HomeHeader />
      <HomeCard />
      <HomeCarousel />
      <HomeRelatedCard />
    </>
  );
}

