import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MobNav from '../MobileNav/MobileNav'
import * as nav from 'data/navdata/navlist';

const Nav: React.FC = () => {
  const router = useRouter();
  return (
   <div>
    <div className="navbar__web">
      <div className="container ">
        <div className="header__brand">
          <Link href="/">
            <a>
              <Image
                className="brand_logo"
                src="/assets/images/oci_logo.png"
                alt="oci logo"
                width={200}
                height={63}
              ></Image>
            </a>
          </Link>
        </div>

        <nav className="navbar">
          <h2 className="sr-only">Navigation menu</h2>
          <ul className="navbar__container">
            {nav.navList.map((navItem: any, index: number) => (
              <Link key={`navItemDesktop-${index}`} href={navItem.link}>
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
   <MobNav />
   </div>
  );
};

export default Nav;
