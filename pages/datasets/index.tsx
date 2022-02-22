import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  fetchFilters,
  fetchDatasets,
  convertToCkanSearchQuery,
} from 'utils/fetch';

import { Header } from 'components/layouts';
import { Search, Total, Filter, Sort, Pagination } from 'components/data';
import { DatasetList } from 'components/pages/datasets';

import { DatasetsPage, DatasetsComp } from './DatasetsPage';

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
    title: 'Contracts Data',
    content:
      'This page shows the public procurement data of the last 5 financial years for the state of Assam for the contracts over INR 50 lakh value. You can download the total compiled data or explore specific tender groups using the filters like financial year, tendering organization, tender status, tender types, etc.',
    logo:'/assets/statistics.svg',
  };

  return (
    <>
      <Head>
        <title>OPub | Datasets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DatasetsPage className="datasets">
        <Header data={headerData} />
        <div className="container">
          {data && (
            <div>
              <DatasetsComp>
                <Filter
                  data={facets}
                  newFilters={handleDatasetsChange}
                  fq={datsetsFilters}
                />
                <div className="contractsColumn">
                  <div className = "contractsComp__search">
                    <Search newSearch={handleDatasetsChange} />
                    <Sort newSort={handleDatasetsChange} />
                  </div>
                  <div className="contractsComp__totalCount">
                    <Total text="contracts" total={count} />
                  </div>
                  <DatasetList data={results} />
                  <Pagination total={count} newPage={handleDatasetsChange} />
                </div>
              </DatasetsComp>
            </div>
          )}
        </div>
      </DatasetsPage>
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
