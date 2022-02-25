import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { tabbedInterface } from 'utils/explorer';
import {
  Fieldset,
  FilterAlter,
  Footer,
  Header,
  MobileAlterComp,
  Wrapper,
} from './MobileAlterComp';
import { Button } from 'components/actions';
import { FilterIcon, SortIcon } from 'components/icons';

Modal.setAppElement('#__next');

function formatFilterName(name: string) {
  if (name == 'fiscal_year') {
    return 'fiscal year';
  } else if (name == 'buyer_name') return 'buyer name';
  else if (
    name == 'tender/mainProcurementCategory' ||
    name == 'tender_mainprocurementcategory'
  )
    return 'category';
  else if (name == 'tender/stage') return 'tender stage';
  else if (name == 'tender_status') return 'status';
  else return name;
}

const sort = [
  {
    id: 'tender_bid_opening_date:asc',
    name: 'Date',
  },
  {
    id: 'tender_value_amount:asc',
    name: 'Tender Value',
  },
  {
    id: 'organization.title:desc',
    name: 'Departments',
  },
  {
    id: 'score:desc',
    name: 'Relevance',
  },
];

const objMobile = {};
const MobileAlter: React.FC<{
  data?: any;
  newData?: any;
  fq?: any;
  sortShow?: boolean;
  newIndicator?: any;
  indicators?: any;
}> = ({ data, newData, fq, sortShow, newIndicator, indicators }) => {
  const displaySort = sortShow == false ? false : true;

  const router = useRouter();
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState(
    router.query.sort ? router.query.sort : 'tender_bid_opening_date:asc'
  );
  const [selectedSort, setSelectedSort] = useState(
    router.query.sort ? router.query.sort : 'tender_bid_opening_date:asc'
  );

  function checkInput(selected) {
    const filterElement = document.getElementById(
      `${selected}-m`
    ) as HTMLInputElement;
    if (filterElement) filterElement.checked = true;
  }

  useEffect(() => {
    setTimeout(() => {
      // create tabbed interface
      const tablist = document.getElementById('filterSelector');
      const panels = document.querySelectorAll(
        '#modalFilter [role="tabpanel"]'
      );
      if (tablist) tabbedInterface(tablist, panels);

      // Create filter object
      if (data)
        Object.keys(data).forEach((val) => {
          objMobile[val] = [];
        });

      // check previous selected filters
      if (fq) {
        const removeEscape = fq.replaceAll(/"/g, '');
        const splitFilters = removeEscape.split(' AND ');

        splitFilters.forEach((query: any) => {
          const id = query.split(':')[0];
          let value = query.split(':')[1];
          value = value.slice(1, value.length - 1);
          const valueArr = value.split(' OR ');
          objMobile[id].push(valueArr);

          valueArr.forEach((element) => {
            checkInput(element);
          });
        });
      }

      // check previous selected indicators
      if (indicators && Object.keys(indicators).length > 0) {
        Object.keys(indicators).forEach((elm) => {
          const id = elm;
          const value: any[] = indicators[elm];

          value.forEach((selected) => {
            objMobile[id].push(selected);
            checkInput(selected);
          });
        });
      }
    }, 50);
  }, [filterIsOpen]);

  useEffect(() => {
    if (sortShow) {
      setTimeout(() => {
        if (document.querySelector('#modalSort')) {
          document
            .querySelector('#modalSort')
            .addEventListener('change', (e: any) => {
              setSelectedSort(e.target.value);
            });
        }

        const selectedSort = document.getElementById(
          currentSort as string
        ) as HTMLInputElement;
        if (selectedSort) selectedSort.checked = true;
      }, 50);
    }
    return () => {
      if (document.querySelector('#modalSort'))
        document
          .querySelector('#modalSort')
          .addEventListener('change', (e: any) => {
            setSelectedSort(e.target.value);
          });
    };
  }, [sortIsOpen]);

  useEffect(() => {
    if (sortShow) {
      newData({
        query: 'sort',
        value: currentSort,
      });
    }
  }, [currentSort]);

  function handleFilterClick() {
    setFilterIsOpen(!filterIsOpen);
  }

  function handleFilterClear() {
    // reset object
    if (data)
      Object.keys(data).forEach((val) => {
        objMobile[val] = [];
      });

    const selectedFilters = document.querySelectorAll(
      '#modalFilter input:checked'
    );

    selectedFilters.forEach((filter: HTMLInputElement) => {
      const filterElement = document.getElementById(
        `${filter.id}`
      ) as HTMLInputElement;
      if (filterElement) filterElement.checked = false;
    });
  }

  function applyFilterChange() {
    // select checked inputs
    const selectedFilters = document.querySelectorAll(
      '#modalFilter input:checked'
    );

    // reset object
    if (data)
      Object.keys(data).forEach((val) => {
        objMobile[val] = [];
      });

    // add checked filters to object
    selectedFilters.forEach((filter: HTMLInputElement) => {
      const type = filter.dataset.type;
      const value = filter.value;
      const index = objMobile[type].indexOf(value);
      if (index == -1) {
        objMobile[type].push(value);
      }
    });
    // if it's indicator change, then return the object
    if (newIndicator) {
      newIndicator(objMobile);
    }
    // else create string and query URL
    else {
      // create the filter string for CKAN API
      const final = [];
      Object.keys(objMobile).forEach((val) => {
        if (objMobile[val].length > 0) {
          let filter = '';

          filter = filter.concat(`${val}:(`);
          const valArray = [];

          objMobile[val].forEach((item: string) => {
            valArray.push(`"${item}"`);
          });

          const valString = valArray.join(' OR ');
          filter = filter.concat(valString + ')');
          final.push(filter);
        }
      });

      const finalFilter = final.join(' AND ');

      newData({
        query: 'fq',
        value: finalFilter,
      });
    }

    handleFilterClick();
  }

  function handleSortClick() {
    setSortIsOpen(!sortIsOpen);
  }

  function applySortChange() {
    setCurrentSort(selectedSort);
    handleSortClick();
  }

  function cancelSortChange() {
    setSelectedSort(currentSort);
    handleSortClick();
  }

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

  return (
    <MobileAlterComp>
      <div className="data-alter">
        <span className="data-alter__text">Alter Datasets</span>
        <div className="data-alter__buttons">
          <Button
            kind="secondary-outline"
            onClick={handleFilterClick}
            icon={<FilterIcon />}
            iconSide="left"
          >
            Add Filters
          </Button>
          <Button
            kind="secondary-outline"
            onClick={handleFilterClick}
            icon={<FilterIcon />}
            iconOnly={true}
            className="alter__small"
          >
            Add Filters
          </Button>
          {displaySort && (
            <>
              <Button
                kind="secondary-outline"
                onClick={handleSortClick}
                icon={<SortIcon />}
                iconSide="left"
              >
                Sort Results
              </Button>
              <Button
                kind="secondary-outline"
                onClick={handleSortClick}
                icon={<SortIcon />}
                iconOnly={true}
                className="alter__small"
              >
                Sort Results
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Sort Modal */}
      {displaySort && (
        <Modal
          isOpen={sortIsOpen}
          onRequestClose={handleSortClick}
          className="modal"
          overlayClassName="modal__backdrop"
          contentLabel="open sort modal"
          closeTimeoutMS={200}
          preventScroll={true}
          htmlOpenClassName="ReactModal__Html--open"
        >
          <Header>
            <h1 id="modal-head">Sort Datasets</h1>
          </Header>
          <Wrapper>
            <Fieldset id="modalSort">
              <legend className="sr-only">Sort Results</legend>
              {sort.map((elm, index) => {
                return (
                  <label key={`sort-${index}`} htmlFor={elm.id}>
                    <input
                      type="radio"
                      value={elm.id}
                      name="sort-group"
                      id={elm.id}
                    />
                    {elm.name}
                  </label>
                );
              })}
            </Fieldset>
            <DataAlterFooter
              cancel={cancelSortChange}
              apply={applySortChange}
            />
          </Wrapper>
        </Modal>
      )}

      {/* Filter Modal */}
      <Modal
        isOpen={filterIsOpen}
        onRequestClose={handleFilterClick}
        className="modal"
        overlayClassName="modal__backdrop"
        closeTimeoutMS={200}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <Header>
          <h1 id="modal-head">Add Filters</h1>
          <Button
            kind="custom"
            aria-label="Clear Selected Filters"
            onClick={handleFilterClear}
          >
            clear all
          </Button>
        </Header>
        <Wrapper>
          <Fieldset id="modalFilter">
            <legend className="sr-only">Add Filters</legend>
            {data && (
              <FilterAlter>
                <ul id="filterSelector" role="tablist">
                  {Object.keys(data).map((filter: any, index: number) => (
                    <li role="presentation" key={`filterTitle-${index}`}>
                      <a
                        role="tab"
                        tabIndex={-1}
                        href={`#${data[filter].title}`}
                        data-id={data[filter].title}
                        id={`filterTab${index}`}
                      >
                        {formatFilterName(data[filter].title)}
                      </a>
                    </li>
                  ))}
                </ul>
                {Object.keys(data).map((filter: any, index: number) => (
                  <div
                    key={`filter-${index}`}
                    id={data[filter].title}
                    role="tabpanel"
                    tabIndex={-1}
                    aria-labelledby={`filterTab${index}`}
                  >
                    {data[filter].items &&
                      data[filter].items.map((item: any, index: number) => (
                        <label
                          key={`filterItem-${index}`}
                          htmlFor={`${item.name}-m`}
                        >
                          <input
                            type="checkbox"
                            value={item.name}
                            name="sort-group"
                            id={`${item.name}-m`}
                            data-type={data[filter].title}
                          />
                          {item.display_name}
                        </label>
                      ))}
                  </div>
                ))}
              </FilterAlter>
            )}
          </Fieldset>
          <DataAlterFooter
            cancel={handleFilterClick}
            apply={applyFilterChange}
          />
        </Wrapper>
      </Modal>
    </MobileAlterComp>
  );
};

export default MobileAlter;
