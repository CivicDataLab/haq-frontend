import Link from 'next/link';
import { RelatedCardComp } from './CardComp';

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
