import React, { useState, useEffect } from 'react';
import Modals from 'react-modal';
import { Button } from 'components/actions';

Modals.setAppElement('#__next');

const Modal = ({ label, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalHandler() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <Button onClick={() => modalHandler()}>Open Modal</Button>

      <Modals
        isOpen={isModalOpen}
        onRequestClose={modalHandler}
        className="modal"
        overlayClassName="modal__backdrop"
        contentLabel={label}
        closeTimeoutMS={200}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        {children}
      </Modals>
    </div>
  );
};

export default Modal;
