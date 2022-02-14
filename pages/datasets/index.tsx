import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  fetchFilters,
  fetchDatasets,
  convertToCkanSearchQuery,
} from 'utils/fetch';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Search from 'components/Search/Search';
import Total from 'components/Total/Total';
import DatasetList from 'components/List/DatasetList';
import Filter from 'components/Filter/Filter';
import MegaHeader from 'components/MegaHeader/MegaHeader';
import Modal from 'components/Modal/Modal';
import Sort from 'components/Sort/Sort';
import Pagination from 'components/Pagination/Pagination';
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
  };

  return (
    <>
      <Head>
        <title>OPub | Datasets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DatasetsPage className="datasets">
        <MegaHeader data={headerData} />
        <div className="container">
          {data && (
            <div>
              <h2 style={{ marginTop: '2rem' }} className="heading">
                Browse Contracts
              </h2>
              <DatasetsComp>
                <Filter
                  data={facets}
                  newFilters={handleDatasetsChange}
                  fq={datsetsFilters}
                />
                <div className="contractsColumn">
                  <Search newSearch={handleDatasetsChange} />

                  <div className="contractsComp__sortRow">
                    <Total text="contracts" total={count} />
                    <Sort newSort={handleDatasetsChange} />
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
