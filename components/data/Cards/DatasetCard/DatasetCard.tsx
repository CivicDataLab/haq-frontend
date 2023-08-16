import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
import { DatasetCardComp } from './CardComp';
import { Tags } from 'components/data';

const DatasetCard: React.FC<{
  datapackage: any;
}> = ({ datapackage }) => {
  
  function separateTitles(datapackage) {
    const parts = datapackage.title.split('|');
    const englishTitle = parts[0]?.trim();
    const hindiTitle = parts[1]?.trim();
    
    return { englishTitle, hindiTitle };
  }

  const { englishTitle, hindiTitle } = separateTitles(datapackage);

  const router = useRouter();

  return (
    <Link
      passHref
      href={`/${router.query.state}/datasets/${datapackage.notes}`}
    >
      <DatasetCardComp>
        <section>
          <h3 className="card__heading">{englishTitle}</h3>
          {hindiTitle && <h4 className="card__heading__hindi">{hindiTitle}</h4>}
          <Tags data={datapackage.tags} />
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;
