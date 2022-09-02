import Link from 'next/link';
import { RelatedCardComp } from './CardComp';

const RelatedCard: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
  return (
    <Link href={`${data.link}`} passHref>
      <RelatedCardComp>
        <article>
          <header>
            <h3>{data.title}</h3>
            <ul>
              {data.taglist.slice(0, 3).map((item, list) => (
                <li key={`relevantTags-${index}-${list}`}>{item.tag}</li>
              ))}
            </ul>
          </header>
          <p>{data.content}</p>
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
