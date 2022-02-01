import React, { useState, useEffect } from 'react';
import Modals from 'react-modal';
import Button from 'components/Button/Button';

Modals.setAppElement('#__next');

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalHandler() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <Button label="Open Modal" onClick={() => modalHandler()} />

      <Modals
        isOpen={isModalOpen}
        onRequestClose={modalHandler}
        className="modal"
        overlayClassName="modal__backdrop"
        contentLabel="Download Tenders"
        aria={{
          labelledby: 'modal-head',
          describedby: 'modal-para',
        }}
        closeTimeoutMS={200}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <section className="modal__header">
          <div>
            <h1 id="modal-head">Download Tenders</h1>
            <p id="modal-para">
              Select your desired option to download the tenders
            </p>
          </div>
          <button
            type="button"
            className="modal__close"
            id="modalCancel"
            aria-label="Close navigation"
            onClick={modalHandler}
          >
            &#x78;
          </button>
        </section>
        <section className="modal__body">
          <div>
            <label htmlFor="downloadOption1">
              <input
                type="radio"
                id="downloadOption1"
                name="modal-option"
                value="tender-only"
              />
              Download the details of this tender
            </label>

            <label htmlFor="downloadOption2">
              <input
                type="radio"
                id="downloadOption2"
                name="modal-option"
                value="all-details"
              />
              Download the details of this tender along with all the attached
              documents
            </label>
          </div>
          <div className="modal__format">
            <p>Choose file format</p>
            <div>
              <label htmlFor="downloadFormat1">
                <input
                  type="radio"
                  id="downloadFormat1"
                  name="modal-download"
                  value="csv"
                />
                CSV File
              </label>

              <label htmlFor="downloadFormat2">
                <input
                  type="radio"
                  id="downloadFormat2"
                  name="modal-download"
                  value="xls"
                />
                XLS File
              </label>

              <label htmlFor="downloadFormat3">
                <input
                  type="radio"
                  id="downloadFormat3"
                  name="modal-download"
                  value="pdf"
                />
                PDF File
              </label>

              <label htmlFor="downloadFormat4">
                <input
                  type="radio"
                  id="downloadFormat4"
                  name="modal-download"
                  value="zip"
                />
                ZIP File
              </label>
            </div>
          </div>
        </section>
        <Button label="Download" id="modalSubmit" onClick={() => modalHandler()} />
      </Modals>
    </div>
  );
};

export default Modal;
