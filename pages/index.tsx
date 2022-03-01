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
      <HomeHeader />
      <HomeCard />
      <HomeCarousel />
      <HomeRelatedCard />
    </>
  );
}
