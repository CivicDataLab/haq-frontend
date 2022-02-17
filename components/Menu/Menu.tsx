import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MenuButton, MenuContent, MenuComp, MenuItem, MenuLabel } from './MenuComp';

interface Props {
  /**
   * Options to display in the menu
   */
  options: {
    value: string;
    title: string;
  }[];

  /**
   * current value of menu, it will change on selection
   */
  value?: string;

  /**
   * Heading for the menu
   */
  heading?: string;

  /**
   * should the menu open to top
   */
  top?: true | false;

  /**
   * should the menu stick to left or right
   */
  position?: 'left' | 'right';

  /**
   * return prop
   */
  handleChange?: (event: string) => void;
}

const MenuContentID = uuidv4();
const menuLabelID = uuidv4();

const Menu = ({
  options,
  heading = 'Open Menu',
  handleChange,
  value,
  top = false,
  position = 'right',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const MenuButtonRef = useRef(null);
  const MenuContainerRef = useRef(null);

  const clickOutsideHandler = (event) => {
    if (
      MenuButtonRef.current.contains(event.target) ||
      MenuContainerRef.current.contains(event.target)
    ) {
      return;
    }
    menuClose();
  };

  useEffect(() => {
    if (isOpen) {
      // add listener to close menu on outside click
      document.addEventListener('mouseup', clickOutsideHandler, false);

      // add listener to menu items
      MenuContainerRef.current.addEventListener(
        'keydown',
        menuItemArrowHandle,
        false
      );

      // add listener to close menu on Escape click on menu button
      MenuButtonRef.current.addEventListener(
        'keydown',
        function (e) {
          if (e.key == 'Escape') {
            menuClose();
          }
        },
        false
      );
    } else {
      // remove listeners
      document.removeEventListener('mouseup', clickOutsideHandler, false);
      MenuContainerRef.current.removeEventListener(
        'keydown',
        menuItemArrowHandle,
        false
      );
      MenuButtonRef.current.removeEventListener(
        'keydown',
        function (e) {
          if (e.key == 'Escape') {
            menuClose();
          }
        },
        false
      );

      // add listner to open menu on ArrowDown Click
      MenuButtonRef.current.addEventListener(
        'keydown',
        menuButtonArrowHandle,
        false
      );
    }

    return () => {
      document.removeEventListener('mouseup', clickOutsideHandler);
      MenuContainerRef.current.removeEventListener(
        'keydown',
        menuItemArrowHandle,
        false
      );
      MenuButtonRef.current.removeEventListener(
        'keydown',
        function (e) {
          if (e.key == 'Escape') {
            menuClose();
          }
        },
        false
      );
      MenuButtonRef.current.removeEventListener(
        'keydown',
        menuButtonArrowHandle,
        false
      );
    };
  }, [isOpen]);

  function menuOpen() {
    MenuButtonRef.current.setAttribute('aria-expanded', true);
    MenuContainerRef.current.hidden = false;

    const firstMenuItem =
      MenuContainerRef.current.querySelectorAll('[role="menuitem"]')[0];

    firstMenuItem &&
      MenuContainerRef.current
        .querySelectorAll('[role="menuitem"]')[0]
        .focus();

    setIsOpen(true);
  }

  function menuClose() {
    MenuButtonRef.current.setAttribute('aria-expanded', false);
    MenuContainerRef.current.hidden = true;
    MenuButtonRef.current.focus();

    setIsOpen(false);
  }

  function menuItemArrowHandle(e) {
    // if Escape pressed, close menu
    if (e.key == 'Escape') {
      menuClose();
    }

    // if ArrowDown pressed, choose next item
    else if (e.key == 'ArrowDown') {
      e.preventDefault();
      if (document.activeElement.parentElement.nextElementSibling) {
        (
          document.activeElement.parentElement.nextElementSibling
            .firstElementChild as HTMLElement
        ).focus();
      }
      // if last position, choose first item
      else {
        const firstMenuItem =
          MenuContainerRef.current.querySelectorAll('[role="menuitem"]')[0];
        firstMenuItem && firstMenuItem.focus();
      }
    }

    // if ArrowUp pressed, choose previous
    else if (e.key == 'ArrowUp') {
      e.preventDefault();
      if (document.activeElement.parentElement.previousElementSibling) {
        (
          document.activeElement.parentElement.previousElementSibling
            .firstElementChild as HTMLElement
        ).focus();
      }
      // if top position, choose last item
      else {
        const allMenuItems =
          MenuContainerRef.current.querySelectorAll('[role="menuitem"]');
        allMenuItems[allMenuItems.length - 1].focus();
      }
    }
  }

  function menuButtonArrowHandle(e) {
    if (e.key == 'ArrowDown') {
      e.preventDefault();
      menuOpen();
      // focus first element
      const firstMenuItem =
        MenuContainerRef.current.querySelectorAll('[role="menuitem"]')[0];
      firstMenuItem && firstMenuItem.focus();
    } else if (e.key == 'ArrowUp') {
      e.preventDefault();
      menuOpen();
      // focus last element
      const allMenuItems =
        MenuContainerRef.current.querySelectorAll('[role="menuitem"]');
      allMenuItems[allMenuItems.length - 1] &&
        allMenuItems[allMenuItems.length - 1].focus();
    }
  }

  function menuButtonHandle() {
    if (isOpen) menuClose();
    else menuOpen();
  }

  function menuItemHandle(e) {
    handleChange(e.target.dataset.value);
    menuClose();
  }

  return (
    <MenuComp>
      {heading && value && <MenuLabel id={menuLabelID}>{heading}&nbsp;&nbsp;</MenuLabel>}
      <MenuButton
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls={MenuContentID}
        aria-labelledby={menuLabelID}
        ref={MenuButtonRef}
        onClick={menuButtonHandle}
      >
        {value ? value : heading}
      </MenuButton>
      <MenuContent
        id={MenuContentID}
        role="menu"
        ref={MenuContainerRef}
        position={position}
        top={top}
        hidden
      >
        {options.length > 0 ? (
          options.map((item, index) => (
            <MenuItem key={item.value} role="none">
              <button
                onClick={(e) => menuItemHandle(e)}
                data-value={item.value}
                role="menuitem"
                tabIndex={index == 0 ? 0 : -1}
              >
                {item.title}
              </button>
            </MenuItem>
          ))
        ) : (
          <span>No Items</span>
        )}
      </MenuContent>
    </MenuComp>
  );
};

export default Menu;
