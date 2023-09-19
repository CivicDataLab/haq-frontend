import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { getStrapiMedia } from 'lib/media';
import { Heading } from 'components/layouts/Heading';

const Footer = ({ data }) => {
  return (
    <Wrapper>
      <div className="footer container">
        <Logo>
          <LogoImg>
            <Image
              className="logo_image-1"
              src={getStrapiMedia(data.haq_logo.url)}
              alt="footer_logo"
              width={78}
              height={100}
            />
            <Heading as = 'h2' variant='h2l'>   GIRL EDUCATION <br />
              FINANACE TRACKER</Heading>
          </LogoImg>

          <Content>
            Lorem Ipsum is simply dummy text of the printing and the type
            setting industry. Lorem Ipsum has been the industrys standard dummy
            text ever since the 1500s.
          </Content>
        </Logo>
        <hr className="horizontal-line" />
        <div style={{ marginTop: '32px', marginBottom: '24px' }}>
          co-created by
        </div>
        <Links>
          {data.footer_image.length > 0 ? (
            <ImageContainer>
              {data.footer_image.map((img: any, index: number) => {
                return (
                  <a
                    href={img.link}
                    rel="noreferrer"
                    target="_blank"
                    key={`footer_image_link.${index}`}
                  >
                    <Image
                      key={`footer_image.${index}`}
                      className="logo_image"
                      src={getStrapiMedia(data.footer_image[index].src.url)}
                      alt={`footer_logo_${img.alt}`}
                      width={140}
                      height={140}
                    />
                  </a>
                );
              })}
            </ImageContainer>
          ) : null}
          {data.footer_column.length > 0 ? (
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
                );
              })}
            </LinkWrapper>
          ) : null}
        </Links>
        <hr className="horizontal-line" />
        <SocialLinks>
          {data.footer_social_links.length > 0 &&
            data.footer_social_links.map((item, index) => (
              <a
                key={`social_link.${index}`}
                className=""
                rel="noopener noreferrer"
                target="_blank"
                href={item.link}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fixed"
                  width={31}
                  height={31}
                />
              </a>
            ))}
        </SocialLinks>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  margin-top: 100px;
  background-color: var(--color-background-darker);
  display: flex;
  color: white;

  .horizontal-line {
    background: rgba(255, 255, 255, 0.36);
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 40px;
  margin-bottom: 32px;
`;

const LogoImg = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const Content = styled.div`
  width: 100%; 

  @media (min-width: 800px) {
    width: 45%; 
    max-width: 800px;
  }`
;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  .logo_image {
    border-radius: 68px;
    background: var(--violet-00, #efd7f5);
    padding: 16px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SocialLinks = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  a {
    font-size: 24px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    margin: 22px 20px 40px 0;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const LinkWrapper = styled.div`
  color: white;
  display: flex;
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 840px) {
    justify-content: center;
  }

  @media (max-width: 490px) {
    flex-direction: column;
  }
  > section {
    max-width: 250px;
  }
`;

const LinkSection = styled.section`
  padding-right: 20px;
  @media (max-width: 1200px) {
    padding-right: 10px;
  }
  @media (max-width: 490px) {
    padding-right: 0px;
  }

  p {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    padding-bottom: 18px;
    line-height: 26px;
  }

  a {
    display: block;
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    padding-bottom: 14px;
  }
`;
