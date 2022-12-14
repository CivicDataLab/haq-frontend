import React, { useEffect, useState } from 'react';
import {
  FilterComp,
  FilterButton,
  FilterHeading,
  FilterContent,
  FilterSearch,
  FilterSelected,
} from './FilterComp';
import { Cross } from 'components/icons';
import { truncate } from 'lodash';
import Chevron from 'components/icons/Chevron';

const dataObj = {};
const filterSearch = {};

const Filter = ({ data, newFilters, fq }) => {
  const [filterResult, setFilterResult] = useState({});
  function headingCollapsable() {
    const headings = document.querySelectorAll('.filters__heading');

    Array.prototype.forEach.call(headings, (h: any) => {
      const btn = h.querySelector('button');
      const target = h.nextElementSibling;

      btn.onclick = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        const selectedBtn = document.querySelector(
          '.filters__heading [aria-expanded = "true"]'
        );
        if (selectedBtn && !expanded) {
          selectedBtn.setAttribute('aria-expanded', 'false');
          (
            selectedBtn.parentElement.nextElementSibling as HTMLElement
          ).hidden = true;
        }

        btn.setAttribute('aria-expanded', !expanded);
        target.hidden = expanded;
      };
    });
  }

  useEffect(() => {
    headingCollapsable();

    Object.keys(data).forEach((val) => {
      dataObj[val] = [];
      filterSearch[val] = data[val].items;
    });

    // if filter query available on page load, add class to relevant buttons
    if (fq) {
      const removeEscape = fq.replaceAll(/"/g, '');
      const splitFilters = removeEscape.split(' AND ');

      splitFilters.forEach((query: any) => {
        const id = query.split(':')[0];

        let value = query.split(':')[1];
        value = value.slice(1, value.length - 1);
        const valueArr = value.split(' OR ');

        setTimeout(() => {
          valueArr.forEach((element) => {
            dataObj[id].push(element);

            if (document.getElementById(element))
              document
                .getElementById(element)
                .setAttribute('aria-pressed', 'true');
          });
        }, 200);
      });
    }
    setFilterResult({ ...filterSearch });
  }, []);

  function handleFilterSearch(val: string, id: string) {
    const searchFilter = data[id].items.filter((item: any) =>
      JSON.stringify(item).toLowerCase().includes(val.toLowerCase())
    );
    filterSearch[id] = searchFilter;

    setFilterResult({ ...filterSearch });
    setTimeout(() => {
      dataObj[id].forEach((item) => {
        const activeBtn = document.getElementById(item);
        activeBtn && activeBtn.setAttribute('aria-pressed', 'true');
      });
    }, 100);
  }

  function formatFilterName(name: string) {
    if (name == 'fiscal_year') {
      return 'fiscal year';
    } else if (name == 'organization' || name == 'buyer_name')
      return 'buyer name';
    else if (name == 'scheme_mode') return 'Scheme mode';
    else if (name == 'scheme_type') return 'Scheme type';
    else if (name == 'tender/stage') return 'tender stage';
    else if (name == 'tender_status') return 'status';
    else return name;
  }

  function handleFilterChange(e: any) {
    const selectedFilter = e.target as HTMLInputElement;
    const type = selectedFilter.dataset.type;
    const value = selectedFilter.id || selectedFilter.dataset.id;

    const filterButton = document.getElementById(value);

    if (filterButton) {
      const pressed = filterButton.getAttribute('aria-pressed');
      filterButton.setAttribute(
        'aria-pressed',
        pressed == 'false' ? 'true' : 'false'
      );
    }
    const index = dataObj[type].indexOf(value);
    if (index > -1) {
      dataObj[type].splice(index, 1);
    } else {
      dataObj[type].push(value);
    }

    const final = [];
    Object.keys(dataObj).forEach((val) => {
      if (dataObj[val].length > 0) {
        let filter = '';

        filter = filter.concat(`${val}:(`);
        const valArray = [];

        dataObj[val].forEach((item: string) => {
          valArray.push(`"${item}"`);
        });

        const valString = valArray.join(' OR ');
        filter = filter.concat(valString + ')');
        final.push(filter);
      }
    });

    const finalFilter = final.join(' AND ');
    newFilters({
      query: 'fq',
      value: finalFilter,
    });
  }

  return (
    <FilterComp className="filters">
      <h3 className="heading">Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <React.Fragment key={`filters-${index}`}>
          <FilterHeading className="filters__heading" key={`filter-${index}`}>
            <button aria-expanded="false">
              {formatFilterName(data[filter].title)}
              <Chevron />
            </button>
          </FilterHeading>
          <FilterContent hidden>
            <FilterSearch
              type="text"
              placeholder={`search ${formatFilterName(data[filter].title)}`}
              onChange={(e) => handleFilterSearch(e.target.value, filter)}
            />
            {filterResult[filter] &&
              filterResult[filter].map((item: any) => (
                <FilterButton
                  key={item.name}
                  data-type={data[filter].title}
                  id={item.name}
                  onClick={handleFilterChange}
                  type="button"
                  aria-pressed="false"
                >
                  {`${item.display_name} (${item.count})`}
                </FilterButton>
              ))}
          </FilterContent>
          <FilterSelected>
            {dataObj[filter] &&
              dataObj[filter].map((item: string) => (
                <li key={item}>
                  <button
                    data-type={filter}
                    data-id={item}
                    onClick={handleFilterChange}
                  >
                    {truncate(item.replace(/_/g, ' '), { length: 30 })}{' '}
                    <Cross width={24} height={24} />
                  </button>
                </li>
              ))}
          </FilterSelected>
        </React.Fragment>
      ))}
    </FilterComp>
  );
};

export default Filter;
