import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import Image from 'next/image';
import * as nav from 'data/navdata/navlist';

Modal.setAppElement('#__next');
  
const MobNav: React.FC = () => {
  const router = useRouter();
  const [navIsOpen, setNavIsOpen] = useState(false);

  // opening / closing mobile navbar
  function mobileNavHandler() {
    setNavIsOpen(!navIsOpen);
  }

  // open / close sub-menu
  function navButtonHandler(e: any) {
    // if clicked on already opened menu
    if (e.target.getAttribute('aria-expanded') == 'true') {
      e.target.setAttribute('aria-expanded', 'false');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-show')
      );
      e.target.nextElementSibling.setAttribute('hidden', 'true');
    } else {
      // remove previous opened menu
      if (
        document.querySelector('.m-navbar__links > [aria-expanded="true"]') ||
        document.querySelector('.navbar__links > [aria-expanded="true"]')
      ) {
        const currentActive = document.querySelector('[aria-expanded="true"]');
        currentActive.nextElementSibling.setAttribute('hidden', 'true');
        currentActive.setAttribute(
          'aria-label',
          currentActive.getAttribute('data-text-for-show')
        );
        currentActive.setAttribute('aria-expanded', 'false');
      }
      // open current clicked menu
      e.target.setAttribute('aria-expanded', 'true');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-hide')
      );
      e.target.nextElementSibling.removeAttribute('hidden');
    }
  }

  return (
    <div>
      <header className="header m-header">
        <div className="container">
          <button
            className="m-header__button"
            type="button"
            aria-expanded="false"
            aria-label="Expand navigation"
            onClick={mobileNavHandler}
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

          <div className="header__brand">
            <Link href="/">
              <a>
                <Image
                  className="header__logo"
                  src="/assets/images/oci_assam_light.png"
                  alt="oci logo"
                  width={400}
                  height={56}
                ></Image>
              </a>
            </Link>
          </div>
        </div>
      </header>

      <Modal
        isOpen={navIsOpen}
        onRequestClose={mobileNavHandler}
        className="modal modal--menu"
        overlayClassName="modal__backdrop"
        closeTimeoutMS={200}
        aria={{
          labelledby: 'mobileMenu',
        }}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <nav className="m-navbar">
          <div className="m-navbar__header">
            <h2 id="mobileMenu">Menus</h2>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={mobileNavHandler}
            >
              &#x78;
            </button>
          </div>

          <ul className="m-navbar__container">
            {nav.navList.map((navItem: any, index: number) => (
              <li key={`navItemMobile-${index}`} className="navbar__links">
                {navItem.hasSubMenu ? (
                  <>
                    <button
                      className="navbar__item"
                      type="button"
                      aria-controls="submenu__resources"
                      aria-expanded="false"
                      aria-label={`Show ${navItem.name} menu`}
                      data-text-for-show={`Show ${navItem.name} menu`}
                      data-text-for-hide={`Hide ${navItem.name} menu`}
                      onClick={navButtonHandler}
                    >
                      {navItem.name}
                    </button>
                    <ul className="m-navbar__nested" hidden>
                      {navItem.subMenu.map(
                        (subMenuItem: any, index: number) => (
                          <li key={`submenuItem-${index}`}>
                            <a
                              href={subMenuItem.link}
                              onClick={mobileNavHandler}
                            >
                              {subMenuItem.name} <span>&#x279D;</span>
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <a
                    href={navItem.link}
                    onClick={mobileNavHandler}
                    className={`navbar__item ${
                      router.pathname.includes(navItem.link)
                        ? 'navbar__item--active'
                        : ''
                    }`}
                  >
                    {navItem.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Modal>
    </div>
  );
};

export default MobNav;

