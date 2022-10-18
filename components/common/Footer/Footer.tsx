import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { getStrapiMedia } from 'lib/media';

const Footer = ({data}) => {
    return (
        <Wrapper>
            <Logo>
                <Image
                    className="logo_image-1"
                    src={getStrapiMedia(data.haq_logo.url)}
                    alt="footer_logo"
                    width={284}
                    height={195}
                />

                <p>
                   {data.desc}
                </p>

                <SocialLinks>
                    {data.footer_social_links.length > 0 && data.footer_social_links.map((item, index) => (
                        <a
                            key={`social_link.${index}`}
                            className=""
                            rel="noopener noreferrer"
                            href={item.link}
                        >
                            {item.img}
                        </a>
                        ))}
                </SocialLinks>
            </Logo>
            <div className="divider"></div>
            <Links>
            {data.footer_column.length > 0 ?
                    <LinkWrapper>
                        {data.footer_column.map((item, index) => {
                            return (
                                <LinkSection key={`link_section.${index}`}>
                                    <p>{item.name}</p>
                                    {item.footer_link.map((link, index) => (
                                        <a
                                            key={`footer_link.${index}`}
                                            className="link footer_link"
                                            rel="noopener noreferrer"
                                            href={link.link}
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </LinkSection>
                            )
                        })}

                    </LinkWrapper>
                    : null
                }
                {data.footer_image.length > 0 ?
                    <ImageContainer>
                        {data.footer_image.map((img: any, index: number) => {
                            return (
                                <Image
                                    className="logo_image"
                                    src={getStrapiMedia(data.footer_image[index].src.url)}
                                    alt={`footer_logo_${img.alt}`}
                                    width={150}
                                    height={132}
                                />
                            )
                        })}
                    </ImageContainer>
                    : null}
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

   padding-right:20px;
   @media(max-width:1200px){
     padding-right:10px;
    }
   @media(max-width:490px){
     padding-right:0px;
    }
    
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