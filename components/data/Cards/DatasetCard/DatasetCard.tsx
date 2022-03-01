/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
import { DatasetCardComp } from './CardComp';
import { Tags } from 'components/data';

const DatasetCard: React.FC<{ datapackage: any; index: string; }> = ({ datapackage, index }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${datapackage.id}`} passHref>
      <DatasetCardComp index={index}>
        <section>
          <span className="card__group">
            {datapackage.groups[0]}
          </span>
          <h3 className="card__heading">{datapackage.title}</h3>
          <Tags data={datapackage.tags} />
          <div className="card__content">
            <p>{truncate(datapackage.notes, { length: 300 })}</p>
          </div>
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;
