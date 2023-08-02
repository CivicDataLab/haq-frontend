import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'components/actions';
import Radio from 'components/layouts/Radio';
import { Info } from 'components/icons';

const IndicatorMobile = ({ indicators, newIndicator, selectedIndicator }) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(
    `${selectedIndicator} mobile`
  );

  function DataAlterFooter({ cancel, apply }) {
    return (
      <Footer>
        <Button kind="secondary-outline" onClick={cancel} fluid={true}>
          Close
        </Button>
        <Button kind="secondary" onClick={apply} fluid={true}>
          Apply
        </Button>
      </Footer>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('modalSort-mobile')) {
        document
          .getElementById('modalSort-mobile')
          .addEventListener('change', (e: any) => {
            setSelectedSort(e.target.parentElement.dataset.value);
          });
      }

      const selectSort = document.getElementById(
        `${selectedIndicator} mobile`
      ) as HTMLInputElement;
      if (selectSort) selectSort.querySelector('input').checked = true;
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

  // function applySortChange() {
  //   newIndicator(
  //     (document.getElementById(`${selectedSort} mobile`) as HTMLInputElement)
  //       .dataset.value
  //   );
  //   handleSortClick();
  // }

  function cancelSortChange() {
    setSelectedSort(`${selectedIndicator} mobile`);
    handleSortClick();
  }
  return (
    <>
      <IndicatorMobileWrapper className="indicator-mobile">
        <span className="indicator-mobile__text">
          {selectedIndicator.length
            ? selectedIndicator?.replaceAll('-', ' ')
            : 'Alter Datasets'}
        </span>
        <div className="indicator-mobile__buttons">
          <button type="button" onClick={handleSortClick}>
            <div className="indicator-mobile__svg">
              <svg
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.0001H5.5C6.05 12.0001 6.5 11.5501 6.5 11.0001C6.5 10.4501 6.05 10.0001 5.5 10.0001H1.5C0.95 10.0001 0.5 10.4501 0.5 11.0001C0.5 11.5501 0.95 12.0001 1.5 12.0001ZM0.5 1.00006C0.5 1.55006 0.95 2.00006 1.5 2.00006H17.5C18.05 2.00006 18.5 1.55006 18.5 1.00006C18.5 0.450061 18.05 6.10352e-05 17.5 6.10352e-05H1.5C0.95 6.10352e-05 0.5 0.450061 0.5 1.00006ZM1.5 7.00006H11.5C12.05 7.00006 12.5 6.55006 12.5 6.00006C12.5 5.45006 12.05 5.00006 11.5 5.00006H1.5C0.95 5.00006 0.5 5.45006 0.5 6.00006C0.5 6.55006 0.95 7.00006 1.5 7.00006Z"
                  fill="#1D7548"
                />
              </svg>
            </div>
            Indicators
          </button>
        </div>
      </IndicatorMobileWrapper>

      {/* Sort Modal */}
      <Modal
        isOpen={sortIsOpen}
        label="sort modal"
        modalHandler={handleSortClick}
      >
        <Header>
          <h1 id="modal-head">Alter Indicators</h1>
        </Header>
        <Wrapper>
          <Fieldset id="modalSort-mobile">
            <legend className="sr-only">Select Indicator</legend>
            {indicators &&
              Object.values(indicators).map(
                (item: any) =>
                  item && (
                    <Radio
                      color="var(--color-amazon-300)"
                      data-selected={
                        selectedIndicator == item.slug ? 'true' : 'false'
                      }
                      id={`${item.slug} mobile`}
                      data-value={item.slug}
                      text={
                        <>
                          {item.name}
                          <Info>
                            <p>{item.description}</p>
                          </Info>
                        </>
                      }
                      name="indicators-mobile"
                      key={`indicatorItem-${item.slug}`}
                    />
                  )
              )}
          </Fieldset>
          {/* <DataAlterFooter
            cancel={() => cancelSortChange()}
            apply={() => applySortChange()}
          /> */}
        </Wrapper>
      </Modal>
    </>
  );
};

export default IndicatorMobile;

export const Header = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-600);
  border-radius: 12px 12px 0px 0px;
  padding-inline: 24px;
  padding-block: 24px 20px;
  border-bottom: var(--separator-5-2);

  @media (max-width: 540px) {
    padding-inline: 16px;
  }

  h1 {
    font-weight: var(--font-weight-medium);
    font-size: 20px;
    line-height: 26px;
    margin: 0;
  }

  button {
    color: var(--color-primary);
    text-decoration-line: underline;
    text-transform: capitalize;
  }
`;

export const Wrapper = styled.div`
  padding-inline: 24px;
  background-color: var(--color-background-lighter);

  @media (max-width: 540px) {
    padding-inline: 16px;
  }
`;

export const Fieldset = styled.fieldset`
  padding-top: 0;
  height: 40vh;
  padding-left: 5px;
  padding-bottom: 12px;
  overflow-y: auto;

  input {
    accent-color: var(--color-primary);

    &[type='radio'] {
      padding: 6px 0;

      transform: scale(1.5);
    }
  }

  &#modalSort {
    overflow-y: auto;

    label {
      padding-left: 3px;
    }
  }

  [role='tabpanel'] {
    overflow-y: auto;
    max-height: 39vh;
  }

  label {
    display: flex;
    margin-top: 20px;
    align-items: center;
    font-weight: 500;
    line-height: 140%;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-top: var(--separator-5-2);

  button {
    width: 100%;
    display: block;
  }

  @media (max-width: 540px) {
    padding: 8px 0;
  }
`;

export const IndicatorMobileWrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--color-background-lighter);
  border-radius: 8px;
  filter: drop-shadow(var(--box-shadow-1));
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 720px) {
    display: none;
  }

  .indicator-mobile__text {
    line-height: 130%;
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: capitalize;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  .indicator-mobile__buttons {
    button {
      border: 2px solid var(--color-primary);
      border-radius: 4px;
      color: var(--color-primary);
      font-weight: 500;
      vertical-align: middle;
      display: inline-flex;

      padding: 8px 16px;
      font-size: 0.8rem;
      line-height: 1.8;

      &:last-child {
        margin-left: 12px;
      }

      @media (max-width: 480px) {
        font-size: 0;
        border: none;
        padding: 8px 8px;
      }
    }
  }

  .indicator-mobile__svg {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
  }
`;
