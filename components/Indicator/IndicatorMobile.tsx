import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Toggle from 'components/Toggle/Toggle';

Modal.setAppElement('#__next');

const IndicatorMobile = ({ indicators, newIndicator, meta }) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('Budget Estimates mobile');
  const [selectedSort, setSelectedSort] = useState('Budget Estimates mobile');

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('#modalSort-mobile')) {
        document
          .querySelector('#modalSort-mobile')
          .addEventListener('change', (e: any) => {
            setSelectedSort(e.target.id);
          });
      }

      const selectSort = document.getElementById(
        currentSort as string
      ) as HTMLInputElement;

      if (selectSort) selectSort.checked = true;
    }, 50);
    return () => {
      if (document.querySelector('#modalSort-mobile'))
        document
          .querySelector('#modalSort-mobile')
          .removeEventListener('change', (e: any) => {
            setSelectedSort(e.target.value);
          });
    };
  }, [sortIsOpen]);

  function handleSortClick() {
    setSortIsOpen(!sortIsOpen);
  }

  function applySortChange() {
    setCurrentSort(selectedSort);
    newIndicator(
      (document.getElementById(selectedSort) as HTMLInputElement).value
    );
    handleSortClick();
  }

  function cancelSortChange() {
    setSelectedSort(currentSort);
    handleSortClick();
  }
  return (
    <>
      <div className="data-alter">
        <span className="data-alter__text">Alter Indicators</span>
        <div className="data-alter__buttons">
          <button type="button" onClick={handleSortClick}>
            <div className="data-alter__svg">
              <svg
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.0001H5.5C6.05 12.0001 6.5 11.5501 6.5 11.0001C6.5 10.4501 6.05 10.0001 5.5 10.0001H1.5C0.95 10.0001 0.5 10.4501 0.5 11.0001C0.5 11.5501 0.95 12.0001 1.5 12.0001ZM0.5 1.00006C0.5 1.55006 0.95 2.00006 1.5 2.00006H17.5C18.05 2.00006 18.5 1.55006 18.5 1.00006C18.5 0.450061 18.05 6.10352e-05 17.5 6.10352e-05H1.5C0.95 6.10352e-05 0.5 0.450061 0.5 1.00006ZM1.5 7.00006H11.5C12.05 7.00006 12.5 6.55006 12.5 6.00006C12.5 5.45006 12.05 5.00006 11.5 5.00006H1.5C0.95 5.00006 0.5 5.45006 0.5 6.00006C0.5 6.55006 0.95 7.00006 1.5 7.00006Z"
                  fill="#4965B2"
                />
              </svg>
            </div>
            Indicators
          </button>
        </div>
      </div>

      {/* Sort Modal */}
      <Modal
        isOpen={sortIsOpen}
        onRequestClose={handleSortClick}
        className="modal"
        overlayClassName="modal__backdrop"
        closeTimeoutMS={200}
        aria={{
          labelledby: 'modal-head',
        }}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="modal__header">
          <h1 id="modal-head">Change Indicator</h1>
        </div>
        <fieldset className="modal__body" id="modalSort-mobile">
          <legend className="sr-only">Select Indicator</legend>
          {indicators.map((elm, index) => {
            return (
              elm && (
                <label key={`sort-${index}`} htmlFor={`${elm} mobile`}>
                  <input
                    type="radio"
                    value={elm}
                    name="sort-group"
                    id={`${elm} mobile`}
                  />
                  {elm} <Toggle data={meta[index]} />
                </label>
              )
            );
          })}
        </fieldset>
        <div className="data-alter__footer">
          <button
            type="button"
            onClick={cancelSortChange}
            className="btn-secondary-invert"
          >
            Close
          </button>
          <button
            type="button"
            onClick={applySortChange}
            className="btn-secondary"
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default IndicatorMobile;
