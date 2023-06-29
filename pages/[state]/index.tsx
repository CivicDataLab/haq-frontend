import Header from 'components/pages/state/Header';
import Link from 'next/link';
import { states } from 'data/home';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
  pathName: string;
  foundState: any;
};

const stateData = [
  {
    State: 'Bihar',
    Description: 'Bihar is located in',
  },
  {
    State: 'Assam',
    Description: 'Assam is located in',
  },
  {
    State: 'Uttar Pradesh',
    Description: 'Uttar Pradesh is located in',
  },
];

const State: React.FC<Props> = ({ foundState, pathName }) => {
  const state = pathName;
  return (
    <>
      <main className="container">
        <Header data={foundState} />
        <div>
          <Link
            passHref
            href={{
              pathname: `${state}/budget`,
            }}
          >
            Budget data
          </Link>
        </div>

        <div>
          <Link
            passHref
            href={{
              pathname: `${state}/datasets`,
            }}
          >
            Datasets
          </Link>
        </div>
      </main>
    </>
  );
};

const normalizeStateName = (state) => {
  return state.replace(/\s+/g, '-').toLowerCase();
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: stateData.map((obj) => ({
      params: {
        state: normalizeStateName(obj.State),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { state }: any = params;
  const foundState = stateData.find(
    (item) => normalizeStateName(item.State) == state
  );
  return {
    props: {
      pathName: state,
      foundState,
    },
  };
};

  export default State;
