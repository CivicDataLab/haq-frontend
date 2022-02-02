import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Search from 'components/Search/Search';
import { handleSearch, tabbedInterface, categoryIcon } from 'utils/explorer';
import {
  ArrowForward,
  LawJustice,
  WomenChild,
  Police,
  HomeAffairs,
} from 'icons/ExplorerIcons';
import { SchemeModalComp, ModalOverlayComp } from './SchemeModalComp';

const SchemeModal = ({ isOpen, handleModal, data }) => {
  const [filteredObj, setFilteredObj] = useState(data);

  useEffect(() => {
    // ceating tabbed interface for viz selector
    if (isOpen) {
      setTimeout(() => {
        const tablist = document.querySelector('.schemeModal__tabs');
        const panels = document.querySelectorAll('.schemeModal__items');
        tabbedInterface(tablist, panels);
      }, 10);
    }
  }, [isOpen]);
  const modalToggle = [
    {
      name: 'Ministries',
      id: '#modalMinistry',
      length: filteredObj.ministry.length,
    },
    {
      name: 'Categories',
      id: '#modalCategories',
      length: filteredObj.category.length,
    },
    {
      name: 'Schemes',
      id: '#modalSchemes',
      length: filteredObj.scheme.length,
    },
  ];

  const modalItems = [
    {
      id: 'modalMinistry',
      content: filteredObj.ministry,
    },
    {
      id: 'modalCategories',
      content: filteredObj.category,
    },
    {
      id: 'modalSchemes',
      content: filteredObj.scheme,
    },
  ];

  function handleButtonClick() {
    handleModal(false);
  }

  function changeResult(val) {
    const newObj = handleSearch(val, data);
    setFilteredObj(newObj);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleButtonClick}
      className="dialog schemeModal"
      overlayClassName="dialog__backdrop"
      contentLabel="Download Tenders"
      aria={{
        labelledby: 'dialog-head',
        describedby: 'dialog-para',
      }}
      closeTimeoutMS={200}
      preventScroll={true}
      htmlOpenClassName="ReactModal__Html--open"
      contentElement={(props, children) => (
        <SchemeModalComp {...props}>{children}</SchemeModalComp>
      )}
      overlayElement={(props, contentElement) => (
        <ModalOverlayComp {...props}>{contentElement}</ModalOverlayComp>
      )}
    >
      <SchemeModalComp className="schemeModal__header">
        <div>
          <h2>Select Scheme</h2>
          <button
            type="button"
            className="dialog__close"
            id="modalCancel"
            aria-label="Close navigation"
            onClick={handleButtonClick}
          >
            <span>Close &#x78;</span>
          </button>
        </div>

        <Search newSearch={changeResult} />
      </SchemeModalComp>
      <section className="schemeModal__body">
        <div className="schemeModal__left">
          <ul className="schemeModal__tabs">
            {modalToggle.map((item, index) => (
              <li key={`modalToggleItem-${index}`}>
                <a href={item.id}>
                  {item.name}
                  {` (${item.length})`}
                  <span>
                    <ArrowForward />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <section className="listing__indicators">
            <h3>Ministry or Department Indicators: </h3>
            <ul>
              <li>
                <LawJustice />
                <span>Law &amp; Justice</span>
              </li>
              <li>
                <WomenChild />
                <span>Women &amp; Child Development</span>
              </li>
              <li>
                <Police />
                <span>Police</span>
              </li>
              <li>
                <HomeAffairs />
                <span>Home Affairs</span>
              </li>
            </ul>
          </section>
        </div>
        <div className="schemeModal__content">
          {modalItems.map((item, index) => (
            <ul
              key={`modalContent-${index}`}
              className="schemeModal__items"
              id={item.id}
            >
              {item.content.map((val, index2) => (
                <li key={`modalItemInner-${index}-${index2}`}>
                  <a href={val.id}>
                    {categoryIcon(val.tags)}
                    <span>{val.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </Modal>
  );
};

export default SchemeModal;
