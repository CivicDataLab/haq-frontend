import Header from 'components/pages/state/Header';
import Link from 'next/link';
import { states } from 'data/home';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
  pathName: string;
};

const Datasets: React.FC<Props> = () => {
  const router = useRouter();
  console.log(router)
  return (
    <main className="container">
      <div>
        /Datasets
        </div>
        <div>
          <Link
            passHref
            href={{
              pathname: `${router.asPath}/link1`,
            }}
          >
            Link1
          </Link>
        </div>
        <div>
          <Link
            passHref
            href={{
              pathname: `${router.asPath}/link2`,
            }}
          >
            Link2
          </Link>
        </div>
    </main>
  );
};

export default Datasets;
