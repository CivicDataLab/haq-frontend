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
import useEffectOnChange from 'utils/hooks';
import { capitalizeWords } from 'utils/data';
import { Breadcrumb } from 'components/actions';

type Props = {
  data: any;
  facets: any;
  foundState: string;
};

const list = '"scheme_mode", "scheme_type"';

const Datasets: React.FC<Props> = ({ data, facets, foundState }) => {
  const router = useRouter();
  const { q, sort, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [sorts, setSorts] = useState(sort);
  const [items, setItems] = useState(size);
  const [datsetsFilters, setDatasetsFilters] = useState(fq);
  const [pages, setPages] = useState(from);

  const { results, count } = data?.result;

  useEffectOnChange(() => {
    router.replace({
      pathname: `/${router.query.state}/datasets`,
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

  const headerData = {
    title: 'Bihar Treasury Schemes',
    content:
      'Find downloadable data, visualisations and other useful information related to a number of school education schemes run by the Uttar Pradesh government.',
  };

  const breadcrumbArray = [
    'Home',
    capitalizeWords(foundState),
    'Treasury Schemes',
  ];

  if (!results) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Head>
        <title>HAQ | Treasury </title>
      </Head>
      <div className="container">
        <Breadcrumb crumbs={breadcrumbArray} />
        <Header data={headerData} />
        <hr className="horizontal-line" />
        {data && (
          <DatasetsComp>
            <Filter
              data={facets}
              newFilters={handleDatasetsChange}
              fq={datsetsFilters}
            />
            <DatasetRight>
              <Search newSearch={handleDatasetsChange} />
              <DatasetSort>
                <Total text="datasets found" total={count} />
                <Sort
                  className="sort"
                  newSort={(e) => handleDatasetsChange(e)}
                />
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
      </div>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};

  const variables = convertToCkanSearchQuery(query);
  const facets = await fetchFilters(list, variables);

  const data = await fetchDatasets(variables);

  return {
    props: {
      data,
      facets,
      foundState: query.state,
    },
  };
};

export default Datasets;

const Wrapper = styled.div`
  .horizontal-line {
    margin-top: 32px;
    border: var(--separator-5);
  }
`;

const DatasetRight = styled.div`
  width: 100%;
`;

const DatasetsComp = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;

  .filters {
    min-width: 312px;
    max-width: 312px;
  }

  @media (max-width: 1000px) {
    display: block;

    .filters,
    .sort {
      display: none;
    }
  }
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
