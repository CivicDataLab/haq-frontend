import React, { useState } from 'react';
import ModalWrapper from 'react-modal';

ModalWrapper.setAppElement('#__next');

const Modal = ({ label, isOpen, from, modalHandler, children }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={modalHandler}
      className={`modal ${from && `modal--${from}`}`}
      overlayClassName="modal__backdrop"
      contentLabel={label}
      closeTimeoutMS={200}
      preventScroll={true}
      htmlOpenClassName="ReactModal__Html--open"
    >
      {children}
    </ModalWrapper>
  );
};

export default Modal;
