import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import {
  fetchFilters,
  fetchDatasets,
  convertToCkanSearchQuery,
} from 'utils/fetch';

import { Header } from 'components/layouts';
import { Search, Total, Filter, Sort, Pagination } from 'components/data';
import { DatasetList } from 'components/pages/datasets';
import MobileAlter from 'components/data/MobileAlter/MobileAlter';
import DataCatalogue from 'components/icons/DataCatalogue';
type Props = {
  data: any;
  facets: any;
  variables: any;
};

const list = '"tags", "groups"';

const Datasets: React.FC<Props> = ({ data, facets }) => {
  const router = useRouter();
  const { q, sort, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [sorts, setSorts] = useState(sort);
  const [items, setItems] = useState(size);
  const [datsetsFilters, setDatasetsFilters] = useState(fq);
  const [pages, setPages] = useState(from);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { results, count } = data.result;
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        fq: datsetsFilters,
        q: search,
        sort: sorts,
        size: items,
        from: pages,
      },
    });
  }, [datsetsFilters, search, sorts, pages, items]);

  function handleDatasetsChange(val: any) {
    switch (val.query) {
      case 'q':
        setSearch(val.value);
        break;
      case 'sort':
        setSorts(val.value);
        break;
      case 'size':
        setItems(val.value);
        break;
      case 'fq':
        setDatasetsFilters(val.value);
        break;
      case 'from':
        setPages(val.value);
        break;
    }
  }

  function handleButtonClick(e: any) {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  }

  const headerData = {
    title: 'All Datasets',
    content:
      'An overview of the budget allocated and the expenditure incurred under Education related accounting heads by the Government of Uttar Pradesh for in the across various fiscal years.',
  };

  return (
    <>
      <Head>
        <title>HAQ | Datasets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={headerData} />
      <Wrapper className="container">
        {data && (
          <DatasetsComp>
            <Filter
              data={facets}
              newFilters={handleDatasetsChange}
              fq={datsetsFilters}
            />
            <DatasetRight>
              <DatasetSearch>
                <Search newSearch={handleDatasetsChange} />
              </DatasetSearch>
              <DatasetSort>
                <Total text="datasets found" total={count} />
                <Sort className="sort" newSort={handleDatasetsChange} />
              </DatasetSort>
              <MobileAlter
                data={facets}
                newData={handleDatasetsChange}
                fq={datsetsFilters}
                sortShow={true}
              />
              <DatasetList data={results} />
              <Pagination total={count} newPage={handleDatasetsChange} />
            </DatasetRight>
          </DatasetsComp>
        )}
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = convertToCkanSearchQuery(query);
  const facets = await fetchFilters(list, variables, 'tender_dataset');

  const data = await fetchDatasets(variables);
  return {
    props: {
      data,
      facets,
    },
  };
};

export default Datasets;

const Wrapper = styled.main``;

const DatasetRight = styled.div`
  width: 100%;
`;

const DatasetsComp = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;

  .filters {
    min-width: 312px;
  }

  @media (max-width: 1000px) {
    display: block;

    .filters,
    .sort {
      display: none;
    }
  }
`;

const DatasetSearch = styled.div`
  background-color: var(--color-background-lighter);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-grey-600);
  box-shadow: var(--box-shadow-1);
`;

const DatasetSort = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-top: 20px;
  border-bottom: var(--separator-5);
`;
