import styled from 'styled-components';
import { Breadcrumb } from 'components/actions';
import { Header, Viz } from 'components/pages/budget';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { capitalizeWords, fetchBudgetJSON } from 'utils/data';

type Props = {
  state: string;
  stateBudgetData: any;
};

const Budget: React.FC<Props> = ({ state, stateBudgetData }) => {
  const breadcrumbArray = ['Home', capitalizeWords(state), 'Budget Data'];

  const header = {
    main: ` ${capitalizeWords(state)} State Budget Data`,
    sub: 'Welcome to our comprehensive girl education platform! We understand that you may be interested in exploring specific information related to girl education in Uttar Pradesh, Assam, or Bihar. To cater to your needs, ',
    state: 'bihar',
    dataSrc: 'Government of India',
    datasetLink :'https://www.w3schools.com/'
  };

  return (
    <>
      <Head>
        <title>Budget Data | HAQ</title>
      </Head>
      <Wrapper>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
          <Header header={header} />
          <Viz data={stateBudgetData}/>
        </main>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const state = context.query.state;
  const stateBudgetData = await fetchBudgetJSON('budget', state);
  return {
    props: {
      state: state,
      stateBudgetData: stateBudgetData || {}
    },
  };
};

const Wrapper = styled.div`
  > div {
    max-width: 1280px;
  }
`;

export default Budget;
