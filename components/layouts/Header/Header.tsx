import Link from 'next/link';
import HeaderComp from './HeaderComp';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <div className="container">
        {data.previousPage && (
          <Link href={data.previousLink}>
            <a>{`< Go Back to ${data.previousPage}`}</a>
          </Link>
        )}
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        {data.date && <p>{data.date}</p>}
      </div>
    </HeaderComp>
  );
};

export default Header;