import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navList = [
  {
    link: '/datasets',
    name: 'Contracts Data',
  },
  {
    link: '/about',
    name: 'About Us',
  },
];

const Nav: React.FC = () => {
  const router = useRouter();
  return (
      <div className="navbar__web">
        <div className="container ">
          <div className="header__brand">
            <Link href="/">
              <a>
                <img className="brand_logo" src="/assets/images/oci_logo.png" alt="oci logo"></img>
      
              </a>
            </Link>
          </div>

          <nav className="navbar">
            <h2 className="sr-only">Navigation menu</h2>
            <ul className="navbar__container">
              {navList.map((navItem: any, index: number) => (
                <Link href={navItem.link}>
                    <a          
                      className={`navbar__item ${
                        router.pathname.includes(navItem.link)
                          ? 'navbar__item--active'
                          : ''
                      }`}
                    >
                      {navItem.name}
                    </a>
                    </Link>
                  ))}
            </ul>
          </nav>
        </div>
      </div>
  );
};

export default Nav;