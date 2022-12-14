import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import { resourceGetter } from 'utils/resourceParser';
import { dataTransform, schemeDataTransform } from 'utils/data'

import {
  // ExplorerDetailsViz,
  ExplorerHeader,
  ExplorerRelated,
  ExplorerViz,
  SummaryExplorerViz
} from 'components/pages/explorer';

type Props = {
  data: any;
  meta: any;
  fileData: any;
  scheme: any;
  primary: boolean;
};
const reducer = (state, action) => {
  return { ...state, ...action };
};

const Explorer: React.FC<Props> = ({ data, meta, fileData, scheme, primary }) => {
  const grants = Object.keys(
    Object.values(scheme.data)[0]['grant_name']
  ).map((item) => ({
    value: item,
    title: item,
  }));
  const initalState = {
    scheme: data.notes || '',
    schemeData: {},
    indicator: '',
    year: '',
    unit: '',
    consCode: '',
    vizType: 'map',
    grantName: grants[0].value,
    schemeType: 'Benefits both boy and girl students directly',
    schemeMode: 'Direct Cash Transfer to students',
    schemeYear: '2016-2017'
  };

  const [state, dispatch] = React.useReducer(reducer, initalState);
  console.log(scheme)

  return (
    <>
      <Head>
        <title>{data.title || Explorer} | HAQ</title>
      </Head>
      <Wrapper>
        <ExplorerHeader data={data} />
        {Object.keys(data).length !== 0 ? (
          <>
            <div id="explorerVizWrapper">
              {!primary ?
                <ExplorerViz
                  schemeRaw={scheme}
                  meta={state}
                  dispatch={dispatch}
                /> :
                <SummaryExplorerViz
                  schemeRaw={scheme}
                  meta={state}
                  dispatch={dispatch}
                />
              }

              {/* {state.vizType !== 'map' && (
                  <ExplorerDetailsViz meta={state} dispatch={dispatch} />
                )} */}
            </div>
          </>
        ) : (
          <NoContext>
            {/* <Info id="infoSvg" fill="#317EB9" height="112" width="112" /> */}
            <div>
              <p>Select state and scheme to explore</p>
            </div>
          </NoContext>
        )}
        <ExplorerRelated data={data} />
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fetch dataset
  const data = await fetchAPI(context.query.explorer).then((res) => explorerPopulation(res.result));
  // fetch and parse metadata csv
  // const metaRes = await resourceGetter(data.metaUrl);
  // const meta = {};
  // metaRes.forEach((elm) => {
  //   meta[elm[0]] = elm[1] || '';
  // });

  // // fetch and parse data csv
  // const fileData = await resourceGetter(data.dataUrl, true);

  // // fetch related schemes
  // const relatedSchemes = await fetchFromTags(data.tags, data.id);

  // // generate indicators
  // const indicators = [
  //   ...Array.from(
  //     new Set(
  //       fileData.map((item: { indicators: any }) => item.indicators || null)
  //     )
  //   ),
  // ];

  // data.indicators = indicators;
  // data.relatedSchemes = relatedSchemes;
  let scheme;
  let primary: boolean = false;
  if (context.query.explorer == "e4ea0c34-3977-4dcf-89e6-e391e681871f") {
    scheme = await schemeDataTransform(context.query.explorer)
    primary = true;
  }
  else {
    scheme = await dataTransform(context.query.explorer)
    primary = false
  }
  return {
    props: {
      data,
      scheme,
      primary
      // meta,
      // fileData,
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

const NoContext = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;

  p {
    font-weight: 700;
    color: var(--text-light-medium);
  }

  path {
    transform: scale(5);
  }
`;