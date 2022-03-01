import React, { ReactElement, ReactNode, useState } from 'react';
import ModalWrapper from 'react-modal';
import styled from 'styled-components';

ModalWrapper.setAppElement('#__next');

interface Props {
  /**
   * label for to announce to screen readers
   */
  label: string;

  /**
   * is the modal open
   */
  isOpen: boolean;

  /**
   * direction from the modal should show
   */
  from?: 'left';

  /**
   * modal close handler
   */
  modalHandler: () => void;

  /**
   * modal close handler
   */
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

const Modal = ({ label, isOpen, from, modalHandler, children }: Props) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={modalHandler}
      className={from ? `modal--${from}` : '_'}
      overlayClassName="_"
      contentElement={(props, children) => (
        <ModalStyle {...props}>{children}</ModalStyle>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayStyle {...props}>{contentElement}</OverlayStyle>
      )}
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

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 0;

  @media (max-width: 980px) {
    top: initial;
    left: initial;
    bottom: 0;
    width: 100%;
    transform: initial;

    &.ReactModal__Content {
      transform: translateY(100%);
      transition: transform 200ms ease-in-out;
    }

    &.ReactModal__Content--after-open {
      transform: translateY(0);
    }

    &.ReactModal__Content--before-close {
      transform: translateY(100%);
    }

    &.modal--left {
      height: 100%;
      max-width: 320px;
      padding-bottom: 0;

      @media (max-width: 480px) {
        max-width: 248px;
      }

      &.ReactModal__Content {
        transform: translateX(-100%) translateY(0);
        transition: transform 200ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
      }

      &.ReactModal__Content--after-open {
        transform: translateX(0);
      }

      &.ReactModal__Content--before-close {
        transform: translateX(-100%) translateY(0);
      }
    }
  }
`;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;
`;
