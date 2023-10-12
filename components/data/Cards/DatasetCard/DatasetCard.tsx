import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
import { DatasetCardComp } from './CardComp';
import { Tags } from 'components/data';
import { Heading } from 'components/layouts/Heading';

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
      href={`/${router.query.state}/datasets/${datapackage.code}`}
    >
      <DatasetCardComp>
        <section>
          <Heading as='h5' variant='h5l' color='var(--text-light-high)'>{englishTitle}</Heading>
          {hindiTitle && <Heading as='h5' variant='h5l' color='#9d423f' mt='12px'>{hindiTitle}</Heading>}
          <Tags data={datapackage.tags} />
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;
