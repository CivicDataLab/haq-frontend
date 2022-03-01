import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import { resourceGetter } from 'utils/resourceParser';

import {
  ExplorerHeader,
  ExplorerRelated,
  ExplorerViz,
} from 'components/pages/explorer';

type Props = {
  data: any;
  meta: any;
  fileData: any;
};

const Explorer: React.FC<Props> = ({ data, meta, fileData }) => {
  return (
    <>
      <Head>
        <title>OPub | Explorer</title>
      </Head>
      <Wrapper>
        <ExplorerHeader data={data} meta={meta} />
        <ExplorerViz data={data} meta={meta} fileData={fileData} />
        <ExplorerRelated data={data} />
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch dataset
  const data = await fetchAPI(context.query.explorer).then((res) =>
    explorerPopulation(res.result)
  );

  // fetch and parse metadata csv
  const metaRes = await resourceGetter(data.metaUrl);
  const meta = {};
  metaRes.forEach((elm) => {
    meta[elm[0]] = elm[1] || '';
  });

  // fetch and parse data csv
  const fileData = await resourceGetter(data.dataUrl, true);

  // fetch related schemes
  const relatedSchemes = await fetchFromTags(data.tags, data.id);

  // generate indicators
  const indicators = [
    ...Array.from(
      new Set(
        fileData.map((item: { indicators: any }) => item.indicators || null)
      )
    ),
  ];

  data.indicators = indicators;
  data.relatedSchemes = relatedSchemes;
  return {
    props: {
      data,
      meta,
      fileData,
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
  .indicator-mobile {
    margin-top: 2rem;

    @media (min-width: 980px) {
      display: none;
    }
  }

  .heading {
    margin-bottom: 0.5rem;
    font-weight: 900;
    font-size: 2.5rem;
  }
`;
