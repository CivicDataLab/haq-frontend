import Link from 'next/link';
import { RelatedCardComp } from './CardComp';

const RelatedCard: React.FC<{ data: any; index: number }> = ({
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
          {data.author ? (
            <div>
              <hr className="hr" />
              <div className="author__details">
                <div className="author">{data.author}</div>
                <div className="date">{data.date}</div>
              </div>
            </div>
          ) : null}
        </article>
      </RelatedCardComp>
    </Link>
  );
};

export default RelatedCard;
