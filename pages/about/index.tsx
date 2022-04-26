import React from 'react';
import Head from 'next/head';
import { PartnerCard, TeamCard } from 'components/pages/about';
import { Header } from 'components/layouts';
import AboutPage from './AboutPage';

const About = () => {
  const headerData = {
    title: 'The Team',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  };

  const partners = [
    {
      name: 'CivicDataLab',
      title: 'Technology Partner',
      img: '/assets/images/cdl.png',
      desc: [
        'We are a research lab working at the intersection of data, tech, design and social science to strengthen the course of civic engagements in India.',
        'We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform.',
        'We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.',
      ],
      // email: 'info@civicdatalab.in',
      github: '/',
      linkedin: '/',
      twitter: '/',
      class: 'partners--dark-img',
    },
    {
      name: 'HAQ: Centre for Child Rights',
      title: 'Platform Owner',
      img: '/assets/images/haq-main.png',
      desc: [
        'HAQ: Centre for Child Rights works towards the recognition, promotion and protection of rights of all children',
        'It aims to look at the child in an integrated manner within the framework of the Constitution of India, and the UN Convention of the Rights of the Child, which India ratified in 1992, and contribute to the building of an environment where every child’s rights are recognised and promoted without discrimination.',
      ],
      // email: 'info@civicdatalab.in',
      github: '/',
      linkedin: '/',
      twitter: '/',
      class: 'partners--dark-img',
    },
  ];

  const team = [
    {
      name: 'Gaurav Godhwani',
      title: 'Lead',
      image: '/images/contributors/gaurav.jpg',
      github: 'https://github.com/gggodhwani',
      linkedin: 'https://www.linkedin.com/in/gggodhwani',
      twitter: 'https://twitter.com/gggodhwani',
    },
    {
      name: 'Kabeer',
      title: 'Project Lead',
      image: '/images/contributors/kabeer.jpg',
      github: 'https://github.com/Kabeer3',
      linkedin: 'https://www.linkedin.com/in/kabeer-arora-69827661/',
      twitter: 'https://twitter.com/kabeer3391',
    },
    {
      name: 'Shreya Agrawal',
      title: 'Data Engineer',
      image: '/images/contributors/shreya.jpg',
      github: 'https://github.com/shreyaagrawal0809',
      linkedin: 'https://github.com/shreyaagrawal0809',
      twitter: 'https://twitter.com/shreya_0809',
    },
    {
      name: 'Abhinav',
      title: 'Backend Engineer',
      image: '/images/contributors/abhinav.jpg',
      github: 'https://github.com/Abhi2102',
    },
    {
      name: 'Shoaib Ahmed',
      title: 'Frontend Engineer',
      image: '/images/contributors/shoaib.jpg',
      github: 'https://github.com/pixeledcode',
      linkedin: 'https://www.linkedin.com/in/pixeledcode',
      twitter: 'https://twitter.com/PixeledCode',
    },
  ];

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
            {partners.map((item, key) => {
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
