import styled from 'styled-components';
import { Breadcrumb } from 'components/actions';
import { Header } from 'components/pages/budget';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { capitalizeWords } from 'utils/data';

type Props = {
  state: string;
};

const Budget: React.FC<Props> = ({ state }) => {
  const breadcrumbArray = ['Home', capitalizeWords(state), 'Budget Data'];

  const header = {
    main: ` ${capitalizeWords(state)} State Budget Data`,
    sub: 'Welcome to our comprehensive girl education platform! We understand that you may be interested in exploring specific information related to girl education in Uttar Pradesh, Assam, or Bihar. To cater to your needs, ',
    state: 'bihar',
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
        </main>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const state = context.query.state;
  return {
    props: {
      state: state,
    },
  };
};

const Wrapper = styled.div`
  > div {
    max-width: 1280px;
  }
`;

export default Budget;
