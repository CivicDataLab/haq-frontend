import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import * as data from 'data/footerdata/footerlist';

const Footer = () => {
    return (
        <Wrapper>
            <Logo>
                <Image
                    className="logo_image-1"
                    src="/assets/images/placeholder.jpg"
                    alt="footer_logo"
                    width={384}
                    height={204}
                />

                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys standard.
                </p>

                <SocialLinks>
                    {data.Social_Links.map((link, index) => (
                        <a
                            key={`social_link.${index}`}
                            className=""
                            rel="noopener noreferrer"
                            href={link.value}
                        >
                            {link.image}
                        </a>
                        ))}
                </SocialLinks>

                <ImageContainer>
                    <Image
                        className="logo_image-2"
                        src="/assets/images/placeholder.jpg"
                        alt="footer_logo"
                        width={176}
                        height={132}
                    />
                    <Image
                        className="logo_image-3"
                        src="/assets/images/placeholder.jpg"
                        alt="footer_logo"
                        width={176}
                        height={132}
                    />
                </ImageContainer>
            </Logo>
            <div className="divider"></div>
            <Links>
                <LinkWrapper>
                    <LinkSection>
                        <p>{data.About_Platform.name}</p>
                        {data.About_Platform.links.map((link, index) => (
                            <a
                                key={`footer_link-1.${index}`}
                                className="link footer_link"
                                rel="noopener noreferrer"
                                href={link.value}
                            >
                                {link.title}
                            </a>
                        ))}
                    </LinkSection>

                    <LinkSection>
                        <p>{data.Data_Explorer.name}</p>
                        {data.Data_Explorer.links.map((link, index) => (
                            <a
                                key={`footer_link-2.${index}`}
                                className="link footer_link"
                                rel="noopener noreferrer"
                                href={link.value}
                            >
                                {link.title}
                            </a>
                        ))}
                    </LinkSection>

                    <LinkSection>
                        <p>{data.Key_Schemes.name}</p>
                        {data.Key_Schemes.links.map((link, index) => (
                            <a
                                key={`footer_link-3.${index}`}
                                className="link footer_link"
                                rel="noopener noreferrer"
                                href={link.value}
                            >
                                {link.title}
                            </a>
                        ))}
                    </LinkSection>
                </LinkWrapper>
                <Image
                    className="logo_image-2"
                    src="/assets/images/placeholder.jpg"
                    alt="footer_logo"
                    width={694}
                    height={300}
                />
            </Links>
        </Wrapper>
    )
}

export default Footer;


const Wrapper = styled.footer`
  margin-top:100px;
  background-color : var(--color-background-darker);
  padding:64px 50px;
  display:flex;
  justify-content: center;
  gap:80px;

  .divider {
    width: 1px;
    background: rgba(255, 255, 255, 0.16);
 }

  @media(max-width:1200px){
    gap:45px;
  }

  @media(max-width:840px){
      flex-wrap:wrap;
      .divider {
        display:none;
     }
  }


`;

const Logo = styled.div`
  display : flex;
  flex-basis:384px;
  flex-direction:column;
  justify-content:space-between;

  > p {
    margin-top:16px;
    color: var( --color-background-lighter);
    font-weight: var(--font-weight-light);
    font-size: 16px;
    line-height: 22px;
  }
`;

const ImageContainer = styled.div`
    display:flex;
    justify-content: space-between;
    gap:32px;
`;

const SocialLinks = styled.div`
  a {
    font-size:24px;
    width:40px;
    height:40px;
    line-height:40px;
    display:inline-block;
    text-align:center;
    border-radius:50%;
    border:1px solid #ccc;
    margin:22px 16px 40px 0;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LinkWrapper = styled.div`
  color:white;
  display:flex;
  gap: 32px;
  margin-bottom:40px;
  
  @media(max-width:840px){
      justify-content:center;
  }

  @media(max-width:490px){
    flex-direction: column;
   }
`;

const LinkSection = styled.section`

   p {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    padding-bottom:18px;
    line-height: 26px;
   }  

   a {
    display:block;
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    padding-bottom: 14px;
   }
`;