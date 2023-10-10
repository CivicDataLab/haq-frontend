import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Heading } from '../Heading';
import { useWindowSize } from 'utils/hooks';

const SubNav = ({ data }) => {
  const { width } = useWindowSize();

  return (
    <Header>
      <div className="container">
        <Wrapper>
          <Link passHref href={data.main.link}>
            <Heading as="h4" variant="h4l" style={{ cursor: 'pointer' }}>
              {data.main.title}
            </Heading>
          </Link>
          <NavLinks>
            <ul>
              {data.sublinks &&
                data.sublinks.map((navItem: any, index: number) => (
                  <li key={`menu-${index}`}>
                    <Link passHref href={navItem.link}>
                      <span>
                        {width < 480
                          ? navItem.title.split(' ')[0]
                          : navItem.title}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </NavLinks>
        </Wrapper>
      </div>
    </Header>
  );
};

export default SubNav;

const Header = styled.header`
  background-color: var(--color-violet-0);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
  @media (max-width: 480px) {
    padding: 2px;
  }
`;

const NavLinks = styled.nav`
  > ul {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 480px) {
      gap: 0rem;
    }
    
  }
   span {
     padding: 8px;
     align-items: center;
     display: flex;
     color: #333;
     font-size: 16px;
     transition: background-color 200ms ease;
     width: max-content;
     text-decoration: none;
     cursor: pointer;
     border-bottom: 2px solid transparent; 
     &:hover {
      border-bottom: 2px solid var(--nav-bg-hover);
     }
     &:active {
      border-bottom: 2px solid var(--nav-bg-hover);
     }
   }
`;
