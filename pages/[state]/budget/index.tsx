import styled from 'styled-components';
import { Breadcrumb } from 'components/actions';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { capitalizeWords } from 'utils/data';

type Props = {
  state: string;
};

const Budget: React.FC<Props> = ({ state }) => {
  const breadcrumbArray = ['Home', capitalizeWords(state), 'Budget Data'];
  return (
    <>
      <Head>
        <title>Budget Data | HAQ</title>
      </Head>
      <Wrapper>
        <main className="container">
          <Breadcrumb crumbs={breadcrumbArray} />
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
