import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
import { DatasetCardComp } from './CardComp';
import { Tags } from 'components/data';

const DatasetCard: React.FC<{ datapackage: any; index: string; datasetname: string }> = ({ datapackage, index, datasetname }) => {
  const router = useRouter();
  return (
    <Link
      passHref
      href={{
        pathname: `${router.pathname}/${datapackage.notes}`,
        query: { datasets: datasetname },
      }}
    >
      <DatasetCardComp index={index}>
        <section>
          <h3 className="card__heading">{datapackage.title}</h3>
          <Tags data={datapackage.tags} />
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;
