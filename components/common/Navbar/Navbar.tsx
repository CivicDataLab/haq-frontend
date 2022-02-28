import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MobNav from '../MobileNav';
import { ArrowDown, ArrowTail } from 'components/icons';
import * as nav from 'data/navdata/navlist';

const Nav: React.FC = () => {
  const router = useRouter();

  const wrapKeyHandler = (event) => {
    if (event.key === 'Escape') {
      // escape key
    }
  };

  // shows and hides the submenu on hover and focus
  useEffect(() => {
    var menuItems = document.querySelectorAll('li.has-submenu');
    let timer;
    Array.prototype.forEach.call(menuItems, function (el) {
      // show on hover
      el.addEventListener('mouseover', function () {
        if (document.querySelector('.has-submenu.open')) {
          document.querySelector('.has-submenu.open').className =
            'has-submenu';
        }
        this.className = 'has-submenu open';
        clearTimeout(timer);
      });

      // remove on mouse out
      el.addEventListener('mouseout', function () {
        timer = setTimeout(function () {
          if (!el.contains(document.activeElement)) {
            if (document.querySelector('.has-submenu.open'))
              document.querySelector('.has-submenu.open').className =
                'has-submenu';
          }
        }, 500);
      });

      // check for ESC key to close submenu
      el.addEventListener('keyup', function handler(event) {
        if (event.key === 'Escape') {
          if (document.querySelector('.has-submenu.open')) {
            document.querySelector('.has-submenu.open').className =
              'has-submenu';
            el.querySelector('button').focus();
          }
        }
      });

      // hide when focus is out of submenu
      el.addEventListener('focusout', function (elm) {
        elm.preventDefault();
        setTimeout(function () {
          //setTimeout to prevent it from trigger while focus is changing
          if (!el.contains(document.activeElement)) {
            if (document.querySelector('.has-submenu.open'))
              document.querySelector('.has-submenu.open').className =
                'has-submenu';
          }
        }, 10);
      });
    });
  }, []);

  function handleSubMenu(e) {
    e.preventDefault();
    const el = e.target;

    if (el.parentNode.className == 'has-submenu') {
      el.parentNode.className = 'has-submenu open';
      el.setAttribute('aria-expanded', 'true');
    } else {
      el.parentNode.className = 'has-submenu';
      el.setAttribute('aria-expanded', 'false');
    }
  }

  return (
    <>
      <header className="navbar__web">
        <div className="container">
          <div className="header__brand">
            <Link href="/">
              <a>
                <Image
                  className="brand_logo"
                  src="/assets/images/oci_assam_light.png"
                  alt="oci logo"
                  width={220}
                  height={46}
                ></Image>
              </a>
            </Link>
          </div>

          <nav className="navbar">
            <h2 className="sr-only">Navigation menu</h2>
            <ul className="navbar__container">
              {nav.navList.map((navItem: any, index: number) => (
                <li
                  key={`menu-${index}`}
                  className={navItem.submenu && 'has-submenu'}
                >
                  {navItem.submenu ? (
                    <>
                      <button
                        onClick={(e) => handleSubMenu(e)}
                        aria-haspopup="true"
                        aria-expanded="false"
                        className={`navbar__item`}
                      >
                        {navItem.name} <ArrowDown width={24} height={24} />
                      </button>
                      {navItem.submenu.length > 0 && (
                        <ul>
                          {navItem.submenu.map((item, num) => (
                            <li
                              key={`sub-${index}-${num}`}
                              className="submenu-item"
                            >
                              <Link href={item.link}>
                                <a>
                                  {item.name}
                                  <ArrowTail width={24} height={24} />
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
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
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <MobNav />
    </>
  );
};

export default Nav;
