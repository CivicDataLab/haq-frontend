/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
// import { getDate } from 'utils/index';
import { RelatedCardComp } from './CardComp';
import Tags from 'components/Tags';

const RelatedCard: React.FC<{ data: any; index: string }> = ({
  data,
  index,
}) => {
  return (
    <Link href={`/datasets/${data.id}`} passHref>
      <RelatedCardComp>
        <article>
          <header>
            <h3>{data.title}</h3>
            <ul>
              {data.tags.slice(0, 3).map((tag, list) => (
                <li key={`relevantTags-${index}-${list}`}>{tag}</li>
              ))}
            </ul>
          </header>
          <p>{data.notes}</p>
        </article>
      </RelatedCardComp>
    </Link>
  );
};

export default RelatedCard;
