import React, { useState, useEffect } from 'react';
import PartnerCard from '../../../components/PartnerCard/PartnerCard';
import AboutComp from './AboutComp';

const About = () => {
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
            email: 'info@civicdatalab.in',
            github: '/',
            linkedin: '/',
            twitter: '/',
            class: 'partners--dark-img',
        },
        {
            name: 'Open Contracting Partnership',
            title: 'Platform Owner',
            img: '/assets/images/ocp.png',
            desc: [
                'The Open Contracting Partnership is an independent non-profit public charity 501(c)(3) working in over 50 countries.',
                'We are a silo-busting collaboration across governments, businesses, civil society, and technologists to open up and transform government contracting worldwide. Bringing open data and open government together, we make sure public money is spent openly, fairly and effectively on public contracts, the single biggest item of spending by most governments. They are a government’s number one corruption risk and they are vital to make sure citizens get the services that they deserve.',
            ],
            email: 'info@civicdatalab.in',
            github: '/',
            linkedin: '/',
            twitter: '/',
            class: 'partners--dark-img',
        },
    ];

    return (
            <AboutComp>
                <h3 className = "partners__heading">Partners</h3>
                <ul className="partners">
                    {partners.map((item, key) => {
                        return (
                            <li key={`partners-${key}`}>
                                <PartnerCard card={item} />
                            </li>
                        );
                    })}
                </ul>

            </AboutComp>
    )

}


export default About;