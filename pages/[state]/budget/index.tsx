import styled from 'styled-components';
import { Breadcrumb } from 'components/actions';
import { Header, Viz } from 'components/pages/budget';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { capitalizeWords, fetchBudgetJSON } from 'utils/data';
import { fetchAPI } from 'lib/api';

type Props = {
  state: string;
  stateBudgetData: any;
  headerData: any;
};

const Budget: React.FC<Props> = ({
  stateBudgetData,
  headerData: [headerData],
}) => {
  const breadcrumbArray = [
    'Home',
    capitalizeWords(headerData.header.state),
    'Budget Data',
  ];

  return (
    <>
      <Head>
        <title>Budget Data | HAQ</title>
      </Head>
      <Wrapper>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
          <Header header={headerData.header} />
          <hr className="horizontal-line" />
          <Viz data={stateBudgetData} />
        </main>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const state = context.query.state;
  const [stateBudgetData, headerData] = await Promise.all([
    fetchBudgetJSON('budget', state),
    fetchAPI(`/budgetpages?filters[slug]=${state}`),
  ]);
  return {
    props: {
      state: state,
      stateBudgetData: stateBudgetData || {},
      headerData: headerData.data,
    },
  };
};

const Wrapper = styled.div`
  > div {
    max-width: 1280px;
  }
  .horizontal-line {
    margin-top: 16px;
    border: var(--separator-5);
  }
`;

export default Budget;
