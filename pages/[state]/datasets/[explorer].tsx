import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { fetchAPI, explorerPopulation, fetchFromTags } from 'utils/explorer';
import {
  dataTransform,
  fetchJSON,
  schemeDataTransform,
  stateDataTransform,
} from 'utils/data';
import { fetchAPI as strapiAPI } from 'lib/api';

import {
  // ExplorerDetailsViz,
  ExplorerHeader,
  ExplorerRelated,
  // ExplorerViz,
  // SummaryExplorerViz,
} from 'components/pages/explorer';

import { Breadcrumb, Button } from 'components/actions';
import { capitalizeWords } from 'utils/data';
import { Banner } from 'components/shared';
import { useWindowSize } from 'utils/hooks';

const ExplorerViz = dynamic(
  () => import('components/pages/explorer/ExplorerViz'),
  {
    ssr: false,
  }
);

const SummaryExplorerViz = dynamic(
  () => import('components/pages/explorer/ExplorerViz/SummaryExplorerViz'),
  {
    ssr: false,
  }
);

type Props = {
  // meta: any;
  // fileData: any;
  scheme: any;
  primary: boolean;
  summary: any;
  obj: any;
  foundState: string;
};

const reducer = (state, action) => {
  return { ...state, ...action };
};

const Explorer: React.FC<Props> = ({
  scheme,
  primary,
  summary,
  obj,
  foundState,
}) => {
  const grants = Object.keys(Object.values(scheme.data)[0]['grant_name']).map(
    (item) => ({
      value: item,
      title: item,
    })
  );
  const initalState = {
    scheme: scheme.notes || '',
    schemeData: {},
    indicator: '',
    year: '',
    unit: '',
    consCode: '',
    vizType: 'map',
    grantName: grants[0].value,
    schemeType: 'Benefits girl students exclusively',
    schemeMode: 'Total',
    schemeYear: '2021-2022',
  };

  const [state, dispatch] = React.useReducer(reducer, initalState);

  const generateBreadcrumbArray = (primary, foundState, scheme) => {
    const baseArray = ['Home', capitalizeWords(foundState)];

    if (primary) {
      baseArray.push('District summary');
    } else {
      baseArray.push(
        'Treasury Schemes',
        scheme.metadata.title.slice(0, 16) + '...'
      );
    }

    return baseArray;
  };

  const breadcrumbArray = generateBreadcrumbArray(primary, foundState, scheme);

  const banner = {
    main: 'Treasury Schemes List',
    sub: 'For detailed scheme-wise breakdown of each district, please click here.',
    bgColor: 'var(--color-honey-0)',
    button: 'Explore All Schemes',
    btnLink: `/${foundState}/datasets`,
    bgBtn: 'var(--color-carrot-3)',
    imgSrc: '/assets/character.svg',
  };

  const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>HAQ</title>
      </Head>

      <Wrapper className="container">
        <Breadcrumb crumbs={breadcrumbArray} />
        <ExplorerHeader
          data={scheme.metadata}
          primary={primary}
          summary={summary}
        />
        {Object.keys(scheme).length !== 0 ? (
          <>
            <div id="explorerVizWrapper">
              {!primary ? (
                <ExplorerViz
                  schemeRaw={scheme}
                  meta={state}
                  dispatch={dispatch}
                  stateData={obj}
                />
              ) : (
                <>
                  <SummaryExplorerViz
                    schemeRaw={scheme}
                    meta={state}
                    dispatch={dispatch}
                  />
                  {width > 600 ? (
                    <Banner details={banner} />
                  ) : (
                    <TreasuryList>
                      <Button
                        href={`/${foundState}/datasets`}
                        size="md"
                        kind="secondary"
                      >
                        {' '}
                        Treasury Schemes List{' '}
                      </Button>
                    </TreasuryList>
                  )}
                </>
              )}

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
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  let scheme, obj;
  let primary: boolean = false;
  const foundState = context.query.state;
  if (context.query.explorer == 'summary-data') {
    scheme = await schemeDataTransform(context.query.explorer);
    primary = true;
  } else {
    scheme = await dataTransform(context.query.explorer);
    obj = await fetchJSON('state-data', scheme.metadata.code);
  }
  const summary = await strapiAPI('/summary');
  return {
    props: {
      scheme,
      primary,
      summary: summary.data,
      obj: obj || {},
      foundState,
      // meta,
      // fileData,
    },
  };
};

export default Explorer;

const Wrapper = styled.main`
  .indicator-mobile {
    margin-top: 2rem;
    margin-bottom: 2rem;
    @media (min-width: 980px) {
      display: none;
    }
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

const TreasuryList = styled.div`
  margin-top: 32px;
  display: flex;
  > a {
    flex-grow: 1;
    justify-content: center;
    text-decoration: none;
  }
`;
