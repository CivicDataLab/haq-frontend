import React from 'react';
import styled from 'styled-components';
import { Search } from 'components/data';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const HomeHeader = ({heading, subheading, links}) => {
  const router = useRouter();

  function searchChange(val: any) {
    router.push({
      pathname: '/datasets',
      query: {
        q: val.value,
      },
    });
  }


  return (
    <Wrapper>
      <div className="container">
        <HeaderContent>
          <HeaderText>
            <h4>{heading}</h4>
            <h5>{subheading}</h5>
            <SearchFilter>
              <Search newSearch={searchChange} />
              <SearchLinks>
                Quick Links:
                {links.map((item) => {
                  return (
                    <li key={`links-${item.id}`}>
                      <Link
                        href={{
                          pathname: '/datasets',
                          query: { 
                            q: item.link, 
                          },
                        }}
                        passHref>
                        <QuickLinks>{item.link}</QuickLinks>
                      </Link>
                    </li>
                  );
                })}
              </SearchLinks>
            </SearchFilter>
          </HeaderText>
          <BackgroundIllustration>
            <Image
              src="/assets/illustration.svg"
              width={650}
              height={526}
              alt=""
            ></Image>
          </BackgroundIllustration>
        </HeaderContent>
      </div>
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.div`
  background-color: rgb(250, 93, 130, 0.4);
  background-image: url('/assets/bg_illustration.svg');
  background-size: cover;

  > div {
    max-width: 1280px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  min-height: 580px;
`;

const HeaderText = styled.div`
  flex-basis: 55%;
  flex-grow: 1;
  z-index: 1;

  h4 {
    font-weight: 500;
    font-size: 2.2rem;
    line-height: 1.15;
  }

  h5 {
    font-weight: normal;
    color: var(--text-light-medium);
    margin-top: 8px;
    font-size:18px;
  }
`;

const BackgroundIllustration = styled.div`
  align-self: flex-end;
  margin-bottom: -90px;

  @media (max-width: 990px) {
    display: none;
  }
`;

const SearchFilter = styled.div`
  border: var(--border-2);
  border-radius: 12px;
  background: #fff;
  margin-top: 24px;
  padding: 12px;
  list-style: none;
`;

const SearchLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin-top: 6px;
  margin-left: 6px;

  @media (max-width: 980px) {
    display: none;
  }
`;

const QuickLinks = styled.a`
  font-size: 12px;
  padding-left: 10px;
  font-weight: 500;
  color: var(--color-secondary);
`;
