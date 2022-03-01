import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'components/data';
import { SearchInput } from 'components/data/Search/SearchComp';
import Link from 'next/link';
import Image from 'next/image';
const HomeHeader = () => {
  const [search, setSearch] = useState("");

  function SearchChange(val: any) {
        setSearch(val.value);
  }

  const links = ["maharashtra", "police", "union-budget", "maharashtra", "annual finance statement", "police"]

  return (
    <Wrapper>
      <div className="container">
        <HeaderContent>
          <HeaderText>
            <h4> Hero Section Heading </h4>
            <h5> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </h5>
            <SearchFilter>
              <Search newSearch={SearchChange} />
              <SearchLinks>
                Quick Links:
                {links.map((item,index) => {
                  return (
                    <li key={`links-${index}`}>
                     <Link href="/">
                      <QuickLinks>
                        {item}
                      </QuickLinks>
                     </Link>
                    </li>
                  )
                })}
              </SearchLinks>
            </SearchFilter>
          </HeaderText>
          <BackgroundIllustration>
            <Image
              src="/assets/illustration.svg"
              width={650.34}
              height={526.88}
            ></Image>
          </BackgroundIllustration>
        </HeaderContent>
      </div >
    </Wrapper >
  );
};

export default HomeHeader;


const Wrapper = styled.div`
  background-color:rgb(250,93,130,0.4);
  background-image:url('/assets/bg_illustration.svg');
  background-size: cover;
`;

const HeaderContent = styled.div`
   display:flex;
   position:relative;
   height:580px;
`;


const HeaderText = styled.div`
  justify-content:center;
  display:flex;
  flex-direction:column;
  width:60%;
  z-index:1;
   
  h4 {
    font-weight: 500;
    font-size: 40px;
    padding-bottom:14px;
    line-height:1;
  }

  h5 {
    font-weight: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    padding-bottom:24px;
    padding-top:10px;
  }

  @media only screen and (max-width: 1196px) {
     {
       width:70%;
    }
  }
  @media only screen and (max-width: 970px) {
    {
      width:90%;
   }
 }
`;  

const BackgroundIllustration = styled.div`
   display:flex;
   position : absolute;
   right:-10%;
   bottom:0;
   margin-bottom:-90px;
   @media only screen and (max-width: 990px) {
     {
       display:none;
    }
  }
`;

const QuickLinks = styled.div`
  font-size: 12px;
  padding-left:10px;
  font-weight:500;
  text-decoration-line: underline;
  cursor : pointer;
  color: #4965B2;
`;

const SearchFilter = styled.div`
   border: 1px solid #F2EFF2;
   box-sizing: border-box;
   border-radius: 12px;
   background:#fff;
   padding:12px;
   list-style:none;

   ${SearchInput} {
    line-height: 40px;
  }
  `;

const SearchLinks = styled.div`
    display:flex;
    font-size: 12px;
    padding-top:6px;
    padding-left:6px;
    @media only screen and (max-width: 980px) {
      {
       display:none;
     }
  }
  `;