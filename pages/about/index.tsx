import React from 'react';
import Head from 'next/head';
import { PartnerCard, TeamCard } from 'components/pages/about';
import { Header } from 'components/layouts';
import AboutPage from './AboutPage';
import { fetchAPI } from 'lib/api'

const About = ({teampage}) => {
  const {partner,team,heading} = teampage; 
  
  const headerData = {
    title: 'The Team',
    content: heading
  };

  return (
    <div>
      <Head>
        <title>About Us | HAQ</title>
      </Head>
      <div className="container">
        <AboutPage>
          <Header data={headerData} />
          <h3 className="partners__heading">Partners</h3>
          <ul className="partners">
            {partner.map((item, key) => {
              return (
                <li key={`partners-${key}`}>
                  <PartnerCard card={item} />
                </li>
              );
            })}
          </ul>
          <section className="about__team">
            <h3>
              <span /> members
            </h3>
            <p>Meet the doers &amp; builders</p>
            <ul>
              {team.map((item, key) => {
                return (
                  <li key={`team-${key}`}>
                    <TeamCard card={item} />
                  </li>
                );
              })}
            </ul>
          </section>
        </AboutPage>
      </div>
    </div>
  );
};

export default About;
export async function getStaticProps() {
  const teampage = await fetchAPI('/teampage');
  return {
    props: {
      teampage: teampage.data,
    },
    revalidate: 1,
  };
}